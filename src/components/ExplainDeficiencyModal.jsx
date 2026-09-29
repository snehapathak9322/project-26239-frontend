import React from 'react';
import {
  X,
  HelpCircle,
  AlertTriangle,
  Scale,
  FileText,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Info,
  CheckCircle,
  Clock
} from 'lucide-react';

export const ExplainDeficiencyModal = ({ doc, onClose, onOpenDraft, onOpenEvidence }) => {
  if (!doc) return null;

  const def = doc.deficiency;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-400/30 flex items-center justify-center text-red-300">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-red-500/20 text-red-200 border border-red-500/30">
                  AI Legal & Policy Explanation
                </span>
                <span className="text-[11px] text-slate-300 font-mono">
                  {doc.caseId}
                </span>
              </div>
              <h2 className="text-base font-bold text-white mt-0.5">
                Plain-Language Deficiency Explanation
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

        {/* AI Assistive Scope Banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-5 py-2.5 flex items-center justify-between text-xs text-amber-950">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-700 flex-shrink-0" />
            <span>
              <strong>Assistive Interpretation:</strong> AI synthesizes policy clauses to assist human review. Final legal interpretation remains with the Competent Authority.
            </span>
          </div>
          <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
            Scheme: {doc.scheme}
          </span>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Main Deficiency Flag Box */}
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl space-y-2">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-red-700 block">
                  Deficiency Summary
                </span>
                <h3 className="text-sm font-bold text-red-950 mt-0.5">
                  {def?.title || 'Document details do not satisfy configured scheme requirement.'}
                </h3>
                <p className="text-xs text-red-800 mt-1 leading-relaxed">
                  {def?.explanation}
                </p>
              </div>
            </div>
          </div>

          {/* Structured 6-Point Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-indigo-600" />
              Regulatory Cross-Check Details
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              
              {/* Related Rule */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  1. Related Statutory Rule
                </span>
                <p className="font-semibold text-slate-900 leading-snug">
                  {def?.relatedRule}
                </p>
              </div>

              {/* Evidence */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  2. OCR Optical Evidence
                </span>
                <p className="font-mono text-slate-800 text-[11px] leading-snug">
                  {def?.evidence}
                </p>
              </div>

              {/* Detected Information */}
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                  3. Detected Information
                </span>
                <p className="font-semibold text-amber-950 leading-snug">
                  {def?.detectedInfo}
                </p>
              </div>

              {/* Expected Requirement */}
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block">
                  4. Expected Requirement
                </span>
                <p className="font-semibold text-blue-950 leading-snug">
                  {def?.expectedRequirement}
                </p>
              </div>

            </div>
          </div>

          {/* Impact on Payment Readiness */}
          <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                Payment Gate Impact (Selected ≠ Payment Ready)
              </span>
              <span className="text-[10px] font-mono bg-red-500/20 text-red-300 border border-red-500/30 px-2 py-0.5 rounded">
                Disbursement Hold
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Because this document deficiency remains unresolved, <strong>PFMS Gate {doc.affectedGate || '4 / 5'}</strong> cannot 
              be cleared. Even though the candidate is officially <em>Selected</em>, direct benefit transfer (DBT) is strictly 
              held back by the system to prevent audit audit disallowances and recovery proceedings.
            </p>
          </div>

          {/* Required Correction */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block">
              Required Remedial Correction for Applicant
            </span>
            <p className="text-xs text-emerald-950 font-medium leading-relaxed">
              {def?.requiredCorrection}
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-emerald-700">
              <Clock className="w-3.5 h-3.5" />
              <span>Standard Correction Window: <strong>15 Calendar Days</strong> from official notice issuance.</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          {onOpenEvidence && (
            <button
              onClick={() => {
                onClose();
                onOpenEvidence(doc);
              }}
              className="text-xs font-bold text-slate-700 hover:text-slate-900 underline flex items-center gap-1"
            >
              View Document Crop Evidence
            </button>
          )}

          <div className="flex items-center space-x-2">
            {onOpenDraft && (
              <button
                onClick={() => {
                  onClose();
                  onOpenDraft(doc);
                }}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
              >
                <span>Proceed to Draft Notice</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
