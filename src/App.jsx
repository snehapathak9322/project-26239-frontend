import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { SearchModal } from './components/SearchModal';
import { Toast } from './components/Toast';

import { DashboardView } from './views/DashboardView';
import { CasesView } from './views/CasesView';
import { PaymentReadinessView } from './views/PaymentReadinessView';
import { DeficienciesView } from './views/DeficienciesView';
import { DocumentsView } from './views/DocumentsView';
import { CrossPortalView } from './views/CrossPortalView';
import { GrievancesView } from './views/GrievancesView';
import { ReportsView } from './views/ReportsView';
import { PolicyView } from './views/PolicyView';
import { AuditView } from './views/AuditView';
import { SettingsView } from './views/SettingsView';

const MainLayout = () => {
  const { currentView } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'cases':
        return <CasesView />;
      case 'payment-readiness':
        return <PaymentReadinessView />;
      case 'deficiencies':
        return <DeficienciesView />;
      case 'documents':
        return <DocumentsView />;
      case 'cross-portal':
        return <CrossPortalView />;
      case 'grievances':
        return <GrievancesView />;
      case 'reports':
        return <ReportsView />;
      case 'policy':
        return <PolicyView />;
      case 'audit':
        return <AuditView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Top Header */}
      <Header />

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Content View Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {renderView()}
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <SearchModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
