import React from 'react';
import {
  CheckCircle, AlertTriangle, XCircle, Wifi, WifiOff, TrendingUp,
  TrendingDown, Zap, Activity, BarChart2, Thermometer, Gauge,
  AlertCircle, Info, ArrowUpRight
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';
import { sparklinePoints } from '../lib/utils';

const healthData = [
  { name: 'Healthy', value: 1120, color: '#10b981' },
  { name: 'Warning', value: 85, color: '#f59e0b' },
  { name: 'Critical', value: 35, color: '#ef4444' },
];

const alertData = [
  { name: 'High Vib.', warning: 12, critical: 3 },
  { name: 'High Temp', warning: 8, critical: 2 },
  { name: 'Pressure', warning: 5, critical: 4 },
  { name: 'Dev. Offline', warning: 0, critical: 7 },
  { name: 'Comm. Loss', warning: 3, critical: 1 },
];

const productionData = Array.from({ length: 14 }, (_, i) => ({
  day: `${i + 18} Mar`,
  throughput: Math.round(12000 + Math.sin(i * 0.7) * 800 + Math.random() * 200),
  target: 12500,
}));

const energyData = Array.from({ length: 14 }, (_, i) => ({
  day: `${i + 18} Mar`,
  usage: parseFloat((1.1 + Math.sin(i * 0.5) * 0.12 + Math.random() * 0.05).toFixed(2)),
}));

const sparkData1 = [88, 86, 90, 87, 91, 89, 88, 90, 92, 88];
const sparkData2 = [2450, 2440, 2455, 2448, 2450, 2445, 2452, 2450, 2447, 2450];
const sparkData3 = [85, 88, 83, 87, 84, 86, 82, 85, 87, 85];

const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-lg text-xs">
        <p className="font-semibold text-slate-700 mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }}>{p.name}: <b>{p.value}</b></p>
        ))}
      </div>
    );
  }
  return null;
};

const PieLabelInner = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return percent > 0.06 ? (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight="700">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null;
};

