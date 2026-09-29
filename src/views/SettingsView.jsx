import React from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Users,
  ShieldCheck,
  CreditCard,
  FileCheck2,
  Globe2,
  Layers
} from 'lucide-react';

export const SettingsView = () => {
  const { resetDemoData, switchPersona, setCurrentView } = useApp();

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Smart India Hackathon • Evaluator Guide
              </span>
              <span className="text-xs text-slate-500">Ministry of Tribal Affairs Prototype</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              Interactive 5-Minute Judge Demo Walkthrough
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Use this guided script to experience the core differentiator:
              <strong> “Selected ≠ Payment Ready”</strong> and the <strong>Case-Centric Intelligence Layer</strong>.
            </p>
          </div>

          <button
            onClick={resetDemoData}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center space-x-2 flex-shrink-0"
          >
            <RotateCcw className="w-4 h-4 text-slate-600" />
            <span>Reset Demo State to Baseline</span>
          </button>
        </div>
      </div>

      {/* Step-by-Step Evaluator Script */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Recommended 5-Step Evaluation Journey</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs">
          
          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2 flex flex-col justify-between">
            <div>
              <span className="w-6 h-6 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-xs mb-2">
                1
              </span>
              <h4 className="font-bold text-slate-900 text-sm">The "Selected" Trap</h4>
              <p className="text-slate-600 mt-1 leading-relaxed">
                Log in as <strong>Sunita Maravi</strong> (Applicant). Notice that while her merit award is confirmed, her 
                <strong> ₹1,11,000 stipend is BLOCKED</strong> at Gate 4 because her IISc continuation report lacks a Dean seal.
              </p>
            </div>
            <button
              onClick={() => {
                switchPersona('persona-1');
                setCurrentView('dashboard');
              }}
              className="mt-3 w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-1.5 rounded-lg text-xs"
            >
              Start as Sunita →
            </button>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2 flex flex-col justify-between">
            <div>
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs mb-2">
                2
              </span>
              <h4 className="font-bold text-slate-900 text-sm">AI Remediation</h4>
              <p className="text-slate-600 mt-1 leading-relaxed">
                In the Deficiency Hub, click <strong>"Upload & Run AI Pre-Validation"</strong>. Watch real-time OCR verify the 
                institutional seal and auto-clear Gate 4 to make her <strong>100% Payment Ready</strong>!
              </p>
            </div>
            <button
              onClick={() => setCurrentView('deficiencies')}
              className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 rounded-lg text-xs"
            >
              Open Deficiencies →
            </button>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 space-y-2 flex flex-col justify-between">
            <div>
              <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-xs mb-2">
                3
              </span>
              <h4 className="font-bold text-slate-900 text-sm">Officer AI Desk</h4>
              <p className="text-slate-600 mt-1 leading-relaxed">
                Switch to <strong>Dr. Rajesh Meena</strong> (Verifier). Inspect the Document Intelligence lab to see Article 342 
                Presidential Order validation and anti-tamper font anomaly heuristics.
              </p>
            </div>
            <button
              onClick={() => {
                switchPersona('persona-2');
                setCurrentView('documents');
              }}
              className="mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1.5 rounded-lg text-xs"
            >
              Start as Verifier →
            </button>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2 flex flex-col justify-between">
            <div>
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs mb-2">
                4
              </span>
              <h4 className="font-bold text-slate-900 text-sm">DSC Batch Release</h4>
              <p className="text-slate-600 mt-1 leading-relaxed">
                Switch to <strong>Smt. Arundhati Soren</strong> (Admin). Open Payment Readiness, inspect the generated PFMS XML batch, 
                and execute digital signature (DSC) to release funds to the treasury.
              </p>
            </div>
            <button
              onClick={() => {
                switchPersona('persona-3');
                setCurrentView('payment-readiness');
              }}
              className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-1.5 rounded-lg text-xs"
            >
              Start as Admin →
            </button>
          </div>

          {/* Step 5 */}
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-300 space-y-2 flex flex-col justify-between">
            <div>
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs mb-2">
                5
              </span>
              <h4 className="font-bold text-slate-900 text-sm">National Insights</h4>
              <p className="text-slate-600 mt-1 leading-relaxed">
                Switch to <strong>Shri Vikram Singh, IAS</strong> (Super Admin). View the Deduplication Radar (prevented ₹14.2 Cr dual benefits) 
                and state-wise tribal disbursals.
              </p>
            </div>
            <button
              onClick={() => {
                switchPersona('persona-4');
                setCurrentView('reports');
              }}
              className="mt-3 w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-1.5 rounded-lg text-xs"
            >
              Start as Super Admin →
            </button>
          </div>

        </div>
      </div>

      {/* Prototype Architecture Specs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
          Prototype Technical Specifications & Standards Compliance
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-400 block font-semibold">Frontend Stack</span>
            <span className="font-bold text-slate-800 text-sm">React 18 + Vite 6</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-400 block font-semibold">Styling Standard</span>
            <span className="font-bold text-slate-800 text-sm">Tailwind CSS (Govt UI)</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-400 block font-semibold">Cloud Architecture</span>
            <span className="font-bold text-slate-800 text-sm">NIC Meghraj Serverless</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-400 block font-semibold">Accessibility & Security</span>
            <span className="font-bold text-slate-800 text-sm">WCAG 2.1 AA / Cert-In</span>
          </div>
        </div>
      </div>

    </div>
  );
};
