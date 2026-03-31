import React from 'react';
import { Gauge, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const KPIS = [
  { id: 'k1', name: 'Asset Availability', category: 'Reliability', value: 90.3, unit: '%', target: 92, trend: -0.8, sparkData: [91.5, 91.2, 90.8, 90.6, 90.4, 90.3, 90.3] },
  { id: 'k2', name: 'MTBF', category: 'Reliability', value: 420, unit: 'hrs', target: 450, trend: 2.1, sparkData: [390, 400, 405, 410, 415, 418, 420] },
  { id: 'k3', name: 'MTTR', category: 'Reliability', value: 4.5, unit: 'hrs', target: 4.0, trend: -5.2, sparkData: [5.2, 5.0, 4.9, 4.8, 4.7, 4.5, 4.5] },
  { id: 'k4', name: 'Overall Equipment Effectiveness', category: 'Production', value: 82.1, unit: '%', target: 85, trend: 1.5, sparkData: [80, 80.5, 81, 81.5, 81.8, 82, 82.1] },
  { id: 'k5', name: 'Production Throughput', category: 'Production', value: 12450, unit: 'bpd', target: 12500, trend: 0.4, sparkData: [12000, 12150, 12200, 12350, 12400, 12430, 12450] },
  { id: 'k6', name: 'Energy Intensity', category: 'Energy', value: 1.18, unit: 'MMBtu/bbl', target: 1.12, trend: -2.1, sparkData: [1.25, 1.23, 1.22, 1.20, 1.19, 1.18, 1.18] },
  { id: 'k7', name: 'Safety Incident Rate', category: 'Safety', value: 0.0, unit: 'incidents/yr', target: 0, trend: 0, sparkData: [0, 0, 0, 0, 0, 0, 0] },
  { id: 'k8', name: 'Maintenance Cost Ratio', category: 'Maintenance', value: 3.2, unit: '% asset value', target: 2.8, trend: -1.4, sparkData: [3.8, 3.6, 3.5, 3.4, 3.3, 3.2, 3.2] },
];

const catColor = { Reliability: 'bg-blue-50 text-blue-700 border border-blue-200', Production: 'bg-emerald-50 text-emerald-700 border border-emerald-200', Energy: 'bg-violet-50 text-violet-700 border border-violet-200', Safety: 'bg-rose-50 text-rose-700 border border-rose-200', Maintenance: 'bg-amber-50 text-amber-700 border border-amber-200' };

const mtbfTrend = [
  { month: 'Oct', mtbf: 390 }, { month: 'Nov', mtbf: 400 }, { month: 'Dec', mtbf: 395 },
  { month: 'Jan', mtbf: 405 }, { month: 'Feb', mtbf: 412 }, { month: 'Mar', mtbf: 420 },
];

const oeeData = [
  { unit: 'CDU', oee: 84.2 }, { unit: 'HCU', oee: 76.5 }, { unit: 'ARU', oee: 91.0 }, { unit: 'UTL', oee: 82.1 },
];

const Tt = ({ active, payload, label }) => {
  if (active && payload?.length) return (
    <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-lg text-xs">
      <p className="font-semibold text-slate-700 mb-1">{label}</p>
      {payload.map((p, i) => <p key={i} style={{ color: p.color }}>{p.name}: <b>{p.value}</b></p>)}
    </div>
  );
  return null;
};

const SparkSvg = ({ data, color }) => {
  if (!data?.length) return null;
  const min = Math.min(...data), max = Math.max(...data), range = max - min || 1;
  const pts = data.map((v, i) => `${(i * 60 / (data.length - 1)).toFixed(1)},${(20 - ((v - min) / range) * 20).toFixed(1)}`).join(' ');
  return <svg width={60} height={20}><polyline points={pts} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /></svg>;
};

export default function KPIs() {
  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full bg-slate-50">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Key Performance Indicators</h1>
          <p className="text-sm text-slate-500 mt-0.5">Plant-level KPI catalog — Texas City Plant</p>
        </div>
        <span className="text-xs text-slate-400">Reporting Period: March 2026</span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {KPIS.map(kpi => {
          const onTarget = kpi.name === 'Energy Intensity' || kpi.name === 'MTTR' || kpi.name === 'Maintenance Cost Ratio'
            ? kpi.value <= kpi.target
            : kpi.value >= kpi.target;
          const tcolor = onTarget ? '#10b981' : '#ef4444';
          return (
            <div key={kpi.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 duration-200">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-medium px-2 py-0.5 rounded ${catColor[kpi.category]}`}>{kpi.category}</span>
                <span className={`flex items-center text-xs font-semibold ${kpi.trend >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                  {kpi.trend >= 0 ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                  {Math.abs(kpi.trend)}%
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-tight">{kpi.name}</p>
              <div className="flex items-end justify-between mt-2">
                <div>
                  <span className="text-2xl font-bold text-slate-900">{kpi.value}</span>
                  <span className="text-xs text-slate-400 ml-1">{kpi.unit}</span>
                </div>
                <SparkSvg data={kpi.sparkData} color={tcolor} />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-slate-400">Target: <span className="font-semibold text-slate-600">{kpi.target} {kpi.unit}</span></span>
                <span style={{ color: tcolor }} className="font-semibold">{onTarget ? '✓ On Target' : '✗ Off Target'}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-800 mb-1">MTBF Trend (hrs)</h3>
          <p className="text-xs text-slate-400 mb-4">Mean Time Between Failures — last 6 months</p>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={mtbfTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[360, 460]} />
              <Tooltip content={<Tt />} />
              <ReferenceLine y={450} stroke="#94a3b8" strokeDasharray="4 4" label={{ value: 'Target', position: 'right', fontSize: 9, fill: '#94a3b8' }} />
              <Line type="monotone" dataKey="mtbf" name="MTBF (hrs)" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3, fill: '#3b82f6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-800 mb-1">OEE by Process Unit</h3>
          <p className="text-xs text-slate-400 mb-4">Overall Equipment Effectiveness (%)</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={oeeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="unit" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[60, 100]} />
              <Tooltip content={<Tt />} />
              <ReferenceLine y={85} stroke="#94a3b8" strokeDasharray="4 4" />
              <Bar dataKey="oee" name="OEE (%)" radius={[4, 4, 0, 0]}>
                {oeeData.map((e, i) => <rect key={i} fill={e.oee >= 85 ? '#10b981' : e.oee >= 75 ? '#f59e0b' : '#ef4444'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