const StatCard = ({ icon: Icon, label, value, sub, color, trend, trendVal, sparkData }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-start space-x-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 duration-200">
    <div className={`p-3 rounded-xl ${color} flex-shrink-0`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-slate-500 font-medium">{label}</p>
      <p className="text-2xl font-bold text-slate-900 mt-0.5 tracking-tight">{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
    </div>
    <div className="flex flex-col items-end space-y-2 flex-shrink-0">
      {trendVal !== undefined && (
        <span className={`flex items-center space-x-0.5 text-xs font-semibold ${trendVal >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
          {trendVal >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          <span>{Math.abs(trendVal)}%</span>
        </span>
      )}
      {sparkData && (
        <svg width={64} height={24} className="overflow-visible">
          <polyline points={sparklinePoints(sparkData, 64, 22)} fill="none" stroke={trendVal >= 0 ? '#10b981' : '#ef4444'} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  </div>
);

const InsightItem = ({ icon: Icon, message, type }) => {
  const cfg = {
    warning: { bg: 'bg-amber-50 border border-amber-100', ic: 'text-amber-500' },
    error: { bg: 'bg-red-50 border border-red-100', ic: 'text-red-500' },
    info: { bg: 'bg-blue-50 border border-blue-100', ic: 'text-blue-500' },
  }[type] || { bg: '', ic: '' };
  return (
    <div className={`flex items-start space-x-3 p-3 rounded-lg ${cfg.bg}`}>
      <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${cfg.ic}`} />
      <p className="text-xs text-slate-600 leading-relaxed">{message}</p>
    </div>
  );
};

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full bg-slate-50">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Operations Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">Global Refinery Operations · Texas City Plant · {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
          <span>Live · Updated {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        <StatCard icon={BarChart2} label="Total Equipment" value="1,240" sub="Across all units" color="bg-blue-600" trendVal={2} sparkData={[1212, 1218, 1224, 1230, 1234, 1238, 1240, 1240, 1240, 1240]} />
        <StatCard icon={CheckCircle} label="Equipment Healthy" value="1,120" sub="90.3% availability" color="bg-emerald-600" trendVal={1.2} sparkData={sparkData1} />
        <StatCard icon={AlertTriangle} label="Warning Condition" value="85" sub="Needs review" color="bg-amber-500" trendVal={-5} sparkData={[120, 110, 105, 98, 92, 90, 88, 86, 85, 85]} />
        <StatCard icon={XCircle} label="Critical Condition" value="35" sub="Immediate action" color="bg-red-600" trendVal={3} sparkData={[28, 30, 31, 32, 33, 34, 35, 35, 35, 35]} />
        <StatCard icon={Wifi} label="Devices Online" value="2,450" sub="98.8% connectivity" color="bg-sky-600" trendVal={0.2} sparkData={sparkData2} />
        <StatCard icon={Zap} label="Energy Intensity" value="1.18" sub="MMBtu/bbl avg" color="bg-violet-600" trendVal={-2.1} sparkData={[1.25, 1.23, 1.22, 1.20, 1.19, 1.18, 1.18, 1.17, 1.18, 1.18]} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-800">Asset Health Summary</h3>
              <p className="text-xs text-slate-400 mt-0.5">By condition status</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <ResponsiveContainer width="45%" height={170}>
              <PieChart>
                <Pie data={healthData} cx="50%" cy="50%" innerRadius={42} outerRadius={76} dataKey="value" labelLine={false} label={PieLabelInner}>
                  {healthData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {healthData.map(h => (
                <div key={h.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: h.color }}></span>
                    <span className="text-xs text-slate-600">{h.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-slate-100 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full" style={{ width: `${(h.value / 1240) * 100}%`, background: h.color }}></div>
                    </div>
                    <span className="text-sm font-bold text-slate-800 w-12 text-right">{h.value.toLocaleString()}</span>
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Availability Index</span>
                  <span className="font-bold text-emerald-600">90.3%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-slate-800">Operational Alerts</h3>
            <p className="text-xs text-slate-400 mt-0.5">By alert category</p>
          </div>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={alertData} barGap={3} barCategoryGap="35%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: '#f8fafc' }} />
              <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="warning" name="Warning" fill="#f59e0b" radius={[3, 3, 0, 0]} />
              <Bar dataKey="critical" name="Critical" fill="#ef4444" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-slate-800">Production Throughput</h3>
            <p className="text-xs text-slate-400 mt-0.5">Barrels per day vs. target (last 14 days)</p>
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={productionData}>
              <defs>
                <linearGradient id="prodG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[10500, 14000]} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="throughput" name="Throughput (bpd)" stroke="#3b82f6" fill="url(#prodG)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="target" name="Target" stroke="#e2e8f0" strokeDasharray="5 5" dot={false} strokeWidth={1.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-slate-800">Energy Intensity Trend</h3>
            <p className="text-xs text-slate-400 mt-0.5">MMBtu per barrel (last 14 days)</p>
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={energyData}>
              <defs>
                <linearGradient id="energyG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[0.9, 1.5]} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="usage" name="Energy (MMBtu/bbl)" stroke="#8b5cf6" fill="url(#energyG)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Operational Intelligence */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-blue-500" />
            <h3 className="text-sm font-semibold text-slate-800">Operational Intelligence</h3>
          </div>
          <span className="text-xs text-slate-400">AI-assisted · 5 min ago</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <InsightItem icon={AlertTriangle} message="Pump P-101 vibration velocity increased 12% over 7 days. Bearing inspection recommended at next window." type="warning" />
          <InsightItem icon={AlertTriangle} message="Hydrocracker Unit HC-201 thermal efficiency declined 3%. Review heat exchanger fouling index." type="warning" />
          <InsightItem icon={XCircle} message="3 field devices offline in CDU: PT-01, PT-03, VM-04. Possible gateway issue on rack LAN-07." type="error" />
          <InsightItem icon={AlertCircle} message="Steam consumption in Utilities increased 5% MoM. Check steam trap performance and leak survey." type="warning" />
          <InsightItem icon={Info} message="Distillation Column DC-01 tray efficiency at 94.2% — 2.4% above benchmark. No action required." type="info" />
          <InsightItem icon={Info} message="Hydrogen Compressor HC-201 power consumption within specification. Energy efficiency ratio: 0.98." type="info" />
        </div>
      </div>
    </div>
  );
}
