import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Search, X, FolderOpen, AlertTriangle, User, Building, ArrowRight } from 'lucide-react';

export const SearchModal = () => {
  const {
    searchModalOpen,
    setSearchModalOpen,
    cases,
    deficiencies,
    setSelectedCaseId,
    setCurrentView
  } = useApp();

  const [query, setQuery] = useState('');

  // Handle Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
      if (e.key === 'Escape' && searchModalOpen) {
        setSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchModalOpen]);

  if (!searchModalOpen) return null;

  const filteredCases = query.trim() === ''
    ? cases.slice(0, 4)
    : cases.filter(c =>
        c.caseId.toLowerCase().includes(query.toLowerCase()) ||
        c.applicantName.toLowerCase().includes(query.toLowerCase()) ||
        c.institution.toLowerCase().includes(query.toLowerCase()) ||
        c.tribe.toLowerCase().includes(query.toLowerCase()) ||
        c.scheme.toLowerCase().includes(query.toLowerCase())
      );

  const filteredDeficiencies = query.trim() === ''
    ? deficiencies.slice(0, 3)
    : deficiencies.filter(d =>
        d.deficiencyId.toLowerCase().includes(query.toLowerCase()) ||
        d.applicantName.toLowerCase().includes(query.toLowerCase()) ||
        d.defectCode.toLowerCase().includes(query.toLowerCase()) ||
        d.documentType.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelectCase = (caseId) => {
    setSelectedCaseId(caseId);
    setCurrentView('cases');
    setSearchModalOpen(false);
    setQuery('');
  };

  const handleSelectDeficiency = (caseId) => {
    setSelectedCaseId(caseId);
    setCurrentView('deficiencies');
    setSearchModalOpen(false);
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-16 px-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center space-x-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Type applicant name, case ID (e.g. MOTA-NFST), tribe, institute, or defect code..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent border-0 text-slate-900 text-sm focus:ring-0 focus:outline-none placeholder:text-slate-400"
          />
          <button
            onClick={() => setSearchModalOpen(false)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          
          {/* Cases Section */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
              <span>Beneficiary Cases ({filteredCases.length})</span>
              <span className="text-[10px] text-slate-400">Click to inspect 360° Dossier</span>
            </div>
            {filteredCases.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-2">No matching cases found</p>
            ) : (
              <div className="space-y-1.5">
                {filteredCases.map(c => (
                  <div
                    key={c.caseId}
                    onClick={() => handleSelectCase(c.caseId)}
                    className="p-2.5 rounded-xl border border-slate-100 hover:border-amber-300 hover:bg-amber-50/40 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-xs group-hover:bg-amber-100 group-hover:text-amber-900">
                        {c.scheme}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-slate-900">{c.applicantName}</span>
                          <span className="text-[10px] font-mono text-slate-500">{c.caseId}</span>
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                            c.paymentReadinessStatus === 'PAYMENT_READY' ? 'bg-emerald-100 text-emerald-800' :
                            c.paymentReadinessStatus === 'BLOCKED' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {c.paymentGatesScore} Gates ({c.paymentReadinessStatus})
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate max-w-md">
                          {c.institution} • {c.tribe} ({c.state})
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700 group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Deficiencies Section */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Deficiencies ({filteredDeficiencies.length})
            </div>
            <div className="space-y-1.5">
              {filteredDeficiencies.map(d => (
                <div
                  key={d.deficiencyId}
                  onClick={() => handleSelectDeficiency(d.caseId)}
                  className="p-2.5 rounded-xl border border-slate-100 hover:border-red-300 hover:bg-red-50/40 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600 font-bold text-xs">
                      DEF
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-slate-900">{d.applicantName}</span>
                        <span className="text-[10px] font-mono text-red-700">{d.deficiencyId}</span>
                        <span className="text-[9px] bg-red-100 text-red-800 px-1.5 py-0.2 rounded font-medium">
                          {d.defectCode}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate max-w-md">
                        {d.documentType} • {d.defectSummary}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-red-700 group-hover:translate-x-0.5 transition-all" />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>Pro tip: Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">Esc</kbd> to close</span>
          <span className="text-amber-700 font-semibold">MoTA Case-Centric Search</span>
        </div>

      </div>
    </div>
  );
};
