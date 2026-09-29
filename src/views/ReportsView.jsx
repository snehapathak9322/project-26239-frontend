import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BarChart3,
  TrendingUp,
  Download,
  Users,
  Award,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertTriangle,
  CreditCard,
  Building,
  Filter,
  ArrowUpRight,
  PieChart,
  Activity,
  Layers
} from 'lucide-react';

export const ReportsView = () => {
  const { policyConfig, showToast, cases } = useApp();
  const analytics = policyConfig.analytics;

  const [timeRange, setTimeRange] = useState('FY2025_26');

  // Key Top Metrics
  const metrics = {
    totalApplications: 148920,
    pendingVerification: 24190,
    deficiencyRate: 18.6,
    selectedCases: 8420,
    paymentBlocked: 3230,
    paymentReady: 5190
  };

  // Scheme-Wise Distribution
  const schemeDistribution = [
    { code: 'PMS_ST', name: 'Post-Matric ST', beneficiaries: 284000, selected: 4210, ready: 2840, blocked: 1370, budgetCr: 2150, sharePct: 52 },
    { code: 'PRE_MATRIC', name: 'Pre-Matric ST', beneficiaries: 1420000, selected: 1980, ready: 1420, blocked: 560, budgetCr: 980, sharePct: 24 },
    { code: 'TOPCLASS', name: 'Top Class (IITs/IIMs)', beneficiaries: 3820, selected: 1390, ready: 930, blocked: 460, budgetCr: 120, sharePct: 14 },
    { code: 'NFST', name: 'NFST Ph.D. Fellowship', beneficiaries: 2840, selected: 800, ready: 0, blocked: 800, budgetCr: 110, sharePct: 9 }, // blocked due to quarterly proof
    { code: 'NOS', name: 'National Overseas (NOS)', beneficiaries: 46, selected: 40, ready: 0, blocked: 40, budgetCr: 18.5, sharePct: 1 }
  ];

  // Verification Bottlenecks Breakdown
  const bottlenecks = [
    { cause: 'Institutional Dean / Supervisor Round Seal Missing (Annexure-IV)', count: 1240, pct: 38.4, scheme: 'NFST / Top Class', severity: 'HIGH' },
    { cause: 'Parental Income Cap Exceeded / Agricultural Exemption Claim', count: 840, pct: 26.0, scheme: 'PMS-ST', severity: 'MEDIUM' },
    { cause: 'NPCI Aadhaar Payment Bridge (APB) Inactive / Dormant Mandate', count: 610, pct: 18.9, scheme: 'All Schemes', severity: 'HIGH' },
    { cause: 'Academic Surety Deed & Gazetted Solvency Verification Pending', count: 350, pct: 10.8, scheme: 'NOS', severity: 'HIGH' },
    { cause: 'Tier-4 UK / US Visa Vignette Biometric Stamping Pending', count: 190, pct: 5.9, scheme: 'NOS', severity: 'MEDIUM' }
  ];

  // Deficiency Trends (Monthly Progression)
  const deficiencyTrends = [
    { month: 'Apr 2025', raised: 2410, resolved: 1890, avgDays: 38 },
    { month: 'May 2025', raised: 2890, resolved: 2450, avgDays: 29 },
    { month: 'Jun 2025', raised: 3120, resolved: 2980, avgDays: 22 },
    { month: 'Jul 2025', raised: 3450, resolved: 3380, avgDays: 14 },
    { month: 'Aug 2025', raised: 2940, resolved: 3120, avgDays: 8.4 },
    { month: 'Sep 2025 (AI Active)', raised: 1820, resolved: 2240, avgDays: 4.8 }
  ];

  // Payment Readiness Trends (Selected vs Payment Ready Gap)
  const readinessTrends = [
    { quarter: 'Q1 (Apr–Jun)', selected: 3200, paymentReady: 1420, blocked: 1780, gapPct: 55.6 },
    { quarter: 'Q2 (Jul–Sep)', selected: 5800, paymentReady: 3350, blocked: 2450, gapPct: 42.2 },
    { quarter: 'Q3 (Oct–Dec)', selected: 7400, paymentReady: 4890, blocked: 2510, gapPct: 33.9 },
    { quarter: 'Q4 Projected', selected: 8420, paymentReady: 6920, blocked: 1500, gapPct: 17.8 }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                Ministry Executive Directorate
              </span>
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                Consolidated Super Admin Analytics
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
              Ministry Super Admin & Cross-Scheme Oversight Dashboard
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Real-time executive monitoring across all 5 Scheduled Tribe schemes. 
              Tracks application pipelines, verification bottlenecks, actionable deficiency trends, 
              and the critical gap between <strong>Selected Cases</strong> and <strong>Payment-Ready Disbursals</strong>.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="text-xs font-semibold py-2 px-3 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
            >
              <option value="FY2025_26">Financial Year 2025–26</option>
              <option value="Q2_CURRENT">Q2 (Current Active Quarter)</option>
              <option value="ALL_TIME">All-Time Cumulative</option>
            </select>

            <button
              onClick={() => showToast('Exported Ministry Executive Annual Report (PDF/Excel)', 'success')}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center space-x-2"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Export Executive Dossier</span>
            </button>
          </div>
        </div>

        {/* Core Principle Callout */}
        <div className="pt-3 border-t border-slate-100">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between text-xs text-amber-950">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>
                <strong>Axiom Enforced:</strong> <em>“Selected” does NOT automatically mean “Payment Ready”.</em> 
                Out of {metrics.selectedCases.toLocaleString('en-IN')} Selected Scholars, {metrics.paymentBlocked.toLocaleString('en-IN')} are currently on statutory hold pending Gate Clearance.
              </span>
            </div>
            <span className="font-mono font-bold bg-amber-200/80 px-2.5 py-0.5 rounded text-amber-900 text-[11px]">
              Compliance Gap: {((metrics.paymentBlocked / metrics.selectedCases) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* TOP SUMMARY CARDS (6 Required Metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        
        {/* Metric 1: Total Applications */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Total Applications
          </span>
          <p className="text-2xl font-black text-slate-900">
            {metrics.totalApplications.toLocaleString('en-IN')}
          </p>
          <div className="text-[10px] text-slate-500 font-medium">
            Across 5 ST Schemes
          </div>
        </div>

        {/* Metric 2: Pending Verification */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-blue-700 block tracking-wider">
            Pending Verification
          </span>
          <p className="text-2xl font-black text-blue-700">
            {metrics.pendingVerification.toLocaleString('en-IN')}
          </p>
          <div className="text-[10px] text-blue-600 font-medium">
            At Desk L-1 & L-2
          </div>
        </div>

        {/* Metric 3: Deficiency Rate */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-amber-700 block tracking-wider">
            Deficiency Rate
          </span>
          <p className="text-2xl font-black text-amber-700">
            {metrics.deficiencyRate}%
          </p>
          <div className="text-[10px] text-amber-600 font-medium">
            Actionable Remediation
          </div>
        </div>

        {/* Metric 4: Selected Cases */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-indigo-700 block tracking-wider">
            Selected Cases
          </span>
          <p className="text-2xl font-black text-indigo-700">
            {metrics.selectedCases.toLocaleString('en-IN')}
          </p>
          <div className="text-[10px] text-indigo-600 font-medium">
            Merit Award Issued
          </div>
        </div>

        {/* Metric 5: Payment Blocked */}
        <div className="bg-white p-4 rounded-2xl border-2 border-red-200 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-red-700 block tracking-wider">
            Payment Blocked
          </span>
          <p className="text-2xl font-black text-red-700">
            {metrics.paymentBlocked.toLocaleString('en-IN')}
          </p>
          <div className="text-[10px] text-red-600 font-medium">
            Gates 2, 4 or 5 Pending
          </div>
        </div>

        {/* Metric 6: Payment Ready */}
        <div className="bg-white p-4 rounded-2xl border-2 border-emerald-300 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-emerald-700 block tracking-wider">
            Payment Ready
          </span>
          <p className="text-2xl font-black text-emerald-700">
            {metrics.paymentReady.toLocaleString('en-IN')}
          </p>
          <div className="text-[10px] text-emerald-600 font-medium">
            6/6 Gates Cleared
          </div>
        </div>

      </div>

      {/* Visual Charts Grid (Meaningful & Readable) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chart 1: Scheme-Wise Distribution (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-600" />
                <span>Scheme-Wise Beneficiary & Readiness Distribution</span>
              </h3>
              <p className="text-xs text-slate-500">
                Comparing Selected cases vs Payment-Ready clearance across all 5 schemes.
              </p>
            </div>
            <span className="text-[11px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
              Total Budget: ₹3,378 Cr
            </span>
          </div>

          {/* Meaningful Bar Breakdown */}
          <div className="space-y-4 pt-1">
            {schemeDistribution.map(sc => {
              const readyPct = sc.selected > 0 ? Math.round((sc.ready / sc.selected) * 100) : 0;
              const blockedPct = 100 - readyPct;
              return (
                <div key={sc.code} className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-slate-900 text-xs">{sc.code}</span>
                      <span className="text-slate-500 text-[11px]">({sc.name})</span>
                    </div>
                    <div className="text-right text-[11px]">
                      <strong className="text-slate-900">{sc.selected.toLocaleString('en-IN')} Selected</strong>
                      <span className="text-slate-400 mx-1.5">•</span>
                      <span className="text-emerald-700 font-bold">{sc.ready.toLocaleString('en-IN')} Ready</span>
                      <span className="text-slate-400 mx-1.5">•</span>
                      <span className="text-red-700 font-bold">{sc.blocked.toLocaleString('en-IN')} Blocked</span>
                    </div>
                  </div>

                  {/* Visual Stacked Bar */}
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden flex shadow-inner">
                    <div
                      className="bg-emerald-500 h-full transition-all"
                      style={{ width: `${readyPct}%` }}
                      title={`Payment Ready: ${readyPct}%`}
                    ></div>
                    <div
                      className="bg-red-400 h-full transition-all"
                      style={{ width: `${blockedPct}%` }}
                      title={`Payment Blocked: ${blockedPct}%`}
                    ></div>
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Active Beneficiaries: {sc.beneficiaries.toLocaleString('en-IN')}</span>
                    <span>Annual Allocation: ₹{sc.budgetCr} Cr</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center space-x-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span>Payment Ready</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                <span>Payment Blocked</span>
              </span>
            </div>
            <span className="font-semibold text-slate-700">Clearance Ratio: 61.6% National Average</span>
          </div>
        </div>

        {/* Chart 2: Verification Bottlenecks (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>Top Verification Bottlenecks</span>
              </h3>
              <p className="text-xs text-slate-500">
                Primary causes of disbursement holds across payment gates.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            {bottlenecks.map((bn, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-[11px] line-clamp-1">{bn.cause}</span>
                  <span className="font-mono font-bold text-red-700 text-xs ml-2">{bn.pct}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-red-500 h-full rounded-full"
                    style={{ width: `${bn.pct}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Affected Cases: <strong>{bn.count}</strong></span>
                  <span>Scheme: <strong className="text-indigo-700">{bn.scheme}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Second Charts Row: Deficiency Trends & Payment Readiness Progression */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Deficiency Trends (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                <span>Monthly Deficiency Resolution Velocity</span>
              </h3>
              <p className="text-xs text-slate-500">
                Impact of AI pre-verification in accelerating defect remediation cycles.
              </p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              Turnaround: 4.8 Days
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-[10px] uppercase border-b border-slate-200">
                  <th className="py-2.5 px-3">Month Cohort</th>
                  <th className="py-2.5 px-3">Deficiencies Raised</th>
                  <th className="py-2.5 px-3">Resolved via AI Pre-Check</th>
                  <th className="py-2.5 px-3 text-right">Avg Resolution Days</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {deficiencyTrends.map((dt, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-800">{dt.month}</td>
                    <td className="py-2.5 px-3 text-red-700 font-mono font-semibold">{dt.raised.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 px-3 text-emerald-700 font-mono font-bold">{dt.resolved.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 px-3 text-right">
                      <span className={`font-mono font-bold px-2 py-0.5 rounded text-[10px] ${
                        dt.avgDays <= 10 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {dt.avgDays} days
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment-Readiness Trends (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-600" />
                <span>Quarterly Payment Readiness Clearance Trend</span>
              </h3>
              <p className="text-xs text-slate-500">
                Progressively closing the gap between Selected candidates and actual DBT release.
              </p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              Gap: 55.6% → 17.8%
            </span>
          </div>

          <div className="space-y-3 pt-1">
            {readinessTrends.map((rt, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900">{rt.quarter}</strong>
                  <span className="text-slate-500 text-[11px]">
                    Hold Gap: <strong className="text-amber-800 font-mono">{rt.gapPct}%</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-600">
                  <span>Selected: <strong>{rt.selected}</strong></span>
                  <span>•</span>
                  <span className="text-emerald-700 font-bold">Ready: {rt.paymentReady}</span>
                  <span>•</span>
                  <span className="text-red-700 font-bold">Blocked: {rt.blocked}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden flex mt-1">
                  <div
                    className="bg-emerald-500 h-full"
                    style={{ width: `${Math.round((rt.paymentReady / rt.selected) * 100)}%` }}
                  ></div>
                  <div
                    className="bg-amber-400 h-full"
                    style={{ width: `${Math.round((rt.blocked / rt.selected) * 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
