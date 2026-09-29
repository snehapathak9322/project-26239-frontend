import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  Play,
  RotateCcw,
  ShieldCheck,
  Globe2,
  FileCheck2,
  UserCheck,
  Building,
  Lock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const DemoScenarioRunner = () => {
  const {
    setCurrentView,
    setSelectedCaseId,
    resolveDeficiency,
    cases,
    showToast
  } = useApp();

  // Active scenario: CASE1_NFST vs CASE2_NOS
  const [activeScenario, setActiveScenario] = useState('CASE1_NFST');
  const [currentStep, setCurrentStep] = useState(0);

  // Case 1: 10-Stage End-to-End Walkthrough of Sunita Maravi (MOTA-NFST-2025-0482)
  const case1Steps = [
    {
      step: 1,
      title: 'Application Submitted',
      badge: 'Portal Ingest',
      description: 'Scholar Sunita Maravi submits Ph.D. application on the NFST UGC/INFLIBNET portal with IISc enrollment details.',
      stateSnapshot: {
        stage: 'SUBMITTED',
        selection: 'Pending Evaluation',
        paymentReadiness: 'NOT_EVALUATED (0/6 Gates)',
        systemAction: 'DigiLocker Cryptographic XML confirms Gond tribe status under Article 342.'
      },
      targetView: 'cases',
      caseId: 'MOTA-NFST-2025-0482'
    },
    {
      step: 2,
      title: 'Deficiency Found',
      badge: 'AI Optical Flag',
      description: 'AI Document Intelligence analyzes Annexure-IV continuation certificate and flags missing Dean of Academic Affairs round seal.',
      stateSnapshot: {
        stage: 'DEFICIENCY FOUND',
        selection: 'Under Verification',
        paymentReadiness: 'BLOCKED (Gate 4 Fail)',
        systemAction: 'Deficiency DEF-NFST-2025-091 created with 15-day resolution window.'
      },
      targetView: 'documents',
      caseId: 'MOTA-NFST-2025-0482'
    },
    {
      step: 3,
      title: 'AI Explains Deficiency',
      badge: 'Plain Language Legal Aid',
      description: 'AI breaks down Clause 8.3 into bilingual Hindi/English guidance, explaining why Supervisor sign-off alone cannot authorize PFMS disbursement.',
      stateSnapshot: {
        stage: 'CORRECTION REQUIRED',
        selection: 'Under Verification',
        paymentReadiness: 'BLOCKED (Disbursement Hold)',
        systemAction: 'Statutory Notice F.No. MoTA/SCHOLAR/DEF/2025/0482 drafted for officer approval.'
      },
      targetView: 'deficiencies',
      caseId: 'MOTA-NFST-2025-0482'
    },
    {
      step: 4,
      title: 'Applicant Correction',
      badge: 'Scholar Action',
      description: 'Sunita Maravi visits IISc Academic Office, obtains Dean Bhattacharya’s official round seal & signature, and uploads rectified color PDF.',
      stateSnapshot: {
        stage: 'RESUBMITTED',
        selection: 'Under Verification',
        paymentReadiness: 'BLOCKED (Pending Verification)',
        systemAction: 'Uploaded: IISc_NFST_Annexure_IV_Q1_Rectified.pdf with 98.6% OCR clarity.'
      },
      targetView: 'dashboard',
      caseId: 'MOTA-NFST-2025-0482'
    },
    {
      step: 5,
      title: 'Officer Verifies Evidence',
      badge: 'Desk Verifier L-2',
      description: 'Dr. Rajesh Meena uses side-by-side evidence crop to authenticate the institutional round seal and clears Deficiency DEF-NFST-2025-091.',
      stateSnapshot: {
        stage: 'VERIFIED',
        selection: 'Recommended by Desk',
        paymentReadiness: 'EVALUATING (Gate 4 Clear)',
        systemAction: 'Audit entry AUD-88903 logged. Gate 4 marked True.'
      },
      targetView: 'cases',
      caseId: 'MOTA-NFST-2025-0482'
    },
    {
      step: 6,
      title: 'Case Selected',
      badge: 'National Merit Quota',
      description: 'Selection Committee publishes National Merit Panel. Sunita Maravi is awarded NFST Ph.D. Fellowship (ST Rank 04).',
      stateSnapshot: {
        stage: 'SELECTED',
        selection: 'Merit Award Confirmed',
        paymentReadiness: 'COMPLIANCE AUDIT (Gate 1 Passed)',
        systemAction: 'Award letter generated and synced to DigiLocker.'
      },
      targetView: 'cases',
      caseId: 'MOTA-NFST-2025-0482'
    },
    {
      step: 7,
      title: 'Payment Readiness = BLOCKED',
      badge: 'Selected ≠ Payment Ready',
      description: 'Crucial Proof: The student is officially Selected, yet the system strictly blocks payment because final quarterly batch staging requires Gate 6 DSC clearance.',
      stateSnapshot: {
        stage: 'COMPLIANCE PENDING',
        selection: 'Selected (Awarded)',
        paymentReadiness: 'BLOCKED (4/6 Gates Cleared)',
        systemAction: 'Direct Benefit Transfer (DBT) held back to prevent audit recovery proceedings.'
      },
      targetView: 'payment-readiness',
      caseId: 'MOTA-NFST-2025-0482'
    },
    {
      step: 8,
      title: 'Officer Opens Blocker',
      badge: 'Disbursement Inspector',
      description: 'Officer inspects the Payment Blocker drawer, verifying NPCI Aadhaar seeding and PFMS party master registration.',
      stateSnapshot: {
        stage: 'PAYMENT READINESS CHECK',
        selection: 'Selected',
        paymentReadiness: 'READY FOR CLEARANCE',
        systemAction: 'Payment gates 1, 2, 3, 4, 5 reconciled against banking ledger.'
      },
      targetView: 'payment-readiness',
      caseId: 'MOTA-NFST-2025-0482'
    },
    {
      step: 9,
      title: 'Dependency Resolved → Payment Readiness = READY',
      badge: '6/6 Gates Cleared',
      description: 'All 6 statutory gates are fully satisfied! Overall status transitions to PAYMENT_READY.',
      stateSnapshot: {
        stage: 'PAYMENT READY',
        selection: 'Selected',
        paymentReadiness: 'PAYMENT_READY (6/6 Gates)',
        systemAction: 'Eligible for immediate inclusion into electronic PFMS DBT Batch.'
      },
      targetView: 'payment-readiness',
      caseId: 'MOTA-NFST-2025-0482'
    },
    {
      step: 10,
      title: 'Payment Processing (PFMS DBT Batch Release)',
      badge: 'Treasury Wire',
      description: 'Drawing & Disbursing Officer digitally signs electronic DBT batch via DSC. Stipend ₹1,11,000 transmitted via RBI e-Kuber gateway.',
      stateSnapshot: {
        stage: 'PAYMENT PROCESSING → PAID',
        selection: 'Selected',
        paymentReadiness: 'DISBURSED',
        systemAction: 'Batch BATCH-MOTA-NFST-2025-Q1-TR01 transmitted to PFMS with valid UTR.'
      },
      targetView: 'payment-readiness',
      caseId: 'MOTA-NFST-2025-0482'
    }
  ];

  // Case 2: NOS Special Case - Birsa Soren (MOTA-NOS-2025-0119)
  const case2Steps = [
    {
      step: 1,
      title: 'Selection & Provisional Award',
      badge: 'MoTA Overseas Cell',
      description: 'Birsa Soren is awarded provisional National Overseas Scholarship for M.Sc. Renewable Energy at University of Oxford (QS Rank #3).',
      stateSnapshot: {
        stage: 'SELECTED (PROVISIONAL)',
        awardValue: '£31,250 Tuition + £9,900 Maintenance (~₹42 Lakhs)',
        paymentStatus: 'STRICT HOLD'
      },
      targetView: 'cases',
      caseId: 'MOTA-NOS-2025-0119'
    },
    {
      step: 2,
      title: 'State / UT Verification Passed',
      badge: 'Jharkhand Tribal Directorate',
      description: 'Jharkhand State Tribal Welfare Department and Sub-Registrar Dumka verify ST caste legitimacy and parental land records.',
      stateSnapshot: {
        stage: 'STATE VERIFICATION PASSED',
        casteStatus: 'Santhal ST Certified (JH-ST-DMK-2021-39100)',
        incomeStatus: 'Parental Income ₹4,20,000 (Within ₹6L Ceiling)'
      },
      targetView: 'documents',
      caseId: 'MOTA-NOS-2025-0119'
    },
    {
      step: 3,
      title: 'Pending External Authority Dependencies',
      badge: 'External Dependency Hold',
      description: 'High-Value Wire Transfer (₹18.45 Lakhs equivalent) is blocked pending two external authorities: 1) VFS UK Stamped Visa Vignette and 2) Physical DDO attestation of Gazetted Surety-2.',
      stateSnapshot: {
        stage: 'EXTERNAL DEPENDENCY BLOCKER',
        dependency1: 'Indian High Commission / VFS Global: Tier-4 UK Student Visa Stamping',
        dependency2: 'PWD Jharkhand DDO: Surety-2 (Gazetted Officer) Solvency Attestation'
      },
      targetView: 'cross-portal',
      caseId: 'MOTA-NOS-2025-0119'
    }
  ];

  const activeSteps = activeScenario === 'CASE1_NFST' ? case1Steps : case2Steps;
  const currentStepData = activeSteps[currentStep] || activeSteps[0];

  const handleNext = () => {
    if (currentStep < activeSteps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      const stepItem = activeSteps[nextStep];
      if (stepItem.caseId) setSelectedCaseId(stepItem.caseId);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      const stepItem = activeSteps[prevStep];
      if (stepItem.caseId) setSelectedCaseId(stepItem.caseId);
    }
  };

  const handleJumpToStep = (index) => {
    setCurrentStep(index);
    const stepItem = activeSteps[index];
    if (stepItem.caseId) setSelectedCaseId(stepItem.caseId);
  };

  const handleExecuteLive = () => {
    if (currentStepData.caseId) setSelectedCaseId(currentStepData.caseId);
    setCurrentView(currentStepData.targetView);
    showToast(`Jumped to ${currentStepData.targetView.toUpperCase()} for Step ${currentStepData.step}: ${currentStepData.title}`, 'info');
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 border-2 border-amber-500/40 shadow-xl space-y-5">
      
      {/* Top Header & Core Axiom */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Interactive Flagship SIH Demo Stepper
            </span>
            <span className="text-xs text-slate-400">
              Deterministic End-to-End Case Progression
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-black text-white mt-1 flex items-center gap-2">
            <span>“Existing systems show the application status.</span>
            <span className="text-amber-400 underline decoration-amber-500/60">Our system explains the complete case.”</span>
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Live interactive scenario demonstrating the complete journey from initial deficiency detection to 
            final payment gate clearance. Experience how <em>Selected</em> transforms into <em>Payment Ready</em>.
          </p>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="flex items-center space-x-2 self-start lg:self-center">
          <button
            onClick={() => {
              setActiveScenario('CASE1_NFST');
              setCurrentStep(0);
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeScenario === 'CASE1_NFST'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Case 1: NFST 10-Stage Journey (Sunita Maravi)
          </button>

          <button
            onClick={() => {
              setActiveScenario('CASE2_NOS');
              setCurrentStep(0);
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeScenario === 'CASE2_NOS'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Case 2: NOS Overseas Dependencies (Birsa Soren)
          </button>
        </div>
      </div>

      {/* Stepper Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-amber-400">
            Stage {currentStepData.step} of {activeSteps.length}: <strong>{currentStepData.title}</strong>
          </span>
          <span className="font-mono text-slate-400 text-[11px]">
            {activeScenario === 'CASE1_NFST' ? 'MOTA-NFST-2025-0482' : 'MOTA-NOS-2025-0119'}
          </span>
        </div>

        {/* Step dots / segments */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
          {activeSteps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleJumpToStep(idx)}
              className={`h-2.5 rounded-full transition-all ${
                idx === currentStep
                  ? 'bg-amber-400 shadow-sm scale-105'
                  : idx < currentStep
                  ? 'bg-emerald-500'
                  : 'bg-slate-800 hover:bg-slate-700'
              }`}
              title={`Step ${s.step}: ${s.title}`}
            ></button>
          ))}
        </div>
      </div>

      {/* Active Step Showcase Card */}
      <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700/60">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 font-black text-sm flex items-center justify-center border border-amber-500/30">
              {currentStepData.step}
            </span>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400 font-mono tracking-wider">
                {currentStepData.badge}
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                {currentStepData.title}
              </h3>
            </div>
          </div>

          <button
            onClick={handleExecuteLive}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all flex items-center space-x-1.5 self-start sm:self-center shadow-xs"
          >
            <span>Execute Live in App View</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          {currentStepData.description}
        </p>

        {/* State Snapshot Details */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {Object.entries(currentStepData.stateSnapshot).map(([key, value], i) => (
            <div key={i} className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                {key.replace(/([A-Z])/g, ' $1')}
              </span>
              <span className="font-mono text-slate-200 text-[11px] block font-semibold leading-tight">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stepper Controls Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <button
          onClick={() => setCurrentStep(0)}
          className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Walkthrough to Start</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              currentStep > 0
                ? 'bg-slate-800 hover:bg-slate-700 text-white'
                : 'bg-slate-800/40 text-slate-600 cursor-not-allowed'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous Step</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentStep === activeSteps.length - 1}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              currentStep < activeSteps.length - 1
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs'
                : 'bg-slate-800/40 text-slate-600 cursor-not-allowed'
            }`}
          >
            <span>Next Stage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
