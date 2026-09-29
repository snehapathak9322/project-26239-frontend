import React from 'react';
import { useApp } from '../context/AppContext';
import { ApplicantDashboardView } from './ApplicantDashboardView';
import { OfficerWorkspaceView } from './OfficerWorkspaceView';
import { DemoScenarioRunner } from '../components/DemoScenarioRunner';
import {
  CreditCard,
  AlertTriangle,
  FolderOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  Building,
  Users,
  Award,
  Sparkles,
  FileCheck,
  Send,
  Layers,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

export const DashboardView = () => {
  const {
    currentUser,
    setCurrentView,
    setSelectedCaseId,
    cases,
    deficiencies,
    batches,
    adapters,
    policyConfig
  } = useApp();

  const activeDeficiencies = deficiencies.filter(d => d.status === 'ACTION_REQUIRED');
  const paymentReadyCases = cases.filter(c => c.paymentReadinessStatus === 'PAYMENT_READY');
  const blockedCases = cases.filter(c => c.paymentReadinessStatus === 'BLOCKED');

  // If currently active role is Applicant, render the dedicated Applicant Dashboard
  if (currentUser.role === 'applicant') {
    return <ApplicantDashboardView />;
  }

  // If currently active role is Verifier, render the complete Officer Workspace
  if (currentUser.role === 'verifier') {
    return <OfficerWorkspaceView />;
  }

  return (
    <div className="space-y-6">
      
      {/* Interactive Flagship Demo Stepper */}
      <DemoScenarioRunner />

      {/* Top Welcome & Context Banner (for Verifiers, Admins, SuperAdmins) */}
      <div className="bg-gradient-to-r from-[#0A192F] via-[#102A4C] to-[#183B64] rounded-2xl p-6 text-white shadow-govCard relative overflow-hidden">
        {/* Subtle decorative motif */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold mb-1">
              <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                {currentUser.badge}
              </span>
              <span>•</span>
              <span>Active Session: {currentUser.institution}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Namaste, {currentUser.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              {currentUser.role === 'verifier' &&
                'Verification Desk L-2 active. Side-by-side AI document inspection and automated clause validation enabled.'}
              {currentUser.role === 'admin' &&
                'Scheme Administration & PFMS DBT Staging Console. Enforcing the golden rule: "Selected ≠ Payment Ready".'}
              {currentUser.role === 'superadmin' &&
                'Executive Dashboard for Ministry of Tribal Affairs. National disbursement monitoring, fraud deduplication, and PVTG empowerment metrics.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setCurrentView('payment-readiness')}
              className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center space-x-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>Payment Readiness Engine</span>
            </button>
            <button
              onClick={() => setCurrentView('deficiencies')}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold px-3.5 py-2.5 rounded-xl transition-all flex items-center space-x-2"
            >
              <AlertTriangle className="w-4 h-4 text-amber-300" />
              <span>Deficiency Hub ({activeDeficiencies.length})</span>
            </button>
          </div>
        </div>
      </div>



      {/* ========================================================================= */}
      {/* SCHEME ADMINISTRATOR VIEW (Smt. Arundhati Soren) */}
      {/* ========================================================================= */}

      {/* ========================================================================= */}
      {/* 3. SCHEME ADMINISTRATOR VIEW (Smt. Arundhati Soren) */}
      {/* ========================================================================= */}
      {currentUser.role === 'admin' && (
        <div className="space-y-6">
          
          {/* THE CORE PRINCIPLE COMPARISON CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Total Selected */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold uppercase tracking-wider">Total Selected ST Scholars</span>
                <Award className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-3xl font-extrabold text-slate-900 mt-2">
                {policyConfig.analytics.totalSelectedScholars.toLocaleString('en-IN')}
              </p>
              <div className="mt-2 text-xs text-slate-500">
                Awarded across NFST, NOS, Top Class, PMS
              </div>
            </div>

            {/* Payment Ready (The Compliant Subset) */}
            <div className="bg-white p-5 rounded-2xl border-2 border-emerald-300 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between text-emerald-700">
                <span className="text-xs font-semibold uppercase tracking-wider">Payment Ready (6/6 Gates)</span>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-3xl font-extrabold text-emerald-700 mt-2">
                {policyConfig.analytics.totalPaymentReadyScholars.toLocaleString('en-IN')}
              </p>
              <div className="mt-2 text-xs text-emerald-800 font-medium flex items-center justify-between">
                <span>Cleared for PFMS DBT Release</span>
                <span className="bg-emerald-100 px-2 py-0.5 rounded text-[11px]">61.6%</span>
              </div>
            </div>

            {/* Payment Blocked (Deficiency / Seeding) */}
            <div className="bg-white p-5 rounded-2xl border-2 border-amber-300 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between text-amber-800">
                <span className="text-xs font-semibold uppercase tracking-wider">Selected but Payment Blocked</span>
                <AlertCircle className="w-5 h-5 text-amber-600" />
              </div>
              <p className="text-3xl font-extrabold text-amber-700 mt-2">
                {policyConfig.analytics.totalPaymentBlockedScholars.toLocaleString('en-IN')}
              </p>
              <div className="mt-2 text-xs text-amber-800 font-medium flex items-center justify-between">
                <span>Hold due to Gate 2, 4 or 5</span>
                <span className="bg-amber-100 px-2 py-0.5 rounded text-[11px]">38.4%</span>
              </div>
            </div>

          </div>

          {/* PFMS Batch Staging & Release Banner */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  PFMS DBT Electronic Batching Console
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  Active Staged Batches Ready for Digital Signature (DSC)
                </h3>
              </div>
              <button
                onClick={() => setCurrentView('payment-readiness')}
                className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all flex items-center space-x-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Open Batch Staging Engine</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {batches.map(b => (
                <div
                  key={b.batchId}
                  className={`p-4 rounded-xl border text-xs transition-all ${
                    b.status === 'STAGED_READY_FOR_DSC'
                      ? 'bg-amber-50/50 border-amber-300'
                      : b.status === 'RELEASED_TO_PFMS_SUCCESS'
                      ? 'bg-emerald-50/50 border-emerald-300'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-slate-900">{b.scheme} Batch</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                      b.status === 'STAGED_READY_FOR_DSC' ? 'bg-amber-200 text-amber-900' :
                      b.status === 'RELEASED_TO_PFMS_SUCCESS' ? 'bg-emerald-200 text-emerald-900' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {b.status === 'STAGED_READY_FOR_DSC' ? 'Ready for DSC' :
                       b.status === 'RELEASED_TO_PFMS_SUCCESS' ? 'Disbursed' : 'In Review'}
                    </span>
                  </div>
                  <p className="font-semibold text-slate-800 text-xs mt-1 truncate">{b.batchName}</p>
                  <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-slate-600">
                    <span>Scholars: <strong>{b.totalScholars}</strong></span>
                    <span className="font-bold text-slate-900">₹{(b.totalAmount / 10000000).toFixed(3)} Cr</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. MINISTRY / SUPER ADMIN VIEW (Shri Vikram Singh, IAS) */}
      {/* ========================================================================= */}
      {currentUser.role === 'superadmin' && (
        <div className="space-y-6">
          
          {/* National Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500">Total DBT Disbursed</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">₹412.8 Cr</p>
              <p className="text-[11px] text-emerald-600 mt-0.5 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>+18.4% YoY DBT Velocity</span>
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500">Fraud / Duals Prevented</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-1">₹14.2 Cr</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Via NSP/State Radar</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500">PVTG Representation</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-purple-700 mt-1">8.4%</p>
              <p className="text-[11px] text-purple-600 mt-0.5">708 PVTG Scholars funded</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-500">Avg Turnaround Time</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">24 Days</p>
              <p className="text-[11px] text-emerald-600 mt-0.5">Down from 74 days (pre-AI)</p>
            </div>
          </div>

          {/* State-Wise Tribal Fellowship Heatmap / Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  State-wise ST Scholarship Disbursal & Readiness Matrix
                </h3>
                <p className="text-xs text-slate-500">
                  Tracking readiness bottlenecks across major tribal population states.
                </p>
              </div>
              <button
                onClick={() => setCurrentView('reports')}
                className="text-xs font-semibold text-amber-700 hover:text-amber-900"
              >
                Comprehensive Analytics →
              </button>
            </div>

            <div className="overflow-x-auto mt-3">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3">State / Region</th>
                    <th className="py-2.5 px-3">ST Pop (Lakhs)</th>
                    <th className="py-2.5 px-3">Selected</th>
                    <th className="py-2.5 px-3">Payment Ready</th>
                    <th className="py-2.5 px-3">Readiness %</th>
                    <th className="py-2.5 px-3 text-right">Disbursed (Cr)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {policyConfig.analytics.statePerformance.map(st => {
                    const pct = Math.round((st.paymentReady / st.selected) * 100);
                    return (
                      <tr key={st.state} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-semibold text-slate-900">{st.state}</td>
                        <td className="py-2.5 px-3 text-slate-600">{st.tribalPopLakhs} L</td>
                        <td className="py-2.5 px-3 font-bold text-slate-800">{st.selected}</td>
                        <td className="py-2.5 px-3 text-emerald-700 font-bold">{st.paymentReady}</td>
                        <td className="py-2.5 px-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-slate-200 rounded-full h-2 overflow-hidden">
                              <div
                                className={`h-full ${pct >= 70 ? 'bg-emerald-500' : pct >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                                style={{ width: `${pct}%` }}
                              ></div>
                            </div>
                            <span className="font-semibold text-[11px]">{pct}%</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                          ₹{st.disbursedCr} Cr
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* External Portals Real-time Adapter Strip (Present across all roles) */}
      <div className="bg-slate-900 text-slate-300 rounded-2xl p-4 border border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Cross-Portal Intelligence Adapters (Controlled & Read-Only)
            </span>
          </div>
          <button
            onClick={() => setCurrentView('cross-portal')}
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
          >
            Open Cross-Portal Console →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-3">
          {adapters.map(ad => (
            <div key={ad.id} className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-[11px]">{ad.acronym}</span>
                <span className="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-1 rounded font-semibold">
                  LIVE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1 truncate">{ad.name}</p>
              <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
                <span>Latency: {ad.latencyMs}ms</span>
                <span className="text-emerald-400">200 OK</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
