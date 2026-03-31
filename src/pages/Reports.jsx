import React from 'react';
import { FileText, Download, Clock, Calendar, CheckCircle } from 'lucide-react';

const REPORTS = [
  { id: 'r01', name: 'Daily Equipment Health Summary', category: 'Reliability', frequency: 'Daily', lastRun: '2026-03-31 06:00', status: 'Ready', size: '1.2 MB', format: 'PDF' },
  { id: 'r02', name: 'Weekly Production Performance', category: 'Production', frequency: 'Weekly', lastRun: '2026-03-30 00:00', status: 'Ready', size: '2.8 MB', format: 'Excel' },
  { id: 'r03', name: 'Monthly KPI Dashboard Report', category: 'KPIs', frequency: 'Monthly', lastRun: '2026-03-01 00:00', status: 'Ready', size: '4.5 MB', format: 'PDF' },
  { id: 'r04', name: 'Alert & Alarm Analysis', category: 'Safety', frequency: 'Weekly', lastRun: '2026-03-30 00:00', status: 'Ready', size: '0.9 MB', format: 'PDF' },
  { id: 'r05', name: 'Energy Consumption Report', category: 'Energy', frequency: 'Monthly', lastRun: '2026-03-01 00:00', status: 'Ready', size: '3.1 MB', format: 'Excel' },
  { id: 'r06', name: 'Device Connectivity Report', category: 'Devices', frequency: 'Daily', lastRun: '2026-03-31 06:00', status: 'Ready', size: '0.7 MB', format: 'CSV' },
  { id: 'r07', name: 'Predictive Maintenance Forecast', category: 'Maintenance', frequency: 'Weekly', lastRun: '2026-03-30 00:00', status: 'Generating', size: '—', format: 'PDF' },
];

const catColor = {
  Reliability: 'bg-blue-50 text-blue-700', Production: 'bg-emerald-50 text-emerald-700',
  KPIs: 'bg-indigo-50 text-indigo-700', Safety: 'bg-rose-50 text-rose-700',
  Energy: 'bg-violet-50 text-violet-700', Devices: 'bg-sky-50 text-sky-700',
  Maintenance: 'bg-amber-50 text-amber-700',
};

export default function Reports() {
  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full bg-slate-50">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Reports</h1>
          <p className="text-sm text-slate-500 mt-0.5">Scheduled and on-demand reporting catalog</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          <FileText className="w-3.5 h-3.5" />
          <span>Generate Report</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Scheduled Reports', value: '12', icon: Calendar, color: 'bg-blue-600' },
          { label: 'Ready to Download', value: '6', icon: CheckCircle, color: 'bg-emerald-600' },
          { label: 'Generating', value: '1', icon: Clock, color: 'bg-amber-500' },
        ].map(c => (
          <div key={c.label} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center space-x-3 shadow-sm">
            <div className={`p-2.5 rounded-xl ${c.color}`}><c.icon className="w-4 h-4 text-white" /></div>
            <div>
              <p className="text-xs text-slate-500">{c.label}</p>
              <p className="text-xl font-bold text-slate-900">{c.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-800">Report Catalog</h3>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {['Report Name', 'Category', 'Frequency', 'Last Generated', 'Format', 'Size', 'Status', ''].map(h => (
                <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {REPORTS.map(r => (
              <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-medium text-slate-800">{r.name}</td>
                <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-xs font-medium ${catColor[r.category]}`}>{r.category}</span></td>
                <td className="px-4 py-3 text-xs text-slate-500">{r.frequency}</td>
                <td className="px-4 py-3 text-xs font-mono text-slate-500">{r.lastRun}</td>
                <td className="px-4 py-3"><span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-medium">{r.format}</span></td>
                <td className="px-4 py-3 text-xs text-slate-400">{r.size}</td>
                <td className="px-4 py-3">
                  {r.status === 'Ready'
                    ? <span className="text-xs text-emerald-600 font-semibold">✓ Ready</span>
                    : <span className="flex items-center space-x-1 text-xs text-amber-600"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span><span>Generating…</span></span>}
                </td>
                <td className="px-4 py-3">
                  {r.status === 'Ready' && (
                    <button className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800 font-medium">
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
