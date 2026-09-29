import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ApplicantLifecycleTimeline } from '../components/ApplicantLifecycleTimeline';
import { AcknowledgementModal } from '../components/AcknowledgementModal';
import { SubmittedDocsModal } from '../components/SubmittedDocsModal';
import { RaiseGrievanceModal } from '../components/RaiseGrievanceModal';
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
  AlertCircle,
  Download,
  Eye,
  Bell,
  RefreshCw,
  UploadCloud,
  Check,
  Building2,
  FileText
} from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

export const ApplicantDashboardView = () => {
  const {
    cases,
    deficiencies,
    grievances,
    resolveDeficiency,
    currentUser,
    setSelectedCaseId,
    setCurrentView,
    showToast
  } = useApp();

  // Primary sample cases for NFST, NOS, and Top Class
  const sampleCaseIds = [
    'MOTA-NFST-2025-0482',     // Sunita Maravi (NFST)
    'MOTA-NOS-2025-0119',      // Birsa Soren (NOS)
    'MOTA-TOPCLASS-2025-0891'  // Mangal Munda (Top Class)
  ];

  const [activeCaseId, setActiveCaseId] = useState(currentUser.caseId || sampleCaseIds[0]);
  
  // Modals state
  const [showAckModal, setShowAckModal] = useState(false);
  const [showDocsModal, setShowDocsModal] = useState(false);
  const [showGrievanceModal, setShowGrievanceModal] = useState(false);

  // Active AI scanning state for resubmission
  const [scanningDefId, setScanningDefId] = useState(null);
  const [scanStep, setScanStep] = useState(0);

  // Currently selected case
  const activeCase = cases.find(c => c.caseId === activeCaseId) || cases[0];
  const caseDeficiencies = deficiencies.filter(d => d.caseId === activeCase?.caseId);
  const activeCaseGrievances = grievances.filter(g => g.caseId === activeCase?.caseId);

  // Switch active case
  const handleCaseSelect = (caseId) => {
    setActiveCaseId(caseId);
    setSelectedCaseId(caseId);
    showToast(`Switched view to Case ${caseId}`, 'info');
  };

  // Simulate applicant re-upload with live AI pre-scan
  const handleSimulateResubmit = (deficiencyId) => {
    setScanningDefId(deficiencyId);
    setScanStep(1);

    setTimeout(() => {
      setScanStep(2);
    }, 900);

    setTimeout(() => {
      setScanStep(3);
    }, 1800);

    setTimeout(() => {
      setScanStep(4);
      setTimeout(() => {
        resolveDeficiency(deficiencyId);
        setScanningDefId(null);
        setScanStep(0);
      }, 1000);
    }, 2800);
  };

  return (
    <div className="space-y-6">
      
      {/* Interactive Flagship Demo Stepper */}
      <DemoScenarioRunner />

      {/* 1. Welcome / Profile Summary Header */}
      <div className="bg-gradient-to-r from-[#0A192F] via-[#102A4C] to-[#183B64] rounded-2xl p-6 text-white shadow-govCard relative overflow-hidden">
        {/* Subtle decorative background motif */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          {/* Candidate Profile Details */}
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border-2 border-amber-400 text-amber-300 flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-inner">
              {activeCase.applicantName.split(' ').map(n => n[0]).join('')}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                  Beneficiary Scholar Profile
                </span>
                <span className="text-xs text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  DigiLocker Linked
                </span>
                {activeCase.isPVTG && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-500/30 text-purple-200 border border-purple-400/40">
                    PVTG Recognized
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
                Namaste, {activeCase.applicantName}
              </h2>

              <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-300">
                <span>Tribe: <strong className="text-amber-300">{activeCase.tribe}</strong></span>
                <span>•</span>
                <span>Domicile: <strong className="text-slate-100">{activeCase.state} ({activeCase.district})</strong></span>
                <span>•</span>
                <span>Enrolled: <strong className="text-slate-100">{activeCase.institution}</strong></span>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-slate-300">
                <span className="flex items-center gap-1 text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Bank DBT Seeding Active ({activeCase.bankDetails?.bankName})
                </span>
                <span>•</span>
                <span className="font-mono text-slate-300">AISHE: {activeCase.aisheCode}</span>
              </div>
            </div>
          </div>

          {/* Stipend Card on Right */}
          <div className="flex flex-col sm:items-end justify-between bg-slate-900/60 p-4 rounded-xl border border-slate-700 flex-shrink-0">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Fellowship / Stipend Amount
            </span>
            <p className="text-2xl font-black text-amber-400 mt-0.5">
              ₹{activeCase.stipendPending > 0 ? activeCase.stipendPending.toLocaleString('en-IN') : activeCase.disbursedSoFar.toLocaleString('en-IN')}
            </p>
            <div className="mt-1.5 flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {activeCase.paymentGatesScore} GATES
              </span>
              <StatusBadge status={activeCase.paymentReadinessStatus} size="xs" />
            </div>
          </div>

        </div>

        {/* Action Bar inside Header */}
        <div className="mt-6 pt-4 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowAckModal(true)}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-3 py-1.5 rounded-xl transition-all flex items-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5 text-amber-300" />
              <span>Download Acknowledgement</span>
            </button>

            <button
              onClick={() => setShowDocsModal(true)}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-3 py-1.5 rounded-xl transition-all flex items-center space-x-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-blue-300" />
              <span>View Submitted Documents</span>
            </button>

            <button
              onClick={() => setShowGrievanceModal(true)}
              className="bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 font-semibold px-3 py-1.5 rounded-xl transition-all flex items-center space-x-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Raise Grievance</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-400">
            Case Ref: <strong className="font-mono text-white">{activeCase.caseId}</strong>
          </div>
        </div>
      </div>

      {/* 2. Active Scholarship Cases Selector */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Multi-Scheme Portfolio
            </span>
            <h3 className="text-sm font-bold text-slate-900">
              Active Scholarship & Fellowship Cases
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            Switch between schemes to inspect distinct case lifecycles
          </span>
        </div>

        {/* 3 Interactive Scheme Cards with Visible CASE IDs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              id: 'MOTA-NFST-2025-0482',
              schemeName: 'National Fellowship for ST (NFST)',
              level: 'Ph.D. in Plant Molecular Biology',
              inst: 'Indian Institute of Science (IISc), Bengaluru',
              caseId: 'MOTA-NFST-2025-0482',
              status: 'Selected',
              readiness: 'BLOCKED',
              score: '4/6',
              tag: 'Quarterly Dean Seal Blocker'
            },
            {
              id: 'MOTA-NOS-2025-0119',
              schemeName: 'National Overseas Scholarship (NOS)',
              level: 'M.Sc. in Renewable Energy Systems',
              inst: 'University of Oxford, United Kingdom',
              caseId: 'MOTA-NOS-2025-0119',
              status: 'Selected',
              readiness: 'BLOCKED',
              score: '3/6',
              tag: 'Visa & Legal Bond Blocker'
            },
            {
              id: 'MOTA-TOPCLASS-2025-0891',
              schemeName: 'Top Class Education Scheme',
              level: 'B.Tech in Computer Science & Engineering',
              inst: 'IIT Bombay (IITB)',
              caseId: 'MOTA-TOPCLASS-2025-0891',
              status: 'Payment Ready',
              readiness: 'PAYMENT_READY',
              score: '6/6',
              tag: '100% Cleared for PFMS Batch'
            }
          ].map(schemeItem => {
            const isSelected = schemeItem.id === activeCase.caseId;
            return (
              <div
                key={schemeItem.id}
                onClick={() => handleCaseSelect(schemeItem.id)}
                className={`p-4 rounded-xl border text-xs cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/50 shadow-md ring-2 ring-amber-400'
                    : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-slate-100/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded text-[11px]">
                      {schemeItem.caseId}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-700">
                        {schemeItem.score}
                      </span>
                      <StatusBadge status={schemeItem.readiness} size="xs" />
                    </div>
                  </div>

                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm mt-1">
                    {schemeItem.schemeName}
                  </h4>
                  <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                    {schemeItem.level}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate mt-0.5">
                    {schemeItem.inst}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-700">{schemeItem.tag}</span>
                  <span className={`font-bold ${isSelected ? 'text-amber-800' : 'text-slate-400'}`}>
                    {isSelected ? 'Active View ●' : 'Select →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3 & 4. Visual 12-Stage Lifecycle Timeline */}
      <ApplicantLifecycleTimeline activeCase={activeCase} />

      {/* 5. CRITICAL PRODUCT PRINCIPLE CALLOUT: “Selected ≠ Payment Ready” */}
      {activeCase.paymentReadinessStatus === 'BLOCKED' && (
        <div className="bg-white rounded-2xl border-2 border-red-300 shadow-sm p-6 relative overflow-hidden space-y-4">
          
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-red-100 gap-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-100 px-2 py-0.5 rounded">
                  Core Ministry Operational Rule
                </span>
                <h3 className="text-base font-black text-slate-900 mt-0.5">
                  Selected ≠ Payment Ready
                </h3>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[11px] font-semibold text-slate-500">Case ID</span>
              <p className="font-mono font-bold text-slate-800">{activeCase.caseId}</p>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Congratulations on being <span className="font-bold text-slate-900">Selected</span> on the official MoTA merit panel! 
            However, under Ministry financial compliance guidelines, funds cannot be transferred until all institutional 
            and legal verification gates are completed.
          </p>

          {/* Structured Blocker Matrix Required by User Prompt */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 bg-red-50/50 p-4 rounded-xl border border-red-200 text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Current Status
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <StatusBadge status={activeCase.overallStatus} size="sm" />
                <span className="text-[10px] text-slate-500 font-medium">(Award Sanctioned)</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Payment-Readiness Status
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <StatusBadge status={activeCase.paymentReadinessStatus} size="sm" />
                <span className="text-[10px] text-red-700 font-bold font-mono">
                  (Hold: ₹{activeCase.stipendPending.toLocaleString('en-IN')})
                </span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Blocker
              </span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                {activeCase.caseId === 'MOTA-NFST-2025-0482' && 'Compliance certificate pending (Quarterly continuation missing Dean seal & supervisor signature)'}
                {activeCase.caseId === 'MOTA-NOS-2025-0119' && 'Academic Bond Sureties pending physical verification & Tier-4 UK Visa sticker copy missing'}
                {activeCase.caseId !== 'MOTA-NFST-2025-0482' && activeCase.caseId !== 'MOTA-NOS-2025-0119' && 'Aadhaar NPCI active mandate verification'}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Dependency
              </span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                {activeCase.caseId === 'MOTA-NFST-2025-0482' && 'Institution verification (Dean of Science, IISc Bengaluru Academic Section)'}
                {activeCase.caseId === 'MOTA-NOS-2025-0119' && 'Gazetted Officer Employment Verification (PWD Jharkhand) & VFS Global'}
                {activeCase.caseId !== 'MOTA-NFST-2025-0482' && activeCase.caseId !== 'MOTA-NOS-2025-0119' && 'Lead Bank District Manager'}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Required Next Action
              </span>
              <span className="font-bold text-amber-900 mt-0.5 block">
                {activeCase.caseId === 'MOTA-NFST-2025-0482' && 'Upload / verify required certificate with Dean round seal'}
                {activeCase.caseId === 'MOTA-NOS-2025-0119' && 'Submit Surety 2 Form-16 and stamped student visa page'}
                {activeCase.caseId !== 'MOTA-NFST-2025-0482' && activeCase.caseId !== 'MOTA-NOS-2025-0119' && 'Enable DBT mandate at bank branch'}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Last Updated & Authority
              </span>
              <span className="text-slate-600 mt-0.5 block">
                <strong>02-Sep-2025, 10:10 AM</strong> • Dr. Rajesh Meena, Nodal Verification Officer, MoTA
              </span>
            </div>
          </div>

        </div>
      )}

      {/* 6. Deficiency Cards (Student-Friendly Format with Resubmit & AI Pre-check) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                Action Required
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {caseDeficiencies.length} Registered Deficiencies
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              Document Deficiency & Remediation Desk
            </h3>
          </div>

          <span className="text-xs text-slate-500">
            Clear instructions in plain student language
          </span>
        </div>

        {/* Live AI Pre-Scan Overlay when resubmitting */}
        {scanningDefId && (
          <div className="p-5 bg-slate-900 text-white rounded-2xl shadow-xl border border-slate-700 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2.5">
              <span className="font-bold text-amber-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                Live AI Document Pre-Scan Running on Resubmitted PDF...
              </span>
              <span className="font-mono text-xs text-slate-400">Ref: {scanningDefId}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className={`p-2.5 rounded-lg border ${scanStep >= 1 ? 'bg-slate-800 border-amber-400 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                <span className="font-semibold block text-[11px]">1. Neural OCR Scan</span>
                <p className="text-[10px] mt-0.5">{scanStep >= 1 ? '99.2% Text Extracted' : 'Waiting...'}</p>
              </div>
              <div className={`p-2.5 rounded-lg border ${scanStep >= 2 ? 'bg-slate-800 border-amber-400 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                <span className="font-semibold block text-[11px]">2. Seal Detection</span>
                <p className="text-[10px] mt-0.5">{scanStep >= 2 ? 'Institutional Seal Found' : 'Analyzing...'}</p>
              </div>
              <div className={`p-2.5 rounded-lg border ${scanStep >= 3 ? 'bg-slate-800 border-amber-400 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                <span className="font-semibold block text-[11px]">3. Dean Sign Check</span>
                <p className="text-[10px] mt-0.5">{scanStep >= 3 ? 'Signatures Validated' : 'Matching...'}</p>
              </div>
              <div className={`p-2.5 rounded-lg border ${scanStep >= 4 ? 'bg-emerald-950 border-emerald-400 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                <span className="font-semibold block text-[11px]">4. Gate Clearance</span>
                <p className="text-[10px] mt-0.5">{scanStep >= 4 ? '100% Cleared!' : 'Pending...'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Deficiencies Cards List */}
        {caseDeficiencies.length === 0 ? (
          <div className="py-8 text-center bg-slate-50 rounded-xl border border-slate-200">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-900">Zero Active Deficiencies!</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              All documents are compliant. Case is ready for treasury batch release.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {caseDeficiencies.map(def => {
              const isResolved = def.status === 'RESOLVED';
              return (
                <div
                  key={def.deficiencyId}
                  className={`p-5 rounded-2xl border transition-all space-y-4 ${
                    isResolved
                      ? 'bg-emerald-50/50 border-emerald-300'
                      : 'bg-white border-red-300 shadow-sm'
                  }`}
                >
                  {/* Deficiency Title & Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-3 border-b border-slate-100 gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                          {def.deficiencyId}
                        </span>
                        <span className="text-xs font-bold text-slate-900">
                          {def.deficiencyId === 'DEF-NFST-2025-091' ? 'Missing University Dean Seal on Quarterly Certificate' : def.defectSummary}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Related Document: <strong className="text-slate-800">{def.documentType}</strong>
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        isResolved ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {isResolved ? 'RESOLVED & VERIFIED' : 'ACTION REQUIRED'}
                      </span>
                      {!isResolved && (
                        <span className="text-xs font-semibold text-red-600 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{def.daysLeft} Days Left</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Structured Details: Rule, Evidence, Explanation, Required Action */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    
                    {/* Left: Rule & Evidence */}
                    <div className="space-y-2.5">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                          Rule / Scheme Requirement
                        </span>
                        <p className="text-slate-700 font-mono text-[11px] leading-snug">
                          {def.guidelineClause}
                        </p>
                      </div>

                      <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-red-950">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 block mb-0.5">
                          Evidence / What AI Detected
                        </span>
                        <p className="leading-snug">
                          {def.defectSummary}
                        </p>
                      </div>
                    </div>

                    {/* Right: Explanation & Required Action */}
                    <div className="space-y-2.5">
                      <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-blue-950">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block mb-0.5">
                          Student-Friendly Explanation
                        </span>
                        <p className="leading-relaxed text-[11px]">
                          Government audit guidelines require the University Dean or Registrar to officially verify that you are active in research before releasing funds. Your scholarship is completely safe; you simply need the official seal on Annexure-IV!
                        </p>
                      </div>

                      <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-0.5">
                          Required Action For You
                        </span>
                        <p className="font-semibold leading-relaxed">
                          {def.actionRequired}
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Resubmit Action Button */}
                  <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-[11px] text-slate-500">
                      Need help? You can also upload an e-Signed certificate authenticated by your Dean.
                    </span>

                    {!isResolved ? (
                      <button
                        onClick={() => handleSimulateResubmit(def.deficiencyId)}
                        className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-2 shadow-xs transition-all flex-shrink-0"
                      >
                        <UploadCloud className="w-4 h-4" />
                        <span>Resubmit Document with Instant AI Pre-Check</span>
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Deficiency Resolved & Verified via AI Inspection. Gate Cleared!</span>
                      </span>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 7. Payment Readiness Matrix (6 Gates Inspection) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Disbursement Checkpoints
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              Six-Gate Payment Readiness Status
            </h3>
          </div>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
            activeCase.paymentReadinessStatus === 'PAYMENT_READY' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
          }`}>
            Score: {activeCase.paymentGatesScore} Gates Passed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { id: 'G1', title: '1. Selection Sanction', desc: 'Merit list verified', data: activeCase.gates.G1 },
            { id: 'G2', title: '2. Aadhaar-Bank Seeding', desc: 'NPCI DBT active mandate', data: activeCase.gates.G2 },
            { id: 'G3', title: '3. PFMS Master Code', desc: 'Account verified >=90%', data: activeCase.gates.G3 },
            { id: 'G4', title: '4. Dean Continuity', desc: 'Quarterly attendance proof', data: activeCase.gates.G4 },
            { id: 'G5', title: '5. Scheme Compliance', desc: 'Bond / fee receipt audited', data: activeCase.gates.G5 },
            { id: 'G6', title: '6. PFMS Batching', desc: 'Ready for DSC digital transfer', data: activeCase.gates.G6 }
          ].map(g => {
            const isOk = g.data?.passed;
            return (
              <div
                key={g.id}
                className={`p-3.5 rounded-xl border text-xs transition-all space-y-1 ${
                  isOk
                    ? 'bg-emerald-50/60 border-emerald-200'
                    : 'bg-red-50/70 border-red-200'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span className="text-slate-900">{g.title}</span>
                  {isOk ? (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.2 rounded font-bold">
                      CLEARED
                    </span>
                  ) : (
                    <span className="text-[10px] bg-red-100 text-red-800 px-2 py-0.2 rounded font-bold">
                      HOLD
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-600 font-medium leading-snug">
                  {g.data?.remarks || g.desc}
                </p>
                {g.data?.verifiedAt && (
                  <p className="text-[10px] text-slate-400">
                    Verified: {g.data.verifiedAt}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 8 & 9. Notifications & Grievances Quick Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Notifications Panel */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <Bell className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold text-slate-900">Scholar Alerts & Updates</h3>
            </div>
            <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
              Live Feed
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl space-y-1">
              <div className="flex items-center justify-between font-bold text-red-900">
                <span>Action Required on Annexure-IV</span>
                <span className="text-[10px] text-red-600">5 Days Left</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Institutional round seal is required on your quarterly continuation report to release ₹1,11,000 stipend.
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span>PFMS Beneficiary Code Active</span>
                <span className="text-[10px] text-slate-400">25-Aug</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Bank account at State Bank of India (SBIN0002215) validated with 98.4% name match score.
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span>DigiLocker Caste Verification</span>
                <span className="text-[10px] text-slate-400">18-Jul</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Caste Certificate MP-ST-DIN-2022-88192 verified with Article 342 Presidential Order.
              </p>
            </div>
          </div>
        </div>

        {/* Grievance & Help Desk Panel */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Grievance & Scholar Support</h3>
              </div>
              <span className="text-[10px] font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded-full">
                48h SLA
              </span>
            </div>

            {activeCaseGrievances.length > 0 ? (
              <div className="space-y-2 mt-3">
                {activeCaseGrievances.map(grv => (
                  <div key={grv.ticketId} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-slate-900">{grv.subject}</span>
                      <span className="text-[10px] font-mono text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded">
                        {grv.ticketId}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">{grv.latestResponse}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-4 text-center text-xs text-slate-400">
                No open grievances for this case.
              </div>
            )}
          </div>

          <button
            onClick={() => setShowGrievanceModal(true)}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors mt-3"
          >
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>Lodge a New Grievance Ticket</span>
          </button>
        </div>

      </div>

      {/* All Dialogs & Modals */}
      <AcknowledgementModal
        isOpen={showAckModal}
        onClose={() => setShowAckModal(false)}
        activeCase={activeCase}
      />

      <SubmittedDocsModal
        isOpen={showDocsModal}
        onClose={() => setShowDocsModal(false)}
        activeCase={activeCase}
      />

      <RaiseGrievanceModal
        isOpen={showGrievanceModal}
        onClose={() => setShowGrievanceModal(false)}
        activeCase={activeCase}
      />

    </div>
  );
};
