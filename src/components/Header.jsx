import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Bell,
  ChevronDown,
  Shield,
  Layers,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RefreshCw,
  UserCheck
} from 'lucide-react';

export const Header = () => {
  const {
    currentUser,
    switchPersona,
    USER_PERSONAS,
    setSearchModalOpen,
    setCurrentView,
    deficiencies,
    adapters
  } = useApp();

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);

  const activeDeficienciesCount = deficiencies.filter(d => d.status === 'ACTION_REQUIRED').length;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Tricolor Subtle Accent Bar */}
      <div className="gov-top-accent"></div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Ministry Emblem & Branding */}
          <div className="flex items-center space-x-3.5 cursor-pointer" onClick={() => setCurrentView('dashboard')}>
            {/* National Emblem SVG Icon */}
            <div className="w-10 h-10 rounded-lg bg-[#0A192F] flex items-center justify-center text-amber-400 font-bold border border-amber-500/30 shadow-sm flex-shrink-0">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4zm0 3.18l6 3v4.82c0 4.17-2.88 8.07-6 9.09-3.12-1.02-6-4.92-6-9.09V8.18l6-3zM12 7a2 2 0 100 4 2 2 0 000-4zm-3 7a3 3 0 016 0H9z" />
              </svg>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-bold tracking-wider uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  SIH Prototype • Ministry of Tribal Affairs
                </span>
                <span className="hidden md:inline-flex items-center text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse"></span>
                  Adapters Live
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight flex items-center gap-1.5">
                <span>MoTA Intelligence Layer</span>
                <span className="text-xs font-normal text-slate-500 hidden sm:inline">| अनुसूचित जनजाति छात्रवृत्ति प्रणाली</span>
              </h1>
            </div>
          </div>

          {/* Center: Search Trigger (Desktop) */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center space-x-2 text-xs text-slate-500 bg-slate-100 hover:bg-slate-200/80 px-3.5 py-1.5 rounded-full border border-slate-200 transition-colors w-72 justify-between"
            >
              <span className="flex items-center space-x-2">
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span>Search applicant, case ID, PFMS UTR...</span>
              </span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white rounded border border-slate-300 text-slate-500 shadow-xs">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right: Role Switcher & Persona Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Quick SIH Demo Persona Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className="flex items-center space-x-2 py-1 px-2.5 rounded-lg border border-amber-300 bg-amber-50/70 hover:bg-amber-100/80 text-amber-950 transition-all text-left shadow-xs"
                title="Switch Role for Judge Demo"
              >
                <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold">
                  {currentUser.avatar}
                </div>
                <div className="hidden sm:block text-xs">
                  <div className="font-semibold text-slate-900 flex items-center gap-1">
                    {currentUser.name}
                    <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded font-medium">
                      Demo Role
                    </span>
                  </div>
                  <div className="text-[10px] text-amber-800 truncate max-w-[140px]">
                    {currentUser.badge}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-amber-800" />
              </button>

              {/* Persona Switcher Dropdown Menu */}
              {showRoleMenu && (
                <div
                  className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setShowRoleMenu(false)}
                >
                  <div className="px-3.5 py-2 border-b border-slate-100">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Smart India Hackathon • Switch Evaluator Persona
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Experience the portal through 4 distinct stakeholder lenses:
                    </p>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {USER_PERSONAS.map(persona => {
                      const isActive = persona.id === currentUser.id;
                      return (
                        <button
                          key={persona.id}
                          onClick={() => {
                            switchPersona(persona.id);
                            setShowRoleMenu(false);
                          }}
                          className={`w-full text-left px-3.5 py-2.5 flex items-start space-x-3 transition-colors ${
                            isActive ? 'bg-amber-50/80' : 'hover:bg-slate-50'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                            isActive ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {persona.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-900">{persona.name}</span>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                                isActive ? 'bg-amber-200 text-amber-900' : 'bg-slate-100 text-slate-600'
                              }`}>
                                {persona.badge}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 truncate">{persona.designation}</p>
                            <p className="text-[10px] text-slate-400 italic mt-0.5">
                              {persona.role === 'applicant' && 'Focused on: Case tracking, Deficiency upload, Payment blockers'}
                              {persona.role === 'verifier' && 'Focused on: AI OCR, Guideline checks, Raising Deficiencies'}
                              {persona.role === 'admin' && 'Focused on: Payment readiness, PFMS Staging, Quota rules'}
                              {persona.role === 'superadmin' && 'Focused on: National KPIs, Deduplication Radar, Heatmaps'}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Notifications Button */}
            <div className="relative">
              <button
                onClick={() => setShowNotificationMenu(!showNotificationMenu)}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg relative"
                title="Notifications & Deficiencies"
              >
                <Bell className="w-5 h-5" />
                {activeDeficienciesCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                    {activeDeficienciesCount}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {showNotificationMenu && (
                <div
                  className="absolute right-0 mt-2 w-84 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50"
                  onMouseLeave={() => setShowNotificationMenu(false)}
                >
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">Deficiency & Disbursement Alerts</span>
                    <span className="text-[10px] font-medium bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                      {activeDeficienciesCount} Action Required
                    </span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    <div 
                      className="p-3 hover:bg-slate-50 cursor-pointer"
                      onClick={() => {
                        setCurrentView('deficiencies');
                        setShowNotificationMenu(false);
                      }}
                    >
                      <div className="flex items-start space-x-2.5">
                        <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-slate-800">
                            Sunita Maravi (IISc): Dean Seal Required
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Quarterly continuation certificate missing institutional seal. Blocker for ₹1.11 L release.
                          </p>
                          <span className="text-[10px] text-red-600 font-medium">SLA: 5 Days Left</span>
                        </div>
                      </div>
                    </div>
                    <div 
                      className="p-3 hover:bg-slate-50 cursor-pointer"
                      onClick={() => {
                        setCurrentView('deficiencies');
                        setShowNotificationMenu(false);
                      }}
                    >
                      <div className="flex items-start space-x-2.5">
                        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-slate-800">
                            Lakshmi Baiga (PVTG): Bank Mandate Inactive
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            NPCI returned dormant Aadhaar bridge error M04 on Bank of Baroda account.
                          </p>
                          <span className="text-[10px] text-amber-600 font-medium">SLA: 3 Days Left</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-center">
                    <button
                      onClick={() => {
                        setCurrentView('deficiencies');
                        setShowNotificationMenu(false);
                      }}
                      className="text-xs font-semibold text-blue-700 hover:text-blue-900"
                    >
                      View All Deficiencies →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Search Icon */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
