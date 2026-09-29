import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, HelpCircle, Send, Clock, ShieldAlert } from 'lucide-react';

export const RaiseGrievanceModal = ({ isOpen, onClose, activeCase }) => {
  const { createGrievance, showToast } = useApp();

  const [category, setCategory] = useState('PAYMENT_BLOCKER');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      showToast('Please fill in both the subject and description', 'warning');
      return;
    }

    createGrievance({
      caseId: activeCase?.caseId || 'MOTA-NFST-2025-0482',
      category,
      subject,
      description
    });

    setSubject('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Lodge Official Fellowship Grievance</h3>
              <p className="text-[11px] text-slate-500 font-mono">Linked to Case ID: {activeCase?.caseId}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SLA Notice */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start space-x-2">
          <Clock className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            All grievances are tracked under the MoTA Citizen Charter with an irrevocable <strong>48-Hour SLA</strong>. 
            Nodal officers are mandated to respond or escalate to the District Tribal Welfare Officer.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Grievance Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="PAYMENT_BLOCKER">Disbursement Delay / Payment Gate Blocker</option>
              <option value="BANKING_AER">Bank Aadhaar Seeding / NPCI APBS Failure</option>
              <option value="DOCUMENT_DEFECT">Clarification on Document Deficiency Notice</option>
              <option value="INSTITUTE_NODAL">University / Institution Continuation Report Delay</option>
              <option value="OTHER">Other Administrative Support</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Subject Summary</label>
            <input
              type="text"
              placeholder="e.g., Delay in Q1 Fellowship Stipend & Clarification on Dean Seal Format"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Detailed Explanation & Request</label>
            <textarea
              rows={4}
              placeholder="Please explain the issue clearly. Mention if you have visited your bank or university dean's office..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Grievance</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
