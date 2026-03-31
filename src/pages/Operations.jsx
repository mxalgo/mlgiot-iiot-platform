import React, { useState } from 'react';
import { Factory, Layers, Settings, Activity, TrendingUp, TrendingDown, AlertTriangle, ChevronRight } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getStatusBadgeClass, getStatusDotColor } from '../lib/utils';

const units = [
  {
    id: 'cdu', name: 'Crude Distillation Unit', abbr: 'CDU',
    health: 88, production: 12450, target: 12500, efficiency: 94.2,
    assets: 48, running: 44, warning: 3, critical: 1, status: 'Running',
    trend: [86, 87, 88, 87, 89, 90, 88, 89, 88, 88],
  },
  {
    id: 'hcu', name: 'Hydrocracker Unit', abbr: 'HCU',
    health: 72, production: 8100, target: 8500, efficiency: 89.1,
    assets: 36, running: 31, warning: 4, critical: 1, status: 'Warning',
    trend: [78, 76, 75, 74, 73, 73, 72, 72, 72, 72],
  },
  {
    id: 'aru', name: 'Amine Recovery Unit', abbr: 'ARU',
    health: 91, production: 5200, target: 5000, efficiency: 96.3,
    assets: 24, running: 23, warning: 1, critical: 0, status: 'Running',
    trend: [89, 90, 90, 91, 91, 92, 91, 92, 91, 91],
  },
  {
    id: 'utl', name: 'Utilities & Steam', abbr: 'UTL',
    health: 83, production: null, target: null, efficiency: 88.7,
    assets: 55, running: 50, warning: 4, critical: 1, status: 'Warning',
    trend: [85, 84, 84, 83, 83, 83, 83, 83, 83, 83],
  },
];

const plantKPIs = [
  { name: 'Mar 18', throughput: 12100 }, { name: 'Mar 19', throughput: 12400 },
  { name: 'Mar 20', throughput: 12200 }, { name: 'Mar 21', throughput: 12500 },
  { name: 'Mar 22', throughput: 11900 }, { name: 'Mar 23', throughput: 12300 },
  { name: 'Mar 24', throughput: 12450 }, { name: 'Mar 25', throughput: 12550 },
  { name: 'Mar 26', throughput: 12400 }, { name: 'Mar 27', throughput: 12450 },
];

const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-lg text-xs">
        <p className="font-semibold text-slate-700 mb-1">{label}</p>
        {payload.map((p, i) => <p key={i} style={{ color: p.color }}>{p.name}: <b>{p.value}</b></p>)}
      </div>
    );
  }
  return null;
};

const HealthBar = ({ value }) => {
  const color = value >= 85 ? '#10b981' : value >= 70 ? '#f59e0b' : '#ef4444';
  return (
    <div className="flex items-center space-x-2">
      <div className="flex-1 bg-slate-100 rounded-full h-1.5">
        <div className="h-1.5 rounded-full transition-all" style={{ width: `${value}%`, background: color }}></div>
      </div>
      <span className="text-xs font-bold w-8 text-right" style={{ color }}>{value}%</span>
    </div>
  );
};

export default function Operations() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full bg-slate-50">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Operations</h1>
          <p className="text-sm text-slate-500 mt-0.5">Texas City Plant · Unit Performance Overview</p>
        </div>
        <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-full font-medium">Plant Status: Operational</span>
      </div>

      {/* Plant Trend */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-800">Plant Production Trend</h3>
            <p className="text-xs text-slate-400 mt-0.5">Combined throughput bpd — last 10 days</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-slate-900">12,450</p>
            <p className="text-xs text-slate-400">bpd today</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={130}>
          <AreaChart data={plantKPIs}>
            <defs>
              <linearGradient id="plG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[11000, 13500]} />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="throughput" name="Throughput (bpd)" stroke="#3b82f6" fill="url(#plG)" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Unit Cards */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center space-x-2">
          <Layers className="w-4 h-4 text-slate-400" />
          <span>Process Unit Performance</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {units.map(unit => {
            const dot = getStatusDotColor(unit.status);
            const badge = getStatusBadgeClass(unit.status);
            return (
              <div
                key={unit.id}
                onClick={() => setSelected(selected?.id === unit.id ? null : unit)}
                className={`bg-white border rounded-xl p-5 cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${selected?.id === unit.id ? 'border-blue-400 shadow-blue-100 shadow-md' : 'border-slate-200'}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center">
                      <Factory className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{unit.name}</p>
                      <p className="text-xs text-slate-400">{unit.abbr}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badge}`}>{unit.status}</span>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Equipment Health</span>
                    <span>Efficiency: {unit.efficiency}%</span>
                  </div>
                  <HealthBar value={unit.health} />
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="text-center p-2 bg-emerald-50 rounded-lg">
                    <p className="text-base font-bold text-emerald-700">{unit.running}</p>
                    <p className="text-xs text-emerald-600">Running</p>
                  </div>
                  <div className="text-center p-2 bg-amber-50 rounded-lg">
                    <p className="text-base font-bold text-amber-700">{unit.warning}</p>
                    <p className="text-xs text-amber-600">Warning</p>
                  </div>
                  <div className="text-center p-2 bg-red-50 rounded-lg">
                    <p className="text-base font-bold text-red-700">{unit.critical}</p>
                    <p className="text-xs text-red-600">Critical</p>
                  </div>
                </div>

                {unit.production && (
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div>
                      <p className="text-xs text-slate-400">Production</p>
                      <p className="text-sm font-bold text-slate-800">{unit.production.toLocaleString()} bpd</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">Target</p>
                      <p className="text-sm font-semibold text-slate-500">{unit.target?.toLocaleString()} bpd</p>
                    </div>
                    <div className={`flex items-center space-x-1 text-xs font-semibold ${unit.production >= unit.target ? 'text-emerald-600' : 'text-red-500'}`}>
                      {unit.production >= unit.target ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span>{((unit.production / unit.target) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
