import React, { useState } from 'react';
import {
  Activity, AlertTriangle, BarChart2, CheckCircle, ChevronRight,
  Cpu, Factory, Layers, LineChart, Settings, Shield, Wrench, Zap,
  TrendingDown, TrendingUp, Globe, Database, Gauge, Eye,
  Bell, FileText, ArrowRight, Play
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { MLGIoTLogo } from '../components/layout/Header';

// ────────────────────────────────────── Data
const HEALTH_DATA = [
  { name: 'Healthy', value: 1120, color: '#10b981' },
  { name: 'Warning', value: 85, color: '#f59e0b' },
  { name: 'Critical', value: 35, color: '#ef4444' },
];
const ALERT_BAR = [
  { name: 'Vibration', w: 12, c: 3 }, { name: 'Temp.', w: 8, c: 2 },
  { name: 'Pressure', w: 5, c: 4 }, { name: 'Offline', w: 0, c: 7 },
];
const PRODUCTION_TREND = Array.from({ length: 10 }, (_, i) => ({
  day: `Mar ${i + 22}`, val: Math.round(12000 + Math.sin(i * 0.8) * 600 + Math.random() * 150),
}));
const ENERGY_TREND = Array.from({ length: 10 }, (_, i) => ({
  day: `Mar ${i + 22}`, val: parseFloat((1.22 - i * 0.004 + Math.sin(i * 0.5) * 0.01).toFixed(3)),
}));

// ────────────────────────────────────── Sub-components
const SectionLabel = ({ text }) => (
  <span className="inline-block text-[11px] font-bold text-blue-600 tracking-widest uppercase bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-3">
    {text}
  </span>
);

const ChartTip = ({ active, payload, label }) => {
  if (active && payload?.length) return (
    <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-lg text-xs">
      <p className="font-semibold text-slate-700 mb-1">{label}</p>
      {payload.map((p, i) => <p key={i} style={{ color: p.color || p.stroke }}>{p.name}: <b>{p.value}</b></p>)}
    </div>
  );
  return null;
};

const PieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
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

// ────────────────────────────────────── Section 1: Hero
function Hero({ onNavigate }) {
  return (
    <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 80% 20%, #1d4ed8 0%, transparent 40%)',
      }} />
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
        {/* Pill badge */}
        <div className="inline-flex items-center space-x-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs font-semibold text-blue-200 tracking-wide">Live Platform · Demo Version 1.0</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <h1 className="text-3xl xl:text-4xl font-extrabold leading-tight text-white mb-2">
              Industrial Operations<br />
              <span className="text-blue-400">Intelligence Platform</span>
            </h1>
            <p className="text-blue-200 text-sm font-medium mb-6 tracking-wide">
              AI-Driven Industrial Asset, Operations and Telemetry Intelligence
            </p>
            <p className="text-slate-300 text-sm leading-relaxed mb-8 max-w-xl">
              MLGIoT Industrial Operations Intelligence Platform provides real-time visibility into plant operations, asset health, device connectivity and telemetry data — helping industries reduce downtime, optimize performance and improve operational efficiency.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <button onClick={() => onNavigate('operations')} className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-900/40 hover:shadow-blue-500/30 hover:-translate-y-0.5 duration-200">
                <Play className="w-3.5 h-3.5" />
                <span>Explore Operations</span>
              </button>
              <button onClick={() => onNavigate('assets')} className="flex items-center space-x-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl transition-all border border-white/20 hover:-translate-y-0.5 duration-200">
                <span>View Assets</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => onNavigate('analytics')} className="flex items-center space-x-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl transition-all border border-white/20 hover:-translate-y-0.5 duration-200">
                <span>View Analytics</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Summary stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Total Assets', value: '1,240', icon: Settings, color: 'from-blue-600 to-blue-700' },
                { label: 'Connected Devices', value: '2,450', icon: Cpu, color: 'from-emerald-600 to-emerald-700' },
                { label: 'Active Alerts', value: '6', icon: Bell, color: 'from-amber-500 to-orange-600' },
                { label: 'Plant Efficiency', value: '90.3%', icon: Gauge, color: 'from-violet-600 to-violet-700' },
              ].map(c => (
                <div key={c.label} className="bg-white/5 border border-white/10 rounded-xl p-3.5 backdrop-blur-sm">
                  <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center mb-2`}>
                    <c.icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <p className="text-xl font-extrabold text-white leading-none">{c.value}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{c.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right – mini chart preview */}
          <div className="hidden lg:block">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-slate-300">Production Throughput · Live</p>
                <span className="flex items-center space-x-1 text-[10px] text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span>Streaming</span>
                </span>
              </div>
              <ResponsiveContainer width="100%" height={140}>
                <AreaChart data={PRODUCTION_TREND}>
                  <defs>
                    <linearGradient id="heroG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 9, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 9, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} domain={[10500, 13500]} />
                  <Tooltip content={<ChartTip />} />
                  <Area type="monotone" dataKey="val" name="bpd" stroke="#60a5fa" fill="url(#heroG)" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10">
                {[['Healthy Assets', '1,120', '#10b981'], ['Warning', '85', '#f59e0b'], ['Critical', '35', '#ef4444']].map(([l, v, c]) => (
                  <div key={l} className="text-center">
                    <p className="text-base font-bold" style={{ color: c }}>{v}</p>
                    <p className="text-[10px] text-slate-400">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────── Section 2: Features
function Features() {
  const items = [
    { icon: Settings, color: 'bg-blue-600', title: 'Asset Intelligence', desc: 'Real-time equipment health monitoring, condition-based alerts, and failure pattern detection across all plant assets.' },
    { icon: Cpu, color: 'bg-emerald-600', title: 'Device Monitoring', desc: 'Track field device connectivity, signal quality, firmware versions, and gateway health across 2,400+ connected instruments.' },
    { icon: Activity, color: 'bg-violet-600', title: 'Telemetry Intelligence', desc: 'Real-time OPC UA, HART, Modbus sensor data with tag path browsing, quality monitoring and historical analysis.' },
    { icon: LineChart, color: 'bg-rose-600', title: 'Predictive Maintenance', desc: 'AI-driven failure prediction using vibration trends, bearing degradation patterns and remaining useful life estimation.' },
    { icon: BarChart2, color: 'bg-amber-500', title: 'Operational Analytics', desc: 'Plant KPI dashboards, OEE analysis, energy intensity trends, and unit-level production performance tracking.' },
    { icon: Bell, color: 'bg-red-600', title: 'Alerts & Notifications', desc: 'Intelligent alarm management with severity classification, timeline analysis, and unacknowledged alert tracking.' },
  ];
  return (
    <section className="py-14 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-10">
          <SectionLabel text="Platform Capabilities" />
          <h2 className="text-2xl font-extrabold text-slate-900">What the Platform Does</h2>
          <p className="text-sm text-slate-500 mt-2 max-w-xl mx-auto">Six core capabilities designed for industrial operations teams, reliability engineers, and plant management.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(f => (
            <div key={f.title} className="group p-6 border border-slate-200 rounded-2xl hover:shadow-lg hover:border-blue-200 hover:-translate-y-1 transition-all duration-200 bg-white">
              <div className={`w-10 h-10 rounded-xl ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <f.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────── Section 3: Use Cases
function UseCases() {
  const cases = [
    {
      icon: Factory, color: 'bg-blue-600', title: 'Refinery Operations Monitoring',
      problem: 'No real-time visibility into CDU/HCU performance and offspec losses.',
      solution: 'Continuous asset health, unit efficiency and production throughput monitoring.',
      impact: 'Reduced planned downtime by 35%, improved throughput by 8%.',
    },
    {
      icon: Zap, color: 'bg-violet-600', title: 'Energy Management',
      problem: 'Rising energy costs with no granular consumption visibility by unit.',
      solution: 'Per-unit energy intensity tracking with deviation alerts from baseline.',
      impact: 'Identified 12% energy saving opportunity across Utilities & Steam.',
    },
    {
      icon: Wrench, color: 'bg-amber-500', title: 'Predictive Maintenance',
      problem: 'Reactive maintenance causing unplanned shutdowns on rotating equipment.',
      solution: 'AI-driven vibration pattern analysis and bearing degradation prediction.',
      impact: 'Reduced unplanned failures by 42%, MTBF improved from 310 to 420 hrs.',
    },
    {
      icon: Shield, color: 'bg-emerald-600', title: 'Asset Reliability',
      problem: 'High failure rates and inability to track equipment condition over time.',
      solution: 'Condition-based monitoring with health index trending and criticality ranking.',
      impact: 'Asset availability improved to 90.3%. Critical equipment uptime at 99.1%.',
    },
    {
      icon: Globe, color: 'bg-rose-600', title: 'Operational Safety',
      problem: 'Safety incidents from delayed response to critical process deviations.',
      solution: 'Real-time alarm management with severity classification and escalation rules.',
      impact: 'Zero safety incidents YTD. Critical alert response time reduced to 3 min.',
    },
  ];
  return (
    <section className="py-14 bg-slate-50">
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="text-center mb-10">
          <SectionLabel text="Industry Use Cases" />
          <h2 className="text-2xl font-extrabold text-slate-900">Solving Real Industrial Problems</h2>
          <p className="text-sm text-slate-500 mt-2 max-w-xl mx-auto">Demonstrated outcomes across oil &amp; gas, petrochemicals and process industries.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cases.map(c => (
            <div key={c.title} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md hover:border-blue-200 transition-all duration-200">
              <div className={`w-9 h-9 rounded-xl ${c.color} flex items-center justify-center mb-4`}>
                <c.icon className="w-4.5 h-4.5 w-5 h-5 text-white" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-4">{c.title}</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-2.5">
                  <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-md bg-red-50 border border-red-100 flex items-center justify-center">
                    <AlertTriangle className="w-2.5 h-2.5 text-red-500" />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold text-red-600 uppercase tracking-wide">Problem</p>
                    <p className="text-xs text-slate-600 leading-relaxed mt-0.5">{c.problem}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2.5">
                  <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <Eye className="w-2.5 h-2.5 text-blue-500" />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">Solution</p>
                    <p className="text-xs text-slate-600 leading-relaxed mt-0.5">{c.solution}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2.5">
                  <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                    <TrendingUp className="w-2.5 h-2.5 text-emerald-500" />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">Business Impact</p>
                    <p className="text-xs text-slate-600 leading-relaxed mt-0.5">{c.impact}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────── Section 4: Platform Modules
function Modules({ onNavigate }) {
  const mods = [
    { id: 'dashboard', icon: BarChart2, color: 'text-blue-600 bg-blue-50', title: 'Operations Dashboard', desc: 'Executive summary with live KPI cards, production trends, asset health overview and operational intelligence.' },
    { id: 'assets', icon: Settings, color: 'text-emerald-600 bg-emerald-50', title: 'Equipment Explorer', desc: 'Equipment register with tag codes, health index bars, criticality levels and Table/Explorer dual views.' },
    { id: 'devices', icon: Cpu, color: 'text-violet-600 bg-violet-50', title: 'Device Monitoring', desc: 'Field device connectivity status, signal quality bars, protocol, firmware and gateway health tracking.' },
    { id: 'telemetry', icon: Activity, color: 'text-sky-600 bg-sky-50', title: 'Telemetry Explorer', desc: 'OPC UA tag browser with live streaming charts, 24-hour history and data quality monitoring per sensor.' },
    { id: 'kpis', icon: Gauge, color: 'text-amber-600 bg-amber-50', title: 'KPI Analytics', desc: 'Plant KPI catalog with sparklines, MTBF/MTTR trends, OEE by unit, and on/off-target indicators.' },
    { id: 'alerts', icon: Bell, color: 'text-red-600 bg-red-50', title: 'Alerts Center', desc: 'Active alarm management with timeline analysis, severity filters, and unacknowledged alert tracking.' },
    { id: 'reports', icon: FileText, color: 'text-indigo-600 bg-indigo-50', title: 'Reports', desc: 'Scheduled and on-demand report catalog with PDF/Excel/CSV generation and download management.' },
    { id: 'maintenance', icon: Wrench, color: 'text-orange-600 bg-orange-50', title: 'Maintenance', desc: 'Work order management with priority, type classification, assignee, and upcoming maintenance schedule.' },
    { id: 'analytics', icon: LineChart, color: 'text-rose-600 bg-rose-50', title: 'Analytics', desc: 'Vibration trend analysis, energy consumption by unit, and AI-assisted predictive maintenance insights.' },
  ];
  return (
    <section className="py-14 bg-white">
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="text-center mb-10">
          <SectionLabel text="Platform Modules" />
          <h2 className="text-2xl font-extrabold text-slate-900">9 Integrated Operational Modules</h2>
          <p className="text-sm text-slate-500 mt-2 max-w-lg mx-auto">Each module is a fully interactive workspace. Click any card to open it.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mods.map(m => (
            <button key={m.id} onClick={() => onNavigate(m.id)} className="group text-left p-5 border border-slate-200 rounded-2xl hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 bg-white">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl ${m.color} flex items-center justify-center`}>
                  <m.icon className="w-4.5 h-4.5 w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">{m.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{m.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────── Section 5: Operational Insights
function Insights() {
  const items = [
    { type: 'warning', icon: AlertTriangle, color: 'bg-amber-50 border-amber-200 text-amber-700', icolor: 'text-amber-500', msg: 'Pump P-101 vibration velocity increased 8% over the last 7 days. Bearing inspection recommended.' },
    { type: 'error', icon: Cpu, color: 'bg-red-50 border-red-200 text-red-700', icolor: 'text-red-500', msg: '3 field devices offline in CDU: PT-01, PT-03, VM-04. Gateway LAN-07 may require restart.' },
    { type: 'warning', icon: TrendingDown, color: 'bg-amber-50 border-amber-200 text-amber-700', icolor: 'text-amber-500', msg: 'Hydrocracker Unit efficiency dropped 2.1% this week. Catalyst activity decline suspected.' },
    { type: 'warning', icon: Zap, color: 'bg-orange-50 border-orange-200 text-orange-700', icolor: 'text-orange-500', msg: 'Energy consumption in Utilities increased 5% MoM. Steam trap performance review recommended.' },
    { type: 'info', icon: CheckCircle, color: 'bg-emerald-50 border-emerald-200 text-emerald-700', icolor: 'text-emerald-500', msg: 'Distillation Column DC-01 tray efficiency at 94.2% — 2.4% above benchmark. No action required.' },
    { type: 'info', icon: Activity, color: 'bg-blue-50 border-blue-200 text-blue-700', icolor: 'text-blue-500', msg: 'Compressor HC-201 power consumption within spec. Energy efficiency ratio: 0.98. Condition: Healthy.' },
  ];
  return (
    <section className="py-10 sm:py-14 bg-slate-950">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-10">
          <SectionLabel text="Operational Intelligence" />
          <h2 className="text-2xl font-extrabold text-white">AI-Assisted Operational Insights</h2>
          <p className="text-sm text-slate-400 mt-2 max-w-lg mx-auto">The platform continuously analyzes plant data and surfaces actionable intelligence for your operations team.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((ins, i) => (
            <div key={i} className={`flex items-start space-x-3 p-4 rounded-xl border ${ins.color}`}>
              <ins.icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${ins.icolor}`} />
              <p className="text-xs leading-relaxed">{ins.msg}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────── Section 6: KPI Preview Charts
function KPIPreview() {
  return (
    <section className="py-14 bg-slate-50">
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="text-center mb-10">
          <SectionLabel text="Live Data Preview" />
          <h2 className="text-2xl font-extrabold text-slate-900">KPI Dashboard Preview</h2>
          <p className="text-sm text-slate-500 mt-2">Sample real-time charts as presented inside the platform.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Asset Health Donut */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm lg:col-span-1">
            <h3 className="text-xs font-bold text-slate-700 mb-1">Asset Health Distribution</h3>
            <p className="text-[10px] text-slate-400 mb-3">By condition status</p>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={HEALTH_DATA} cx="50%" cy="50%" innerRadius={38} outerRadius={62} dataKey="value" labelLine={false} label={PieLabel}>
                  {HEALTH_DATA.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip content={<ChartTip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {HEALTH_DATA.map(h => (
                <div key={h.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: h.color }}></span>
                    <span className="text-slate-500">{h.name}</span>
                  </div>
                  <span className="font-bold text-slate-700">{h.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Alert severity */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm lg:col-span-1">
            <h3 className="text-xs font-bold text-slate-700 mb-1">Alert Severity</h3>
            <p className="text-[10px] text-slate-400 mb-3">By alert category</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={ALERT_BAR} barGap={2} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} width={50} />
                <Tooltip content={<ChartTip />} />
                <Bar dataKey="w" name="Warning" fill="#f59e0b" radius={[0, 3, 3, 0]} />
                <Bar dataKey="c" name="Critical" fill="#ef4444" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Production trend */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm lg:col-span-1">
            <h3 className="text-xs font-bold text-slate-700 mb-1">Production Throughput</h3>
            <p className="text-[10px] text-slate-400 mb-3">bpd — last 10 days</p>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={PRODUCTION_TREND}>
                <defs>
                  <linearGradient id="pG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 8, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 8, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[10500, 13500]} />
                <Tooltip content={<ChartTip />} />
                <Area type="monotone" dataKey="val" name="bpd" stroke="#3b82f6" fill="url(#pG)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Energy trend */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm lg:col-span-1">
            <h3 className="text-xs font-bold text-slate-700 mb-1">Energy Intensity Trend</h3>
            <p className="text-[10px] text-slate-400 mb-3">MMBtu/bbl — last 10 days</p>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={ENERGY_TREND}>
                <defs>
                  <linearGradient id="eG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 8, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 8, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[1.0, 1.4]} />
                <Tooltip content={<ChartTip />} />
                <Area type="monotone" dataKey="val" name="MMBtu/bbl" stroke="#8b5cf6" fill="url(#eG)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────── Section 7: Architecture
function Architecture() {
  const levels = [
    { label: 'Enterprise', icon: Globe, desc: 'Multi-tenant organization layer', color: 'bg-slate-900 text-white', width: '100%' },
    { label: 'Plant', icon: Factory, desc: 'Texas City Plant, Gulf Refinery…', color: 'bg-blue-700 text-white', width: '90%' },
    { label: 'Process Unit', icon: Layers, desc: 'CDU, HCU, ARU, Utilities…', color: 'bg-blue-500 text-white', width: '80%' },
    { label: 'Equipment / Asset', icon: Settings, desc: 'Pumps, Compressors, Vessels, Columns…', color: 'bg-blue-400 text-white', width: '68%' },
    { label: 'Field Device', icon: Cpu, desc: 'Transmitters, Monitors, Meters, PLCs…', color: 'bg-blue-300 text-blue-900', width: '56%' },
    { label: 'Telemetry Tag', icon: Activity, desc: 'CDU/P101/VIB/VELOCITY · OPC UA · 1s', color: 'bg-blue-100 text-blue-800', width: '44%' },
  ];
  return (
    <section className="py-14 bg-white">
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionLabel text="Platform Architecture" />
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">End-to-End Visibility:<br />Plant to Sensor</h2>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              MLGIoT provides a unified data hierarchy from enterprise organization level down to individual telemetry tags — giving operations teams full context at every level of the plant.
            </p>
            <div className="space-y-2">
              {['Modular JSON-based data layer for easy API replacement', 'OPC UA, HART, Modbus, PROFINET and EtherNet/IP support', 'Multi-tenant architecture with role-based access control', 'Real-time event streaming with sub-second latency'].map(item => (
                <div key={item} className="flex items-center space-x-2.5 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center space-y-1.5">
            {levels.map((l, i) => (
              <div key={l.label} className="w-full flex justify-center">
                <div className={`rounded-xl px-5 py-3 ${l.color} flex items-center space-x-3`} style={{ width: l.width }}>
                  <l.icon className="w-4 h-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold">{l.label}</p>
                    <p className="text-[10px] opacity-70 mt-0.5 truncate">{l.desc}</p>
                  </div>
                  {i < levels.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────── Section 8: Value Proposition
function ValueProp() {
  const values = [
    { icon: TrendingDown, title: 'Reduce Downtime', value: '↓ 42%', desc: 'Unplanned failures prevented through predictive condition monitoring.', color: 'text-blue-600 bg-blue-50' },
    { icon: CheckCircle, title: 'Improve Reliability', value: '90.3%', desc: 'Asset availability index tracked and improved continuously.', color: 'text-emerald-600 bg-emerald-50' },
    { icon: Zap, title: 'Increase Efficiency', value: '↑ 8%', desc: 'Production throughput improvement through operational intelligence.', color: 'text-violet-600 bg-violet-50' },
    { icon: Shield, title: 'Improve Safety', value: '0 Incidents', desc: 'Zero safety incidents with real-time critical alarm management.', color: 'text-rose-600 bg-rose-50' },
    { icon: Database, title: 'Predictive Operations', value: '91.4%', desc: 'AI model accuracy for failure prediction on rotating equipment.', color: 'text-amber-600 bg-amber-50' },
  ];
  return (
    <section className="py-10 sm:py-14 bg-gradient-to-br from-blue-950 to-slate-900">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-10">
          <SectionLabel text="Business Value" />
          <h2 className="text-2xl font-extrabold text-white">Demonstrated Business Impact</h2>
          <p className="text-sm text-slate-400 mt-2 max-w-lg mx-auto">Quantifiable outcomes delivered to industrial operations across Texas City Plant.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {values.map(v => (
            <div key={v.title} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className={`w-10 h-10 rounded-xl ${v.color} flex items-center justify-center mx-auto mb-3`}>
                <v.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-extrabold text-white mb-1">{v.value}</p>
              <p className="text-xs font-bold text-slate-300 mb-2">{v.title}</p>
              <p className="text-[10px] text-slate-400 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────── Section 9: About
function About() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-screen-xl mx-auto px-8">
        <div className="max-w-3xl mx-auto text-center">
          <SectionLabel text="About the Platform" />
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">About Industrial Operations Intelligence Platform</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            MLGIoT Industrial Operations Intelligence Platform is an enterprise Industrial IoT solution developed by <strong>MXAlgo Technologies</strong>. 
            It enables industries to monitor assets, devices and operations in real-time using advanced analytics and AI-driven insights.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed mb-8">
            The platform is built on a modular, API-first architecture supporting OPC UA, HART, and Modbus protocols. 
            It is designed for seamless deployment in oil &amp; gas refineries, petrochemical plants, utilities and industrial facilities 
            requiring end-to-end visibility from enterprise level to individual telemetry tags.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              ['Industries Served', 'Oil & Gas, Petrochemicals, Utilities, Manufacturing'],
              ['Protocol Support', 'OPC UA, HART, Modbus TCP/RTU, PROFINET, EtherNet/IP'],
              ['Deployment', 'On-Premise, Private Cloud, Azure / AWS Compatible'],
            ].map(([t, v]) => (
              <div key={t} className="text-left p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">{t}</p>
                <p className="text-xs text-slate-700 leading-relaxed">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────── Section 10: Footer
function Footer({ onNavigate }) {
  return (
    <footer className="bg-slate-950 text-slate-300 py-10 border-t border-slate-800">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex flex-col mb-3">
              <span className="text-lg font-extrabold text-white tracking-tight">MLGIoT</span>
              <span className="text-[10px] text-slate-500 mt-0.5">by MXAlgo Technologies</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              AI-driven Industrial Asset, Operations and Telemetry Intelligence for enterprise industrial operations.
            </p>
            <p className="text-[10px] text-slate-600 mt-4 font-mono">Demo Version 1.0</p>
          </div>

          {/* Modules */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Platform Modules</h4>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                ['Dashboard', 'dashboard'], ['Assets', 'assets'],
                ['Devices', 'devices'], ['Telemetry', 'telemetry'],
                ['KPIs', 'kpis'], ['Reports', 'reports'],
                ['Alerts', 'alerts'], ['Maintenance', 'maintenance'],
              ].map(([l, id]) => (
                <button key={id} onClick={() => onNavigate(id)} className="text-xs text-slate-400 hover:text-white text-left transition-colors">
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Platform info */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Platform Info</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p><span className="text-slate-500">Platform:</span> Industrial Operations Intelligence Platform</p>
              <p><span className="text-slate-500">Developer:</span> MXAlgo Technologies</p>
              <p><span className="text-slate-500">Version:</span> Demo Version 1.0</p>
              <p><span className="text-slate-500">Protocol Support:</span> OPC UA · HART · Modbus</p>
              <p><span className="text-slate-500">Architecture:</span> Multi-tenant, API-first</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-slate-600">© 2026 MXAlgo Technologies. MLGIoT Industrial Operations Intelligence Platform.</p>
          <p className="text-xs text-slate-600 mt-2 md:mt-0">Powered by <span className="text-slate-400 font-semibold">MXAlgo Technologies</span></p>
        </div>
      </div>
    </footer>
  );
}

// ────────────────────────────────────── Main Landing Page
export default function LandingPage({ onNavigate }) {
  return (
    <div className="overflow-y-auto h-full">
      <Hero onNavigate={onNavigate} />
      <Features />
      <UseCases />
      <Modules onNavigate={onNavigate} />
      <Insights />
      <KPIPreview />
      <Architecture />
      <ValueProp />
      <About />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
