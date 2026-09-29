import React, { useState } from 'react';
import {
  X,
  FileText,
  Send,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Printer,
  Copy,
  Edit3,
  ShieldCheck,
  Building,
  Calendar,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DraftNoticeModal = ({ doc, onClose, onDispatched }) => {
  const { currentUser, showToast } = useApp();

  const [officerApproved, setOfficerApproved] = useState(false);
  const [officerNotes, setOfficerNotes] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [customBody, setCustomBody] = useState('');
  const [copied, setCopied] = useState(false);

  if (!doc) return null;

  const def = doc.deficiency;
  const officerName = currentUser?.name || 'Dr. Rajesh Meena';
  const officerDesignation = currentUser?.designation || 'Senior Nodal Verification Officer';

  const noticeRefNo = `F.No. MoTA/SCHOLAR/DEF/2025/${doc.caseId ? doc.caseId.split('-').pop() : '9012'}`;
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const defaultNoticeText = `Madam/Sir,

With reference to your application under ${doc.scheme} bearing Case ID ${doc.caseId}, during the document intelligence scrutiny and statutory verification of your submitted records, the following deficiency has been flagged under ${def?.relatedRule || 'configured scheme rules'}:

1. DOCUMENT UNDER SCRUTINY: ${doc.name} (${doc.type})
2. OBSERVED DISCREPANCY: ${def?.detectedInfo || 'Discrepancy identified in submitted instrument.'}
3. STATUTORY REQUIREMENT: ${def?.expectedRequirement || 'Compliance with scheme criteria.'}
4. LEGAL EXPLANATION: ${def?.explanation || 'Document details do not satisfy configured scheme requirements.'}

REQUIRED REMEDIAL ACTION:
${def?.requiredCorrection || 'Please re-upload the verified document with appropriate authority seal.'}

IMPORTANT TIMELINE:
You are requested to upload the rectified document through your Scholar Dashboard within fifteen (15) calendar days from the date of issuance of this notice. Please note that under direct benefit transfer (DBT) guidelines, Gate Clearance for payment release remains blocked until this deficiency is formally resolved and verified.

For any procedural assistance, please raise a ticket via the Scholar Grievance Portal.`;

  const finalNoticeText = customBody || defaultNoticeText;

  const handleCopy = () => {
    navigator.clipboard.writeText(finalNoticeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDispatch = () => {
    if (!officerApproved) {
      showToast('Explicit officer sign-off is legally required before dispatch.', 'error');
      return;
    }

    if (onDispatched) {
      onDispatched(doc, noticeRefNo, officerNotes);
    }

    showToast(`Deficiency Notice ${noticeRefNo} officially approved & dispatched to ${doc.applicantName}.`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 border border-amber-500/30">
                  Government Decision Support
                </span>
                <span className="text-[11px] text-slate-300 font-mono">
                  {noticeRefNo}
                </span>
              </div>
              <h2 className="text-base font-bold text-white mt-0.5">
                Draft Statutory Deficiency Notice
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="text-xs text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-1"
              title="Copy text"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* AI Assistive Pre-Draft Banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-5 py-2.5 flex items-center justify-between text-xs text-amber-950">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-amber-700 flex-shrink-0" />
            <span>
              <strong>AI Assistive Drafting:</strong> Synthesized by AI engine based on verified OCR discrepancies. 
              <strong> Human Officer sign-off is mandatory before transmission.</strong>
            </span>
          </div>
          <span className="text-[11px] font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
            Review Gate: Active
          </span>
        </div>

        {/* Notice Preview Container (Letterhead Style) */}
        <div className="p-6 max-h-[60vh] overflow-y-auto bg-slate-50 space-y-4">
          <div className="bg-white border-2 border-slate-300 rounded-xl p-6 shadow-xs text-slate-900 font-serif relative">
            
            {/* Government Official Letterhead */}
            <div className="text-center pb-4 border-b-2 border-slate-800 space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-widest text-slate-700">
                GOVERNMENT OF INDIA • भारत सरकार
              </div>
              <div className="text-sm font-black uppercase text-slate-950">
                MINISTRY OF TRIBAL AFFAIRS • जनजातीय कार्य मंत्रालय
              </div>
              <div className="text-[11px] text-slate-600 font-sans">
                Scholarship & Fellowship Verification Division • Shastri Bhawan, New Delhi - 110001
              </div>
            </div>

            {/* Notice Metadata */}
            <div className="pt-4 pb-3 flex flex-wrap items-center justify-between text-xs font-sans text-slate-600 border-b border-slate-200 gap-2">
              <div>
                <span className="block font-mono text-[11px]"><strong>Dispatch Ref:</strong> {noticeRefNo}</span>
                <span className="block text-[11px]"><strong>Case ID:</strong> {doc.caseId}</span>
              </div>
              <div className="text-right">
                <span className="block text-[11px]"><strong>Date:</strong> {currentDate}</span>
                <span className="block text-[11px]"><strong>Scheme:</strong> {doc.scheme}</span>
              </div>
            </div>

            {/* Addressee */}
            <div className="py-3 text-xs font-sans text-slate-800 space-y-0.5">
              <div><strong>To:</strong></div>
              <div className="font-bold text-slate-950">{doc.applicantName}</div>
              <div className="text-slate-600">Scholar ID / Roll: {doc.caseId}</div>
              <div className="text-slate-600">Institution: {doc.institution || 'Recognized Institution'}</div>
              <div className="text-slate-600">Community / Tribe: {doc.tribe || 'Scheduled Tribe'}</div>
            </div>

            {/* Subject Line */}
            <div className="py-2 px-3 bg-amber-50/70 border-l-4 border-amber-600 text-xs font-sans font-bold text-slate-900 my-2">
              SUBJECT: Notice of Discrepancy & Required Remediation under {doc.scheme} — Case ID: {doc.caseId} — Regarding.
            </div>

            {/* Body */}
            {isEditing ? (
              <div className="my-3">
                <label className="text-[11px] font-sans font-bold text-slate-700 block mb-1">
                  Edit Notice Text (Officer Override):
                </label>
                <textarea
                  rows={10}
                  value={finalNoticeText}
                  onChange={(e) => setCustomBody(e.target.value)}
                  className="w-full text-xs font-mono p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>
            ) : (
              <div className="py-3 text-xs leading-relaxed whitespace-pre-line text-slate-800 font-sans">
                {finalNoticeText}
              </div>
            )}

            {/* Bilingual Hindi Guidance Box */}
            {def?.hindiInstruction && (
              <div className="mt-4 p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-xs font-sans text-blue-950 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 block">
                  आवेदक हेतु हिंदी निर्देश (Bilingual Clarification for Tribal Scholars):
                </span>
                <p className="leading-relaxed">
                  {def.hindiInstruction}
                </p>
              </div>
            )}

            {/* Officer Sign-off Block */}
            <div className="pt-6 mt-4 border-t border-slate-200 flex justify-end font-sans">
              <div className="text-right text-xs">
                <div className="text-[11px] text-slate-400 italic mb-1">
                  {officerApproved ? 'Digitally Signed by Officer' : 'Pending Officer Signature'}
                </div>
                <div className="font-bold text-slate-900">{officerName}</div>
                <div className="text-slate-600 text-[11px]">{officerDesignation}</div>
                <div className="text-slate-500 text-[10px]">Ministry of Tribal Affairs, New Delhi</div>
              </div>
            </div>

          </div>

          {/* Toggle Edit Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-semibold"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Done Editing' : 'Modify Notice Text'}</span>
            </button>
          </div>
        </div>

        {/* Officer Review & Approval Controls (Mandatory) */}
        <div className="p-5 bg-white border-t border-slate-200 space-y-3">
          
          <div className="p-3 bg-amber-50/50 border border-amber-300 rounded-xl space-y-2">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={officerApproved}
                onChange={(e) => setOfficerApproved(e.target.checked)}
                className="mt-1 w-4 h-4 rounded-sm text-amber-600 focus:ring-amber-500 border-slate-300 cursor-pointer"
              />
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">
                  Mandatory Verification: Human Officer Approval & Administrative Sign-Off
                </span>
                <span className="text-slate-600 block mt-0.5 leading-relaxed">
                  I, <strong>{officerName}</strong> ({officerDesignation}), confirm that I have exercised independent 
                  administrative discretion, inspected the underlying original document and rule provision, and formally authorize 
                  the issuance of this deficiency communication to the applicant.
                </span>
              </div>
            </label>

            {officerApproved && (
              <div className="pt-2 pl-7">
                <input
                  type="text"
                  placeholder="Optional: Add officer verification remarks or dispatch order reference..."
                  value={officerNotes}
                  onChange={(e) => setOfficerNotes(e.target.value)}
                  className="w-full text-xs p-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              {!officerApproved ? (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  <span className="text-amber-800 font-medium">Check the sign-off box above to enable dispatch.</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-800 font-medium">Officer sign-off verified. Ready to dispatch.</span>
                </>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleDispatch}
                disabled={!officerApproved}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center space-x-2 ${
                  officerApproved
                    ? 'bg-amber-600 hover:bg-amber-700 text-white cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>Approve & Dispatch Notice</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
