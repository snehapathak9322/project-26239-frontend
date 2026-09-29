import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const Toast = () => {
  const { toastMessage, setToastMessage } = useApp();

  if (!toastMessage) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />
  };

  const borders = {
    success: 'border-emerald-300 bg-white text-slate-800',
    warning: 'border-amber-300 bg-white text-slate-800',
    error: 'border-red-300 bg-white text-slate-800',
    info: 'border-blue-300 bg-white text-slate-800'
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className={`flex items-center space-x-3 px-4 py-3 rounded-xl shadow-xl border ${borders[toastMessage.type] || borders.info} max-w-md`}>
        {icons[toastMessage.type] || icons.info}
        <p className="text-xs font-medium flex-1">{toastMessage.message}</p>
        <button
          onClick={() => setToastMessage(null)}
          className="text-slate-400 hover:text-slate-600 p-0.5"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
