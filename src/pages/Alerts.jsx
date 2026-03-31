import React, { useState } from 'react';
import { AlertTriangle, XCircle, Info, Clock, MapPin } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const ALERTS = [
  { id: 'a001', timestamp: '2026-03-31 15:42:01', tag: 'CDU/P101/VIB/VELOCITY', description: 'Pump P-101 Vibration Velocity High Warning', severity: 'Warning', source: 'Crude Feed Pump P-101', unit: 'CDU', value: '7.2 mm/s', threshold: '7.0 mm/s', acknowledged: false },
  { id: 'a002', timestamp: '2026-03-31 14:18:33', tag: 'HCU/HC201/TEMP/BEARING', description: 'HC-201 Bearing Temperature Approaching Limit', severity: 'Warning', source: 'Hydrogen Compressor HC-201', unit: 'HCU', value: '88°C', threshold: '90°C', acknowledged: false },
  { id: 'a003', timestamp: '2026-03-31 13:55:00', tag: 'CDU/FT03/COMM', description: 'Flow Meter FT-03 Communication Loss', severity: 'Critical', source: 'Flow Meter FT-03', unit: 'CDU', value: '—', threshold: 'Online', acknowledged: false },
  { id: 'a004', timestamp: '2026-03-31 12:30:45', tag: 'CDU/FH110/TEMP/SKIN', description: 'Furnace Heater FH-110 Skin Temperature High', severity: 'Warning', source: 'Furnace Heater FH-110', unit: 'CDU', value: '415°C', threshold: '400°C', acknowledged: true },
  { id: 'a005', timestamp: '2026-03-31 11:04:22', tag: 'UTL/GW01/COMM', description: 'Gateway GW-CDU-01 Heartbeat Missed', severity: 'Critical', source: 'Edge Gateway GW-CDU-01', unit: 'UTL', value: '—', threshold: '< 30s', acknowledged: true },
  { id: 'a006', timestamp: '2026-03-31 08:45:10', tag: 'ARU/P202/PRESS/LOW', description: 'Reflux Pump Suction Pressure Low', severity: 'Info', source: 'Reflux Pump P-202', unit: 'ARU', value: '5.2 bar', threshold: '5.5 bar', acknowledged: true },
];

const alertTimeline = [
  { hour: '00:00', warning: 1, critical: 0 }, { hour: '02:00', warning: 1, critical: 0 },
  { hour: '04:00', warning: 2, critical: 0 }, { hour: '06:00', warning: 1, critical: 0 },
  { hour: '08:00', warning: 2, critical: 1 }, { hour: '10:00', warning: 3, critical: 0 },
  { hour: '12:00', warning: 4, critical: 1 }, { hour: '14:00', warning: 3, critical: 1 },
  { hour: '16:00', warning: 2, critical: 0 },
];

const severityIcon = { Warning: <AlertTriangle className="w-4 h-4 text-amber-500" />, Critical: <XCircle className="w-4 h-4 text-red-500" />, Info: <Info className="w-4 h-4 text-blue-500" /> };
const severityBadge = { Warning: 'bg-amber-50 text-amber-700 border border-amber-200', Critical: 'bg-red-50 text-red-700 border border-red-200', Info: 'bg-blue-50 text-blue-700 border border-blue-200' };

const Tt = ({ active, payload, label }) => {
  if (active && payload?.length) return (
    <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-lg text-xs">
      <p className="font-semibold text-slate-700 mb-1">{label}</p>
      {payload.map((p, i) => <p key={i} style={{ color: p.color }}>{p.name}: <b>{p.value}</b></p>)}
    </div>
  );
  return null;
};

export default function Alerts() {
  const [filter, setFilter] = useState('All');
  const active = ALERTS.filter(a => !a.acknowledged).length;
  const critical = ALERTS.filter(a => a.severity === 'Critical').length;

  const filtered = filter === 'All' ? ALERTS : ALERTS.filter(a => a.severity === filter);

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full bg-slate-50">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Alerts</h1>
          <p className="text-sm text-slate-500 mt-0.5">Active alarm management — Texas City Plant</p>
        </div>
        {active > 0 && (
          <span className="flex items-center space-x-1.5 px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg text-xs font-semibold text-red-700">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            <span>{active} Unacknowledged Alerts</span>
          </span>
        )}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Active', value: ALERTS.length, color: 'text-slate-900', bg: 'bg-slate-50 border-slate-200' },
          { label: 'Critical', value: critical, color: 'text-red-700', bg: 'bg-red-50 border-red-200' },
          { label: 'Warning', value: ALERTS.filter(a => a.severity === 'Warning').length, color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
          { label: 'Unacknowledged', value: active, color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
        ].map(c => (
          <div key={c.label} className={`border rounded-xl p-4 text-center shadow-sm ${c.bg}`}>
            <p className="text-xs text-slate-500">{c.label}</p>
            <p className={`text-3xl font-bold mt-1 ${c.color}`}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Alert Timeline — Today</h3>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={alertTimeline} barGap={2}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="hour" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip content={<Tt />} />
            <Bar dataKey="warning" name="Warning" fill="#f59e0b" radius={[2, 2, 0, 0]} stackId="a" />
            <Bar dataKey="critical" name="Critical" fill="#ef4444" radius={[2, 2, 0, 0]} stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Filters + Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center space-x-2">
          {['All', 'Critical', 'Warning', 'Info'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${filter === f ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>{f}</button>
          ))}
        </div>
        <table className="w-full text-xs">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {['Severity', 'Timestamp', 'Description', 'Source', 'Unit', 'Value vs Threshold', 'Status'].map(h => (
                <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map(a => (
              <tr key={a.id} className={`hover:bg-slate-50 transition-colors ${!a.acknowledged ? 'font-semibold' : ''}`}>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-1.5">
                    {severityIcon[a.severity]}
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${severityBadge[a.severity]}`}>{a.severity}</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-slate-500">{a.timestamp}</td>
                <td className="px-4 py-3 text-slate-800 max-w-xs">
                  <p className="truncate">{a.description}</p>
                  <p className="font-mono text-slate-400 font-normal mt-0.5">{a.tag}</p>
                </td>
                <td className="px-4 py-3 text-slate-600">{a.source}</td>
                <td className="px-4 py-3"><span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-medium">{a.unit}</span></td>
                <td className="px-4 py-3">
                  <span className="text-slate-800">{a.value}</span>
                  <span className="text-slate-400 mx-1">vs</span>
                  <span className="text-slate-500">{a.threshold}</span>
                </td>
                <td className="px-4 py-3">
                  {a.acknowledged
                    ? <span className="text-slate-400">Acknowledged</span>
                    : <span className="flex items-center space-x-1 text-amber-700"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span><span>Active</span></span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
