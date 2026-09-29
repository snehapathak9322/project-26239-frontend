import React, { useState } from 'react';
import {
  X,
  AlertTriangle,
  Scale,
  ShieldAlert,
  CheckCircle2,
  FileText,
  UserCheck,
  Send,
  HelpCircle,
  Building,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PolicyConflictModal = ({ conflictCase, onClose, onResolve }) => {
  const { currentUser, showToast } = useApp();

  const [decision, setDecision] = useState('GRANT_EXCEPTION');
  const [justification, setJustification] = useState('');
  const [officerSigned, setOfficerSigned] = useState(false);

  if (!conflictCase) return null;

  const handleConfirm = () => {
    if (!officerSigned) {
      showToast('Human officer sign-off is mandatory for policy exception adjudication.', 'error');
      return;
    }

    if (!justification.trim()) {
      showToast('Please record statutory administrative justification.', 'error');
      return;
    }

    if (onResolve) {
      onResolve(conflictCase.id, decision, justification);
    }

    showToast(`Policy conflict on ${conflictCase.caseId} resolved under administrative discretion (${decision}).`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 border border-amber-500/30">
                  Decision Support System
                </span>
                <span className="text-[11px] font-mono text-amber-300">
                  {conflictCase.caseId}
                </span>
              </div>
              <h2 className="text-base font-bold text-white mt-0.5">
                Policy Conflict & Exception Adjudication
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Governance Disclaimer */}
        <div className="bg-amber-50 border-b border-amber-200 px-5 py-2.5 flex items-center justify-between text-xs text-amber-950">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0" />
            <span>
              <strong>Human-In-The-Loop Decision:</strong> Policy Engine detected an edge-case ambiguity that cannot be automated. 
              <strong> Final exceptions remain solely human-controlled.</strong>
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
            AI Confidence: {conflictCase.aiConfidence}% (Inconclusive)
          </span>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto text-xs">
          
          {/* Summary Box */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Applicant</span>
              <strong className="text-slate-900 text-sm">{conflictCase.applicantName}</strong>
              <span className="text-slate-500 text-[11px] block">Tribe: {conflictCase.tribe} • {conflictCase.state}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Applicable Scheme</span>
              <span className="font-bold text-indigo-700 text-sm">{conflictCase.scheme}</span>
              <span className="text-slate-500 text-[11px] block">Policy: {conflictCase.policyVersion}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Conflict Type</span>
              <span className="text-red-700 font-bold bg-red-50 border border-red-200 px-2 py-0.5 rounded text-[11px]">
                {conflictCase.conflictType}
              </span>
            </div>
          </div>

          {/* Conflict Side-by-Side: Configured Rule vs Submitted Fact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-blue-800 tracking-wider block flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                Configured Statutory Rule
              </span>
              <div className="font-bold text-slate-900 text-[11px]">
                {conflictCase.ruleName}
              </div>
              <p className="text-slate-700 leading-relaxed text-[11px]">
                {conflictCase.statutoryClause}
              </p>
              <div className="pt-2 text-[10px] font-mono text-blue-900 font-semibold">
                Threshold: {conflictCase.threshold}
              </div>
            </div>

            <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                Submitted Fact & Ambiguity
              </span>
              <div className="font-bold text-slate-900 text-[11px]">
                {conflictCase.observedData}
              </div>
              <p className="text-slate-700 leading-relaxed text-[11px]">
                {conflictCase.ambiguityDescription}
              </p>
              <div className="pt-2 text-[10px] font-mono text-amber-900 font-semibold">
                Why AI Flagged: {conflictCase.aiFlagReason}
              </div>
            </div>

          </div>

          {/* Adjudication Radio Form */}
          <div className="space-y-3 pt-2">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
              Human Administrative Determination:
            </span>

            <div className="space-y-2">
              <label className={`p-3 rounded-xl border flex items-start space-x-3 cursor-pointer transition-all ${
                decision === 'GRANT_EXCEPTION'
                  ? 'bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-500/20'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}>
                <input
                  type="radio"
                  name="adjudication_decision"
                  value="GRANT_EXCEPTION"
                  checked={decision === 'GRANT_EXCEPTION'}
                  onChange={(e) => setDecision(e.target.value)}
                  className="mt-1 text-emerald-600 focus:ring-emerald-500"
                />
                <div>
                  <strong className="text-emerald-950 font-bold block">
                    1. Grant Official Exception / Administrative Dispensation (Approve Case)
                  </strong>
                  <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">
                    Exercise executive discretion under MoTA Scheme Delegated Powers. Deem the statutory condition satisfied 
                    and clear the payment readiness blocker.
                  </p>
                </div>
              </label>

              <label className={`p-3 rounded-xl border flex items-start space-x-3 cursor-pointer transition-all ${
                decision === 'ENFORCE_STRICT'
                  ? 'bg-red-50/70 border-red-300 ring-2 ring-red-500/20'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}>
                <input
                  type="radio"
                  name="adjudication_decision"
                  value="ENFORCE_STRICT"
                  checked={decision === 'ENFORCE_STRICT'}
                  onChange={(e) => setDecision(e.target.value)}
                  className="mt-1 text-red-600 focus:ring-red-500"
                />
                <div>
                  <strong className="text-red-950 font-bold block">
                    2. Enforce Strict Rule & Issue Formal Deficiency Notice (Hold / Rectify)
                  </strong>
                  <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">
                    Do not permit deviation from configured threshold. Dispatch statutory deficiency notice with 15-day resolution SLA.
                  </p>
                </div>
              </label>

              <label className={`p-3 rounded-xl border flex items-start space-x-3 cursor-pointer transition-all ${
                decision === 'REFER_COMMITTEE'
                  ? 'bg-indigo-50/70 border-indigo-300 ring-2 ring-indigo-500/20'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}>
                <input
                  type="radio"
                  name="adjudication_decision"
                  value="REFER_COMMITTEE"
                  checked={decision === 'REFER_COMMITTEE'}
                  onChange={(e) => setDecision(e.target.value)}
                  className="mt-1 text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <strong className="text-indigo-950 font-bold block">
                    3. Refer to MoTA Standing Policy & Legal Review Committee
                  </strong>
                  <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">
                    Flag for next Policy Revision Working Group to establish a permanent circular clarification for future batches.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Justification Textarea */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block">
              Administrative Justification & File Notings (Mandatory):
            </label>
            <textarea
              rows={3}
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              placeholder="Record the official file noting reference, reasons for granting or denying exception, and statutory authority cited..."
              className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
            />
          </div>

          {/* Officer Sign-off Checkbox */}
          <div className="p-3 bg-amber-50/60 border border-amber-300 rounded-xl space-y-1">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={officerSigned}
                onChange={(e) => setOfficerSigned(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-amber-600 focus:ring-amber-500 border-slate-300 rounded-sm"
              />
              <div className="text-[11px]">
                <span className="font-bold text-slate-900 block">
                  Officer Authentication & DSC Declaration
                </span>
                <span className="text-slate-600 block leading-snug">
                  I, <strong>{currentUser.name}</strong> ({currentUser.designation}), authenticate this administrative decision. 
                  I accept official responsibility under Ministry Financial Delegation Rules.
                </span>
              </div>
            </label>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-slate-500 text-[11px]">
            Action logged to central CAG audit trail.
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleConfirm}
              disabled={!officerSigned}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5 ${
                officerSigned
                  ? 'bg-amber-600 hover:bg-amber-700 text-white cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Record Official Determination</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
