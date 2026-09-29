import React from 'react';
import {
  X,
  FileSearch,
  CheckCircle2,
  AlertTriangle,
  ZoomIn,
  ShieldCheck,
  Eye,
  Scan,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const EvidenceModal = ({ doc, onClose, onOpenExplain, onOpenDraft }) => {
  if (!doc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <FileSearch className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 border border-amber-500/30">
                  AI Evidence Inspector
                </span>
                <span className="text-[11px] text-slate-300 font-mono">
                  {doc.caseId}
                </span>
              </div>
              <h2 className="text-base font-bold text-white mt-0.5">
                {doc.name}
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

        {/* AI Assistive Advisory Notice */}
        <div className="bg-blue-50 border-b border-blue-200 px-5 py-2.5 flex items-center justify-between text-xs text-blue-900">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-blue-700 flex-shrink-0" />
            <span>
              <strong>AI Assistive Pre-Check:</strong> Optical extraction and visual crop evidence are highlighted for officer verification. AI does not make binding legal decisions.
            </span>
          </div>
          <span className="text-[11px] font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
            OCR Confidence: {doc.extraction?.confidence || 98.4}%
          </span>
        </div>

        {/* Body Grid: Simulated Document Crop vs Extracted Token Metadata */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 max-h-[75vh] overflow-y-auto">
          
          {/* Left Column: Visual Document Preview with Bounding Box Overlay */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Scan className="w-4 h-4 text-amber-600" />
                Original Document Visual Crop
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {doc.type}
              </span>
            </div>

            {/* Document Crop Card */}
            <div className="bg-amber-50/40 border-2 border-slate-300 rounded-xl p-5 font-serif relative overflow-hidden text-xs shadow-inner min-h-[300px]">
              
              {/* Subtle watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <span className="text-5xl font-black rotate-[-25deg]">GOVERNMENT OF INDIA</span>
              </div>

              {/* Document Header */}
              <div className="text-center pb-3 border-b border-slate-200">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-700">
                  {doc.issuingAuthority || 'Ministry of Tribal Affairs / State Revenue Department'}
                </div>
                <div className="text-xs font-black text-slate-900 mt-1 uppercase">
                  {doc.type}
                </div>
                <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                  Ref No: {doc.certNumber || 'REF-2025-XX991'}
                </div>
              </div>

              {/* Document Snippet Body */}
              <div className="py-4 space-y-3 text-[11px] leading-relaxed text-slate-700">
                <p>
                  Certified that the applicant <strong>{doc.applicantName}</strong> (Tribe: <em>{doc.tribe || 'ST'}</em>) 
                  has submitted the requisite instrument for the scheme <strong>{doc.scheme}</strong>.
                </p>

                {/* Highlighted Bounding Box Area */}
                {doc.deficiency ? (
                  <div className="relative border-2 border-dashed border-red-500 bg-red-100/60 rounded-lg p-3 my-2 shadow-xs">
                    <div className="absolute -top-2.5 left-3 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded uppercase tracking-wider flex items-center gap-1">
                      <AlertTriangle className="w-2.5 h-2.5" />
                      OCR Bounding Box [x: 120, y: 340, w: 280, h: 54]
                    </div>
                    <div className="font-mono text-xs text-red-950 font-bold mt-1">
                      {doc.evidenceSnippet || doc.deficiency.evidence}
                    </div>
                    <p className="text-[10px] text-red-700 mt-1 font-sans italic">
                      Flag: {doc.deficiency.title}
                    </p>
                  </div>
                ) : (
                  <div className="relative border-2 border-dashed border-emerald-500 bg-emerald-100/60 rounded-lg p-3 my-2 shadow-xs">
                    <div className="absolute -top-2.5 left-3 bg-emerald-700 text-white text-[9px] font-bold px-1.5 py-0.2 rounded uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      OCR Verified Field
                    </div>
                    <div className="font-mono text-xs text-emerald-950 font-bold mt-1">
                      {doc.evidenceSnippet || 'All extracted parameters match scheme rules with 100% compliance.'}
                    </div>
                    <p className="text-[10px] text-emerald-800 mt-1 font-sans italic">
                      No defects detected in this section.
                    </p>
                  </div>
                )}

                <p className="text-[10px] text-slate-500">
                  Uploaded on: {doc.uploadDate} • Digitally processed via MoTA e-Scholarship Optical Intelligence Engine.
                </p>
              </div>

              {/* Document Footer Signatures */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] font-sans">
                <div>
                  <span className="text-slate-400 block text-[9px]">Issuing Jurisdiction</span>
                  <span className="font-semibold text-slate-700">{doc.jurisdiction || 'State Authority'}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[9px]">Authentication Seal</span>
                  <span className={`font-semibold ${doc.deficiency?.title?.includes('seal') ? 'text-red-600' : 'text-emerald-700'}`}>
                    {doc.deficiency?.title?.includes('seal') ? 'Missing / Unexecuted' : 'Cryptographically Verified'}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-medium">
                <ZoomIn className="w-3.5 h-3.5 text-slate-500" />
                Raw Document Resolution: 300 DPI (Color Scan)
              </span>
              <span className="font-mono text-slate-500">PDF • 1.4 MB</span>
            </div>
          </div>

          {/* Right Column: Rule Comparison & Detected vs Expected */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">
                Evidence Breakdown & Rule Cross-Reference
              </span>
              <p className="text-xs text-slate-500">
                Detailed side-by-side comparison between the OCR-extracted token and the configured statutory rule.
              </p>
            </div>

            {/* Detected vs Expected Matrix */}
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <div className="bg-slate-50 p-2.5 font-bold text-slate-700 border-b border-slate-200 flex items-center justify-between">
                <span>Rule Comparison Attributes</span>
                <span className="text-[10px] font-semibold text-slate-500">Scheme: {doc.scheme}</span>
              </div>

              <div className="p-3 space-y-3 bg-white">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Statutory Rule Reference
                  </span>
                  <p className="font-semibold text-slate-800 text-[11px] mt-0.5">
                    {doc.deficiency ? doc.deficiency.relatedRule : doc.ruleComparison?.schemeRequirement}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                  <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200">
                    <span className="text-[10px] uppercase font-bold text-amber-800 block">
                      Detected Information (OCR)
                    </span>
                    <p className="font-mono font-bold text-amber-950 text-xs mt-1">
                      {doc.deficiency ? doc.deficiency.detectedInfo : doc.extraction?.detectedSummary}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200">
                    <span className="text-[10px] uppercase font-bold text-blue-800 block">
                      Expected Requirement (Rule)
                    </span>
                    <p className="font-mono font-bold text-blue-950 text-xs mt-1">
                      {doc.deficiency ? doc.deficiency.expectedRequirement : doc.ruleComparison?.eligibilityCondition}
                    </p>
                  </div>
                </div>

                {doc.deficiency && (
                  <div className="p-2.5 rounded-lg bg-red-50 border border-red-200">
                    <span className="text-[10px] uppercase font-bold text-red-700 block">
                      Deficiency Reason / Impact
                    </span>
                    <p className="text-[11px] text-red-900 mt-1 leading-relaxed">
                      {doc.deficiency.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Extracted Fields Table */}
            <div>
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Neural Extracted Key-Value Pairs
              </span>
              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs max-h-48 overflow-y-auto">
                {doc.extraction?.fields?.map((field, idx) => (
                  <div key={idx} className="p-2.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <span className="text-slate-500 font-medium">{field.label}</span>
                    <span className="font-mono font-semibold text-slate-800 text-[11px]">{field.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Remedial Action */}
            {doc.deficiency && (
              <div className="p-3.5 bg-slate-900 text-white rounded-xl space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-400 block tracking-wider">
                  Required Beneficiary Correction
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {doc.deficiency.requiredCorrection}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Document UID: <strong className="font-mono text-slate-700">{doc.id}</strong>
          </div>

          <div className="flex items-center space-x-2">
            {doc.deficiency && onOpenExplain && (
              <button
                onClick={() => {
                  onClose();
                  onOpenExplain(doc);
                }}
                className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Explain Deficiency
              </button>
            )}

            {doc.deficiency && onOpenDraft && (
              <button
                onClick={() => {
                  onClose();
                  onOpenDraft(doc);
                }}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
              >
                <span>Draft Notice</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors"
            >
              Close Inspector
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
