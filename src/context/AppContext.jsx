import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ROLES,
  USER_PERSONAS,
  SCHEMES,
  PAYMENT_GATES,
  CASES_DATA,
  DEFICIENCIES_MASTER,
  EXTERNAL_ADAPTERS,
  PAYMENT_BATCHES,
  GRIEVANCES_DATA,
  AUDIT_TRAIL,
  POLICY_CONFIG
} from '../data/mockData';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Current active persona / role
  const [currentUser, setCurrentUser] = useState(USER_PERSONAS[0]); // Default Sunita Maravi (Applicant)
  
  // Data state
  const [cases, setCases] = useState(() => {
    const saved = localStorage.getItem('mota_cases');
    return saved ? JSON.parse(saved) : CASES_DATA;
  });

  const [deficiencies, setDeficiencies] = useState(() => {
    const saved = localStorage.getItem('mota_deficiencies');
    return saved ? JSON.parse(saved) : DEFICIENCIES_MASTER;
  });

  const [batches, setBatches] = useState(() => {
    const saved = localStorage.getItem('mota_batches');
    return saved ? JSON.parse(saved) : PAYMENT_BATCHES;
  });

  const [adapters, setAdapters] = useState(() => {
    const saved = localStorage.getItem('mota_adapters');
    return saved ? JSON.parse(saved) : EXTERNAL_ADAPTERS;
  });

  const [grievances, setGrievances] = useState(() => {
    const saved = localStorage.getItem('mota_grievances');
    return saved ? JSON.parse(saved) : GRIEVANCES_DATA;
  });

  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('mota_audit');
    return saved ? JSON.parse(saved) : AUDIT_TRAIL;
  });

  // Navigation & Search State
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedCaseId, setSelectedCaseId] = useState('MOTA-NFST-2025-0482');
  const [selectedDeficiencyId, setSelectedDeficiencyId] = useState(null);
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to local storage for persistence across hot reloads
  useEffect(() => {
    localStorage.setItem('mota_cases', JSON.stringify(cases));
  }, [cases]);

  useEffect(() => {
    localStorage.setItem('mota_deficiencies', JSON.stringify(deficiencies));
  }, [deficiencies]);

  useEffect(() => {
    localStorage.setItem('mota_batches', JSON.stringify(batches));
  }, [batches]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Switch role / persona
  const switchPersona = (personaId) => {
    const target = USER_PERSONAS.find(p => p.id === personaId) || USER_PERSONAS[0];
    setCurrentUser(target);
    showToast(`Switched view to ${target.name} (${target.badge})`, 'info');
    
    // Sensible navigation defaults per role
    if (target.role === ROLES.APPLICANT) {
      if (target.caseId) setSelectedCaseId(target.caseId);
      setCurrentView('dashboard');
    } else if (target.role === ROLES.VERIFIER) {
      setCurrentView('cases');
    } else if (target.role === ROLES.ADMIN) {
      setCurrentView('payment-readiness');
    } else {
      setCurrentView('dashboard');
    }
  };

  // Resolve or update a deficiency (e.g. Applicant re-uploads, or Verifier verifies)
  const resolveDeficiency = (deficiencyId, reuploadData = null) => {
    const targetDef = deficiencies.find(d => d.deficiencyId === deficiencyId);
    if (!targetDef) return;

    const updatedDefs = deficiencies.map(d => {
      if (d.deficiencyId === deficiencyId) {
        return {
          ...d,
          status: 'RESOLVED',
          resolvedAt: new Date().toISOString(),
          submissionAttempts: d.submissionAttempts + 1
        };
      }
      return d;
    });

    setDeficiencies(updatedDefs);

    // Also update corresponding case
    const targetCaseId = targetDef.caseId;
    setCases(prevCases => prevCases.map(c => {
      if (c.caseId === targetCaseId) {
        const remainingActive = (c.activeDeficiencies || []).filter(id => id !== deficiencyId);
        
        // If this was the blocking deficiency for Sunita Maravi (Gate 4), auto-clear Gate 4!
        let updatedGates = { ...c.gates };
        let newScore = c.paymentGatesScore;
        let newReadiness = c.paymentReadinessStatus;
        let newOverall = c.overallStatus;

        if (c.caseId === 'MOTA-NFST-2025-0482' && deficiencyId === 'DEF-NFST-2025-091') {
          updatedGates.G4 = {
            passed: true,
            verifiedAt: 'Just Now (AI Pre-Verified + Dean e-Sign Validated)',
            remarks: 'IISc Dean Continuation Certificate verified with round seal & e-Sign.'
          };
          updatedGates.G6 = {
            passed: true,
            verifiedAt: 'Just Now',
            remarks: 'Payment gate fully cleared. Eligible for next PFMS DBT Staging batch.'
          };
          newScore = '6/6';
          newReadiness = 'PAYMENT_READY';
          newOverall = 'Payment Ready';
        }

        if (c.caseId === 'MOTA-NFST-2025-0312' && deficiencyId === 'DEF-NFST-2025-044') {
          updatedGates.G2 = {
            passed: true,
            verifiedAt: 'Just Now',
            remarks: 'Bank of Baroda NPCI Aadhaar seeding activated successfully.'
          };
          updatedGates.G6 = {
            passed: true,
            verifiedAt: 'Just Now',
            remarks: 'All criteria cleared. Queued for DBT release.'
          };
          newScore = '6/6';
          newReadiness = 'PAYMENT_READY';
          newOverall = 'Payment Ready';
        }

        return {
          ...c,
          activeDeficiencies: remainingActive,
          deficiencyCount: remainingActive.length,
          gates: updatedGates,
          paymentGatesScore: newScore,
          paymentReadinessStatus: newReadiness,
          overallStatus: newOverall,
          timeline: [
            {
              timestamp: 'Just Now',
              event: `Deficiency ${deficiencyId} Cleared via AI Pre-verification`,
              actor: currentUser.name
            },
            ...c.timeline
          ]
        };
      }
      return c;
    }));

    // Add to audit trail
    const newAudit = {
      id: `AUD-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actor: `${currentUser.name} (${currentUser.badge})`,
      ip: '10.24.110.15 (MoTA Secure Mesh)',
      action: 'DEFICIENCY_RESOLVED',
      caseId: targetDef.caseId,
      ruleTriggered: 'AI_REVERIFY_SUCCESS_200',
      details: `Deficiency ${deficiencyId} for ${targetDef.applicantName} resolved. Document criteria verified 100%.`
    };
    setAuditLogs(prev => [newAudit, ...prev]);

    showToast(`Deficiency ${deficiencyId} successfully resolved and verified!`, 'success');
  };

  // Raise a new deficiency (Verifier action)
  const raiseDeficiency = (caseId, deficiencyData) => {
    const newDefId = `DEF-${Math.floor(1000 + Math.random() * 9000)}`;
    const newDef = {
      deficiencyId: newDefId,
      caseId,
      applicantName: deficiencyData.applicantName || 'Applicant',
      scheme: deficiencyData.scheme || 'NFST',
      category: deficiencyData.category || 'DOCUMENT_VALIDATION',
      documentType: deficiencyData.documentType || 'Official Document',
      defectCode: deficiencyData.defectCode || 'DEF_GENERAL_CHECK_FAIL',
      severity: deficiencyData.severity || 'CRITICAL',
      disbursementBlocker: true,
      raisedBy: `${currentUser.name} (${currentUser.badge})`,
      raisedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      deadline: '15 Days from Issue',
      daysLeft: 15,
      status: 'ACTION_REQUIRED',
      guidelineClause: deficiencyData.guidelineClause || 'MoTA Scheme Guidelines 2024',
      defectSummary: deficiencyData.defectSummary || 'Verification required by officer.',
      actionRequired: deficiencyData.actionRequired || 'Upload revised document certified by competent authority.',
      hindiInstruction: deficiencyData.hindiInstruction || 'कृपया सक्षम प्राधिकारी द्वारा सत्यापित संशोधित दस्तावेज अपलोड करें।',
      aiVerificationCriteria: ['Authenticity verified', 'Officer approval received'],
      submissionAttempts: 0
    };

    setDeficiencies(prev => [newDef, ...prev]);
    setCases(prev => prev.map(c => {
      if (c.caseId === caseId) {
        return {
          ...c,
          deficiencyCount: (c.deficiencyCount || 0) + 1,
          activeDeficiencies: [...(c.activeDeficiencies || []), newDefId],
          paymentReadinessStatus: 'BLOCKED',
          timeline: [
            {
              timestamp: 'Just Now',
              event: `Deficiency ${newDefId} raised: ${deficiencyData.defectSummary}`,
              actor: currentUser.name
            },
            ...c.timeline
          ]
        };
      }
      return c;
    }));

    showToast(`New deficiency ${newDefId} raised for case ${caseId}`, 'warning');
  };

  // Record Officer Action (Verify, Mark Deficiency, Request Correction, Record Verification, Approve, Reject, Escalate)
  const recordOfficerAction = (caseId, actionType, { remarks, evidenceRef } = {}) => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const targetCase = cases.find(c => c.caseId === caseId);
    if (!targetCase) return;

    const newDecision = {
      id: `DEC-${Math.floor(1000 + Math.random() * 9000)}`,
      action: actionType,
      authority: `${currentUser.name} (${currentUser.badge})`,
      timestamp,
      reason: remarks || `Action [${actionType}] executed by verification officer.`,
      evidenceRef: evidenceRef || 'DigiLocker & Neural OCR Audit Node'
    };

    setCases(prev => prev.map(c => {
      if (c.caseId === caseId) {
        let updatedTimeline = [
          {
            timestamp: 'Just Now',
            event: `Officer Action [${actionType}]: ${remarks || 'Executed by Nodal Desk'}`,
            actor: currentUser.name
          },
          ...c.timeline
        ];

        let updatedOverall = c.overallStatus;
        let updatedReadiness = c.paymentReadinessStatus;
        let updatedGates = { ...c.gates };
        let newScore = c.paymentGatesScore;

        if (actionType === 'APPROVE') {
          updatedGates.G4 = { passed: true, verifiedAt: 'Just Now (Officer Approved)', remarks: 'Manually verified and endorsed by Nodal Officer' };
          updatedGates.G5 = { passed: true, verifiedAt: 'Just Now', remarks: 'Compliance vetted by Nodal Desk' };
          updatedGates.G6 = { passed: true, verifiedAt: 'Just Now', remarks: 'Cleared for PFMS Batch Staging' };
          newScore = '6/6';
          updatedReadiness = 'PAYMENT_READY';
          updatedOverall = 'Payment Ready';
        } else if (actionType === 'REJECT') {
          updatedOverall = 'Rejected';
          updatedReadiness = 'REJECTED';
        } else if (actionType === 'ESCALATE') {
          updatedOverall = 'Escalated to MoTA Directorate';
        } else if (actionType === 'RECORD_VERIFICATION') {
          updatedGates.G5 = { passed: true, verifiedAt: 'Just Now', remarks: 'Officer recorded statutory verification' };
        }

        const existingHistory = c.decisionHistory || [];

        return {
          ...c,
          overallStatus: updatedOverall,
          paymentReadinessStatus: updatedReadiness,
          paymentGatesScore: newScore,
          gates: updatedGates,
          lastUpdated: 'Just Now',
          timeline: updatedTimeline,
          decisionHistory: [newDecision, ...existingHistory]
        };
      }
      return c;
    }));

    // Add to immutable audit trail
    const newAudit = {
      id: `AUD-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actor: `${currentUser.name} (${currentUser.badge})`,
      ip: '10.24.110.42 (NIC Meghraj Secured Desk)',
      action: `OFFICER_${actionType}`,
      caseId,
      ruleTriggered: 'STATUTORY_OFFICER_OVERRIDE',
      details: `${actionType} recorded for case ${caseId}. Remarks: ${remarks || 'None'}. Evidence: ${evidenceRef || 'Attached'}`
    };
    setAuditLogs(prev => [newAudit, ...prev]);

    showToast(`Officer Action [${actionType}] recorded successfully for Case ${caseId}!`, 'success');
  };

  // Stage and execute PFMS DBT Batch (Scheme Admin action)
  const executePFMSBatch = (batchId) => {
    setBatches(prev => prev.map(b => {
      if (b.batchId === batchId) {
        return {
          ...b,
          status: 'RELEASED_TO_PFMS_SUCCESS',
          releasedAt: new Date().toISOString(),
          pfmsAckRef: `PFMS-ACK-DBT-${Math.floor(100000 + Math.random() * 900000)}`
        };
      }
      return b;
    }));

    // Mark ready scholars in that batch as disbursed
    setCases(prev => prev.map(c => {
      if (c.caseId === 'MOTA-TOPCLASS-2025-0891' || c.caseId === 'MOTA-TOPCLASS-2025-0418') {
        return {
          ...c,
          overallStatus: 'Disbursed',
          paymentReadinessStatus: 'DISBURSED',
          disbursedSoFar: (c.disbursedSoFar || 0) + c.stipendPending,
          stipendPending: 0,
          lastDisbursedDate: new Date().toISOString().substring(0, 10),
          timeline: [
            {
              timestamp: 'Just Now',
              event: `PFMS DBT Disbursement Executed via Electronic Sanction Order`,
              actor: `${currentUser.name} (DSC Digital Signature)`
            },
            ...c.timeline
          ]
        };
      }
      return c;
    }));

    showToast(`PFMS Batch ${batchId} electronically signed with DSC and released!`, 'success');
  };

  // Ping / refresh external adapter
  const pingAdapter = (adapterId) => {
    setAdapters(prev => prev.map(a => {
      if (a.id === adapterId) {
        return {
          ...a,
          lastSync: 'Live (Synchronized Just Now)',
          recordsFetchedToday: a.recordsFetchedToday + Math.floor(Math.random() * 15) + 1
        };
      }
      return a;
    }));
    showToast(`Adapter ${adapterId.toUpperCase()} pinged successfully. Response: 200 OK.`, 'info');
  };

  // Create new grievance ticket (Applicant action)
  const createGrievance = ({ caseId, subject, category, description }) => {
    const newTicketId = `GRV-2025-${Math.floor(1000 + Math.random() * 9000)}`;
    const targetCase = cases.find(c => c.caseId === caseId) || cases[0];
    const newTicket = {
      ticketId: newTicketId,
      caseId,
      applicantName: targetCase.applicantName,
      subject,
      category: category || 'PAYMENT_BLOCKER',
      priority: 'HIGH',
      status: 'OFFICER_REVIEWING',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      slaDeadline: '48 Hours from submission',
      assignedTo: 'Nodal Verification Officer, MoTA & District LDM',
      description,
      latestResponse: 'Ticket registered on MoTA Central Portal. Routed to Nodal Officer.',
      responses: [
        {
          sender: targetCase.applicantName,
          role: 'Applicant',
          time: 'Just Now',
          message: description
        }
      ]
    };
    setGrievances(prev => [newTicket, ...prev]);
    showToast(`Grievance ${newTicketId} registered with 48h SLA tracking!`, 'success');
    return newTicketId;
  };

// Add officer/applicant response to an existing grievance
  const addGrievanceResponse = ({ ticketId, sender, role, message }) => {
    setGrievances(prev =>
      prev.map(grievance =>
        grievance.ticketId === ticketId
          ? {
              ...grievance,
              latestResponse: message,
              responses: [
                ...(grievance.responses || []),
                {
                  sender,
                  role,
                  time: 'Just Now',
                  message
                }
              ]
            }
          : grievance
      )
    );

    showToast(`Response added to grievance ${ticketId}.`, 'success');
  };

  // Reset to initial synthetic demo state
  const resetDemoData = () => {
    setCases(CASES_DATA);
    setDeficiencies(DEFICIENCIES_MASTER);
    setBatches(PAYMENT_BATCHES);
    setAdapters(EXTERNAL_ADAPTERS);
    setGrievances(GRIEVANCES_DATA);
    setAuditLogs(AUDIT_TRAIL);
    localStorage.removeItem('mota_cases');
    localStorage.removeItem('mota_deficiencies');
    localStorage.removeItem('mota_batches');
    localStorage.removeItem('mota_adapters');
    localStorage.removeItem('mota_grievances');
    localStorage.removeItem('mota_audit');
    showToast('Demo data reset to baseline synthetic state!', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        ROLES,
        USER_PERSONAS,
        SCHEMES,
        PAYMENT_GATES,
        currentUser,
        switchPersona,
        cases,
        deficiencies,
        batches,
        adapters,
        grievances,
        auditLogs,
        policyConfig: POLICY_CONFIG,
        currentView,
        setCurrentView,
        selectedCaseId,
        setSelectedCaseId,
        selectedDeficiencyId,
        setSelectedDeficiencyId,
        globalSearchTerm,
        setGlobalSearchTerm,
        searchModalOpen,
        setSearchModalOpen,
        toastMessage,
        showToast,
        resolveDeficiency,
        raiseDeficiency,
        recordOfficerAction,
        executePFMSBatch,
        pingAdapter,
        addGrievanceResponse,
        createGrievance,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
