import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  HelpCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Send,
  User,
  ShieldCheck,
  ArrowRight,
  Bell,
  Sparkles,
  CreditCard,
  FileCheck2,
  AlertTriangle,
  Megaphone,
  Check,
  Filter
} from 'lucide-react';

export const GrievancesView = () => {
  const {
    grievances,
    addGrievanceResponse,
    currentUser,
    setSelectedCaseId,
    setCurrentView,
    showToast
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState('NOTIFICATIONS'); // NOTIFICATIONS, GRIEVANCES
  const [notificationFilter, setNotificationFilter] = useState('ALL');

  // The 6 required Notification categories:
  // 1. Application update
  // 2. Deficiency alert
  // 3. Status change
  // 4. Payment-readiness change
  // 5. Grievance status
  // 6. Scheme announcement
  const [notifications, setNotifications] = useState([
    {
      id: 'NOTIF-01',
      category: 'Deficiency alert',
      categoryKey: 'DEFICIENCY_ALERT',
      title: 'Action Required: Institutional Round Seal Missing on Annexure-IV',
      timestamp: '2 hours ago',
      caseId: 'MOTA-NFST-2025-0482',
      scheme: 'NFST',
      read: false,
      details: 'Quarterly continuation certificate (Annexure-IV) requires IISc Dean round seal. 15-day resolution window active.',
      actionText: 'View Deficiency in Hub',
      targetView: 'deficiencies'
    },
    {
      id: 'NOTIF-02',
      category: 'Payment-readiness change',
      categoryKey: 'PAYMENT_CHANGE',
      title: 'Disbursement Unlocked: All 6 Payment Gates Fully Cleared',
      timestamp: 'Yesterday',
      caseId: 'MOTA-TOPCLASS-2025-0891',
      scheme: 'TOPCLASS',
      read: false,
      details: 'IIT Bombay Dean verified semester fee breakdown. Staged for DSC sign-off in BATCH-MOTA-TOPCLASS-2025-Q1-TR02.',
      actionText: 'View Payment Readiness',
      targetView: 'payment-readiness'
    },
    {
      id: 'NOTIF-03',
      category: 'Status change',
      categoryKey: 'STATUS_CHANGE',
      title: 'Merit Selection Award Issued for Academic Year 2025–26',
      timestamp: '3 days ago',
      caseId: 'MOTA-NOS-2025-0119',
      scheme: 'NOS',
      read: true,
      details: 'Selected under National Overseas Scholarship Merit Quota for M.Sc. at University of Oxford.',
      actionText: 'Inspect Award Details',
      targetView: 'cases'
    },
    {
      id: 'NOTIF-04',
      category: 'Application update',
      categoryKey: 'APP_UPDATE',
      title: 'DigiLocker Cryptographic XML Caste Attestation Synchronized',
      timestamp: '5 days ago',
      caseId: 'MOTA-NFST-2025-0482',
      scheme: 'NFST',
      read: true,
      details: 'State e-District PKI certificate verified against Article 342 Presidential Order. Tamper score: 0.02% (Clean).',
      actionText: 'View Document Evidence',
      targetView: 'documents'
    },
    {
      id: 'NOTIF-05',
      category: 'Grievance status',
      categoryKey: 'GRIEVANCE_STATUS',
      title: 'Ticket GRV-8821 Escalated to Bank of Baroda Nodal Officer',
      timestamp: '1 week ago',
      caseId: 'MOTA-NFST-2025-0312',
      scheme: 'NFST',
      read: true,
      details: 'Lead District Manager notified to activate NPCI Aadhaar DBT mapping on Mandla branch account within 48 hours.',
      actionText: 'Open Ticket Thread',
      targetView: 'grievances'
    },
    {
      id: 'NOTIF-06',
      category: 'Scheme announcement',
      categoryKey: 'SCHEME_ANNOUNCE',
      title: 'Gazette Policy Version 2026–27 Published for All ST Schemes',
      timestamp: '2 weeks ago',
      caseId: 'NATIONAL-POLICY',
      scheme: 'ALL_SCHEMES',
      read: true,
      details: 'Ministry of Tribal Affairs issued revised operational guidelines with dedicated PVTG horizontal sub-quotas and automated deduplication.',
      actionText: 'Review Policy Gazette',
      targetView: 'policy'
    }
  ]);

  // Grievance Chat State
  const [activeTicketId, setActiveTicketId] = useState(grievances[0]?.ticketId);
  const [replyText, setReplyText] = useState('');

  const activeTicket = grievances.find(g => g.ticketId === activeTicketId) || grievances[0];

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    addGrievanceResponse(activeTicket.ticketId, replyText);
    setReplyText('');
    showToast('Official response recorded and dispatched to scholar.', 'success');
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read.', 'info');
  };

  const filteredNotifications = notifications.filter(n => {
    if (notificationFilter === 'ALL') return true;
    return n.categoryKey === notificationFilter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                MoTA Citizen & Scholar Grievance Cell
              </span>
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                48-Hour SLA Redressal Mandate
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
              Notifications & Grievance Redressal Center
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Every status change, deficiency alert, or disbursement hold triggers transparent multi-channel notifications. 
              Grievance tickets are backed by strict 48-hour service level agreements (SLAs) directly monitored by District Tribal Officers.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900">
              {unreadCount} Unread Notifications
            </span>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-sm flex flex-wrap gap-2 text-xs font-bold">
        <button
          onClick={() => setActiveSubTab('NOTIFICATIONS')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all ${
            activeSubTab === 'NOTIFICATIONS'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Bell className={`w-4 h-4 ${activeSubTab === 'NOTIFICATIONS' ? 'text-amber-400' : 'text-slate-500'}`} />
          <span>1. Notifications Center (6 Categories)</span>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-red-500 text-white text-[10px]">
              {unreadCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveSubTab('GRIEVANCES')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all ${
            activeSubTab === 'GRIEVANCES'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <HelpCircle className={`w-4 h-4 ${activeSubTab === 'GRIEVANCES' ? 'text-amber-400' : 'text-slate-500'}`} />
          <span>2. Scholar Grievance Redressal Desk ({grievances.length} Tickets)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: NOTIFICATIONS CENTER (The 6 required categories) */}
      {/* ========================================================================= */}
      {activeSubTab === 'NOTIFICATIONS' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 font-semibold">
              <span className="text-slate-400 text-[11px] uppercase font-bold mr-1">Filter:</span>
              {[
                { id: 'ALL', label: 'All Alerts' },
                { id: 'DEFICIENCY_ALERT', label: 'Deficiency Alert' },
                { id: 'PAYMENT_CHANGE', label: 'Payment-Readiness Change' },
                { id: 'STATUS_CHANGE', label: 'Status Change' },
                { id: 'APP_UPDATE', label: 'Application Update' },
                { id: 'GRIEVANCE_STATUS', label: 'Grievance Status' },
                { id: 'SCHEME_ANNOUNCE', label: 'Scheme Announcement' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setNotificationFilter(item.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    notificationFilter === item.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              onClick={handleMarkAllRead}
              className="text-[11px] text-slate-600 hover:text-slate-900 font-bold underline flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Mark All as Read</span>
            </button>
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
                <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-700">No alerts match this category</h3>
                <p className="text-xs text-slate-500 mt-1">Try switching to "All Alerts" to view notifications.</p>
                <button
                  onClick={() => setNotificationFilter('ALL')}
                  className="mt-4 px-3.5 py-1.5 rounded-xl bg-slate-900 text-white font-semibold text-xs inline-flex items-center space-x-1.5 shadow-xs hover:bg-slate-800"
                >
                  <span>Show All Alerts</span>
                </button>
              </div>
            ) : (
              filteredNotifications.map(notif => (
              <div
                key={notif.id}
                className={`p-5 rounded-2xl border transition-all shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  !notif.read ? 'bg-amber-50/40 border-amber-300' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-start space-x-3.5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    notif.categoryKey === 'DEFICIENCY_ALERT' ? 'bg-red-100 text-red-700' :
                    notif.categoryKey === 'PAYMENT_CHANGE' ? 'bg-emerald-100 text-emerald-700' :
                    notif.categoryKey === 'SCHEME_ANNOUNCE' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {notif.categoryKey === 'DEFICIENCY_ALERT' ? <AlertTriangle className="w-4 h-4" /> :
                     notif.categoryKey === 'PAYMENT_CHANGE' ? <CreditCard className="w-4 h-4" /> :
                     notif.categoryKey === 'SCHEME_ANNOUNCE' ? <Megaphone className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                        {notif.category}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        {notif.scheme} • {notif.caseId}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {notif.timestamp}
                      </span>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">
                      {notif.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                      {notif.details}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-end md:self-center flex-shrink-0">
                  <button
                    onClick={() => {
                      if (notif.caseId && notif.caseId !== 'NATIONAL-POLICY') {
                        setSelectedCaseId(notif.caseId);
                      }
                      setCurrentView(notif.targetView);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-xs flex items-center space-x-1.5"
                  >
                    <span>{notif.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                </div>
              </div>
            )))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: SCHOLAR GRIEVANCE REDRESSAL DESK */}
      {/* ========================================================================= */}
      {activeSubTab === 'GRIEVANCES' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Tickets List (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
              Active Redressal Tickets ({grievances.length})
            </div>

            {grievances.map(ticket => {
              const isSelected = ticket.ticketId === activeTicket?.ticketId;
              return (
                <div
                  key={ticket.ticketId}
                  onClick={() => setActiveTicketId(ticket.ticketId)}
                  className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/50 shadow-md ring-1 ring-amber-400'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono font-bold text-slate-700">{ticket.ticketId}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      ticket.status === 'ACTION_TAKEN' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">
                    {ticket.subject}
                  </h4>

                  <p className="text-[11px] text-slate-500 mt-1">
                    {ticket.applicantName} • {ticket.caseId}
                  </p>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="flex items-center gap-1 text-amber-700 font-semibold">
                      <Clock className="w-3 h-3" />
                      <span>SLA: {ticket.slaRemaining}</span>
                    </span>
                    <span>{ticket.messages.length} messages</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Conversation & Official Response (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5 flex flex-col justify-between min-h-[480px]">
            {activeTicket ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-slate-500">{activeTicket.ticketId}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {activeTicket.scheme}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mt-1">
                      {activeTicket.subject}
                    </h3>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCaseId(activeTicket.caseId);
                      setCurrentView('cases');
                    }}
                    className="text-xs text-amber-700 font-bold hover:underline"
                  >
                    Open Case Dossier
                  </button>
                </div>

                {/* Conversation Bubbles */}
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 text-xs">
                  {activeTicket.messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`p-3.5 rounded-xl space-y-1 ${
                        msg.role === 'Applicant'
                          ? 'bg-slate-50 border border-slate-200 ml-4'
                          : 'bg-amber-50/70 border border-amber-200 mr-4'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <strong className="text-slate-800">{msg.sender} ({msg.role})</strong>
                        <span className="text-slate-400 font-mono">{msg.time}</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed text-[11px]">
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Response Form */}
                <form onSubmit={handleSendReply} className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>Official Response from {currentUser.name} ({currentUser.badge}):</span>
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Type official directive, instructions, or resolution remarks..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="flex-1 text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    />
                    <button
                      type="submit"
                      className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition-all shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send</span>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs">
                Select a grievance ticket on the left to inspect conversation history.
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
