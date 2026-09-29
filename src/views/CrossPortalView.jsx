import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Globe2,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Layers,
  Sparkles,
  Server,
  Zap,
  ArrowRight,
  Database,
  Lock,
  Search,
  FileCheck2,
  CreditCard,
  Building,
  UserCheck,
  FileText,
  Clock
} from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

export const CrossPortalView = () => {
  const {
    cases,
    setSelectedCaseId,
    setCurrentView,
    showToast
  } = useApp();

  // Active sub-tab: INTEGRATION_HUB vs CROSS_PORTAL_CASE vs DEDUP_RADAR
  const [activeTab, setActiveTab] = useState('INTEGRATION_HUB');
  const [selectedCaseIdLocal, setSelectedCaseIdLocal] = useState('MOTA-NFST-2025-0482');
  const [activeScanning, setActiveScanning] = useState(false);

  // 5 Statutory Integrations with required attributes
  const [integrations, setIntegrations] = useState([
    {
      id: 'INT-NFST',
      acronym: 'NFST',
      name: 'UGC / INFLIBNET Fellowship National Portal',
      systemType: 'Central Academic Fellowship Repository',
      connectionMode: 'Mock (Sandbox API Bridge)',
      lastSync: '2 mins ago (Real-time Webhook)',
      dataAvailable: 'UGC-NET / CSIR-NET Percentiles, JRF/SRF Tenure Master, Ph.D. Joining Confirmation, AISHE University Data',
      readOnly: true,
      status: 'Connected (Healthy)',
      latencyMs: 42,
      recordsToday: 2840,
      protocol: 'REST / OAuth2 Mutual TLS',
      endpointMasked: 'https://api.inflibnet.ac.in/v2/mota-nfst/***'
    },
    {
      id: 'INT-NOS',
      acronym: 'NOS',
      name: 'MoTA Overseas Portal & Indian Missions Abroad',
      systemType: 'International Consular & Embassy Gateway',
      connectionMode: 'Mock (Diplomatic Mission Adapter)',
      lastSync: '14 mins ago',
      dataAvailable: 'QS / Times Top 500 Ranking Index, University CAS Offer Status, Tier-4 Visa Vignette Stamping, SBI Forex Remittance Status',
      readOnly: true,
      status: 'Connected (Healthy)',
      latencyMs: 118,
      recordsToday: 46,
      protocol: 'HTTPS / PGP Encrypted JSON',
      endpointMasked: 'https://overseas.tribal.gov.in/consular/v1/***'
    },
    {
      id: 'INT-TOPCLASS',
      acronym: 'TOP CLASS',
      name: 'National Scholarship Portal (NSP 2.0) & AISHE',
      systemType: 'Premier Institute & Category Allotment Bridge',
      connectionMode: 'Mock (NSP 2.0 Ingest Adapter)',
      lastSync: '5 mins ago',
      dataAvailable: '258 Premier Institute Quotas, JEE/NEET/CLAT ST Category Ranks, Dean Student Fee Schedules, Hostel Warden Allotments',
      readOnly: true,
      status: 'Connected (Healthy)',
      latencyMs: 56,
      recordsToday: 3820,
      protocol: 'SOAP / XML-DSig over HTTPS',
      endpointMasked: 'https://scholarships.gov.in/services/topclass/***'
    },
    {
      id: 'INT-MOTA',
      acronym: 'MoTA SYSTEMS',
      name: 'State Tribal Welfare e-District Repositories',
      systemType: '28 States & 8 UTs Tribal Welfare Backbone',
      connectionMode: 'Mock (State e-District Token Proxy)',
      lastSync: '1 min ago',
      dataAvailable: 'DigiLocker Cryptographic XML Caste Certs (Art. 342), Tehsildar Income Registers, State Tribal Area Development (TAD) Rosters',
      readOnly: true,
      status: 'Connected (Healthy)',
      latencyMs: 38,
      recordsToday: 284190,
      protocol: 'DigiLocker PKI API / e-Sign Verifier',
      endpointMasked: 'https://edistrict.nic.in/api/mota-bridge/***'
    },
    {
      id: 'INT-PFMS',
      acronym: 'PFMS',
      name: 'Public Financial Management System & NPCI DBT',
      systemType: 'Ministry of Finance DBT Bharat Gateway',
      connectionMode: 'Mock (PFMS Production Bridge)',
      lastSync: '30 secs ago',
      dataAvailable: 'NPCI Aadhaar Payment Bridge (APB) Mapper Status, PFMS Beneficiary Party Master Code, DBT Bill Batch Staging, RBI e-Kuber UTR Settlement',
      readOnly: true,
      status: 'Connected (Healthy)',
      latencyMs: 24,
      recordsToday: 5190,
      protocol: 'PFMS Secure SFTP / ISO 20022 XML',
      endpointMasked: 'https://pfms.nic.in/dbt-bridge/v3/***'
    }
  ]);

  // Cross-portal origin data mapping for selected case
  const getCaseCrossPortalPillars = (caseItem) => {
    if (!caseItem) return null;

    if (caseItem.scheme === 'NFST') {
      return {
        applicationSource: {
          system: 'UGC-INFLIBNET NFST Portal',
          portalId: 'UGC-ST-2025-4819',
          timestamp: '14-Jul-2025 10:22 IST',
          protocol: 'Web Form (Applicant Self-Registration)',
          dataPoints: ['Master’s Aggregate: 68.4%', 'UGC-NET Roll: MP0800192', 'Subject: Life Sciences (Botany)']
        },
        verificationSource: {
          system: 'IISc Bengaluru Academic Section & MoTA Desk',
          officer: 'Dr. Rajesh Meena (Senior Nodal Verifier L-2)',
          timestamp: '05-Aug-2025 11:15 IST',
          protocol: 'E-Office AISHE Portal Verification',
          dataPoints: ['Supervisor: Prof. K. Narayanaswamy', 'Dean: Prof. S. R. Bhattacharya', 'Ph.D. Reg: IISC-BIO-PHD-2025-014']
        },
        documentEvidence: {
          system: 'DigiLocker National Repository & MP e-District',
          certRef: 'MP-ST-DIN-2022-88192',
          timestamp: '18-Jul-2025 14:40 IST',
          protocol: 'Cryptographic XML Attestation (DS/MP-GOV)',
          dataPoints: ['Caste: Gond (ST under Art. 342)', 'Income: ₹1,80,000 / annum', 'Digital Signature: Cryptographically Valid']
        },
        policySource: {
          system: 'MoTA Central Fellowship Policy Engine',
          gazetteRef: 'NFST Operational Guidelines 2024, Clause 8.3 & Policy Version 2026–27',
          timestamp: 'Active In-Force',
          protocol: 'Deterministic Statutory Rule Engine',
          dataPoints: ['Monthly JRF: ₹37,000/mo', 'Quarterly Attendance: ≥75%', 'Dean Institutional Round Seal: Mandatory']
        },
        paymentSource: {
          system: 'PFMS (Public Financial Management System) & NPCI',
          codeRef: 'PFMS Code: SBIN0002215-BEN-991204',
          timestamp: '25-Aug-2025 12:30 IST',
          protocol: 'Aadhaar Payment Bridge System (APBS)',
          dataPoints: ['Bank: State Bank of India (IISc Campus)', 'NPCI Mapped: YES (Active DBT Mandate)', 'Current Gate Status: Blocked on Gate 4']
        }
      };
    }

    if (caseItem.scheme === 'NOS') {
      return {
        applicationSource: {
          system: 'MoTA Overseas Scholarship Portal',
          portalId: 'NOS-2025-APP-0119',
          timestamp: '10-Jun-2025 11:00 IST',
          protocol: 'International Scholar Portal',
          dataPoints: ['Course: M.Sc. Renewable Energy', 'Admitted Univ: University of Oxford, UK', 'QS World Rank: #3 Worldwide']
        },
        verificationSource: {
          system: 'Overseas Cell & Indian High Commission London',
          officer: 'Overseas Standing Screening Committee',
          timestamp: '28-Jul-2025 17:00 IST',
          protocol: 'Consular Educational Attestation',
          dataPoints: ['CAS Offer: CAS-OXF-2025-9921', 'Subject Quota: Pure & Applied Science', 'State Verification: Jharkhand Tribal Dept Passed']
        },
        documentEvidence: {
          system: 'Jharkhand Revenue & Sub-Registrar Dumka',
          certRef: 'JH-ST-DMK-2021-39100 / Non-Judicial Bond ₹100',
          timestamp: '04-Aug-2025 14:20 IST',
          protocol: 'Sub-Registrar Land Records + VFS Global',
          dataPoints: ['Surety 1: Solvency verified (₹25L)', 'Surety 2: Gazetted Officer pending DDO seal', 'Visa: Appointment Slip Submitted']
        },
        policySource: {
          system: 'NOS Scheme Rules 2024 (Ministry of Tribal Affairs)',
          gazetteRef: 'Rule 11 (Deed of Bond) & Rule 9.4 (Visa Verification)',
          timestamp: 'Active In-Force',
          protocol: 'Overseas Foreign Fellowship Code',
          dataPoints: ['Annual Maintenance: £9,900 / year', 'Tuition: 100% actual university fees', 'Return Mandate: Minimum 5 years in India']
        },
        paymentSource: {
          system: 'PFMS International Wire & SBI Forex Treasury',
          codeRef: 'PFMS-FOREX-WIRE-BKID0004900',
          timestamp: '05-Aug-2025 10:00 IST',
          protocol: 'SWIFT / RBI Foreign Exchange Clearance',
          dataPoints: ['Bank: Bank of India (Forex & NRE active)', 'Hold: Blocked pending Surety Bond & Tier-4 Visa', 'Pending Wire: ₹18.45 Lakhs equivalent']
        }
      };
    }

    // Default Fallback
    return {
      applicationSource: {
        system: 'National Scholarship Portal (NSP 2.0)',
        portalId: caseItem.caseId,
        timestamp: caseItem.applicationDate,
        protocol: 'NSP Direct Application Ingest',
        dataPoints: [`Applicant: ${caseItem.applicantName}`, `Scheme: ${caseItem.scheme}`, `Institution: ${caseItem.institution}`]
      },
      verificationSource: {
        system: 'Institute Nodal Desk & State Tribal Welfare',
        officer: 'Nodal Verification Officer',
        timestamp: 'Verified on Portal',
        protocol: 'AISHE Web Authentication',
        dataPoints: [`Tribe: ${caseItem.tribe}`, `State: ${caseItem.state}`, 'Enrollment: Confirmed']
      },
      documentEvidence: {
        system: 'DigiLocker & State Revenue Gateway',
        certRef: caseItem.casteCertNo || 'STATE-CERT-2024',
        timestamp: 'Verified',
        protocol: 'PKI XML Hash Verification',
        dataPoints: ['Caste: Article 342 Notified', `Income: ₹${(caseItem.incomeCertAmount || 200000).toLocaleString('en-IN')}`, 'DigiLocker Linked: YES']
      },
      policySource: {
        system: 'MoTA Scheme Guidelines 2024-25',
        gazetteRef: `${caseItem.scheme} Revised Operational Guidelines`,
        timestamp: 'Active In-Force',
        protocol: 'Policy Decision Support Rules',
        dataPoints: ['Course Group: Regular Full-Time', 'Gate Verification: 6-Gate Integrity Engine']
      },
      paymentSource: {
        system: 'PFMS DBT Bharat & NPCI Mapper',
        codeRef: caseItem.bankDetails ? caseItem.bankDetails.ifsc : 'PFMS-DBT-PARTY',
        timestamp: 'Staged on PFMS',
        protocol: 'Aadhaar Payment Bridge System',
        dataPoints: [`Bank: ${caseItem.bankDetails?.bankName || 'Nationalized Bank'}`, `Status: ${caseItem.paymentReadinessStatus}`, `Gates: ${caseItem.paymentGatesScore}`]
      }
    };
  };

  const selectedCase = cases.find(c => c.caseId === selectedCaseIdLocal) || cases[0];
  const pillars = getCaseCrossPortalPillars(selectedCase);

  const handlePing = (id) => {
    showToast(`Pinging adapter ${id} via secure handshake... Round-trip latency: 34ms (200 OK).`, 'success');
  };

  const handleRunDedupScan = () => {
    setActiveScanning(true);
    setTimeout(() => {
      setActiveScanning(false);
      showToast('NSP & State Portal Deduplication Scan complete: 1 active dual-benefit flagged (Sukhlal Bhil).', 'warning');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Cross-Portal Intelligence Layer
              </span>
              <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                Strict Government Compliance: Read-Only Adapters
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
              Cross-Portal Case View & External Integration Hub
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              We do NOT claim direct access to confidential government production mainframes. 
              External systems (UGC, NSP, DigiLocker, PFMS, Indian Missions Abroad) are represented using 
              <strong> controlled, read-only mock adapters</strong> that aggregate the complete provenance of every ST scholarship case.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-center">
            <button
              onClick={handleRunDedupScan}
              disabled={activeScanning}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center space-x-2"
            >
              <Zap className={`w-4 h-4 text-amber-200 ${activeScanning ? 'animate-spin' : ''}`} />
              <span>{activeScanning ? 'Scanning Across 28 States...' : 'Run Cross-Portal Deduplication Radar'}</span>
            </button>
          </div>
        </div>

        {/* Core Philosophy Callout */}
        <div className="p-3.5 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span className="font-semibold text-slate-200">
              “Existing systems show the application status. <strong className="text-amber-300">Our system explains the complete case.”</strong>
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            5 Verified Read-Only Integrations Active
          </span>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-sm flex flex-wrap gap-2 text-xs font-bold">
        {[
          { id: 'INTEGRATION_HUB', label: '1. External Integration Hub (5 Systems)', icon: Server },
          { id: 'CROSS_PORTAL_CASE', label: '2. Cross-Portal Case View (5 Provenance Pillars)', icon: Globe2 },
          { id: 'DEDUP_RADAR', label: '3. Deduplication Radar & Dual-Benefit Hold', icon: ShieldAlert }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: INTEGRATION HUB (5 Systems with required attributes) */}
      {/* ========================================================================= */}
      {activeTab === 'INTEGRATION_HUB' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Federated Government System Integration Registry
              </h2>
              <p className="text-xs text-slate-500">
                Real-time operational status of read-only adapters connecting Central, State, and Banking infrastructure.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500">
              Protocol: Read-Only Egress Proxy
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {integrations.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="font-black text-slate-900 text-sm font-mono">{item.acronym}</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold border border-emerald-200">
                      {item.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-xs mt-3">{item.name}</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">{item.systemType}</p>

                  {/* Required Parameters Table */}
                  <div className="mt-3.5 space-y-2 text-[11px] bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Mode:</span>
                      <strong className="text-indigo-700 font-mono text-[10px] bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                        {item.connectionMode}
                      </strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Read-Only Guard:</span>
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        <span>YES (Enforced)</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Last Sync:</span>
                      <strong className="text-slate-700 font-mono text-[10px]">{item.lastSync}</strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Records Fetched:</span>
                      <strong className="text-slate-900 font-bold">{item.recordsToday.toLocaleString('en-IN')}</strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Latency:</span>
                      <span className="text-emerald-700 font-mono font-semibold">{item.latencyMs} ms</span>
                    </div>
                  </div>

                  {/* Data Available Preview */}
                  <div className="mt-3 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Data Available via Adapter:
                    </span>
                    <p className="text-[11px] text-slate-700 leading-snug bg-amber-50/50 p-2.5 rounded-lg border border-amber-200">
                      {item.dataAvailable}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handlePing(item.acronym)}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                    <span>Ping Adapter & Verify Sync</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: CROSS-PORTAL CASE VIEW (5 Provenance Pillars) */}
      {/* ========================================================================= */}
      {activeTab === 'CROSS_PORTAL_CASE' && (
        <div className="space-y-6">
          
          {/* Case Selector Header */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-indigo-700 tracking-wider">
                Full Provenance Inspector
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                Cross-Portal Case Intelligence Graph
              </h3>
              <p className="text-xs text-slate-500">
                Shows exactly where every piece of data originates across the 5 statutory pillars.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-slate-600">Inspect Case:</span>
              <select
                value={selectedCaseIdLocal}
                onChange={(e) => setSelectedCaseIdLocal(e.target.value)}
                className="text-xs font-bold py-2 px-3 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
              >
                {cases.map(c => (
                  <option key={c.caseId} value={c.caseId}>
                    {c.caseId} — {c.applicantName} ({c.scheme})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Selected Case Header Card */}
          <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-black text-amber-300">{selectedCase.caseId}</span>
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 font-bold">
                  {selectedCase.scheme}
                </span>
              </div>
              <div className="text-sm font-bold text-white">
                {selectedCase.applicantName} ({selectedCase.tribe} Tribe • {selectedCase.state})
              </div>
              <div className="text-slate-400 text-[11px]">
                {selectedCase.institution} • {selectedCase.course}
              </div>
            </div>

            <div className="text-right space-y-1">
              <span className="text-[10px] text-slate-400 uppercase block font-semibold">Payment Readiness</span>
              <div className="flex items-center gap-1.5 justify-end">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {selectedCase.paymentGatesScore}
                </span>
                <StatusBadge status={selectedCase.paymentReadinessStatus} size="sm" />
              </div>
            </div>
          </div>

          {/* The 5 Provenance Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
            
            {/* Pillar 1: Application Source */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
                  <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 font-black flex items-center justify-center text-[10px]">
                    1
                  </span>
                  <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Application Source
                  </span>
                </div>

                <div className="mt-2.5 space-y-1">
                  <strong className="text-blue-900 text-xs block">{pillars.applicationSource.system}</strong>
                  <span className="font-mono text-[10px] text-slate-500 block">ID: {pillars.applicationSource.portalId}</span>
                  <span className="text-[10px] text-slate-400 block">{pillars.applicationSource.timestamp}</span>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Extracted Meta:</span>
                  {pillars.applicationSource.dataPoints.map((dp, i) => (
                    <div key={i} className="text-[10px] text-slate-700 bg-slate-50 p-1.5 rounded leading-tight">
                      {dp}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-100">
                {pillars.applicationSource.protocol}
              </div>
            </div>

            {/* Pillar 2: Verification Source */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
                  <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 font-black flex items-center justify-center text-[10px]">
                    2
                  </span>
                  <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Verification Source
                  </span>
                </div>

                <div className="mt-2.5 space-y-1">
                  <strong className="text-emerald-950 text-xs block">{pillars.verificationSource.system}</strong>
                  <span className="text-[11px] text-slate-700 font-semibold block">{pillars.verificationSource.officer}</span>
                  <span className="text-[10px] text-slate-400 block">{pillars.verificationSource.timestamp}</span>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Attestation Data:</span>
                  {pillars.verificationSource.dataPoints.map((dp, i) => (
                    <div key={i} className="text-[10px] text-slate-700 bg-slate-50 p-1.5 rounded leading-tight">
                      {dp}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-100">
                {pillars.verificationSource.protocol}
              </div>
            </div>

            {/* Pillar 3: Document Evidence */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
                  <span className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 font-black flex items-center justify-center text-[10px]">
                    3
                  </span>
                  <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Document Evidence
                  </span>
                </div>

                <div className="mt-2.5 space-y-1">
                  <strong className="text-amber-950 text-xs block">{pillars.documentEvidence.system}</strong>
                  <span className="font-mono text-[10px] text-slate-600 block">{pillars.documentEvidence.certRef}</span>
                  <span className="text-[10px] text-slate-400 block">{pillars.documentEvidence.timestamp}</span>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Cryptographic Hash:</span>
                  {pillars.documentEvidence.dataPoints.map((dp, i) => (
                    <div key={i} className="text-[10px] text-slate-700 bg-slate-50 p-1.5 rounded leading-tight font-mono">
                      {dp}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-100">
                {pillars.documentEvidence.protocol}
              </div>
            </div>

            {/* Pillar 4: Policy Source */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
                  <span className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 font-black flex items-center justify-center text-[10px]">
                    4
                  </span>
                  <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Policy Source
                  </span>
                </div>

                <div className="mt-2.5 space-y-1">
                  <strong className="text-indigo-950 text-xs block">{pillars.policySource.system}</strong>
                  <span className="text-[10px] text-slate-600 leading-snug block">{pillars.policySource.gazetteRef}</span>
                  <span className="text-[10px] text-emerald-700 font-semibold block">{pillars.policySource.timestamp}</span>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Configured Bounds:</span>
                  {pillars.policySource.dataPoints.map((dp, i) => (
                    <div key={i} className="text-[10px] text-slate-700 bg-slate-50 p-1.5 rounded leading-tight">
                      {dp}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-100">
                {pillars.policySource.protocol}
              </div>
            </div>

            {/* Pillar 5: Payment Source */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
                  <span className="w-6 h-6 rounded-lg bg-purple-50 text-purple-600 font-black flex items-center justify-center text-[10px]">
                    5
                  </span>
                  <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Payment Source
                  </span>
                </div>

                <div className="mt-2.5 space-y-1">
                  <strong className="text-purple-950 text-xs block">{pillars.paymentSource.system}</strong>
                  <span className="font-mono text-[10px] text-slate-600 block">{pillars.paymentSource.codeRef}</span>
                  <span className="text-[10px] text-slate-400 block">{pillars.paymentSource.timestamp}</span>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">DBT Ledger:</span>
                  {pillars.paymentSource.dataPoints.map((dp, i) => (
                    <div key={i} className="text-[10px] text-slate-700 bg-slate-50 p-1.5 rounded leading-tight font-mono">
                      {dp}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-100">
                {pillars.paymentSource.protocol}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: DEDUPLICATION RADAR & FRAUD PREVENTION */}
      {/* ========================================================================= */}
      {activeTab === 'DEDUP_RADAR' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border-2 border-red-200 p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-red-100 gap-2">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Cross-Portal Deduplication Radar: Dual-Benefit Prevention
                  </h3>
                  <p className="text-xs text-slate-500">
                    Preventing concurrent claiming of Central and State ST Fellowships using multi-system Aadhaar fuzzy hashing.
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-500">Total Treasury Savings FY25</span>
                <p className="text-xl font-black text-emerald-700">₹14.2 Crores Saved</p>
              </div>
            </div>

            {/* Live Detected Incident */}
            <div className="bg-red-50/70 p-4 rounded-xl border border-red-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="bg-red-600 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                    FLAGGED ACTIVE
                  </span>
                  <span className="font-bold text-slate-900 text-xs">Case MOTA-NFST-2025-0994 (Sukhlal Bhil)</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Cross-Portal Adapter detected identical Aadhaar hash actively drawing <strong>₹25,000/month</strong> under 
                  Rajasthan State TAD Fellowship (Scheme: TAD-ST-2024). MoTA Rule 7.2 prohibits concurrent fellowships.
                </p>
              </div>

              <div className="flex items-center space-x-2 flex-shrink-0">
                <button
                  onClick={() => {
                    setSelectedCaseId('MOTA-NFST-2025-0994');
                    setCurrentView('cases');
                  }}
                  className="bg-red-700 hover:bg-red-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs"
                >
                  View Locked Case Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
