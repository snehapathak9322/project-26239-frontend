import React from 'react';
import { X, Printer, Download, CheckCircle2, ShieldCheck, QrCode } from 'lucide-react';

export const AcknowledgementModal = ({ isOpen, onClose, activeCase }) => {
  if (!isOpen || !activeCase) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top Actions Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Official Application Acknowledgement
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg text-xs flex items-center gap-1 font-semibold"
              title="Print Receipt"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Receipt Body */}
        <div id="printable-receipt" className="border-2 border-slate-800 rounded-xl p-6 font-serif text-slate-900 space-y-4 bg-white">
          
          {/* Emblem & Ministry Header */}
          <div className="text-center pb-3 border-b-2 border-slate-800 space-y-0.5">
            <div className="text-[11px] font-bold tracking-widest text-slate-700">
              भारत सरकार • GOVERNMENT OF INDIA
            </div>
            <h2 className="text-base font-black uppercase text-slate-900">
              जनजातीय कार्य मंत्रालय • MINISTRY OF TRIBAL AFFAIRS
            </h2>
            <p className="text-[11px] font-sans text-slate-600">
              National Scholarship & Fellowship Portal for Scheduled Tribes
            </p>
            <div className="inline-block mt-1 font-mono text-[10px] font-bold bg-slate-100 px-3 py-0.5 rounded border border-slate-300">
              ACKNOWLEDGEMENT RECEIPT • सत्र / SESSION 2025-26
            </div>
          </div>

          {/* Acknowledgement Metadata */}
          <div className="grid grid-cols-2 gap-2 text-xs font-sans border-b border-slate-200 pb-3">
            <div>
              <span className="text-slate-500 text-[11px] block">Unique Case ID:</span>
              <span className="font-mono font-bold text-slate-900 text-sm">{activeCase.caseId}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-500 text-[11px] block">Acknowledgement No:</span>
              <span className="font-mono font-bold text-slate-900">ACK/MOTA/2025/{activeCase.caseId.slice(-4)}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[11px] block">Application Date:</span>
              <span className="font-semibold text-slate-800">{activeCase.applicationDate}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-500 text-[11px] block">Selection Date:</span>
              <span className="font-semibold text-slate-800">{activeCase.selectionDate || 'In Process'}</span>
            </div>
          </div>

          {/* Candidate & Academic Details Table */}
          <div className="space-y-1 text-xs font-sans">
            <h4 className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
              Beneficiary Master Profile
            </h4>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Applicant Full Name:</span>
                <span className="font-bold text-slate-900">{activeCase.applicantName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Scheduled Tribe (ST) Community:</span>
                <span className="font-semibold text-slate-900">{activeCase.tribe} {activeCase.isPVTG ? '(PVTG Recognized)' : ''}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Domicile State & District:</span>
                <span className="font-semibold text-slate-900">{activeCase.state} ({activeCase.district})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Awarded Scheme:</span>
                <span className="font-bold text-amber-900">{activeCase.scheme}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Enrolled Institution:</span>
                <span className="font-semibold text-slate-900">{activeCase.institution}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Course of Study:</span>
                <span className="font-semibold text-slate-900">{activeCase.course}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Aadhaar Seeded Bank:</span>
                <span className="font-mono text-slate-900">{activeCase.bankDetails?.bankName} ({activeCase.bankDetails?.accountMasked})</span>
              </div>
            </div>
          </div>

          {/* Current Status & Advisory */}
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs font-sans text-amber-950 space-y-1">
            <div className="flex items-center justify-between font-bold">
              <span>Overall Status: {activeCase.overallStatus}</span>
              <span>Payment Readiness: {activeCase.paymentReadinessStatus}</span>
            </div>
            <p className="text-[11px] text-slate-700 leading-relaxed">
              <strong>Advisory:</strong> Being "Selected" entitles the candidate to the scholarship grant, 
              subject to clearing institutional and banking continuity verification (Payment Gates 1 through 6).
            </p>
          </div>

          {/* Security & Validation Footer */}
          <div className="pt-3 border-t-2 border-slate-800 flex items-center justify-between text-[10px] font-sans text-slate-500">
            <div className="flex items-center space-x-2">
              <QrCode className="w-8 h-8 text-slate-800" />
              <div>
                <span className="font-bold text-slate-800 block">NIC Meghraj Digital Attestation</span>
                <span className="font-mono">SHA256:88e1...f021</span>
              </div>
            </div>
            <div className="text-right">
              <span className="block font-semibold text-slate-700">Digital Seal: MoTA-DBT-AUTH</span>
              <span>Computer Generated Copy • Valid without physical signature</span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="flex justify-end space-x-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl"
          >
            Close Receipt
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF / Print</span>
          </button>
        </div>

      </div>
    </div>
  );
};
