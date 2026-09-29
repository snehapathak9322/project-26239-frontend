import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CaseDetailView } from './CaseDetailView';
import { OfficerUnifiedCaseModal } from '../components/OfficerUnifiedCaseModal';
import {
  FolderOpen,
  Search,
  Filter,
  CreditCard,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Download,
  RotateCcw
} from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

export const CasesView = () => {
  const {
    cases,
    selectedCaseId,
    setSelectedCaseId,
    SCHEMES
  } = useApp();

  const [detailMode, setDetailMode] = useState(false);
  const [unifiedModalCase, setUnifiedModalCase] = useState(null);
  const [schemeFilter, setSchemeFilter] = useState('ALL');
  const [readinessFilter, setReadinessFilter] = useState('ALL');
  const [pvtgOnly, setPvtgOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle case selection
  const handleOpenDetail = (caseId) => {
    setSelectedCaseId(caseId);
    setDetailMode(true);
  };

  const handleOpenUnifiedModal = (c) => {
    setSelectedCaseId(c.caseId);
    setUnifiedModalCase(c);
  };

  // Filter cases
  const filteredCases = cases.filter(c => {
    if (schemeFilter !== 'ALL' && c.scheme !== schemeFilter) return false;
    if (readinessFilter === 'READY' && c.paymentReadinessStatus !== 'PAYMENT_READY') return false;
    if (readinessFilter === 'BLOCKED' && c.paymentReadinessStatus !== 'BLOCKED') return false;
    if (readinessFilter === 'DISBURSED' && c.paymentReadinessStatus !== 'DISBURSED') return false;
    if (pvtgOnly && !c.isPVTG) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const match =
        c.applicantName.toLowerCase().includes(q) ||
        c.caseId.toLowerCase().includes(q) ||
        c.tribe.toLowerCase().includes(q) ||
        c.institution.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  if (detailMode) {
    return <CaseDetailView onBack={() => setDetailMode(false)} />;
  }

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Unified Case Management Dossier
              </span>
              <span className="text-xs text-slate-500">
                {filteredCases.length} of {cases.length} cases displayed
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              Beneficiary Applications & Case Dossiers
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Inspect 360-degree case files across National Fellowship for ST (NFST), National Overseas Scholarship (NOS),
              Top Class Education, and Post-Matric schemes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleOpenDetail('MOTA-NFST-2025-0482')}
              className="bg-[#0A192F] hover:bg-[#183B64] text-white text-xs font-semibold px-3.5 py-2.5 rounded-xl transition-all shadow-xs flex items-center space-x-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Inspect Sunita Maravi (IISc)</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by candidate name, case ID, tribe, state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-white"
            />
          </div>

          {/* Scheme Filters */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 text-[11px] font-semibold mr-1">Scheme:</span>
            {['ALL', 'NFST', 'NOS', 'TOPCLASS', 'PMS_ST'].map(sc => (
              <button
                key={sc}
                onClick={() => setSchemeFilter(sc)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  schemeFilter === sc
                    ? 'bg-amber-600 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                {sc === 'ALL' ? 'All Schemes' : sc}
              </button>
            ))}
          </div>

          {/* Readiness Filters */}
          <div className="flex items-center space-x-2">
            <select
              value={readinessFilter}
              onChange={(e) => setReadinessFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none"
            >
              <option value="ALL">All Readiness States</option>
              <option value="READY">Payment Ready (6/6)</option>
              <option value="BLOCKED">Payment Blocked</option>
              <option value="DISBURSED">Disbursed</option>
            </select>

            <button
              onClick={() => setPvtgOnly(!pvtgOnly)}
              className={`text-xs px-2.5 py-1.5 rounded-xl font-bold transition-all border ${
                pvtgOnly
                  ? 'bg-purple-100 text-purple-900 border-purple-300'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              PVTG Only
            </button>
          </div>

        </div>
      </div>

      {/* Main Table of Cases */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {filteredCases.length === 0 ? (
          <div className="py-12 px-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">No applications match your search criteria</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Adjust your scheme, readiness filters, or search term to discover case dossiers.
            </p>
            <button
              onClick={() => {
                setSchemeFilter('ALL');
                setReadinessFilter('ALL');
                setPvtgOnly(false);
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
                  <th className="py-3.5 px-4">Case ID / Applicant</th>
                  <th className="py-3.5 px-3">Scheme & Level</th>
                  <th className="py-3.5 px-3">Tribe & Domicile</th>
                  <th className="py-3.5 px-3">Payment Readiness</th>
                  <th className="py-3.5 px-3">Stipend Outlay</th>
                  <th className="py-3.5 px-3">Risk / Deficiencies</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCases.map(c => {
                  const isReady = c.paymentReadinessStatus === 'PAYMENT_READY';
                  const isBlocked = c.paymentReadinessStatus === 'BLOCKED';
                  const isDisbursed = c.paymentReadinessStatus === 'DISBURSED';

                  return (
                    <tr key={c.caseId} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{c.applicantName}</span>
                          {c.isPVTG && (
                            <span className="text-[9px] bg-purple-100 text-purple-800 font-bold px-1.5 py-0.2 rounded">
                              PVTG
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="font-mono text-[10px] text-slate-400">{c.caseId}</span>
                          <StatusBadge status={c.overallStatus} size="xs" />
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                          {c.scheme}
                        </span>
                        <div className="text-[11px] text-slate-500 mt-1 truncate max-w-xs">{c.institution}</div>
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="font-semibold text-slate-800">{c.tribe}</div>
                        <div className="text-[10px] text-slate-400">{c.state} ({c.district})</div>
                      </td>

                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="flex items-center space-x-1 font-mono text-[9px] mb-1">
                          {['G1', 'G2', 'G3', 'G4', 'G5', 'G6'].map(gid => (
                            <span
                              key={gid}
                              className={`w-3.5 h-3.5 rounded flex items-center justify-center font-bold ${
                                c.gates[gid]?.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {gid.replace('G', '')}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                            {c.paymentGatesScore}
                          </span>
                          <StatusBadge status={c.paymentReadinessStatus} size="xs" />
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="font-bold text-slate-900">
                          ₹{c.stipendPending > 0 ? c.stipendPending.toLocaleString('en-IN') : c.disbursedSoFar.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {c.stipendPending > 0 ? 'Pending Release' : 'Disbursed UTR'}
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          c.aiRiskScore === 'LOW' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                          c.aiRiskScore === 'MEDIUM' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                          'bg-red-50 text-red-800 border border-red-200'
                        }`}>
                          {c.aiRiskScore} RISK
                        </span>
                        {c.deficiencyCount > 0 && (
                          <div className="text-[10px] text-red-600 font-semibold mt-0.5">
                            {c.deficiencyCount} Active Defect
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          <button
                            onClick={() => handleOpenUnifiedModal(c)}
                            className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-all text-xs"
                            title="Open 9-Section Unified Case View Modal"
                          >
                            <span>Unified Case</span>
                          </button>

                          <button
                            onClick={() => handleOpenDetail(c.caseId)}
                            className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-600 hover:text-white text-slate-700 font-semibold transition-all flex items-center space-x-1 text-xs"
                            title="Open Full Page 360 Dossier"
                          >
                            <span>Dossier</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Unified Case View Modal */}
      {unifiedModalCase && (
        <OfficerUnifiedCaseModal
          isOpen={Boolean(unifiedModalCase)}
          onClose={() => setUnifiedModalCase(null)}
          targetCase={unifiedModalCase}
        />
      )}

    </div>
  );
};
