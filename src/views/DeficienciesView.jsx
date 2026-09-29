import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  UploadCloud,
  FileCheck,
  ShieldAlert,
  ArrowRight,
  Filter,
  Check,
  X,
  FileText,
  AlertCircle
} from 'lucide-react';

export const DeficienciesView = () => {
  const {
    deficiencies,
    resolveDeficiency,
    raiseDeficiency,
    currentUser,
    setSelectedCaseId,
    setCurrentView,
    cases
  } = useApp();

  const [activeFilter, setActiveFilter] = useState('ALL');
  const [activeUploadDefId, setActiveUploadDefId] = useState(null);
  const [scanStep, setScanStep] = useState(0); // 0: Idle, 1: OCR, 2: Seal/Sign, 3: Rule check, 4: Done
  const [showRaiseModal, setShowRaiseModal] = useState(false);

  // New deficiency form state (for Verifier)
  const [newDefForm, setNewDefForm] = useState({
    caseId: cases[0]?.caseId || '',
    category: 'CONTINUITY_PROOF',
    documentType: 'Quarterly Progress Report',
    guidelineClause: 'NFST Clause 8.3: Supervisor & Dean Endorsement mandatory.',
    defectSummary: 'Missing official department seal and signature.',
    actionRequired: 'Obtain signatures and institutional stamp, then upload high-res color PDF.',
    hindiInstruction: 'संबंधित प्राधिकारी के हस्ताक्षर व मुहर करवाकर पुनः अपलोड करें।'
  });

  const filteredDeficiencies = deficiencies.filter(d => {
    if (activeFilter === 'ACTION_REQUIRED') return d.status === 'ACTION_REQUIRED';
    if (activeFilter === 'RESOLVED') return d.status === 'RESOLVED';
    if (activeFilter === 'CRITICAL') return d.severity === 'CRITICAL';
    return true;
  });

  // Handle simulated AI scan workflow
  const triggerScan = (deficiencyId) => {
    setActiveUploadDefId(deficiencyId);
    setScanStep(1);

    setTimeout(() => {
      setScanStep(2);
    }, 900);

    setTimeout(() => {
      setScanStep(3);
    }, 1800);

    setTimeout(() => {
      setScanStep(4);
      setTimeout(() => {
        resolveDeficiency(deficiencyId);
        setActiveUploadDefId(null);
        setScanStep(0);
      }, 1200);
    }, 2800);
  };

  const handleRaiseSubmit = (e) => {
    e.preventDefault();
    const targetCase = cases.find(c => c.caseId === newDefForm.caseId);
    raiseDeficiency(newDefForm.caseId, {
      ...newDefForm,
      applicantName: targetCase ? targetCase.applicantName : 'Applicant',
      scheme: targetCase ? targetCase.scheme : 'NFST'
    });
    setShowRaiseModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                AI Deficiency Resolution Hub
              </span>
              <span className="text-xs text-slate-500">
                Actionable Defect Remediation with AI Pre-validation
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              Deficiencies, Compliance Flags & Document Correction
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Eliminate opaque “Defective” rejections. Every deficiency contains exact legal citations, 
              bilingual instructions for tribal scholars, and instant AI pre-verification to prevent repeated resubmission cycles.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {currentUser.role === 'verifier' && (
              <button
                onClick={() => setShowRaiseModal(true)}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center space-x-2"
              >
                <AlertTriangle className="w-4 h-4 text-white" />
                <span>Raise New Deficiency</span>
              </button>
            )}

            <button
              onClick={() => triggerScan('DEF-NFST-2025-091')}
              className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-xs transition-all flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Simulate Fixing Sunita Maravi's Defect</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
          {[
            { id: 'ALL', label: `All Deficiencies (${deficiencies.length})` },
            { id: 'ACTION_REQUIRED', label: `Action Required (${deficiencies.filter(d => d.status === 'ACTION_REQUIRED').length})` },
            { id: 'CRITICAL', label: 'Disbursement Blockers' },
            { id: 'RESOLVED', label: `Resolved (${deficiencies.filter(d => d.status === 'RESOLVED').length})` }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition-all ${
                activeFilter === f.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Scan Modal / Active Scan Feedback Overlay */}
      {activeUploadDefId && (
        <div className="p-6 bg-slate-900 text-white rounded-2xl shadow-xl border border-slate-700 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
              <h3 className="font-bold text-sm text-white">
                Live AI Document Pre-Verification in Progress...
              </h3>
            </div>
            <span className="font-mono text-xs text-amber-400 font-semibold">
              Deficiency: {activeUploadDefId}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div className={`p-3 rounded-xl border ${scanStep >= 1 ? 'bg-slate-800 border-amber-400 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
              <span className="font-bold block">Step 1: OCR Text Extraction</span>
              <p className="text-[11px] mt-1">{scanStep >= 1 ? 'Confidence 99.1% - Text Parsed' : 'Waiting...'}</p>
            </div>
            <div className={`p-3 rounded-xl border ${scanStep >= 2 ? 'bg-slate-800 border-amber-400 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
              <span className="font-bold block">Step 2: Institutional Seal</span>
              <p className="text-[11px] mt-1">{scanStep >= 2 ? 'IISc Round Seal Detected' : 'Analyzing layout...'}</p>
            </div>
            <div className={`p-3 rounded-xl border ${scanStep >= 3 ? 'bg-slate-800 border-amber-400 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
              <span className="font-bold block">Step 3: Dean Signature</span>
              <p className="text-[11px] mt-1">{scanStep >= 3 ? 'Dean Academic Signature Matched' : 'Checking registry...'}</p>
            </div>
            <div className={`p-3 rounded-xl border ${scanStep >= 4 ? 'bg-emerald-950 border-emerald-400 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
              <span className="font-bold block">Step 4: AI Pre-Clearance</span>
              <p className="text-[11px] mt-1">{scanStep >= 4 ? 'Auto-Submitting to Queue!' : 'Pending verification...'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Deficiency Cards List */}
      <div className="space-y-4">
        {filteredDeficiencies.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No active deficiencies match current filter</h3>
            <p className="text-xs text-slate-500 mt-1">All applications under this filter satisfy configured compliance rules.</p>
            <button
              onClick={() => setActiveFilter('ALL')}
              className="mt-4 px-3.5 py-1.5 rounded-xl bg-slate-900 text-white font-semibold text-xs inline-flex items-center space-x-1.5 shadow-xs hover:bg-slate-800"
            >
              <span>Show All Records</span>
            </button>
          </div>
        ) : (
          filteredDeficiencies.map(def => {
            const isResolved = def.status === 'RESOLVED';

            return (
              <div
                key={def.deficiencyId}
                className={`bg-white rounded-2xl border p-6 transition-all ${
                  isResolved
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-slate-200 shadow-sm hover:border-red-300'
                }`}
              >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-4 border-b border-slate-100 gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                      {def.deficiencyId}
                    </span>
                    <span className="font-bold text-slate-900 text-sm">{def.applicantName}</span>
                    <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {def.caseId}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      {def.scheme}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mt-2">
                    {def.documentType} — {def.defectSummary}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Raised By: <strong>{def.raisedBy}</strong> at {def.raisedAt}
                  </p>
                </div>

                <div className="flex flex-col sm:items-end gap-1 flex-shrink-0">
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      isResolved ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {isResolved ? 'RESOLVED & VERIFIED' : 'ACTION REQUIRED'}
                    </span>
                    {def.disbursementBlocker && !isResolved && (
                      <span className="text-[10px] bg-red-600 text-white font-bold px-2 py-1 rounded-full">
                        PAYMENT BLOCKER
                      </span>
                    )}
                  </div>
                  {!isResolved && (
                    <span className="text-xs font-semibold text-red-600 mt-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>SLA: {def.daysLeft} Days Remaining</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Legal Reference & Instructions */}
              <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
                
                {/* Left: Guideline clause & defect details (7 cols) */}
                <div className="lg:col-span-7 space-y-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800 block mb-1">
                      Policy / Scheme Guideline Clause:
                    </span>
                    <p className="text-slate-600 leading-relaxed font-mono text-[11px]">
                      {def.guidelineClause}
                    </p>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950">
                    <span className="font-bold block mb-1">Actionable Remediation Guide:</span>
                    <p className="leading-relaxed">{def.actionRequired}</p>
                    {def.hindiInstruction && (
                      <p className="mt-2 text-slate-700 font-hindi border-t border-amber-200 pt-1.5 leading-relaxed text-[11px]">
                        {def.hindiInstruction}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: AI Validation Criteria & Actions (5 cols) */}
                <div className="lg:col-span-5 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-3">
                  <span className="font-bold text-slate-800 block">
                    AI Auto-Verification Checkpoints:
                  </span>
                  <div className="space-y-1.5">
                    {def.aiVerificationCriteria?.map((crit, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-slate-600">
                        {isResolved ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px] text-slate-400">
                            {idx + 1}
                          </div>
                        )}
                        <span className="text-[11px]">{crit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
                    {!isResolved ? (
                      <button
                        onClick={() => triggerScan(def.deficiencyId)}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 rounded-xl transition-all shadow-xs flex items-center justify-center space-x-2 text-xs"
                      >
                        <UploadCloud className="w-4 h-4" />
                        <span>Upload Stamped File & Run AI Pre-Check</span>
                      </button>
                    ) : (
                      <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-800 font-semibold text-center text-xs">
                        Cleared • Verified by AI Engine on {def.resolvedAt ? def.resolvedAt.substring(0, 10) : 'Today'}
                      </div>
                    )}

                    <button
                      onClick={() => {
                        setSelectedCaseId(def.caseId);
                        setCurrentView('cases');
                      }}
                      className="text-center text-xs text-slate-600 hover:text-slate-900 font-semibold py-1"
                    >
                      Open Full 360° Case Dossier →
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        }))}
      </div>

      {/* Modal: Raise New Deficiency (for Verifiers) */}
      {showRaiseModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>Issue New Formal Deficiency Ticket</span>
              </h3>
              <button onClick={() => setShowRaiseModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleRaiseSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Target Case ID</label>
                <select
                  value={newDefForm.caseId}
                  onChange={(e) => setNewDefForm({ ...newDefForm, caseId: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-800 font-mono"
                >
                  {cases.map(c => (
                    <option key={c.caseId} value={c.caseId}>
                      {c.caseId} — {c.applicantName} ({c.scheme})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Document Type</label>
                <input
                  type="text"
                  value={newDefForm.documentType}
                  onChange={(e) => setNewDefForm({ ...newDefForm, documentType: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-800"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Scheme Guideline Clause Reference</label>
                <input
                  type="text"
                  value={newDefForm.guidelineClause}
                  onChange={(e) => setNewDefForm({ ...newDefForm, guidelineClause: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-800"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Specific Defect Summary</label>
                <textarea
                  rows={2}
                  value={newDefForm.defectSummary}
                  onChange={(e) => setNewDefForm({ ...newDefForm, defectSummary: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-800"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Actionable Remediation Required (English)</label>
                <textarea
                  rows={2}
                  value={newDefForm.actionRequired}
                  onChange={(e) => setNewDefForm({ ...newDefForm, actionRequired: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-800"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Hindi Guidance for Scholar</label>
                <input
                  type="text"
                  value={newDefForm.hindiInstruction}
                  onChange={(e) => setNewDefForm({ ...newDefForm, hindiInstruction: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-800"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowRaiseModal(false)}
                  className="px-3.5 py-2 rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold"
                >
                  Issue Formal Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
