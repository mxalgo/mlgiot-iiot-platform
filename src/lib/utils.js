import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getStatusColor(status) {
  const map = {
    Normal: 'text-emerald-600',
    Running: 'text-emerald-600',
    Healthy: 'text-emerald-600',
    Online: 'text-emerald-600',
    Warning: 'text-amber-500',
    Maintenance: 'text-amber-500',
    Standby: 'text-sky-500',
    Critical: 'text-red-500',
    Fault: 'text-red-500',
    Offline: 'text-red-500',
    Stopped: 'text-slate-400',
  };
  return map[status] || 'text-slate-400';
}

export function getStatusDotColor(status) {
  const map = {
    Normal: 'bg-emerald-500',
    Running: 'bg-emerald-500',
    Healthy: 'bg-emerald-500',
    Online: 'bg-emerald-500',
    Warning: 'bg-amber-500',
    Maintenance: 'bg-amber-500',
    Standby: 'bg-sky-400',
    Critical: 'bg-red-500',
    Fault: 'bg-red-500',
    Offline: 'bg-red-500',
    Stopped: 'bg-slate-400',
  };
  return map[status] || 'bg-slate-400';
}

export function getStatusBadgeClass(status) {
  const map = {
    Normal: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    Running: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    Warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    Maintenance: 'bg-amber-50 text-amber-700 border border-amber-200',
    Critical: 'bg-red-50 text-red-700 border border-red-200',
    Fault: 'bg-red-50 text-red-700 border border-red-200',
    Offline: 'bg-red-50 text-red-700 border border-red-200',
    Stopped: 'bg-slate-100 text-slate-600 border border-slate-200',
    Standby: 'bg-sky-50 text-sky-700 border border-sky-200',
  };
  return map[status] || 'bg-slate-100 text-slate-600 border border-slate-200';
}

export function sparklinePoints(data, width = 80, height = 24) {
  if (!data || data.length < 2) return '';
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  return data.map((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');
}
