import React from 'react';
import { TrendingUp, TrendingDown, Zap, BarChart2 } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ReferenceLine, Legend } from 'recharts';

const vibTrend = Array.from({ length: 30 }, (_, i) => ({
  day: `Mar ${i + 1}`,
  p101: parseFloat((4.8 + Math.sin(i * 0.4) * 0.6 + i * 0.04).toFixed(2)),
  p102: parseFloat((3.5 + Math.sin(i * 0.3) * 0.4 + Math.random() * 0.2).toFixed(2)),
  threshold: 7,
}));

const energyByUnit = Array.from({ length: 14 }, (_, i) => ({
  day: `Mar ${i + 18}`,
  cdu: parseFloat((0.48 + Math.sin(i * 0.5) * 0.04).toFixed(3)),
  hcu: parseFloat((0.35 + Math.sin(i * 0.6) * 0.03).toFixed(3)),
  utl: parseFloat((0.28 + Math.sin(i * 0.7) * 0.02).toFixed(3)),
}));

const Tt = ({ active, payload, label }) => {
  if (active && payload?.length) return (
    <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-lg text-xs">
      <p className="font-semibold text-slate-700 mb-1">{label}</p>
      {payload.map((p, i) => <p key={i} style={{ color: p.color }}>{p.name}: <b>{p.value}</b></p>)}
    </div>
  );
  return null;
};

const PRED_INSIGHTS = [
  { equipment: 'Crude Feed Pump P-101', insight: 'Bearing degradation pattern detected. Estimated RUL: 12–18 days at current vibration trend.', risk: 'High', action: 'Schedule inspection within 10 days' },
  { equipment: 'Hydrogen Compressor HC-201', insight: 'Suction valve efficiency declining. Current IHE: 0.87, benchmark: 0.92. Rate: −0.5%/week.', risk: 'Medium', action: 'Valve overhaul planned for Apr 10' },
  { equipment: 'Furnace Heater FH-110', insight: 'Tube-side fouling rate 18% above baseline. Convection section ΔT anomaly: +12°C.', risk: 'Medium', action: 'Tube cleaning during next turnaround' },
  { equipment: 'Distillation Column DC-01', insight: 'Tray efficiency stable at 94.2%. No near-term failure risk. Next inspection: Jun 2026.', risk: 'Low', action: 'No immediate action required' },
];

const riskColor = { High: 'bg-red-50 text-red-700 border border-red-200', Medium: 'bg-amber-50 text-amber-700 border border-amber-200', Low: 'bg-emerald-50 text-emerald-700 border border-emerald-200' };

export default function Analytics() {
  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full bg-slate-50">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Analytics</h1>
        <p className="text-sm text-slate-500 mt-0.5">Trend analysis, predictive insights & energy analytics</p>
      </div>

      {/* Vibration Trend */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold text-slate-800">Vibration Trend Analysis — CDU Pumps</h3>
          <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full font-medium">P-101 Trending Up</span>
        </div>
        <p className="text-xs text-slate-400 mb-4">Velocity (mm/s) — last 30 days. Warning threshold: 7 mm/s</p>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={vibTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} interval={4} />
            <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[2, 9]} />
            <Tooltip content={<Tt />} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
            <ReferenceLine y={7} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: 'Warn', position: 'right', fontSize: 9, fill: '#f59e0b' }} />
            <Line type="monotone" dataKey="p101" name="P-101 Vibration" stroke="#ef4444" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="p102" name="P-102 Vibration" stroke="#3b82f6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Energy Analysis */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-800 mb-1">Energy Consumption by Unit</h3>
        <p className="text-xs text-slate-400 mb-4">MMBtu/bbl — last 14 days</p>
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={energyByUnit}>
            <defs>
              {['#3b82f6', '#10b981', '#f59e0b'].map((c, i) => (
                <linearGradient key={i} id={`eg${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={c} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={c} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip content={<Tt />} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
            <Area type="monotone" dataKey="cdu" name="CDU" stroke="#3b82f6" fill="url(#eg0)" strokeWidth={2} dot={false} />
            <Area type="monotone" dataKey="hcu" name="HCU" stroke="#10b981" fill="url(#eg1)" strokeWidth={2} dot={false} />
            <Area type="monotone" dataKey="utl" name="UTL" stroke="#f59e0b" fill="url(#eg2)" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Predictive Insights */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart2 className="w-4 h-4 text-blue-500" />
          <h3 className="text-sm font-semibold text-slate-800">Predictive Maintenance Insights</h3>
          <span className="ml-auto text-xs text-slate-400">AI-assisted · Model accuracy: 91.4%</span>
        </div>
        <div className="space-y-3">
          {PRED_INSIGHTS.map((ins, i) => (
            <div key={i} className="flex items-start space-x-4 p-4 border border-slate-100 rounded-xl hover:border-slate-200 hover:bg-slate-50 transition-colors">
              <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-blue-700">{i + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="text-sm font-semibold text-slate-800">{ins.equipment}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${riskColor[ins.risk]}`}>{ins.risk} Risk</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{ins.insight}</p>
                <p className="text-xs text-blue-600 font-medium mt-1.5">→ {ins.action}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
