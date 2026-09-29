import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OfficerCaseJourney } from './OfficerCaseJourney';
import {
  X,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  Building,
  User,
  CreditCard,
  History,
  Sparkles,
  Send,
  Download,
  Clock,
  Eye,
  Check,
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';
import { StatusBadge } from './StatusBadge';

export const OfficerUnifiedCaseModal = ({ isOpen, onClose, targetCase }) => {
  const {
    currentUser,
    deficiencies,
    resolveDeficiency,
    raiseDeficiency,
    recordOfficerAction,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('documents');
  const [officerRemarks, setOfficerRemarks] = useState('');
  const [evidenceRefInput, setEvidenceRefInput] = useState('');
  const [actionInProgress, setActionInProgress] = useState(false);

  if (!isOpen || !targetCase) return null;

  const caseDeficiencies = deficiencies.filter(d => d.caseId === targetCase.caseId);
  const isBlocked = targetCase.paymentReadinessStatus === 'BLOCKED';
  const isReady = targetCase.paymentReadinessStatus === 'PAYMENT_READY';
  const isDisbursed = targetCase.paymentReadinessStatus === 'DISBURSED';

  // Current stage calculation
  const getCurrentStage = (c) => {
    if (c.paymentReadinessStatus === 'DISBURSED') return 'Payment';
    if (c.paymentReadinessStatus === 'PAYMENT_READY') return 'Payment Readiness';
    if (c.deficiencyCount > 0) return 'Deficiency';
    if (c.overallStatus === 'Selected') return 'Compliance';
    return 'Verification';
  };

  const currentStage = getCurrentStage(targetCase);

  // Scheme-specific documents for Document & Evidence Panel (Section 4)
  const getDocumentsForCase = (c) => {
    if (c.scheme === 'NFST') {
      return [
        {
          id: 'DOC-NFST-1',
          requiredDoc: 'Scheduled Tribe Caste Certificate (Article 342)',
          submittedDoc: 'MP-ST-Caste-Cert-Maravi.pdf (1.2 MB)',
          extractedFields: [
            { field: 'Beneficiary Name', value: c.applicantName },
            { field: 'Tribe / Sub-Caste', value: 'Gond (Article 342 Scheduled)' },
            { field: 'Issuing Officer', value: 'Sub-Divisional Magistrate (SDO) Dindori' },
            { field: 'Certificate ID', value: c.casteCertNo }
          ],
          verificationStatus: 'VERIFIED',
          evidenceRef: 'DigiLocker Cryptographic XML hash match SHA256:d8a9...b112 (MP e-District Registry Ref 88192)',
          ocrConfidence: '99.4%'
        },
        {
          id: 'DOC-NFST-2',
          requiredDoc: 'Quarterly Fellowship Continuation Certificate (Annexure-IV)',
          submittedDoc: 'IISc_Q1_Continuation_Annexure4.pdf (840 KB)',
          extractedFields: [
            { field: 'Quarter Period', value: '01-Jul-2025 to 30-Sep-2025' },
            { field: 'Supervisor', value: 'Prof. K. Narayanaswamy (Endorsed)' },
            { field: 'Institutional Seal', value: c.gates.G4.passed ? 'IISc Official Round Seal Detected (Pass)' : 'MISSING / BLANK' },
            { field: 'Dean Signature', value: c.gates.G4.passed ? 'Dean of Science Verified' : 'PENDING' }
          ],
          verificationStatus: c.gates.G4.passed ? 'VERIFIED' : 'DEFICIENT',
          evidenceRef: c.gates.G4.passed ? 'IISc Academic Registry Digital Attestation Ref IISC-REG-2025-091' : 'Neural OCR Seal Detection Flag: Seal boundary confidence 12% (Threshold >=85%)',
          ocrConfidence: '95.8%'
        },
        {
          id: 'DOC-NFST-3',
          requiredDoc: 'Family Income Certificate / Affidavit',
          submittedDoc: 'Tehsildar_Income_Cert_2024.pdf (950 KB)',
          extractedFields: [
            { field: 'Annual Income', value: `₹${c.incomeCertAmount.toLocaleString('en-IN')}` },
            { field: 'Validity FY', value: 'FY 2024-25 (Valid)' },
            { field: 'Issuing Authority', value: 'Tehsildar Shahpura' }
          ],
          verificationStatus: 'VERIFIED',
          evidenceRef: 'e-District MP Portal Digital Signature Hash Verified',
          ocrConfidence: '98.2%'
        },
        {
          id: 'DOC-NFST-4',
          requiredDoc: 'Bank Passbook & Aadhaar DBT Consent Mandate',
          submittedDoc: 'SBI_Passbook_Aadhaar_Seeding.pdf (620 KB)',
          extractedFields: [
            { field: 'Bank Name', value: c.bankDetails.bankName },
            { field: 'Account Number', value: c.bankDetails.accountMasked },
            { field: 'IFSC Code', value: c.bankDetails.ifsc },
            { field: 'NPCI Bridge Status', value: c.bankDetails.dbtActive ? 'ACTIVE (Code 00)' : 'DORMANT' }
          ],
          verificationStatus: c.bankDetails.dbtActive ? 'VERIFIED' : 'DEFICIENT',
          evidenceRef: 'PFMS Beneficiary Master Query Code SBIN0002215-BEN-991204',
          ocrConfidence: '97.2%'
        }
      ];
    } else if (c.scheme === 'NOS') {
      return [
        {
          id: 'DOC-NOS-1',
          requiredDoc: 'Scheduled Tribe Caste Certificate',
          submittedDoc: 'JH-ST-Caste-Cert-Soren.pdf (1.4 MB)',
          extractedFields: [
            { field: 'Beneficiary Name', value: c.applicantName },
            { field: 'Tribe', value: 'Santhal (Jharkhand)' },
            { field: 'Issuing SDO', value: 'SDO Dumka' }
          ],
          verificationStatus: 'VERIFIED',
          evidenceRef: 'DigiLocker Cryptographic XML Verified',
          ocrConfidence: '99.1%'
        },
        {
          id: 'DOC-NOS-2',
          requiredDoc: 'University Unconditional CAS Offer Letter',
          submittedDoc: 'Oxford_Unconditional_CAS_Offer.pdf (1.8 MB)',
          extractedFields: [
            { field: 'University', value: 'University of Oxford' },
            { field: 'World QS Rank', value: '#3 in QS World Rankings 2025' },
            { field: 'Course', value: 'M.Sc. in Renewable Energy Systems' }
          ],
          verificationStatus: 'VERIFIED',
          evidenceRef: 'University of Oxford CAS Electronic Registry Authenticated',
          ocrConfidence: '99.6%'
        },
        {
          id: 'DOC-NOS-3',
          requiredDoc: 'Academic Return & Surety Bond Deed (₹25 Lakhs)',
          submittedDoc: 'Surety_Bond_Deed_Signed.pdf (3.1 MB)',
          extractedFields: [
            { field: 'Stamp Value', value: '₹100 Non-Judicial Stamp Paper' },
            { field: 'Surety 1', value: 'Shri Mangal Soren (Verified)' },
            { field: 'Surety 2', value: 'Shri Hemant Soren (Gazetted Officer verification pending)' }
          ],
          verificationStatus: 'DEFICIENT',
          evidenceRef: 'Physical verification by PWD Jharkhand DDO pending for Surety 2',
          ocrConfidence: '92.4%'
        },
        {
          id: 'DOC-NOS-4',
          requiredDoc: 'Tier-4 Student Visa / BRP Vignette Copy',
          submittedDoc: 'VFS_Global_Appointment_Slip.pdf (410 KB)',
          extractedFields: [
            { field: 'Visa Status', value: 'Appointment Slip Only (Vignette Missing)' }
          ],
          verificationStatus: 'DEFICIENT',
          evidenceRef: 'Bureau of Immigration / VFS Global Biometric confirmation awaited',
          ocrConfidence: '90.1%'
        }
      ];
    } else {
      return [
        {
          id: 'DOC-TC-1',
          requiredDoc: 'Scheduled Tribe Caste Certificate',
          submittedDoc: 'JH-ST-Caste-Cert-Munda.pdf (1.1 MB)',
          extractedFields: [
            { field: 'Candidate', value: c.applicantName },
            { field: 'Tribe', value: 'Munda (Jharkhand)' }
          ],
          verificationStatus: 'VERIFIED',
          evidenceRef: 'DigiLocker Cryptographic XML Verified',
          ocrConfidence: '99.5%'
        },
        {
          id: 'DOC-TC-2',
          requiredDoc: 'IIT Bombay Fee Breakdown & Hostel Dues Invoice',
          submittedDoc: 'IITB_Fee_Receipt_Sem1.pdf (1.5 MB)',
          extractedFields: [
            { field: 'Institute', value: 'IIT Bombay (NIRF #3)' },
            { field: 'Tuition Fee Claimed', value: '₹1,12,000' },
            { field: 'Living Allowance', value: '₹18,000' },
            { field: 'Laptop Grant', value: '₹45,000' }
          ],
          verificationStatus: 'VERIFIED',
          evidenceRef: 'IIT Bombay Nodal Officer e-Sign Ref IITB-NODAL-2025-441',
          ocrConfidence: '98.9%'
        },
        {
          id: 'DOC-TC-3',
          requiredDoc: 'JEE Advanced Official Rank Card',
          submittedDoc: 'JEE_Adv_Scorecard.pdf (720 KB)',
          extractedFields: [
            { field: 'ST Category Rank', value: 'AIR ST-84' },
            { field: 'Roll No', value: '2501092841' }
          ],
          verificationStatus: 'VERIFIED',
          evidenceRef: 'NTA Gateway Authenticated',
          ocrConfidence: '99.8%'
        }
      ];
    }
  };

  const caseDocs = getDocumentsForCase(targetCase);

  // Officer action triggers
  const handleExecuteAction = (actionType) => {
    setActionInProgress(true);
    setTimeout(() => {
      recordOfficerAction(targetCase.caseId, actionType, {
        remarks: officerRemarks || `${actionType} confirmed by Officer`,
        evidenceRef: evidenceRefInput || 'DigiLocker & Neural OCR Audit Node'
      });
      setActionInProgress(false);
      setOfficerRemarks('');
      setEvidenceRefInput('');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* ========================================================================= */}
        {/* SECTION 1: CASE HEADER */}
        {/* ========================================================================= */}
        <div className="p-5 bg-gradient-to-r from-[#0A192F] via-[#102A4C] to-[#183B64] text-white flex-shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700/80">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                  {targetCase.caseId}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-500/30 text-blue-200 border border-blue-400/40">
                  {targetCase.scheme} Scheme
                </span>
                <StatusBadge status={targetCase.overallStatus} size="sm" />
                <StatusBadge status={targetCase.paymentReadinessStatus} size="sm" />
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-white mt-1.5 flex items-center gap-2">
                <span>{targetCase.applicantName}</span>
                <span className="text-xs font-normal text-slate-300">({targetCase.tribe} Tribe • {targetCase.state})</span>
              </h2>

              <p className="text-xs text-slate-300 mt-0.5">
                {targetCase.course} • {targetCase.institution}
              </p>
            </div>

            <div className="flex items-start sm:items-end justify-between sm:flex-col gap-2">
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg self-end"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-left sm:text-right text-xs">
                <span className="text-[10px] text-slate-400 block uppercase font-semibold">Assigned Authority</span>
                <span className="font-semibold text-slate-200">{currentUser.name} (Nodal Officer L-2)</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Last Updated: <strong className="text-amber-300 font-mono">{targetCase.lastUpdated || '02-Sep-2025, 10:10 AM'}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Statutory AI Disclaimer Alert Ribbon */}
          <div className="mt-3 p-2 bg-slate-900/90 rounded-xl border border-amber-500/40 flex items-center justify-between text-[11px] text-amber-200">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>
                <strong>Statutory Rule:</strong> AI assists with OCR extraction and rule checks, but 
                <span className="font-bold underline text-white ml-1">AI must NEVER directly approve, reject, select or authorize payment.</span> Authority rests solely with the Verification Officer.
              </span>
            </span>
            <span className="text-[9px] bg-amber-500/20 px-2 py-0.5 rounded font-mono font-bold text-amber-300 border border-amber-500/30">
              LEGAL_COMPLIANCE_ENFORCED
            </span>
          </div>
        </div>

        {/* Tab Selector Bar */}
        <div className="bg-slate-100 px-6 py-2 border-b border-slate-200 flex flex-wrap gap-1 text-xs flex-shrink-0">
          {[
            { id: 'journey', label: '2. Case Journey' },
            { id: 'profile', label: '3. Applicant Profile' },
            { id: 'documents', label: '4. Documents & Evidence', count: caseDocs.length },
            { id: 'deficiencies', label: '5. Deficiency Panel', count: caseDeficiencies.length },
            { id: 'dependencies', label: '6. Dependencies' },
            { id: 'readiness', label: '7. Payment Readiness Matrix' },
            { id: 'history', label: '8. Decision History' },
            { id: 'actions', label: '9. Officer Action Console' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center space-x-1.5 ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeTab === tab.id ? 'bg-amber-500 text-white' : 'bg-slate-300 text-slate-800'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Scrollable Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* ========================================================================= */}
          {/* SECTION 2: CASE JOURNEY */}
          {/* ========================================================================= */}
          {activeTab === 'journey' && (
            <div className="space-y-4">
              <OfficerCaseJourney
                currentStageName={currentStage}
                isBlocked={isBlocked}
                isDisbursed={isDisbursed}
              />

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
                <span className="font-bold text-slate-900 block">Milestone History Breakdown:</span>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">1. Application Intake:</span>
                    <span className="font-semibold text-slate-900">Submitted on {targetCase.applicationDate} with DigiLocker attestation</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">2. Desk Verification:</span>
                    <span className="font-semibold text-slate-900">Passed by Dr. Rajesh Meena (OCR score 98.6%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">3. Selection Sanction:</span>
                    <span className="font-semibold text-slate-900">Awarded on {targetCase.selectionDate || 'In Progress'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">4. Payment Readiness Stage:</span>
                    <span className={`font-bold ${isReady ? 'text-emerald-700' : 'text-red-700'}`}>
                      {targetCase.paymentGatesScore} Gates Passed ({targetCase.paymentReadinessStatus})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 3: APPLICANT INFORMATION */}
          {/* ========================================================================= */}
          {activeTab === 'profile' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Personal & Tribal Identity */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                  <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider border-b border-slate-200 pb-1.5">
                    Personal & Tribal Identity
                  </h4>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Full Name:</span>
                      <strong className="text-slate-900">{targetCase.applicantName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Scheduled Tribe (ST):</span>
                      <strong className="text-slate-900">{targetCase.tribe}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">PVTG Status:</span>
                      <strong className={targetCase.isPVTG ? 'text-purple-700' : 'text-slate-700'}>
                        {targetCase.isPVTG ? 'YES (Particularly Vulnerable Tribal Group)' : 'No (General ST Quota)'}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Domicile State & District:</span>
                      <strong className="text-slate-900">{targetCase.state} ({targetCase.district})</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Caste Certificate Ref:</span>
                      <span className="font-mono text-slate-800">{targetCase.casteCertNo}</span>
                    </div>
                  </div>
                </div>

                {/* Academic Institution */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                  <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider border-b border-slate-200 pb-1.5">
                    Academic Institution & Programme
                  </h4>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Enrolled Institution:</span>
                      <strong className="text-slate-900">{targetCase.institution}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Course / Discipline:</span>
                      <strong className="text-slate-900">{targetCase.course}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">AISHE / NIRF Code:</span>
                      <span className="font-mono text-slate-900">{targetCase.aisheCode} (NIRF Rank #{targetCase.nirfRank || 'N/A'})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Academic Year:</span>
                      <strong className="text-slate-900">{targetCase.academicYear}</strong>
                    </div>
                  </div>
                </div>

                {/* Financial & Banking Profile */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5 md:col-span-2">
                  <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider border-b border-slate-200 pb-1.5">
                    Financial & PFMS Banking Master
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
                    <div>
                      <span className="text-slate-500 block">Declared Parental Income:</span>
                      <strong className="text-slate-900 text-sm">₹{targetCase.incomeCertAmount.toLocaleString('en-IN')} / year</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Bank Account & IFSC:</span>
                      <strong className="text-slate-900">{targetCase.bankDetails?.bankName} ({targetCase.bankDetails?.accountMasked})</strong>
                      <span className="font-mono text-slate-500 block text-[10px]">IFSC: {targetCase.bankDetails?.ifsc}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">NPCI Aadhaar Payment Bridge:</span>
                      <span className={`font-bold inline-block px-2 py-0.5 rounded text-[10px] ${
                        targetCase.bankDetails?.dbtActive ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {targetCase.bankDetails?.dbtActive ? 'ACTIVE MANDATE (Pass)' : 'DORMANT / INACTIVE (Blocker)'}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 4: DOCUMENT & EVIDENCE PANEL */}
          {/* ========================================================================= */}
          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Document Integrity & Extracted Evidence
                </span>
                <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Neural OCR Active • DigiLocker PKI Validated
                </span>
              </div>

              <div className="space-y-3">
                {caseDocs.map(doc => {
                  const isVerified = doc.verificationStatus === 'VERIFIED';
                  return (
                    <div
                      key={doc.id}
                      className={`p-4 rounded-xl border text-xs transition-all space-y-3 ${
                        isVerified ? 'bg-slate-50/70 border-slate-200' : 'bg-red-50/60 border-red-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-200/70 gap-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-slate-900 text-sm">{doc.requiredDoc}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.2 rounded ${
                              isVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {doc.verificationStatus}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5 font-mono">
                            Submitted: {doc.submittedDoc}
                          </p>
                        </div>

                        <div className="text-left sm:text-right">
                          <span className="text-[10px] text-slate-400 block font-semibold">OCR Confidence</span>
                          <span className="font-mono font-bold text-emerald-700">{doc.ocrConfidence}</span>
                        </div>
                      </div>

                      {/* Extracted Fields Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white p-3 rounded-lg border border-slate-200 text-[11px]">
                        {doc.extractedFields.map((f, i) => (
                          <div key={i}>
                            <span className="text-slate-400 text-[10px] block">{f.field}</span>
                            <span className="font-semibold text-slate-900 truncate block">{f.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Evidence Reference */}
                      <div className="flex items-center space-x-2 text-[11px]">
                        <span className="font-bold text-slate-700 flex-shrink-0">Evidence Reference:</span>
                        <span className="font-mono text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200 truncate flex-1">
                          {doc.evidenceRef}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 5: DEFICIENCY PANEL */}
          {/* ========================================================================= */}
          {activeTab === 'deficiencies' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-red-700">
                  Compliance Defects & Discrepancies
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {caseDeficiencies.length} Registered Records
                </span>
              </div>

              {caseDeficiencies.length === 0 ? (
                <div className="py-8 text-center bg-slate-50 rounded-xl border border-slate-200">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-slate-900">Zero Active Deficiencies</h4>
                  <p className="text-xs text-slate-500 mt-0.5">All submitted materials satisfy statutory rules.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {caseDeficiencies.map(def => {
                    const isResolved = def.status === 'RESOLVED';
                    return (
                      <div
                        key={def.deficiencyId}
                        className={`p-4 rounded-xl border text-xs space-y-3 ${
                          isResolved ? 'bg-emerald-50/50 border-emerald-300' : 'bg-red-50/60 border-red-300'
                        }`}
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                          <div className="flex items-center space-x-2">
                            <span className="font-mono text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                              {def.deficiencyId}
                            </span>
                            <span className="font-bold text-slate-900">{def.documentType}</span>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            isResolved ? 'bg-emerald-200 text-emerald-900' : 'bg-red-200 text-red-900'
                          }`}>
                            {def.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div className="space-y-2">
                            <div>
                              <strong className="text-slate-900 block text-[11px]">Rule / Clause:</strong>
                              <p className="font-mono text-slate-700 text-[11px] leading-snug">{def.guidelineClause}</p>
                            </div>
                            <div>
                              <strong className="text-slate-900 block text-[11px]">Evidence Detected:</strong>
                              <p className="text-slate-700 text-[11px] leading-snug">{def.defectSummary}</p>
                            </div>
                            <div>
                              <strong className="text-slate-900 block text-[11px]">Problem:</strong>
                              <p className="text-red-700 font-semibold text-[11px]">{def.defectCode}</p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div>
                              <strong className="text-slate-900 block text-[11px]">Explanation:</strong>
                              <p className="text-slate-700 text-[11px] leading-relaxed">
                                Statutory treasury guidelines require physical round seal and Dean/Guide dual verification before release.
                              </p>
                            </div>
                            <div>
                              <strong className="text-slate-900 block text-[11px]">Required Action:</strong>
                              <p className="text-slate-800 font-semibold text-[11px]">{def.actionRequired}</p>
                            </div>
                            <div>
                              <strong className="text-slate-900 block text-[11px]">Applicant Response:</strong>
                              <p className="text-slate-600 text-[11px]">
                                {isResolved ? 'Corrected color PDF uploaded with Dean round seal. Verified 100% by AI OCR.' : 'Pending submission from scholar.'}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Officer Resolution Button */}
                        {!isResolved && (
                          <div className="pt-2 border-t border-slate-200 flex justify-end">
                            <button
                              onClick={() => resolveDeficiency(def.deficiencyId)}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center space-x-1.5 shadow-xs"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Verify & Clear Deficiency</span>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 6: DEPENDENCY PANEL */}
          {/* ========================================================================= */}
          {activeTab === 'dependencies' && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  External Authorities & Dependencies
                </span>
                <span className="text-xs text-slate-500">Cross-institutional clearing gates</span>
              </div>

              <div className="space-y-3">
                {[
                  {
                    authority: 'Dean of Academic Affairs, IISc Bengaluru',
                    dependency: 'Quarterly Fellowship Continuation Certificate (Annexure-IV)',
                    confirmation: 'Institutional Round Stamp + Supervisor signature for Q1 Jul-Sep 2025',
                    status: targetCase.gates.G4.passed ? 'CLEARED' : 'PENDING',
                    nextAction: targetCase.gates.G4.passed ? 'None (Archived in dossier)' : 'Automated SMS/Email notice sent to Academic Registrar'
                  },
                  {
                    authority: 'National Payments Corporation of India (NPCI) / Bank of India',
                    dependency: 'Aadhaar Payment Bridge System (APBS) Active DBT Mandate',
                    confirmation: 'Aadhaar mapped on NPCI central mapper with Code 00',
                    status: targetCase.bankDetails?.dbtActive ? 'CLEARED' : 'PENDING',
                    nextAction: targetCase.bankDetails?.dbtActive ? 'Bank mandate active' : 'Escalate to Lead Bank District Manager'
                  },
                  {
                    authority: 'State Tribal Welfare Department & Digilocker',
                    dependency: 'Article 342 Scheduled Tribe Caste Registry',
                    confirmation: 'Presidential Order 1950 Constitutional schedule matching',
                    status: 'CLEARED',
                    nextAction: 'Digital XML token cryptographically attested'
                  }
                ].map((dep, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">{dep.authority}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        dep.status === 'CLEARED' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {dep.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600">
                      <div>
                        <span className="text-slate-400 block">External Dependency:</span>
                        <strong className="text-slate-800">{dep.dependency}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Required Confirmation:</span>
                        <strong className="text-slate-800">{dep.confirmation}</strong>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                      <span>Next Action: <strong className="text-amber-800">{dep.nextAction}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 7: PAYMENT READINESS PANEL (SELECTED BUT PAYMENT READY = NO) */}
          {/* ========================================================================= */}
          {activeTab === 'readiness' && (
            <div className="space-y-4">
              
              {/* Very Clear State Box Required by User */}
              <div className={`p-5 rounded-2xl border-2 text-xs space-y-3 ${
                isBlocked ? 'bg-red-50/80 border-red-300' : 'bg-emerald-50/80 border-emerald-300'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Statutory Payment Release Determination
                    </span>
                    <h3 className="text-lg font-black text-slate-900 mt-0.5">
                      SELECTED = YES
                      <span className="mx-2 text-slate-400">|</span>
                      <span className={isReady ? 'text-emerald-700' : 'text-red-700'}>
                        PAYMENT READY = {isReady ? 'YES' : 'NO'}
                      </span>
                    </h3>
                  </div>

                  <span className={`text-xs font-black px-3 py-1.5 rounded-xl text-white ${
                    isReady ? 'bg-emerald-600' : 'bg-red-600'
                  }`}>
                    {isReady ? 'CLEARED FOR DBT RELEASE' : 'PAYMENT SUSPENDED (HOLD)'}
                  </span>
                </div>

                {/* 5 Specific Checkpoints Required by User */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                  
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">1. Scheme Compliance</span>
                    <span className={`font-bold text-sm block mt-0.5 ${
                      targetCase.gates.G5?.passed ? 'text-emerald-700' : 'text-amber-700'
                    }`}>
                      {targetCase.gates.G5?.passed ? 'Complete (Pass)' : 'Pending'}
                    </span>
                    <span className="text-[10px] text-slate-500">Course credits & quota limits checked</span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">2. Bank Readiness</span>
                    <span className={`font-bold text-sm block mt-0.5 ${
                      targetCase.bankDetails?.dbtActive ? 'text-emerald-700' : 'text-red-700'
                    }`}>
                      {targetCase.bankDetails?.dbtActive ? 'Ready (Active Mandate)' : 'Pending (Dormant)'}
                    </span>
                    <span className="text-[10px] text-slate-500">NPCI APBS mapper code 00</span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">3. Required Certificate</span>
                    <span className={`font-bold text-sm block mt-0.5 ${
                      targetCase.gates.G4?.passed ? 'text-emerald-700' : 'text-red-700'
                    }`}>
                      {targetCase.gates.G4?.passed ? 'Complete (Verified)' : 'Pending (Missing Dean Seal)'}
                    </span>
                    <span className="text-[10px] text-slate-500">Annexure-IV quarterly progress report</span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">4. External Verification</span>
                    <span className={`font-bold text-sm block mt-0.5 ${
                      targetCase.gates.G3?.passed ? 'text-emerald-700' : 'text-amber-700'
                    }`}>
                      {targetCase.gates.G3?.passed ? 'Complete (PFMS Validated)' : 'Pending'}
                    </span>
                    <span className="text-[10px] text-slate-500">Party master code &amp; name match &ge; 90%</span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 sm:col-span-2 lg:col-span-2">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">5. Funding / Processing Dependency</span>
                    <span className={`font-bold text-sm block mt-0.5 ${
                      isReady ? 'text-emerald-700' : 'text-slate-600'
                    }`}>
                      {isReady ? 'Ready for Electronic Batch Release' : 'Pending Gate Clearance before Staging'}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Total Queued Outlay: <strong>₹{targetCase.stipendPending.toLocaleString('en-IN')}</strong> under Demand 92
                    </span>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 8: DECISION HISTORY */}
          {/* ========================================================================= */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Chronological Decision & Audit Register
                </span>
                <span className="text-xs font-mono text-slate-500">Immutable Log</span>
              </div>

              <div className="space-y-2.5">
                {[
                  ...(targetCase.decisionHistory || []),
                  {
                    action: 'DEFICIENCY_ISSUED',
                    authority: 'Dr. Rajesh Meena (Verifier L-2)',
                    timestamp: '2025-09-02 10:10',
                    reason: 'Flagged missing Dean signature on Quarterly continuation certificate.',
                    evidenceRef: 'DEF-NFST-2025-091'
                  },
                  {
                    action: 'PFMS_MASTER_VALIDATED',
                    authority: 'PFMS DBT Adapter (Automated)',
                    timestamp: '2025-08-25 12:30',
                    reason: 'Beneficiary code created with 98.4% name match score.',
                    evidenceRef: 'SBIN0002215-BEN-991204'
                  },
                  {
                    action: 'COMMITTEE_SELECTION',
                    authority: 'MoTA Selection Board',
                    timestamp: '2025-08-20 16:00',
                    reason: 'Awarded fellowship under merit quota.',
                    evidenceRef: 'SO-NFST-2025-048'
                  },
                  {
                    action: 'DESK_INITIAL_CLEARANCE',
                    authority: 'Dr. Rajesh Meena',
                    timestamp: '2025-08-05 11:15',
                    reason: 'Primary identity & marksheet verification pass.',
                    evidenceRef: 'DigiLocker Attestation Token'
                  }
                ].map((dec, i) => (
                  <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-slate-900 font-mono text-xs">{dec.action}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{dec.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-700 leading-snug">{dec.reason}</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-200/60">
                      <span>Authority: <strong className="text-slate-700">{dec.authority}</strong></span>
                      <span>Ref: <strong className="text-slate-600 font-mono">{dec.evidenceRef}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 9: OFFICER ACTIONS CONSOLE */}
          {/* ========================================================================= */}
          {activeTab === 'actions' && (
            <div className="space-y-5">
              
              <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3">
                <span className="font-bold text-amber-400 text-xs uppercase tracking-wider block">
                  Statutory Determination Console
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Executing an officer action triggers digital signature logging and updates the case journey in the National DBT Register.
                </p>

                {/* Remarks & Evidence Input */}
                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">
                      Official Remarks / Determination Findings:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Reviewed IISc Academic Section endorsement. Seal verified authentic."
                      value={officerRemarks}
                      onChange={(e) => setOfficerRemarks(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white placeholder:text-slate-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">
                      Supporting Evidence Reference / File Number:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., MoTA/NFST/2025/VER-0482 or DigiLocker XML Ref"
                      value={evidenceRefInput}
                      onChange={(e) => setEvidenceRefInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white placeholder:text-slate-500"
                    />
                  </div>
                </div>
              </div>

              {/* 7 Required Officer Actions Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                
                {/* 1. Verify */}
                <button
                  onClick={() => handleExecuteAction('VERIFY')}
                  disabled={actionInProgress}
                  className="p-3 rounded-xl bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-900 font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all"
                >
                  <FileCheck2 className="w-5 h-5 text-blue-700" />
                  <span>Verify Credentials</span>
                </button>

                {/* 2. Mark Deficiency */}
                <button
                  onClick={() => {
                    raiseDeficiency(targetCase.caseId, {
                      category: 'COMPLIANCE',
                      documentType: 'Institutional Certificate',
                      guidelineClause: 'MoTA Scheme Guidelines 2024',
                      defectSummary: officerRemarks || 'Document lacks competent authority endorsement',
                      actionRequired: 'Submit revised document signed by Dean / Head of Institution'
                    });
                  }}
                  className="p-3 rounded-xl bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-900 font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all"
                >
                  <AlertTriangle className="w-5 h-5 text-amber-700" />
                  <span>Mark Deficiency</span>
                </button>

                {/* 3. Request Correction */}
                <button
                  onClick={() => handleExecuteAction('REQUEST_CORRECTION')}
                  className="p-3 rounded-xl bg-purple-50 border border-purple-200 hover:bg-purple-100 text-purple-900 font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all"
                >
                  <Clock className="w-5 h-5 text-purple-700" />
                  <span>Request Correction</span>
                </button>

                {/* 4. Record Verification */}
                <button
                  onClick={() => handleExecuteAction('RECORD_VERIFICATION')}
                  className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-900 font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all"
                >
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  <span>Record Verification</span>
                </button>

                {/* 5. Approve */}
                <button
                  onClick={() => handleExecuteAction('APPROVE')}
                  className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all shadow-xs"
                >
                  <Check className="w-5 h-5" />
                  <span>Approve & Clear</span>
                </button>

                {/* 6. Reject */}
                <button
                  onClick={() => handleExecuteAction('REJECT')}
                  className="p-3 rounded-xl bg-red-50 border border-red-200 hover:bg-red-100 text-red-900 font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all"
                >
                  <X className="w-5 h-5 text-red-700" />
                  <span>Reject Case</span>
                </button>

                {/* 7. Escalate */}
                <button
                  onClick={() => handleExecuteAction('ESCALATE')}
                  className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all col-span-2"
                >
                  <ExternalLink className="w-5 h-5 text-amber-400" />
                  <span>Escalate to Joint Director (MoTA HQ)</span>
                </button>

              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs flex-shrink-0">
          <span className="text-slate-500 font-mono">
            Audit Actor: {currentUser.name} ({currentUser.badge})
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl"
          >
            Close Unified Dossier
          </button>
        </div>

      </div>
    </div>
  );
};
