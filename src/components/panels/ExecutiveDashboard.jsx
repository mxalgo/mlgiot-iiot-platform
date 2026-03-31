import React from 'react';
import {
  CheckCircle, AlertTriangle, XCircle, Wifi, WifiOff,
  TrendingUp, TrendingDown, Zap, BarChart2, Activity,
  AlertCircle, Info
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';

const healthData = [
  { name: 'Healthy', value: 1120, color: '#22c55e' },
  { name: 'Warning', value: 85, color: '#f59e0b' },
  { name: 'Critical', value: 35, color: '#ef4444' },
];

const alertData = [
  { name: 'High Vibration', warning: 12, critical: 3 },
  { name: 'High Temp', warning: 8, critical: 2 },
  { name: 'Pressure Drop', warning: 5, critical: 4 },
  { name: 'Dev. Offline', warning: 0, critical: 7 },
  { name: 'Comm. Loss', warning: 3, critical: 1 },
];

const productionData = Array.from({ length: 14 }, (_, i) => ({
  day: `Mar ${i + 18}`,
  throughput: Math.round(12000 + Math.random() * 1200 - 100),
  target: 12500,
}));

const energyData = Array.from({ length: 14 }, (_, i) => ({
  day: `Mar ${i + 18}`,
  usage: parseFloat((1.1 + Math.random() * 0.3).toFixed(2)),
}));

const CUSTOM_TOOLTIP = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-xl text-xs">
        <p className="font-semibold text-slate-700 dark:text-slate-200 mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }}>{p.name}: <span className="font-bold">{p.value}</span></p>
        ))}
      </div>
    );
  }
  return null;
};

const CUSTOM_PIE_LABEL = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return percent > 0.05 ? (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight="bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null;
};

const StatCard = ({ icon: Icon, label, value, sub, color, trend }) => (
  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex items-center space-x-4 shadow-sm hover:shadow-md transition-shadow">
    <div className={`p-3 rounded-xl ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{label}</p>
      <p className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{value}</p>
      {sub && <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{sub}</p>}
    </div>
    {trend !== undefined && (
      <div className={`flex items-center space-x-1 text-xs font-semibold ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {trend >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
        <span>{Math.abs(trend)}%</span>
      </div>
    )}
  </div>
);

const InsightRow = ({ icon: Icon, message, type }) => {
  const colors = {
    warning: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20',
    error: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20',
    info: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
  };
  return (
    <div className={`flex items-start space-x-3 p-3 rounded-lg ${colors[type]}`}>
      <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
      <p className="text-xs leading-relaxed">{message}</p>
    </div>
  );
};

export default function ExecutiveDashboard() {
  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Executive Operations Overview</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Global Refinery Operations · Texas City Plant · As of {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        <StatCard icon={BarChart2} label="Total Assets" value="1,240" sub="Across all plants" color="bg-blue-600" trend={2} />
        <StatCard icon={CheckCircle} label="Healthy Assets" value="1,120" sub="90.3% of fleet" color="bg-green-600" trend={1.2} />
        <StatCard icon={AlertTriangle} label="Warning" value="85" sub="Needs attention" color="bg-amber-500" trend={-5} />
        <StatCard icon={XCircle} label="Critical Assets" value="35" sub="Immediate action needed" color="bg-red-600" trend={3} />
        <StatCard icon={Wifi} label="Devices Online" value="2,450" sub="98.8% uptime" color="bg-cyan-600" trend={0.2} />
        <StatCard icon={WifiOff} label="Devices Offline" value="30" sub="1.2% of total" color="bg-slate-500" trend={-1} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Asset Health Pie */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-4">Asset Health Distribution</h3>
          <div className="flex items-center space-x-4">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie data={healthData} cx="50%" cy="50%" innerRadius={45} outerRadius={80} dataKey="value" labelLine={false} label={CUSTOM_PIE_LABEL}>
                  {healthData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
                <Tooltip content={<CUSTOM_TOOLTIP />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 flex-1">
              {healthData.map(item => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: item.color }}></div>
                    <span className="text-xs text-slate-600 dark:text-slate-400">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts by Severity */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-4">Alerts by Category</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={alertData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <Tooltip content={<CUSTOM_TOOLTIP />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="warning" name="Warning" fill="#f59e0b" radius={[3,3,0,0]} />
              <Bar dataKey="critical" name="Critical" fill="#ef4444" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Production Trend */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">Production Throughput</h3>
          <p className="text-xs text-slate-400 mb-4">Barrels per day (last 14 days)</p>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={productionData}>
              <defs>
                <linearGradient id="prodGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} domain={[11000, 14000]} />
              <Tooltip content={<CUSTOM_TOOLTIP />} />
              <Area type="monotone" dataKey="throughput" name="Throughput (bpd)" stroke="#3b82f6" fill="url(#prodGrad)" strokeWidth={2} />
              <Line type="monotone" dataKey="target" name="Target" stroke="#94a3b8" strokeDasharray="4 4" dot={false} strokeWidth={1.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Energy Trend */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">Energy Intensity</h3>
          <p className="text-xs text-slate-400 mb-4">MMBtu per barrel (last 14 days)</p>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={energyData}>
              <defs>
                <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} domain={[0.9, 1.6]} />
              <Tooltip content={<CUSTOM_TOOLTIP />} />
              <Area type="monotone" dataKey="usage" name="Energy (MMBtu/bbl)" stroke="#f59e0b" fill="url(#energyGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Operational Insights */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Activity className="w-4 h-4 text-blue-500" />
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Operational Insights</h3>
          <span className="ml-auto text-xs text-slate-400">AI-generated · Updated 5 min ago</span>
        </div>
        <div className="space-y-2">
          <InsightRow icon={AlertTriangle} message="Pump P-101 vibration increased by 12% this week. Bearing inspection recommended before next scheduled maintenance." type="warning" />
          <InsightRow icon={AlertTriangle} message="Hydrocracker Unit HC-201 efficiency dropped by 3% over 7 days. Review heat exchange fouling status." type="warning" />
          <InsightRow icon={XCircle} message="3 devices offline in CDU: PT-01, PT-03, VM-04. Possible network gateway issue at rack-level." type="error" />
          <InsightRow icon={AlertCircle} message="Energy usage in Utilities section increased by 5% compared to last month. Check steam trap performance." type="warning" />
          <InsightRow icon={Info} message="Distillation Column DC-01 performing within specifications. Tray efficiency at 94.2% — above benchmark." type="info" />
        </div>
      </div>
    </div>
  );
}
