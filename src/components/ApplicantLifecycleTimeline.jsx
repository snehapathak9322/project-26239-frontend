import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  FileCheck,
  Award,
  CreditCard,
  Send,
  Check,
  ChevronRight,
  Info
} from 'lucide-react';

export const LIFECYCLE_STAGES = [
  {
    id: 1,
    code: 'SUBMITTED',
    label: 'Submitted',
    fullTitle: 'Application Submitted',
    description: 'Initial application submitted online and assigned unique MoTA Case ID.',
    actor: 'Applicant'
  },
  {
    id: 2,
    code: 'UNDER_VERIFICATION',
    label: 'Under Verification',
    fullTitle: 'Desk & AI OCR Verification',
    description: 'Nodal verification desk and neural OCR validating caste, income, and educational credentials.',
    actor: 'MoTA Nodal Officer / AI Engine'
  },
  {
    id: 3,
    code: 'DEFICIENCY_FOUND',
    label: 'Deficiency Found',
    fullTitle: 'Compliance Defect Detected',
    description: 'Document defect identified (missing seal, expired validity, or formatting inconsistency).',
    actor: 'Verification Desk'
  },
  {
    id: 4,
    code: 'CORRECTION_REQUIRED',
    label: 'Correction Required',
    fullTitle: 'Remediation Notice Issued',
    description: 'Deficiency ticket raised with specific legal clause and 15-day SLA countdown for scholar.',
    actor: 'MoTA Portal'
  },
  {
    id: 5,
    code: 'RESUBMITTED',
    label: 'Resubmitted',
    fullTitle: 'Corrected Document Uploaded',
    description: 'Scholar uploaded revised stamped document via portal with instant AI pre-validation.',
    actor: 'Applicant'
  },
  {
    id: 6,
    code: 'VERIFIED',
    label: 'Verified',
    fullTitle: 'Desk Verification Cleared',
    description: 'All submitted certificates and eligibility criteria authenticated 100%.',
    actor: 'Nodal Officer L-2'
  },
  {
    id: 7,
    code: 'SELECTED',
    label: 'Selected',
    fullTitle: 'Merit Selection & Award Issued',
    description: 'Candidate approved by Selection Committee and provisional award sanction letter issued.',
    actor: 'MoTA Scheme Committee',
    isMilestone: true
  },
  {
    id: 8,
    code: 'COMPLIANCE_PENDING',
    label: 'Compliance Pending',
    fullTitle: 'Scheme-Specific Compliance Checks',
    description: 'Vetting university joining report, academic bond execution, or Aadhaar NPCI seeding.',
    actor: 'Nodal Institute / Bank'
  },
  {
    id: 9,
    code: 'PAYMENT_READINESS_CHECK',
    label: 'Payment Readiness Check',
    fullTitle: '6-Gate Payment Readiness Audit',
    description: 'Automated policy engine checks Aadhaar mapping, PFMS party code, and supervisor progress.',
    actor: 'AI Readiness Engine'
  },
  {
    id: 10,
    code: 'PAYMENT_BLOCKED',
    label: 'Payment Blocked',
    fullTitle: 'Statutory Payment Suspension / Hold',
    description: 'Payment is on statutory hold due to missing institutional certificates, surety bond, or NPCI seeding.',
    actor: 'Payment Gate Engine',
    isDecisionPoint: true
  },
  {
    id: 11,
    code: 'PAYMENT_READY',
    label: 'Payment Ready',
    fullTitle: 'Cleared for PFMS DBT Release',
    description: 'All 6 independent verification gates cleared 100%. Case queued for batch generation.',
    actor: 'Payment Gate Engine',
    isDecisionPoint: true
  },
  {
    id: 12,
    code: 'PAYMENT_PROCESSING',
    label: 'Payment Processing',
    fullTitle: 'PFMS Electronic Batch Staging & DSC Sign-off',
    description: 'Electronic sanction order generated, digitally signed with DSC, and sent to RBI/bank.',
    actor: 'DDO, Ministry of Tribal Affairs'
  },
  {
    id: 13,
    code: 'PAID',
    label: 'Paid',
    fullTitle: 'DBT Credit Confirmation',
    description: 'Fellowship / scholarship credited directly to beneficiary Aadhaar-linked bank account.',
    actor: 'PFMS / Beneficiary Bank',
    isMilestone: true
  }
];

