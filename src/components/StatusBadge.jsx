import React from 'react';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  AlertCircle,
  FileCheck2,
  Award,
  CreditCard,
  Send,
  Check,
  ShieldCheck,
  ShieldAlert,
  RotateCcw,
  Sparkles
} from 'lucide-react';

/**
 * Standard Canonical Lifecycle Statuses for MoTA Scholarship Prototype:
 * 1. Submitted
 * 2. Under Verification
 * 3. Deficiency Found
 * 4. Correction Required
 * 5. Resubmitted
 * 6. Verified
 * 7. Selected
 * 8. Compliance Pending
 * 9. Payment Readiness Check
 * 10. Payment Blocked
 * 11. Payment Ready
 * 12. Payment Processing
 * 13. Paid
 */

export const normalizeStatus = (rawStatus) => {
  if (!rawStatus) return 'Submitted';
  const s = String(rawStatus).toUpperCase().trim();

  if (s.includes('PAID') || s.includes('DISBURSED')) return 'Paid';
  if (s.includes('PROCESSING') || s.includes('BATCH_STAGING')) return 'Payment Processing';
  if (s === 'PAYMENT_READY' || s === 'PAYMENT READY' || s === 'READY') return 'Payment Ready';
  if (s.includes('BLOCK') || s.includes('HOLD') || s.includes('FRAUD')) return 'Payment Blocked';
  if (s.includes('READINESS_CHECK') || s.includes('READINESS CHECK')) return 'Payment Readiness Check';
  if (s.includes('COMPLIANCE')) return 'Compliance Pending';
  if (s === 'SELECTED' || s === 'AWARDED') return 'Selected';
  if (s === 'VERIFIED' || s === 'DESK_CLEAR') return 'Verified';
  if (s.includes('RESUBMIT')) return 'Resubmitted';
  if (s.includes('CORRECTION') || s.includes('REMEDIATION')) return 'Correction Required';
  if (s.includes('DEFIC') || s.includes('DEFECT')) return 'Deficiency Found';
  if (s.includes('VERIF') || s.includes('SCRUTINY')) return 'Under Verification';
  if (s.includes('SUBMIT')) return 'Submitted';

  return rawStatus;
};

export const StatusBadge = ({ status, size = 'sm', showIcon = true, className = '' }) => {
  const canonical = normalizeStatus(status);

  // Configuration for each canonical status
  const config = {
    'Submitted': {
      bg: 'bg-slate-100',
      text: 'text-slate-800',
      border: 'border-slate-300',
      dot: 'bg-slate-500',
      icon: Clock
    },
    'Under Verification': {
      bg: 'bg-indigo-50',
      text: 'text-indigo-800',
      border: 'border-indigo-200',
      dot: 'bg-indigo-600',
      icon: Clock
    },
    'Deficiency Found': {
      bg: 'bg-amber-50',
      text: 'text-amber-900',
      border: 'border-amber-300',
      dot: 'bg-amber-600',
      icon: AlertTriangle
    },
    'Correction Required': {
      bg: 'bg-orange-50',
      text: 'text-orange-900',
      border: 'border-orange-300',
      dot: 'bg-orange-600',
      icon: AlertCircle
    },
    'Resubmitted': {
      bg: 'bg-sky-50',
      text: 'text-sky-900',
      border: 'border-sky-300',
      dot: 'bg-sky-600',
      icon: RotateCcw
    },
    'Verified': {
      bg: 'bg-teal-50',
      text: 'text-teal-900',
      border: 'border-teal-300',
      dot: 'bg-teal-600',
      icon: CheckCircle2
    },
    'Selected': {
      bg: 'bg-blue-50',
      text: 'text-blue-900',
      border: 'border-blue-300',
      dot: 'bg-blue-600',
      icon: Award
    },
    'Compliance Pending': {
      bg: 'bg-purple-50',
      text: 'text-purple-900',
      border: 'border-purple-200',
      dot: 'bg-purple-600',
      icon: ShieldCheck
    },
    'Payment Readiness Check': {
      bg: 'bg-cyan-50',
      text: 'text-cyan-900',
      border: 'border-cyan-300',
      dot: 'bg-cyan-600',
      icon: FileCheck2
    },
    'Payment Blocked': {
      bg: 'bg-red-50',
      text: 'text-red-900',
      border: 'border-red-300',
      dot: 'bg-red-600 animate-pulse',
      icon: ShieldAlert
    },
    'Payment Ready': {
      bg: 'bg-emerald-50',
      text: 'text-emerald-900',
      border: 'border-emerald-300',
      dot: 'bg-emerald-600',
      icon: CheckCircle2
    },
    'Payment Processing': {
      bg: 'bg-blue-50',
      text: 'text-blue-900',
      border: 'border-blue-300',
      dot: 'bg-blue-600 animate-pulse',
      icon: CreditCard
    },
    'Paid': {
      bg: 'bg-emerald-100',
      text: 'text-emerald-950',
      border: 'border-emerald-400',
      dot: 'bg-emerald-700',
      icon: Check
    }
  };

  const current = config[canonical] || config['Submitted'];
  const IconComponent = current.icon;

  const sizeClasses = {
    xs: 'text-[10px] px-2 py-0.5',
    sm: 'text-[11px] px-2.5 py-0.5',
    md: 'text-xs px-3 py-1 font-semibold',
    lg: 'text-sm px-3.5 py-1.5 font-bold'
  };

  const iconSizes = {
    xs: 'w-2.5 h-2.5',
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium tracking-tight shadow-2xs ${current.bg} ${current.text} ${current.border} ${sizeClasses[size] || sizeClasses.sm} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${current.dot}`}></span>
      {showIcon && <IconComponent className={`${iconSizes[size] || iconSizes.sm} flex-shrink-0`} />}
      <span className="truncate">{canonical}</span>
    </span>
  );
};
