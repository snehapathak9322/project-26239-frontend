import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OfficerUnifiedCaseModal } from '../components/OfficerUnifiedCaseModal';
import { DemoScenarioRunner } from '../components/DemoScenarioRunner';
import {
  FolderOpen,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Clock,
  ShieldCheck,
  CreditCard,
  User,
  Building,
  Sparkles,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  Calendar,
  Layers,
  RotateCcw
} from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

export const OfficerWorkspaceView = () => {
  const {
    cases,
    deficiencies,
    currentUser,
    selectedCaseId,
    setSelectedCaseId,
    showToast
  } = useApp();

  // Modal state
  const [activeModalCase, setActiveModalCase] = useState(null);

  // Filters state
  const [schemeFilter, setSchemeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [deficiencyFilter, setDeficiencyFilter] = useState('ALL');
  const [readinessFilter, setReadinessFilter] = useState('ALL');
  const [officerFilter, setOfficerFilter] = useState('ALL');
  const [dateFilter, setDateFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Top Summary Metrics
  const pendingCount = cases.filter(c => c.overallStatus === 'Submitted' || c.overallStatus === 'Deficiency Raised').length;
  const underVerificationCount = cases.filter(c => c.paymentGatesScore !== '6/6' && c.overallStatus !== 'Disbursed').length;
  const deficiencyCasesCount = cases.filter(c => (c.deficiencyCount || 0) > 0).length;
  const selectedCount = cases.filter(c => c.overallStatus === 'Selected' || c.gates.G1?.passed).length;
  const paymentBlockedCount = cases.filter(c => c.paymentReadinessStatus === 'BLOCKED').length;
  const paymentReadyCount = cases.filter(c => c.paymentReadinessStatus === 'PAYMENT_READY').length;

  // Filtered Queue
  const filteredQueue = cases.filter(c => {
    if (schemeFilter !== 'ALL' && c.scheme !== schemeFilter) return false;
    
    if (statusFilter !== 'ALL') {
      if (statusFilter === 'SELECTED' && c.overallStatus !== 'Selected') return false;
      if (statusFilter === 'READY' && c.paymentReadinessStatus !== 'PAYMENT_READY') return false;
      if (statusFilter === 'DEFICIENCY' && c.overallStatus !== 'Deficiency Raised' && (c.deficiencyCount || 0) === 0) return false;
      if (statusFilter === 'DISBURSED' && c.overallStatus !== 'Disbursed') return false;
    }

    if (deficiencyFilter === 'WITH_DEFECTS' && (c.deficiencyCount || 0) === 0) return false;
    if (deficiencyFilter === 'CLEAN' && (c.deficiencyCount || 0) > 0) return false;

    if (readinessFilter === 'READY' && c.paymentReadinessStatus !== 'PAYMENT_READY') return false;
    if (readinessFilter === 'BLOCKED' && c.paymentReadinessStatus !== 'BLOCKED') return false;

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const match =
        c.applicantName.toLowerCase().includes(q) ||
        c.caseId.toLowerCase().includes(q) ||
        c.tribe.toLowerCase().includes(q) ||
        c.institution.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  const handleOpenCase = (c) => {
    setActiveModalCase(c);
    setSelectedCaseId(c.caseId);
  };

  return (
    <div className="space-y-6">
      
      {/* Interactive Flagship Demo Stepper */}
      <DemoScenarioRunner />

      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                MoTA Verification Directorate
              </span>
              <span className="text-xs text-slate-500">Nodal Officer Action Console (L-2 Desk)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Officer Verification Workspace & Case Queue
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              High-throughput case queue with AI-assisted document extraction, legal clause matching, and 
              the statutory requirement that <strong>human officers hold sole discretionary authority to approve, reject, or mark deficiencies</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleOpenCase(cases[0])}
              className="bg-[#0A192F] hover:bg-[#183B64] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Inspect Priority Case: Sunita Maravi</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. TOP SUMMARY CARDS (6 Standard Verification Counters) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        
        {/* 1. Pending Applications */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block">
            Pending Applications
          </span>
          <p className="text-2xl font-black text-slate-900 mt-1">{pendingCount}</p>
          <span className="text-[10px] text-slate-400 font-medium">Awaiting Officer Action</span>
        </div>

        {/* 2. Under Verification */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block">
            Under Verification
          </span>
          <p className="text-2xl font-black text-blue-700 mt-1">{underVerificationCount}</p>
          <span className="text-[10px] text-blue-600 font-medium">OCR Audit Active</span>
        </div>

        {/* 3. Deficiency Cases */}
        <div className="bg-white p-4 rounded-xl border border-red-200 shadow-xs bg-red-50/20">
          <span className="text-[11px] text-red-700 font-bold uppercase tracking-wider block">
            Deficiency Cases
          </span>
          <p className="text-2xl font-black text-red-600 mt-1">{deficiencyCasesCount}</p>
          <span className="text-[10px] text-red-600 font-semibold">15-Day SLA Countdown</span>
        </div>

        {/* 4. Selected */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block">
            Selected (Merit)
          </span>
          <p className="text-2xl font-black text-purple-700 mt-1">{selectedCount}</p>
          <span className="text-[10px] text-purple-600 font-medium">Award Issued</span>
        </div>

        {/* 5. Payment Blocked */}
        <div className="bg-white p-4 rounded-xl border-2 border-amber-300 shadow-xs bg-amber-50/30">
          <span className="text-[11px] text-amber-800 font-black uppercase tracking-wider block">
            Payment Blocked
          </span>
          <p className="text-2xl font-black text-amber-700 mt-1">{paymentBlockedCount}</p>
          <span className="text-[10px] text-amber-800 font-bold">Selected ≠ Ready</span>
        </div>

        {/* 6. Payment Ready */}
        <div className="bg-white p-4 rounded-xl border-2 border-emerald-300 shadow-xs bg-emerald-50/30">
          <span className="text-[11px] text-emerald-800 font-black uppercase tracking-wider block">
            Payment Ready
          </span>
          <p className="text-2xl font-black text-emerald-700 mt-1">{paymentReadyCount}</p>
          <span className="text-[10px] text-emerald-700 font-bold">6/6 Gates Cleared</span>
        </div>

      </div>

      {/* 2. FILTERS CONSOLE */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            Verification Queue Multi-Parameter Filter
          </span>
          <span className="text-[11px] text-slate-500">{filteredQueue.length} cases match criteria</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 text-xs">
          
          {/* Search Box */}
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search candidate, case ID, tribe, institute..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* Scheme Filter */}
          <div>
            <select
              value={schemeFilter}
              onChange={(e) => setSchemeFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-slate-700 font-medium focus:outline-none"
            >
              <option value="ALL">All Schemes</option>
              <option value="NFST">NFST (Fellowship)</option>
              <option value="NOS">NOS (Overseas)</option>
              <option value="TOPCLASS">Top Class Education</option>
              <option value="PMS_ST">Post-Matric (PMS)</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-slate-700 font-medium focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="SELECTED">Selected</option>
              <option value="DEFICIENCY">Deficiency Raised</option>
              <option value="READY">Payment Ready</option>
              <option value="DISBURSED">Disbursed</option>
            </select>
          </div>

          {/* Payment Readiness Filter */}
          <div>
            <select
              value={readinessFilter}
              onChange={(e) => setReadinessFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-slate-700 font-medium focus:outline-none"
            >
              <option value="ALL">All Readiness</option>
              <option value="BLOCKED">Payment Blocked</option>
              <option value="READY">Payment Ready (6/6)</option>
            </select>
          </div>

          {/* Assigned Officer Filter */}
          <div>
            <select
              value={officerFilter}
              onChange={(e) => setOfficerFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-slate-700 font-medium focus:outline-none"
            >
              <option value="ALL">All Officers</option>
              <option value="Dr. Rajesh Meena">Dr. Rajesh Meena (Me)</option>
              <option value="Overseas Cell">Overseas Cell MoTA</option>
              <option value="State Desk">State Nodal Desk</option>
            </select>
          </div>

        </div>
      </div>

      {/* 3. CASE QUEUE TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {filteredQueue.length === 0 ? (
          <div className="py-12 px-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">No matching cases in verification queue</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              No applications meet the currently active filter conditions. Try clearing filters or changing search keywords.
            </p>
            <button
              onClick={() => {
                setSchemeFilter('ALL');
                setStatusFilter('ALL');
                setDeficiencyFilter('ALL');
                setReadinessFilter('ALL');
                setOfficerFilter('ALL');
                setSearchQuery('');
              }}
              className="mt-4 px-3 py-1.5 rounded-xl bg-slate-900 text-white font-semibold text-xs inline-flex items-center space-x-1.5 shadow-xs hover:bg-slate-800"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Case ID</th>
                  <th className="py-3.5 px-3">Applicant & Tribe</th>
                  <th className="py-3.5 px-3">Scheme & Level</th>
                  <th className="py-3.5 px-3">Current Stage</th>
                  <th className="py-3.5 px-3">Priority</th>
                  <th className="py-3.5 px-3">Deficiency</th>
                  <th className="py-3.5 px-3">Payment Readiness</th>
                  <th className="py-3.5 px-3">Assigned Authority</th>
                  <th className="py-3.5 px-3">Last Updated</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredQueue.map(c => {
                  const isReady = c.paymentReadinessStatus === 'PAYMENT_READY';
                  const isBlocked = c.paymentReadinessStatus === 'BLOCKED';
                  const hasDefects = (c.deficiencyCount || 0) > 0;
                  const priority = c.aiRiskScore === 'CRITICAL' ? 'CRITICAL' : c.isPVTG ? 'HIGH' : isBlocked ? 'HIGH' : 'NORMAL';

                  return (
                    <tr key={c.caseId} className="hover:bg-slate-50/90 transition-colors group">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        {c.caseId}
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{c.applicantName}</span>
                          {c.isPVTG && (
                            <span className="text-[9px] bg-purple-100 text-purple-800 font-bold px-1.5 py-0.2 rounded">
                              PVTG
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500">{c.tribe} • {c.state}</div>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                          {c.scheme}
                        </span>
                        <div className="text-[10px] text-slate-500 truncate max-w-xs mt-0.5">{c.institution}</div>
                      </td>

                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <StatusBadge status={c.overallStatus} size="xs" />
                      </td>

                      <td className="py-3.5 px-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          priority === 'CRITICAL' ? 'bg-red-600 text-white' :
                          priority === 'HIGH' ? 'bg-red-100 text-red-800' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {priority}
                        </span>
                      </td>

                      <td className="py-3.5 px-3">
                        {hasDefects ? (
                          <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded">
                            {c.deficiencyCount} Active Defect
                          </span>
                        ) : (
                          <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Clean</span>
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                            {c.paymentGatesScore}
                          </span>
                          <StatusBadge status={c.paymentReadinessStatus} size="xs" />
                        </div>
                      </td>

                      <td className="py-3.5 px-3 text-slate-600 font-medium text-[11px]">
                        {c.scheme === 'NOS' ? 'Overseas Cell MoTA' : 'Dr. Rajesh Meena'}
                      </td>

                      <td className="py-3.5 px-3 font-mono text-slate-500 text-[10px]">
                        {c.lastUpdated || '02-Sep, 10:10'}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleOpenCase(c)}
                          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-bold transition-all text-xs flex items-center space-x-1 ml-auto shadow-xs"
                        >
                          <span>Inspect Case</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Complete 9-Section Unified Case Modal */}
      <OfficerUnifiedCaseModal
        isOpen={Boolean(activeModalCase)}
        onClose={() => setActiveModalCase(null)}
        targetCase={activeModalCase}
      />

    </div>
  );
};