export const ApplicantLifecycleTimeline = ({ activeCase }) => {
  const [selectedStageIndex, setSelectedStageIndex] = useState(null);

  // Map case status to stage index (1-13)
  const getStageIndex = (caseObj) => {
    if (!caseObj) return 7;
    if (caseObj.paymentReadinessStatus === 'DISBURSED' || caseObj.overallStatus === 'Disbursed' || caseObj.overallStatus === 'Paid') return 13;
    if (caseObj.paymentReadinessStatus === 'PROCESSING') return 12;
    if (caseObj.paymentReadinessStatus === 'PAYMENT_READY') return 11;
    if (caseObj.paymentReadinessStatus === 'BLOCKED') {
      if (caseObj.deficiencyCount > 0) return 4; // Correction Required
      return 10; // Payment Blocked
    }
    if (caseObj.overallStatus === 'Compliance Pending') return 8;
    if (caseObj.overallStatus === 'Selected') return 7;
    if (caseObj.overallStatus === 'Verified') return 6;
    if (caseObj.overallStatus === 'Resubmitted') return 5;
    if (caseObj.overallStatus === 'Deficiency Raised' || caseObj.overallStatus === 'Correction Required') return 4;
    if (caseObj.overallStatus === 'Deficiency Found') return 3;
    if (caseObj.overallStatus === 'Under Verification') return 2;
    return 1;
  };

  const currentStageIndex = getStageIndex(activeCase);
  const displayedStage = selectedStageIndex !== null 
    ? LIFECYCLE_STAGES[selectedStageIndex - 1] 
    : LIFECYCLE_STAGES[currentStageIndex - 1];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              End-to-End Case Progression
            </span>
            <span className="text-xs text-slate-500 font-mono">Case ID: {activeCase?.caseId}</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 mt-1">
            Visual 13-Stage Scholarship Lifecycle
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">Current Stage:</span>
          <span className={`font-bold px-2.5 py-1 rounded-full text-xs ${
            currentStageIndex === 13 ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
            activeCase?.paymentReadinessStatus === 'PAYMENT_READY' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
            activeCase?.paymentReadinessStatus === 'BLOCKED' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
            'bg-blue-100 text-blue-800'
          }`}>
            Stage {currentStageIndex}/13 • {LIFECYCLE_STAGES[currentStageIndex - 1]?.label}
          </span>
        </div>
      </div>

      {/* The Visual 13-Step Progress Bar */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[860px] relative px-2 pt-2">
          
          {/* Horizontal Track Line */}
          <div className="absolute top-6 left-4 right-4 h-1 bg-slate-200 -z-0">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-amber-600 transition-all duration-500"
              style={{ width: `${((currentStageIndex - 1) / (LIFECYCLE_STAGES.length - 1)) * 100}%` }}
            ></div>
          </div>

          {/* Stepper Nodes */}
          <div className="flex justify-between relative z-10">
            {LIFECYCLE_STAGES.map(stage => {
              const isPassed = stage.id < currentStageIndex;
              const isCurrent = stage.id === currentStageIndex;
              const isSelected = selectedStageIndex === stage.id;
              const isBlocked = isCurrent && (activeCase?.paymentReadinessStatus === 'BLOCKED' || stage.id === 10);

              return (
                <div
                  key={stage.id}
                  onClick={() => setSelectedStageIndex(stage.id)}
                  className="flex flex-col items-center cursor-pointer group"
                  style={{ width: '56px' }}
                >
                  {/* Step Bubble */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                      isPassed
                        ? 'bg-emerald-600 text-white ring-2 ring-emerald-200'
                        : isCurrent
                        ? isBlocked
                          ? 'bg-red-600 text-white ring-4 ring-red-200 animate-pulse'
                          : 'bg-amber-600 text-white ring-4 ring-amber-200 animate-subtle-pulse'
                        : 'bg-white border-2 border-slate-300 text-slate-400 group-hover:border-slate-400'
                    } ${isSelected ? 'scale-110 ring-4 ring-blue-300' : ''}`}
                  >
                    {isPassed ? (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    ) : isBlocked ? (
                      <AlertCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                    ) : (
                      <span>{stage.id}</span>
                    )}
                  </div>

                  {/* Stage Label */}
                  <span
                    className={`text-[9.5px] text-center mt-2 leading-tight transition-colors line-clamp-2 ${
                      isCurrent
                        ? isBlocked
                          ? 'font-extrabold text-red-700'
                          : 'font-extrabold text-amber-800'
                        : isPassed
                        ? 'font-bold text-slate-700'
                        : 'text-slate-400 font-medium'
                    }`}
                  >
                    {stage.label}
                  </span>

                  {/* Milestone Marker */}
                  {stage.id === 7 && (
                    <span className="text-[8px] bg-blue-100 text-blue-800 font-bold px-1 rounded mt-0.5">
                      Awarded
                    </span>
                  )}
                  {stage.id === 10 && (
                    <span className="text-[8px] bg-red-100 text-red-800 font-bold px-1 rounded mt-0.5">
                      Blocked
                    </span>
                  )}
                  {stage.id === 11 && (
                    <span className="text-[8px] bg-emerald-100 text-emerald-800 font-bold px-1 rounded mt-0.5">
                      Ready
                    </span>
                  )}
                  {stage.id === 13 && (
                    <span className="text-[8px] bg-emerald-100 text-emerald-800 font-bold px-1 rounded mt-0.5">
                      Disbursed
                    </span>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Interactive Detail Box for Clicked/Current Stage */}
      {displayedStage && (
        <div className={`p-4 rounded-xl border text-xs transition-all ${
          displayedStage.id === currentStageIndex && activeCase?.paymentReadinessStatus === 'BLOCKED'
            ? 'bg-red-50/70 border-red-200'
            : displayedStage.id <= currentStageIndex
            ? 'bg-slate-50 border-slate-200'
            : 'bg-slate-50/50 border-slate-200 text-slate-400'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-200/70">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-slate-900 text-sm">
                Stage {displayedStage.id}: {displayedStage.fullTitle}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.2 rounded ${
                displayedStage.id < currentStageIndex ? 'bg-emerald-100 text-emerald-800' :
                displayedStage.id === currentStageIndex ? 'bg-amber-100 text-amber-900' : 'bg-slate-200 text-slate-600'
              }`}>
                {displayedStage.id < currentStageIndex ? 'CLEARED' :
                 displayedStage.id === currentStageIndex ? 'ACTIVE STATUS' : 'UPCOMING'}
              </span>
            </div>
            <span className="text-[11px] text-slate-500">
              Responsible Authority: <strong className="text-slate-700">{displayedStage.actor}</strong>
            </span>
          </div>

          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            {displayedStage.description}
          </p>

          {/* Special Callout on Stage 7 vs 10/11 */}
          {displayedStage.id === 7 && (
            <div className="mt-2 text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 flex-shrink-0" />
              <span>
                <strong>Statutory Principle:</strong> Selection confirms merit entitlement, but funds cannot be credited until Stage 11 (Payment Ready) is cleared.
              </span>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
