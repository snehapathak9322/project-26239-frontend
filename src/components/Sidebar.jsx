import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  FolderOpen,
  CreditCard,
  AlertTriangle,
  FileCheck2,
  Globe2,
  HelpCircle,
  BarChart3,
  Sliders,
  History,
  Settings,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Award,
  BookOpen,
  Scale,
  Compass,
  ChevronDown,
  Layers,
  UserCheck
} from 'lucide-react';

export const Sidebar = () => {
  const { currentView, setCurrentView, currentUser, deficiencies, cases } = useApp();

  const activeDeficienciesCount = deficiencies.filter(d => d.status === 'ACTION_REQUIRED').length;
  const paymentBlockedCount = cases.filter(c => c.paymentReadinessStatus === 'BLOCKED').length;

  // Role-Based Primary Flow Configuration
  const getRolePrimaryFlow = () => {
    switch (currentUser.role) {
      case 'applicant':
        return {
          title: 'Applicant Experience Flow',
          items: [
            { id: 'dashboard', label: 'My Case (Scholar Desk)', icon: LayoutDashboard, badge: currentUser.caseId || 'Active' },
            { id: 'documents', label: 'Submitted Documents', icon: FileCheck2, badge: 'AI OCR' },
            { id: 'deficiencies', label: 'Deficiencies & Action', icon: AlertTriangle, badge: activeDeficienciesCount > 0 ? `${activeDeficienciesCount} Action` : null, badgeColor: 'bg-red-500 text-white' },
            { id: 'grievances', label: 'Grievance & Help', icon: HelpCircle, badge: '48h SLA' }
          ]
        };
      case 'verifier':
        return {
          title: 'Officer Workflow Navigation',
          items: [
            { id: 'cases', label: 'Case Queue', icon: FolderOpen, badge: `${cases.length} Total` },
            { id: 'cases', label: 'Unified Case View', icon: UserCheck, badge: '9 Sections' },
            { id: 'deficiencies', label: 'Deficiency Hub', icon: AlertTriangle, badge: `${activeDeficienciesCount} Pending`, badgeColor: 'bg-red-500 text-white' },
            { id: 'payment-readiness', label: 'Payment Readiness Engine', icon: CreditCard, highlight: true, badge: `${paymentBlockedCount} Blocked` },
            { id: 'documents', label: 'AI Document Intelligence', icon: FileCheck2, badge: 'Heuristics' }
          ]
        };
      case 'admin':
        return {
          title: 'Scheme Administrator Flow',
          items: [
            { id: 'policy', label: 'Schemes Management (5 Schemes)', icon: Layers, badge: '5 Schemes' },
            { id: 'policy', label: 'Policies & Rule Builder', icon: Scale, badge: '2026–27' },
            { id: 'reports', label: 'Analytics & Ministry Reports', icon: BarChart3, badge: 'Outlays' },
            { id: 'payment-readiness', label: 'PFMS Batch Staging & DSC', icon: CreditCard, highlight: true, badge: 'Ready' }
          ]
        };
      case 'superadmin':
      default:
        return {
          title: 'Ministry Executive Flow',
          items: [
            { id: 'reports', label: 'Cross-Scheme Monitoring', icon: BarChart3, badge: 'National' },
            { id: 'audit', label: 'Audit Trail & Evidentiary Proof', icon: History, badge: 'NIC Crypt' },
            { id: 'cross-portal', label: 'Intelligence & Integration Hub', icon: Globe2, badge: '5 Systems' },
            { id: 'policy', label: 'Policy Conflicts Adjudication', icon: Scale, badge: 'Conflicts' }
          ]
        };
    }
  };

  const roleFlow = getRolePrimaryFlow();

  // All System Modules
  const allModules = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'cases', label: 'Case Queue & Unified View', icon: FolderOpen },
    { id: 'payment-readiness', label: 'Payment Readiness (6 Gates)', icon: CreditCard, highlight: true },
    { id: 'deficiencies', label: 'Deficiencies & AI Remediation', icon: AlertTriangle },
    { id: 'documents', label: 'AI Document Intelligence', icon: FileCheck2 },
    { id: 'cross-portal', label: 'Cross-Portal Intelligence Hub', icon: Globe2 },
    { id: 'policy', label: 'Scheme & Policy Engine', icon: Sliders },
    { id: 'reports', label: 'Ministry Analytics & Reports', icon: BarChart3 },
    { id: 'grievances', label: 'Notifications & Grievances', icon: HelpCircle },
    { id: 'audit', label: 'Evidence & Audit Trail', icon: History },
    { id: 'settings', label: 'Demo Guide & Architecture', icon: BookOpen }
  ];

  return (
    <aside className="w-64 bg-[#0A192F] text-slate-300 flex-shrink-0 flex flex-col justify-between hidden md:flex border-r border-slate-800">
      
      {/* Top Section */}
      <div className="py-4 overflow-y-auto max-h-[calc(100vh-80px)]">
        
        {/* Core Axiom Tagline Callout */}
        <div className="mx-3 mb-4 p-3 rounded-xl bg-slate-900/90 border border-amber-500/40 shadow-inner">
          <div className="flex items-center space-x-1.5 text-amber-400 text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span>Core Axiom</span>
          </div>
          <p className="text-xs font-black text-white mt-1 leading-snug">
            “Existing systems show status. Our system explains the case.”
          </p>
          <div className="mt-1 pt-1 border-t border-slate-800 text-[10px] text-amber-300 font-mono">
            Selected ≠ Payment Ready
          </div>
        </div>

        {/* 1. Primary Role-Based Navigation Flow */}
        <div className="px-3 mb-4">
          <div className="flex items-center justify-between px-3 text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1.5">
            <span>{roleFlow.title}</span>
            <Compass className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <nav className="space-y-1">
            {roleFlow.items.map((item, idx) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={`${item.id}-${idx}`}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-all text-left ${
                    isActive
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-slate-200 hover:bg-slate-800/80 hover:text-white'
                  } ${item.highlight && !isActive ? 'border border-amber-500/30 bg-amber-950/20 text-amber-200' : ''}`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : item.highlight ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                      item.badgeColor || (isActive ? 'bg-amber-700 text-white' : item.highlight ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-300')
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* 2. All System Modules Section */}
        <div className="px-3 pt-3 border-t border-slate-800">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            All System Modules
          </p>
          <nav className="space-y-1">
            {allModules.map(item => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-xs font-medium rounded-lg transition-all text-left ${
                    isActive
                      ? 'bg-slate-800 text-amber-400 font-bold'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                    <span className="truncate text-[11px]">{item.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

      </div>

      {/* Footer Info / Persona Context */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-900/80 flex-shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center font-bold text-xs">
            {currentUser.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-white truncate">{currentUser.name}</p>
            <p className="text-[10px] text-amber-400 font-medium truncate">{currentUser.badge}</p>
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            NIC Cloud Node
          </span>
          <span className="font-mono text-slate-500">SIH 2024–25</span>
        </div>
      </div>

    </aside>
  );
};
