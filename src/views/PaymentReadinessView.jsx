import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Send,
  Building2,
  FileCheck,
  ArrowRight,
  Sparkles,
  Info,
  Filter,
  CheckCheck,
  FileText,
  RotateCcw
} from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

export const PaymentReadinessView = () => {
  const {
    cases,
    batches,
    PAYMENT_GATES,
    selectedCaseId,
    setSelectedCaseId,
    setCurrentView,
    executePFMSBatch,
    resolveDeficiency,
    currentUser,
    showToast
  } = useApp();

  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedBatchId, setSelectedBatchId] = useState(batches[0]?.batchId);
  const [showXmlModal, setShowXmlModal] = useState(false);

  // Active case for inspector
  const activeCase = cases.find(c => c.caseId === selectedCaseId) || cases[0];

  // Filtering cases based on readiness
  const filteredCases = cases.filter(c => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'READY') return c.paymentReadinessStatus === 'PAYMENT_READY';
    if (activeFilter === 'BLOCKED') return c.paymentReadinessStatus === 'BLOCKED';
    if (activeFilter === 'DISBURSED') return c.paymentReadinessStatus === 'DISBURSED';
    if (activeFilter === 'NPCI_BLOCK') return !c.gates.G2.passed;
    if (activeFilter === 'CONTINUITY_BLOCK') return !c.gates.G4.passed;
    return true;
  });

  const paymentReadyCases = cases.filter(c => c.paymentReadinessStatus === 'PAYMENT_READY');
  const paymentBlockedCases = cases.filter(c => c.paymentReadinessStatus === 'BLOCKED');

  const selectedBatch = batches.find(b => b.batchId === selectedBatchId) || batches[0];

  return (
    <div className="space-y-6">
      
      {/* Principle Banner */}
      <div className="bg-[#0A192F] border-2 border-amber-500/50 rounded-2xl p-6 text-white shadow-govCard relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Core SIH Architectural Principle</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              “Selected” must NOT automatically mean “Payment Ready”
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              In MoTA fellowship operations, an applicant being placed on the merit list (Award Issued) is only 
              <strong> Gate 1</strong>. Actual treasury disbursement requires clearing all 6 independent integrity gates:
              NPCI Aadhaar seeding, PFMS master party validation, academic continuity proof, scheme-specific bonds/invoices, 
              and electronic batching with Digital Signature Certificates (DSC).
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-700 p-4 rounded-xl flex-shrink-0">
            <div className="text-center px-2">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Selected</span>
              <p className="text-2xl font-bold text-white">{cases.length}</p>
            </div>
            <div className="h-8 w-px bg-slate-700"></div>
            <div className="text-center px-2">
              <span className="text-[10px] text-emerald-400 uppercase font-semibold">Payment Ready</span>
              <p className="text-2xl font-bold text-emerald-400">{paymentReadyCases.length}</p>
            </div>
            <div className="h-8 w-px bg-slate-700"></div>
            <div className="text-center px-2">
              <span className="text-[10px] text-amber-400 uppercase font-semibold">Blocked</span>
              <p className="text-2xl font-bold text-amber-400">{paymentBlockedCases.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Gates Architecture Ribbon */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          The 6-Gate Disbursement Lifecycle
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {PAYMENT_GATES.map((g, idx) => (
            <div key={g.gateId} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="font-mono font-bold text-amber-700">{g.gateId}</span>
                <span className="text-[10px] uppercase font-semibold">Gate #{idx + 1}</span>
              </div>
              <h4 className="font-bold text-slate-900 leading-snug">{g.title}</h4>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{g.description}</p>
              <div className="mt-2 text-[10px] text-slate-400 font-medium">
                Auth: {g.responsibleEntity.split('/')[0]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Interactive Workspace: Filter Tabs & Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Filterable Cases List (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Filter Pills */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                Filter by Readiness State
              </span>
              <span className="text-[11px] text-slate-500">{filteredCases.length} cases</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'ALL', label: 'All Cases' },
                { id: 'READY', label: '6/6 Ready' },
                { id: 'BLOCKED', label: 'Blocked' },
                { id: 'NPCI_BLOCK', label: 'Aadhaar / NPCI' },
                { id: 'CONTINUITY_BLOCK', label: 'Continuation' },
                { id: 'DISBURSED', label: 'Disbursed' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                    activeFilter === f.id
                      ? 'bg-amber-600 text-white font-semibold shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cases List */}
          {filteredCases.length === 0 ? (
            <div className="py-12 px-4 bg-white rounded-2xl border border-slate-200 text-center">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2">
                <Filter className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">No cases match filter</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Try selecting "All Cases" or clearing criteria.</p>
              <button
                onClick={() => setActiveFilter('ALL')}
                className="mt-3 px-2.5 py-1 rounded-lg bg-slate-900 text-white font-semibold text-xs inline-flex items-center space-x-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filter</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[560px] overflow-y-auto pr-1">
              {filteredCases.map(c => {
                const isSelected = c.caseId === activeCase?.caseId;
                const isReady = c.paymentReadinessStatus === 'PAYMENT_READY';
                const isDisbursed = c.paymentReadinessStatus === 'DISBURSED';
                const isBlocked = c.paymentReadinessStatus === 'BLOCKED';

                return (
                  <div
                    key={c.caseId}
                    onClick={() => setSelectedCaseId(c.caseId)}
                    className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/50 shadow-md ring-1 ring-amber-400'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono font-bold text-slate-700">{c.caseId}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                          {c.paymentGatesScore}
                        </span>
                        <StatusBadge status={c.paymentReadinessStatus} size="xs" />
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between">
                      <h4 className="font-bold text-slate-900 text-sm">{c.applicantName}</h4>
                      <span className="font-bold text-slate-900">
                        ₹{c.stipendPending > 0 ? c.stipendPending.toLocaleString('en-IN') : c.disbursedSoFar.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-1 truncate">
                      {c.scheme} • {c.tribe} • {c.institution}
                    </p>

                    {/* Gate mini icons */}
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <div className="flex items-center space-x-1 font-mono text-[10px]">
                        {['G1', 'G2', 'G3', 'G4', 'G5', 'G6'].map(gId => (
                          <span
                            key={gId}
                            className={`w-4 h-4 rounded flex items-center justify-center font-bold ${
                              c.gates[gId]?.passed
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {gId.replace('G', '')}
                          </span>
                        ))}
                      </div>
                      <span className="text-amber-800 font-semibold flex items-center gap-1">
                        <span>Inspect Gates</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Right Column: Detailed Gate Inspector for Active Case (7 Cols) */}
        <div className="lg:col-span-7">
          {activeCase ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              
              {/* Header Dossier for active case */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono">
                      {activeCase.scheme}
                    </span>
                    <span className="text-xs font-mono text-slate-500">{activeCase.caseId}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    {activeCase.applicantName}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {activeCase.tribe} Tribe • {activeCase.institution}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-500">Pending Stipend Tranche</span>
                  <p className="text-xl font-extrabold text-slate-900">
                    ₹{activeCase.stipendPending.toLocaleString('en-IN')}
                  </p>
                  <div className="flex items-center gap-1.5 justify-end mt-1">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {activeCase.paymentGatesScore} Gates
                    </span>
                    <StatusBadge status={activeCase.paymentReadinessStatus} size="sm" />
                  </div>
                </div>
              </div>

              {/* 6 Individual Gate Verdicts */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Comprehensive 6-Gate Audit Breakdown
                </h4>

                {PAYMENT_GATES.map((gate, i) => {
                  const gateData = activeCase.gates[gate.gateId] || { passed: false, remarks: 'Unchecked' };
                  const isPassed = gateData.passed;

                  return (
                    <div
                      key={gate.gateId}
                      className={`p-3.5 rounded-xl border text-xs transition-all ${
                        isPassed
                          ? 'bg-emerald-50/60 border-emerald-200'
                          : 'bg-red-50/70 border-red-300 ring-1 ring-red-200'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <div className="flex items-center space-x-2">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${
                            isPassed ? 'bg-emerald-600' : 'bg-red-600'
                          }`}>
                            {i + 1}
                          </span>
                          <span className="text-slate-900 text-xs">{gate.title}</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          isPassed ? 'bg-emerald-200 text-emerald-900' : 'bg-red-200 text-red-900'
                        }`}>
                          {isPassed ? 'GATE CLEARED' : 'PAYMENT BLOCKER'}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-700 mt-2 pl-7 leading-relaxed font-medium">
                        {gateData.remarks}
                      </p>

                      {gateData.verifiedAt && (
                        <p className="text-[10px] text-slate-400 mt-1 pl-7">
                          Verified: {gateData.verifiedAt}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Action Box for Current User */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <h5 className="text-xs font-bold text-slate-800">
                    {activeCase.paymentReadinessStatus === 'PAYMENT_READY'
                      ? 'Case Cleared for PFMS DBT Staging'
                      : 'Active Deficiency Holding Disbursement'}
                  </h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {activeCase.paymentReadinessStatus === 'PAYMENT_READY'
                      ? 'All compliance gates verified. Case is included in upcoming batch.'
                      : 'Use the Deficiency Hub to submit or verify corrected certificates.'}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  {activeCase.caseId === 'MOTA-NFST-2025-0482' && activeCase.paymentReadinessStatus === 'BLOCKED' && (
                    <button
                      onClick={() => resolveDeficiency('DEF-NFST-2025-091')}
                      className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-all shadow-xs flex items-center space-x-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                      <span>Simulate Dean Seal Verification</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setSelectedCaseId(activeCase.caseId);
                      setCurrentView('cases');
                    }}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold px-3 py-2 rounded-xl transition-all"
                  >
                    Open 360° Dossier
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400">
              Select a case to inspect payment readiness gates
            </div>
          )}
        </div>

      </div>

      {/* PFMS Batch Staging & Digital Signature Console (Admin Action) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              PFMS DBT Gateway Bridge
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              Electronic Sanction Order & DSC Signing Console
            </h3>
            <p className="text-xs text-slate-500">
              Only cases with 6/6 cleared gates are permitted in the DBT XML batch payload.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowXmlModal(true)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Inspect XML Payload</span>
            </button>

            {selectedBatch.status === 'STAGED_READY_FOR_DSC' && (
              <button
                onClick={() => executePFMSBatch(selectedBatch.batchId)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition-all flex items-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-200" />
                <span>Sign with DSC & Push to PFMS</span>
              </button>
            )}
          </div>
        </div>

        {/* Staged Batch Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
          <div>
            <span className="text-slate-400 font-semibold">Active Batch ID</span>
            <p className="font-mono font-bold text-slate-900 mt-0.5">{selectedBatch.batchId}</p>
          </div>
          <div>
            <span className="text-slate-400 font-semibold">Total Cleared Scholars</span>
            <p className="font-bold text-slate-900 mt-0.5">{selectedBatch.totalScholars} Scholars</p>
          </div>
          <div>
            <span className="text-slate-400 font-semibold">Total Batch Outlay</span>
            <p className="font-bold text-emerald-700 text-sm mt-0.5">
              ₹{(selectedBatch.totalAmount / 10000000).toFixed(3)} Crores
            </p>
          </div>
          <div>
            <span className="text-slate-400 font-semibold">Sanction Order Reference</span>
            <p className="font-mono font-bold text-slate-800 mt-0.5">{selectedBatch.sanctionOrderNo}</p>
          </div>
        </div>
      </div>

      {/* XML Payload Modal */}
      {showXmlModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 text-slate-100 rounded-2xl max-w-2xl w-full p-6 space-y-4 border border-slate-700 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <h4 className="font-bold text-sm text-white">PFMS DBT Electronic Batch XML Payload</h4>
              </div>
              <button
                onClick={() => setShowXmlModal(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕ Close
              </button>
            </div>

            <pre className="bg-slate-950 p-4 rounded-xl font-mono text-[11px] text-emerald-400 overflow-x-auto max-h-72 border border-slate-800">
{`<?xml version="1.0" encoding="UTF-8"?>
<PFMS_DBT_Batch version="2.4" schemeCode="${selectedBatch.scheme}">
  <BatchHeader>
    <BatchId>${selectedBatch.batchId}</BatchId>
    <SanctionOrderNo>${selectedBatch.sanctionOrderNo}</SanctionOrderNo>
    <TotalRecords>${selectedBatch.totalScholars}</TotalRecords>
    <TotalAmountINR>${selectedBatch.totalAmount}</TotalAmountINR>
    <MinistryCode>092</MinistryCode>
    <DDO_Code>209841</DDO_Code>
  </BatchHeader>
  <BeneficiaryRecords>
    <Record>
      <BeneficiaryCode>UBIN0538914-BEN-441029</BeneficiaryCode>
      <Name>Mangal Munda</Name>
      <Tribe>Munda</Tribe>
      <AadhaarHash>9a8f...21e0</AadhaarHash>
      <BankIFSC>UBIN0538914</BankIFSC>
      <AmountINR>175000</AmountINR>
      <GatesCleared>G1,G2,G3,G4,G5,G6</GatesCleared>
      <AuditStatus>100% COMPLIANT</AuditStatus>
    </Record>
    <Record>
      <BeneficiaryCode>SBIN0020491-BEN-884012</BeneficiaryCode>
      <Name>Devika Koya</Name>
      <Tribe>Koya</Tribe>
      <AadhaarHash>4c12...88df</AadhaarHash>
      <BankIFSC>SBIN0020491</BankIFSC>
      <AmountINR>258000</AmountINR>
      <GatesCleared>G1,G2,G3,G4,G5,G6</GatesCleared>
      <AuditStatus>100% COMPLIANT</AuditStatus>
    </Record>
  </BeneficiaryRecords>
  <DigitalSignature>
    <DSC_Provider>eMudhra Class-3 Govt</DSC_Provider>
    <Signatory>Shri K. L. Verma, DDO MoTA</Signatory>
    <HashSignature>SHA256:7f3a8b...99e1</HashSignature>
  </DigitalSignature>
</PFMS_DBT_Batch>`}
            </pre>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowXmlModal(false)}
                className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-4 py-2 rounded-xl"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
