import React from 'react';
import {
  Target, Lightbulb, TrendingUp, Gauge, BarChart2, Activity,
  CheckCircle2
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, Cell
} from 'recharts';

const failureTrendData = [
  { month: 'Oct', failures: 5 }, { month: 'Nov', failures: 7 },
  { month: 'Dec', failures: 4 }, { month: 'Jan', failures: 6 },
  { month: 'Feb', failures: 3 }, { month: 'Mar', failures: 2 },
];

const mtbfData = [
  { name: 'P-101', mtbf: 420 }, { name: 'P-102', mtbf: 380 },
  { name: 'BFP-02', mtbf: 510 }, { name: 'HC-201', mtbf: 295 },
  { name: 'AC-12', mtbf: 460 },
];

const healthByUnit = [
  { name: 'CDU', score: 88 }, { name: 'HCU', score: 72 },
  { name: 'ARU', score: 91 }, { name: 'UTL', score: 83 },
];

const TOOLTIP = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-xl text-xs">
        <p className="font-semibold text-slate-700 dark:text-slate-200 mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }}>{p.name}: <b>{p.value}</b></p>
        ))}
      </div>
    );
  }
  return null;
};

const HealthGauge = ({ score }) => {
  const color = score >= 85 ? '#22c55e' : score >= 70 ? '#f59e0b' : '#ef4444';
  const pct = score / 100;
  const r = 52, cx = 60, cy = 60;
  const circumference = 2 * Math.PI * r;
  const arc = circumference * 0.75;
  const dashOffset = arc - pct * arc;

  return (
    <div className="flex flex-col items-center">
      <svg width={120} height={100} viewBox="0 0 120 100">
        {/* Track */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth={10}
          strokeDasharray={`${arc} ${circumference - arc}`}
          strokeDashoffset={-circumference * 0.125}
          strokeLinecap="round" transform="rotate(135, 60, 60)" />
        {/* Value */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={10}
          strokeDasharray={`${arc - dashOffset} ${circumference - (arc - dashOffset)}`}
          strokeDashoffset={-circumference * 0.125}
          strokeLinecap="round" transform="rotate(135, 60, 60)"
          style={{ transition: 'stroke-dasharray 1s ease' }} />
        <text x={cx} y={cy + 5} textAnchor="middle" fontSize="20" fontWeight="bold" fill={color}>{score}</text>
        <text x={cx} y={cy + 22} textAnchor="middle" fontSize="9" fill="#94a3b8">HEALTH SCORE</text>
      </svg>
    </div>
  );
};

export default function UseCasePanel({ node }) {
  if (!node) return null;

  const kpis = node.children || [];

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Header */}
      <div className="flex items-start space-x-3">
        <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
          <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Use Case</p>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">{node.name}</h2>
        </div>
      </div>

      {/* Business Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-red-100 dark:bg-red-900/40 rounded-lg flex items-center justify-center">
              <span className="text-red-600 text-xs font-bold">!</span>
            </div>
            <p className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide">Business Problem</p>
          </div>
          <p className="text-sm text-red-800 dark:text-red-200 font-medium">{node.problem}</p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Solution</p>
          </div>
          <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">{node.solution}</p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-green-100 dark:bg-green-900/40 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 text-green-600" />
            </div>
            <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide">Business Impact</p>
          </div>
          <p className="text-sm text-green-800 dark:text-green-200 font-medium">{node.businessImpact}</p>
        </div>
      </div>

      {/* KPI List */}
      {kpis.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3 flex items-center space-x-2">
            <Gauge className="w-4 h-4 text-slate-500" />
            <span>Associated KPIs</span>
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {kpis.map(kpi => (
              <div key={kpi.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{kpi.name}</span>
                </div>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{kpi.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center space-x-2 mb-4">
          <BarChart2 className="w-4 h-4 text-slate-500" />
          <span>KPI Dashboard</span>
        </h3>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Health Gauge */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex flex-col items-center">
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">Health Score by Unit</p>
          <HealthGauge score={88} />
          <div className="w-full mt-2 space-y-1.5">
            {healthByUnit.map(u => (
              <div key={u.name} className="flex items-center space-x-2 text-xs">
                <span className="w-8 text-slate-500 text-right">{u.name}</span>
                <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full" style={{
                    width: `${u.score}%`,
                    background: u.score >= 85 ? '#22c55e' : u.score >= 70 ? '#f59e0b' : '#ef4444'
                  }}></div>
                </div>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{u.score}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Failure Trend */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-3">Failure Count Trend</p>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={failureTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <Tooltip content={<TOOLTIP />} />
              <Line type="monotone" dataKey="failures" name="Failures" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3, fill: '#ef4444' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* MTBF Bar */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-3">MTBF by Asset (hrs)</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={mtbfData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 9, fill: '#94a3b8' }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 9, fill: '#94a3b8' }} width={40} />
              <Tooltip content={<TOOLTIP />} />
              <Bar dataKey="mtbf" name="MTBF (hrs)" radius={[0, 4, 4, 0]}>
                {mtbfData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.mtbf >= 400 ? '#22c55e' : entry.mtbf >= 350 ? '#f59e0b' : '#ef4444'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
