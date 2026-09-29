import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FolderOpen,
  CreditCard,
  AlertTriangle,
  FileCheck,
  Globe2,
  History,
  CheckCircle2,
  AlertCircle,
  Clock,
  Building,
  User,
  ExternalLink,
  Sparkles,
  Download,
  UploadCloud,
  FileText,
  ShieldCheck,
  ArrowLeft,
  Send
} from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

export const CaseDetailView = ({ onBack }) => {
  const {
    cases,
    selectedCaseId,
    deficiencies,
    PAYMENT_GATES,
    resolveDeficiency,
    currentUser,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('readiness');
  const [simulatedUploading, setSimulatedUploading] = useState(false);
  const [aiScanStatus, setAiScanStatus] = useState(null);

  const currentCase = cases.find(c => c.caseId === selectedCaseId) || cases[0];
  const caseDeficiencies = deficiencies.filter(d => d.caseId === currentCase.caseId);

  // Simulate applicant re-upload with live AI pre-validation
  const handleSimulateReupload = (deficiencyId) => {
    setSimulatedUploading(true);
    setAiScanStatus('SCANNING_OCR');

    setTimeout(() => {
      setAiScanStatus('VERIFYING_CLAUSE');
    }, 1200);

    setTimeout(() => {
      setAiScanStatus('SUCCESS');
      setSimulatedUploading(false);
      resolveDeficiency(deficiencyId);
    }, 2400);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Navigation Bar with Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Applications List</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => showToast(`Exported 360° Dossier PDF for ${currentCase.applicantName}`, 'success')}
            className="inline-flex items-center space-x-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download 360° Dossier PDF</span>
          </button>
        </div>
      </div>

      {/* Beneficiary Master Dossier Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          
          {/* Left Avatar & Key Bio */}
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 flex items-center justify-center font-bold text-lg flex-shrink-0">
              {currentCase.applicantName.split(' ').map(n => n[0]).join('')}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">{currentCase.applicantName}</h2>
                <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {currentCase.caseId}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  {currentCase.scheme} Scheme
                </span>
                <StatusBadge status={currentCase.overallStatus} size="sm" />
                {currentCase.isPVTG && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                    PVTG Recognized
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 mt-1">
                <strong>{currentCase.course}</strong> • {currentCase.institution}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
                <span>Tribe: <strong className="text-slate-700">{currentCase.tribe}</strong></span>
                <span>•</span>
                <span>State: <strong className="text-slate-700">{currentCase.state} ({currentCase.district})</strong></span>
                <span>•</span>
                <span>Academic Year: <strong className="text-slate-700">{currentCase.academicYear}</strong></span>
              </div>
            </div>
          </div>

          {/* Right: Payment Readiness Highlight Badge */}
          <div className="flex flex-col sm:items-end justify-between border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
            <div className="text-left sm:text-right">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400">
                Current Disbursement State
              </span>
              <div className="flex items-center gap-2 mt-1 justify-end">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  {currentCase.paymentGatesScore} Gates
                </span>
                <StatusBadge status={currentCase.paymentReadinessStatus} size="sm" />
              </div>
            </div>

            <div className="mt-3 text-left sm:text-right">
              <span className="text-xs text-slate-500">Queued Stipend / Fellowship</span>
              <p className="text-2xl font-black text-slate-900">
                ₹{currentCase.stipendPending > 0 ? currentCase.stipendPending.toLocaleString('en-IN') : currentCase.disbursedSoFar.toLocaleString('en-IN')}
              </p>
            </div>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="mt-6 pt-3 border-t border-slate-200 flex flex-wrap gap-2 text-xs">
          {[
            { id: 'readiness', label: '1. Payment Readiness (6 Gates)', count: null },
            { id: 'deficiencies', label: '2. Deficiencies & Remediation', count: caseDeficiencies.length },
            { id: 'documents', label: '3. AI Document Intelligence', count: null },
            { id: 'adapters', label: '4. Cross-Portal Adapters', count: '5 Live' },
            { id: 'timeline', label: '5. Case Lifecycle Timeline', count: currentCase.timeline.length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 rounded-xl font-semibold transition-all flex items-center space-x-1.5 ${
                activeTab === tab.id
                  ? 'bg-[#0A192F] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeTab === tab.id ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Payment Readiness 6 Gates Matrix */}
      {activeTab === 'readiness' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Six-Gate Disbursement Audit Status
                </h3>
                <p className="text-xs text-slate-500">
                  Remember: An applicant may be “Selected”, but disbursement cannot occur without all 6 gates verified.
                </p>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                currentCase.paymentReadinessStatus === 'PAYMENT_READY' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
              }`}>
                Score: {currentCase.paymentGatesScore}
              </span>
            </div>

            <div className="divide-y divide-slate-100 mt-4">
              {PAYMENT_GATES.map((g, idx) => {
                const gData = currentCase.gates[g.gateId] || { passed: false, remarks: 'Pending check' };
                const isPassed = gData.passed;

                return (
                  <div key={g.gateId} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex items-start space-x-3.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs text-white flex-shrink-0 mt-0.5 ${
                        isPassed ? 'bg-emerald-600' : 'bg-red-600'
                      }`}>
                        {idx + 1}
                      </div>

                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-900 text-xs sm:text-sm">{g.title}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {isPassed ? 'PASSED' : 'HOLD / DEFICIENT'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                          {gData.remarks}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          Authority: {g.responsibleEntity} {gData.verifiedAt && `• Cleared: ${gData.verifiedAt}`}
                        </p>
                      </div>
                    </div>

                    {!isPassed && (
                      <div className="flex-shrink-0">
                        <button
                          onClick={() => setActiveTab('deficiencies')}
                          className="text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          View Deficiency Remedy →
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Deficiencies & Remediation Hub */}
      {activeTab === 'deficiencies' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Deficiency Intelligence & Remediation Engine
                </h3>
                <p className="text-xs text-slate-500">
                  Automated guideline clauses, plain English/Hindi instructions, and instant AI pre-verification.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                {caseDeficiencies.length} Registered Deficiencies
              </span>
            </div>

            {caseDeficiencies.length === 0 ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-slate-800">Zero Active Deficiencies!</h4>
                <p className="text-xs text-slate-500 mt-1">
                  All documents and eligibility clauses satisfy MoTA scheme guidelines.
                </p>
              </div>
            ) : (
              <div className="space-y-6 mt-4">
                {caseDeficiencies.map(def => {
                  const isResolved = def.status === 'RESOLVED';
                  return (
                    <div
                      key={def.deficiencyId}
                      className={`p-5 rounded-2xl border transition-all ${
                        isResolved
                          ? 'bg-emerald-50/50 border-emerald-300'
                          : 'bg-white border-red-300 shadow-sm'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                            {def.deficiencyId}
                          </span>
                          <span className="text-xs font-semibold text-slate-700">{def.documentType}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            isResolved ? 'bg-emerald-200 text-emerald-900' : 'bg-red-200 text-red-900'
                          }`}>
                            {def.status}
                          </span>
                          {!isResolved && (
                            <span className="text-[11px] text-red-600 font-medium flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>SLA: {def.daysLeft} Days Left</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Defect Description & Guideline Clause */}
                      <div className="mt-3 space-y-2 text-xs">
                        <div>
                          <span className="font-bold text-slate-800">Defect Summary: </span>
                          <span className="text-slate-700">{def.defectSummary}</span>
                        </div>

                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                          <span className="font-bold text-slate-800 block mb-1">
                            Legal Reference: {def.guidelineClause}
                          </span>
                        </div>

                        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-amber-950">
                          <span className="font-bold block mb-1">Applicant Remediation Instructions:</span>
                          <p className="leading-relaxed">{def.actionRequired}</p>
                          {def.hindiInstruction && (
                            <p className="mt-2 text-slate-700 font-hindi border-t border-amber-200 pt-1.5 leading-relaxed text-[11px]">
                              {def.hindiInstruction}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Interactive Re-upload dropzone & Live AI Scan */}
                      {!isResolved && (
                        <div className="mt-4 pt-3 border-t border-slate-100">
                          {simulatedUploading ? (
                            <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3">
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-bold flex items-center gap-2">
                                  <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                                  AI Document Inspection Engine Scanning...
                                </span>
                                <span className="text-amber-400 font-mono text-[11px]">
                                  {aiScanStatus === 'SCANNING_OCR' && 'Running OCR & Layout Analysis'}
                                  {aiScanStatus === 'VERIFYING_CLAUSE' && 'Detecting Institutional Round Seal & Dean Sign'}
                                  {aiScanStatus === 'SUCCESS' && 'Verification Complete: 100% Pass'}
                                </span>
                              </div>
                              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                                <div className="bg-amber-400 h-full animate-pulse w-3/4"></div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-dashed border-slate-300">
                              <div className="flex items-center space-x-3">
                                <UploadCloud className="w-8 h-8 text-slate-400" />
                                <div>
                                  <p className="text-xs font-bold text-slate-800">
                                    Upload Stamped & Corrected Certificate PDF
                                  </p>
                                  <p className="text-[11px] text-slate-500">
                                    Our AI will instantly pre-validate seal clarity, dates, and signatures before submission.
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => handleSimulateReupload(def.deficiencyId)}
                                className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center space-x-2 flex-shrink-0"
                              >
                                <Sparkles className="w-4 h-4 text-amber-200" />
                                <span>Upload & Run AI Pre-Validation</span>
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {isResolved && (
                        <div className="mt-3 text-xs text-emerald-800 font-semibold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Deficiency Resolved & Verified via AI Inspection. Gate 4 cleared!</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: AI Document Intelligence */}
      {activeTab === 'documents' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                AI Document Intelligence & Tamper Analysis
              </h3>
              <p className="text-xs text-slate-500">
                OCR text extraction, signature bounding boxes, and anti-forgery heuristic scans.
              </p>
            </div>
            <span className="text-xs font-mono bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-200">
              DigiLocker Cryptographic XML Verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Caste Certificate Document Card */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Scheduled Tribe Caste Certificate</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                  OCR Match 99.4%
                </span>
              </div>
              <p className="text-xs text-slate-600 font-mono">Cert No: {currentCase.casteCertNo}</p>
              
              <div className="space-y-1.5 text-[11px] text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-400">Issuing Authority:</span>
                  <span className="font-semibold text-slate-800">Sub-Divisional Magistrate (SDO)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Presidential Order Match:</span>
                  <span className="font-semibold text-emerald-700">Art. 342 Verified (Gond Tribe MP)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tampering Heuristic:</span>
                  <span className="font-semibold text-emerald-700">Clean (No font alterations detected)</span>
                </div>
              </div>
            </div>

            {/* Income Certificate Document Card */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Competent Authority Income Certificate</span>
                <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">
                  OCR Match 98.1%
                </span>
              </div>
              <p className="text-xs text-slate-600 font-mono">Declared Income: ₹{currentCase.incomeCertAmount.toLocaleString('en-IN')} / year</p>
              
              <div className="space-y-1.5 text-[11px] text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-400">Scheme Limit Check:</span>
                  <span className="font-semibold text-emerald-700">Pass (Well below ₹6.0 LPA limit)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Financial Year Validity:</span>
                  <span className="font-semibold text-slate-800">FY 2024-25 (Valid till 31-Mar-2026)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Digital Watermark:</span>
                  <span className="font-semibold text-emerald-700">e-District Digital Signature Valid</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tab 4: Cross-Portal Adapters */}
      {activeTab === 'adapters' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Cross-Portal Real-Time Verification Adapters
              </h3>
              <p className="text-xs text-slate-500">
                Controlled read-only queries to external government infrastructure.
              </p>
            </div>
            <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg">
              Live Mock Adapters
            </span>
          </div>

          <div className="space-y-3">
            {[
              { name: 'DigiLocker e-District Gateway', status: 'MATCH_VERIFIED', detail: 'Fetched authentic XML for Caste and 10th marksheet.' },
              { name: 'PFMS DBT Bharat Gateway', status: currentCase.bankDetails.dbtActive ? 'ACTIVE_MANDATE' : 'DORMANT_MANDATE', detail: `Account: ${currentCase.bankDetails.bankName} (${currentCase.bankDetails.accountMasked}) IFSC: ${currentCase.bankDetails.ifsc}` },
              { name: 'AISHE / NIRF Database', status: 'INSTITUTE_CONFIRMED', detail: `AISHE Code: ${currentCase.aisheCode} • NIRF Rank #${currentCase.nirfRank || 'N/A'}` },
              { name: 'NSP & State Deduplication Radar', status: currentCase.caseId === 'MOTA-NFST-2025-0994' ? 'DUAL_BENEFIT_ALERT' : 'CLEAN_NO_OVERLAP', detail: currentCase.caseId === 'MOTA-NFST-2025-0994' ? 'Concurrent Rajasthan TAD scholarship active!' : 'Zero overlapping DBT benefits detected across 28 State portals.' }
            ].map(adapter => (
              <div key={adapter.name} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900">{adapter.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{adapter.detail}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  adapter.status.includes('CLEAN') || adapter.status.includes('MATCH') || adapter.status.includes('ACTIVE') || adapter.status.includes('CONFIRMED')
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {adapter.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Lifecycle Timeline */}
      {activeTab === 'timeline' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
            Case Lifecycle Event Stream
          </h3>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {currentCase.timeline.map((item, idx) => (
              <div key={idx} className="relative text-xs">
                <div className="absolute -left-6 top-0.5 w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-white ring-2 ring-amber-200"></div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-900">{item.event}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{item.timestamp}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Actor: <strong className="text-slate-700">{item.actor}</strong>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
