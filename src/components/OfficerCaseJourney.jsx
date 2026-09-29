import React from 'react';
import { Check, AlertCircle, Clock, ShieldCheck, ChevronRight } from 'lucide-react';

export const OFFICER_JOURNEY_STAGES = [
  { id: 1, code: 'APPLICATION', label: 'Application', desc: 'Case submitted & registered' },
  { id: 2, code: 'VERIFICATION', label: 'Verification', desc: 'Document & OCR inspection' },
  { id: 3, code: 'DEFICIENCY', label: 'Deficiency', desc: 'Compliance defect flagged' },
  { id: 4, code: 'RESUBMISSION', label: 'Resubmission', desc: 'Revised document submitted' },
  { id: 5, code: 'SELECTION', label: 'Selection', desc: 'Merit list sanction issued' },
  { id: 6, code: 'COMPLIANCE', label: 'Compliance', desc: 'Institute & bond checks' },
  { id: 7, code: 'PAYMENT_READINESS', label: 'Payment Readiness', desc: '6-Gate audit clearance' },
  { id: 8, code: 'PAYMENT', label: 'Payment', desc: 'PFMS DBT disbursement' }
];

export const OfficerCaseJourney = ({ currentStageName, isBlocked, isDisbursed }) => {
  // Map current stage to stage id (1 to 8)
  const getActiveStageId = () => {
    if (isDisbursed) return 8;
    const stageMap = {
      'Application': 1,
      'Verification': 2,
      'Deficiency': 3,
      'Resubmission': 4,
      'Selection': 5,
      'Compliance': 6,
      'Payment Readiness': 7,
      'Payment': 8
    };
    return stageMap[currentStageName] || 6;
  };

  const activeId = getActiveStageId();

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
            Case Lifecycle Journey
          </span>
          <span className="text-xs text-slate-400">8 Standard Verification Milestones</span>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-400">Active Stage:</span>
          <span className={`font-bold px-2 py-0.5 rounded ${
            isDisbursed ? 'bg-emerald-500/20 text-emerald-300' :
            isBlocked ? 'bg-red-500/20 text-red-300 border border-red-500/40' :
            'bg-amber-500/20 text-amber-300 border border-amber-500/40'
          }`}>
            Stage {activeId}/8 • {OFFICER_JOURNEY_STAGES[activeId - 1]?.label}
          </span>
        </div>
      </div>

      {/* Stepper Grid */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[680px] flex items-center justify-between relative px-2">
          
          {/* Connector Line behind */}
          <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-800 -z-0">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-amber-500 transition-all duration-500"
              style={{ width: `${((activeId - 1) / (OFFICER_JOURNEY_STAGES.length - 1)) * 100}%` }}
            ></div>
          </div>

          {OFFICER_JOURNEY_STAGES.map(stage => {
            const isPassed = stage.id < activeId;
            const isCurrent = stage.id === activeId;
            const isBlockNode = isCurrent && isBlocked;

            return (
              <div key={stage.id} className="flex flex-col items-center relative z-10" style={{ width: '80px' }}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-md ${
                    isPassed
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                      ? isBlockNode
                        ? 'bg-red-600 text-white ring-4 ring-red-500/30 animate-pulse'
                        : 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/30'
                      : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}
                >
                  {isPassed ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : isBlockNode ? (
                    <AlertCircle className="w-4 h-4" />
                  ) : (
                    <span>{stage.id}</span>
                  )}
                </div>

                <span className={`text-[11px] mt-2 font-bold text-center leading-tight ${
                  isCurrent ? (isBlockNode ? 'text-red-400' : 'text-amber-400') :
                  isPassed ? 'text-slate-200' : 'text-slate-500'
                }`}>
                  {stage.label}
                </span>

                <span className="text-[9px] text-slate-400 text-center mt-0.5 line-clamp-1">
                  {stage.desc}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
