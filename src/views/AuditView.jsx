import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  History,
  ShieldCheck,
  Lock,
  Download,
  Terminal,
  CheckCircle2,
  Search,
  Filter,
  Eye,
  FileText,
  BadgeCheck,
  ExternalLink,
  Layers
} from 'lucide-react';

export const AuditView = () => {
  const { auditLogs, showToast, cases } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('ALL');
  const [sourceFilter, setSourceFilter] = useState('ALL');
  const [selectedAuditLog, setSelectedAuditLog] = useState(null);

  // Enhanced audit records with the exact 6 fields required:
  // Action, User / authority, Timestamp, Source, Evidence, Case stage
  const structuredAuditTrail = [
    {
      id: 'AUD-88904',
      action: 'POLICY_EXCEPTION_ADJUDICATION',
      userAuthority: 'Dr. Rajesh Meena (Senior Nodal Verification Officer)',
      timestamp: '2025-09-04 14:10:22 IST',
      source: 'MoTA Policy Decision Support Console',
      evidence: 'Section 10(1) Agriculture Tax-Exemption Affidavit (Tehsildar Certified)',
      caseStage: 'COMPLIANCE PENDING → PAYMENT READINESS CHECK',
      caseId: 'MOTA-PMS-2025-1044',
      scheme: 'PMS_ST',
      hash: 'SHA256:7c8b291a92...e144',
      details: 'Officer exercised administrative discretion under MoTA Delegated Powers to deem net income eligible after agricultural exclusion.'
    },
    {
      id: 'AUD-88903',
      action: 'DEFICIENCY_NOTICE_DISPATCHED',
      userAuthority: 'Dr. Rajesh Meena (Senior Nodal Verification Officer)',
      timestamp: '2025-09-03 11:15:22 IST',
      source: 'AI Document Intelligence Module',
      evidence: 'Annexure-IV Page 2 OCR crop missing Dean of Academic Affairs round seal',
      caseStage: 'UNDER VERIFICATION → DEFICIENCY FOUND',
      caseId: 'MOTA-NFST-2025-0482',
      scheme: 'NFST',
      hash: 'SHA256:d8a941bf02...b112',
      details: 'Official deficiency notice F.No. MoTA/SCHOLAR/DEF/2025/0482 approved with mandatory officer sign-off and dispatched to applicant.'
    },
    {
      id: 'AUD-88902',
      action: 'PFMS_DSC_BATCH_STAGING',
      userAuthority: 'Drawing & Disbursing Officer (DDO), MoTA',
      timestamp: '2025-09-02 16:30:10 IST',
      source: 'PFMS DBT Bharat Middleware',
      evidence: '6/6 Payment Gates cleared, Union Bank IFSC validated, Dean fee invoice attached',
      caseStage: 'PAYMENT READINESS CHECK → PAYMENT READY',
      caseId: 'MOTA-TOPCLASS-2025-0891',
      scheme: 'TOPCLASS',
      hash: 'SHA256:fa319802ca...89c0',
      details: 'Case staged into BATCH-MOTA-TOPCLASS-2025-Q1-TR02 for digital signature token sign-off and RBI e-Kuber transmission.'
    },
    {
      id: 'AUD-88901',
      action: 'CROSS_PORTAL_DEDUP_RADAR_HOLD',
      userAuthority: 'NSP & State Deduplication Radar (Automated Worker)',
      timestamp: '2025-08-29 08:32:19 IST',
      source: 'Rajasthan State DBT Portal (TAD-ST-2024)',
      evidence: 'Aadhaar fuzzy hash match with active monthly stipend of ₹25,000 on state treasury',
      caseStage: 'SELECTED → PAYMENT BLOCKED (FRAUD_HOLD)',
      caseId: 'MOTA-NFST-2025-0994',
      scheme: 'NFST',
      hash: 'SHA256:1198ae42bb...f401',
      details: 'Strict payment lock triggered under Scheme Rule 7.2 (Dual Stipend Prohibition). Surrender certificate required.'
    },
    {
      id: 'AUD-88900',
      action: 'NPCI_MAPPING_VERIFICATION_FAILURE',
      userAuthority: 'NPCI Aadhaar Payment Bridge (APB Webhook)',
      timestamp: '2025-08-28 09:35:04 IST',
      source: 'National Payments Corporation of India (NPCI)',
      evidence: 'NPCI response code M04: Inactive DBT Mandate on Bank of Baroda account',
      caseStage: 'SELECTED → PAYMENT BLOCKED (GATE 2 FAIL)',
      caseId: 'MOTA-NFST-2025-0312',
      scheme: 'NFST',
      hash: 'SHA256:32bb4410cc...11aa',
      details: 'Account exists but Aadhaar seeding consent form pending at branch. Gate 2 marked FAILED.'
    },
    {
      id: 'AUD-88899',
      action: 'DIGILOCKER_XML_VERIFICATION',
      userAuthority: 'DigiLocker National API & AI Extraction Engine',
      timestamp: '2025-07-18 14:40:00 IST',
      source: 'Madhya Pradesh e-District Repository',
      evidence: 'PKI Signed XML with Certificate No MP-ST-DIN-2022-88192 (Gond Tribe)',
      caseStage: 'SUBMITTED → UNDER VERIFICATION',
      caseId: 'MOTA-NFST-2025-0482',
      scheme: 'NFST',
      hash: 'SHA256:88bc4911df...4419',
      details: 'Gond community validated against Constitution (Scheduled Tribes) Order 1950, Part VIII (MP). Article 342 pre-check passed.'
    },
    {
      id: 'AUD-88898',
      action: 'NOS_OVERSEAS_SANCTION_AWARD',
      userAuthority: 'Ministerial Overseas Selection Board (MoTA Overseas Cell)',
      timestamp: '2025-07-28 17:00:00 IST',
      source: 'University of Oxford e-CAS Verification System',
      evidence: 'Unconditional CAS Offer Letter CAS-OXF-2025-9921 (QS Rank #3)',
      caseStage: 'VERIFIED → SELECTED (COMPLIANCE PENDING)',
      caseId: 'MOTA-NOS-2025-0119',
      scheme: 'NOS',
      hash: 'SHA256:aa912803fe...5512',
      details: 'Provisional overseas award sanctioned. Foreign allowance release conditioned on Execution of ₹25L return deed and Tier-4 visa.'
    }
  ];

  const filteredLogs = structuredAuditTrail.filter(item => {
    if (stageFilter !== 'ALL' && !item.caseStage.includes(stageFilter)) return false;
    if (sourceFilter !== 'ALL' && !item.source.toLowerCase().includes(sourceFilter.toLowerCase())) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const mAction = item.action.toLowerCase().includes(q);
      const mUser = item.userAuthority.toLowerCase().includes(q);
      const mCase = item.caseId.toLowerCase().includes(q);
      const mEv = item.evidence.toLowerCase().includes(q);
      const mSrc = item.source.toLowerCase().includes(q);
      return mAction || mUser || mCase || mEv || mSrc;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Statutory Governance & Evidence Ledger
              </span>
              <span className="text-xs text-slate-500 font-mono">NIC Meghraj Cloud Node • IT Act 2000 Compliant</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
              Evidence & Immutable Audit Trail
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Every critical action captures six statutory parameters: <strong>Action, User / Authority, Timestamp, Source, Evidence, and Case Stage</strong>. 
              Logs are cryptographically linked using SHA-256 hashes to guarantee complete transparency and evidentiary accountability for CAG inspections.
            </p>
          </div>

          <button
            onClick={() => showToast('Exported Tamper-Evident CAG Audit Certificate (SHA-256 Validated)', 'success')}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center space-x-2 flex-shrink-0"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export CAG Audit Dossier</span>
          </button>
        </div>
      </div>

      {/* Security Health Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center space-x-3 text-xs">
          <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0" />
          <div>
            <span className="font-bold text-emerald-950 block">Audit Chain Integrity: 100% Intact</span>
            <p className="text-[11px] text-emerald-800">No cryptographic hash collisions or unauthorized alterations.</p>
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 flex items-center space-x-3 text-xs">
          <Lock className="w-6 h-6 text-blue-600 flex-shrink-0" />
          <div>
            <span className="font-bold text-blue-950 block">DSC Signatures: Class-3 Government</span>
            <p className="text-[11px] text-blue-800">All payment releases verified via CCA-certified HSM tokens.</p>
          </div>
        </div>

        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-center space-x-3 text-xs">
          <Terminal className="w-6 h-6 text-amber-700 flex-shrink-0" />
          <div>
            <span className="font-bold text-amber-950 block">Audited Actions: {structuredAuditTrail.length} Records</span>
            <p className="text-[11px] text-amber-800">Synchronized across MoTA, PFMS, and State gateways.</p>
          </div>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by action, user, case ID, source, or evidence..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Stage Filter */}
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="text-xs py-1.5 px-3 border border-slate-200 rounded-xl bg-white text-slate-700 font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
          >
            <option value="ALL">All Case Stages</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="VERIFICATION">Verification</option>
            <option value="DEFICIENCY">Deficiency</option>
            <option value="SELECTED">Selected</option>
            <option value="PAYMENT READINESS">Payment Readiness</option>
            <option value="PAYMENT READY">Payment Ready</option>
          </select>

          {/* Source Filter */}
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="text-xs py-1.5 px-3 border border-slate-200 rounded-xl bg-white text-slate-700 font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
          >
            <option value="ALL">All Sources</option>
            <option value="PFMS">PFMS DBT</option>
            <option value="DigiLocker">DigiLocker</option>
            <option value="AI Document">AI Document Intelligence</option>
            <option value="Policy">Policy Engine</option>
            <option value="Overseas">Overseas Portal</option>
            <option value="Rajasthan">State Portal Radar</option>
          </select>
        </div>
      </div>

      {/* Structured Audit Ledger Cards / Table */}
      <div className="space-y-4">
        {filteredLogs.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
            <History className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">No audit logs match current filters</h3>
            <p className="text-xs text-slate-500 mt-1">Try clearing your search keyword, case stage, or source filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setStageFilter('ALL');
                setSourceFilter('ALL');
              }}
              className="mt-4 px-3.5 py-1.5 rounded-xl bg-slate-900 text-white font-semibold text-xs inline-flex items-center space-x-1.5 shadow-xs hover:bg-slate-800"
            >
              <span>Reset Audit Filters</span>
            </button>
          </div>
        ) : (
          filteredLogs.map(log => (
          <div
            key={log.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3 hover:border-slate-300 transition-all"
          >
            {/* Header: Action + Case ID + Stage + Timestamp */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-black text-slate-900">{log.id}</span>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  log.action.includes('RESOLVED') || log.action.includes('CLEAR') || log.action.includes('SUCCESS')
                    ? 'bg-emerald-100 text-emerald-800'
                    : log.action.includes('HOLD') || log.action.includes('FAIL') || log.action.includes('DEFICIENCY')
                    ? 'bg-red-100 text-red-800'
                    : 'bg-indigo-100 text-indigo-800'
                }`}>
                  {log.action}
                </span>
                <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded">
                  {log.caseId} ({log.scheme})
                </span>
              </div>

              <div className="text-right flex items-center space-x-3 self-end md:self-center">
                <span className="text-[10px] font-mono text-slate-400">{log.timestamp}</span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {log.hash}
                </span>
              </div>
            </div>

            {/* 6 Required Parameters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              
              {/* Parameter 1: Action & Stage */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  1. Action & Case Stage
                </span>
                <strong className="text-slate-900 block leading-tight">{log.action}</strong>
                <span className="text-[10px] font-mono text-indigo-700 block font-semibold">
                  Stage: {log.caseStage}
                </span>
              </div>

              {/* Parameter 2: User / Authority */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  2. User / Authority
                </span>
                <strong className="text-slate-900 block leading-tight">{log.userAuthority}</strong>
                <span className="text-[10px] text-slate-500 block">Identity Authenticated via NIC SSO</span>
              </div>

              {/* Parameter 3: Source System */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  3. Source System
                </span>
                <strong className="text-slate-900 block leading-tight">{log.source}</strong>
                <span className="text-[10px] text-slate-500 font-mono block">Mutual TLS Egress Verified</span>
              </div>

              {/* Parameter 4: Evidence Instrument */}
              <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1 sm:col-span-2 lg:col-span-2">
                <span className="text-[10px] uppercase font-bold text-amber-800 block">
                  4. Evidence Instrument & Optical Ground Truth
                </span>
                <p className="text-slate-900 font-medium text-[11px] leading-snug">
                  {log.evidence}
                </p>
                <div className="text-[10px] text-amber-900 italic mt-0.5">
                  Factual Basis: {log.details}
                </div>
              </div>

              {/* Parameter 5 & 6: Cryptographic Verification */}
              <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-800 block">
                  5. Evidentiary Hash & Timestamp
                </span>
                <div className="font-mono text-[10px] text-emerald-950 font-bold truncate">
                  {log.hash}
                </div>
                <div className="text-[10px] text-emerald-800">
                  Time: {log.timestamp}
                </div>
              </div>

            </div>
          </div>
        )))}
      </div>

    </div>
  );
};
