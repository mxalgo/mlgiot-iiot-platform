import React, { useState, useEffect, useRef } from 'react';
import { Activity, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Badge } from '../ui/Badge';
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, ReferenceArea, Legend
} from 'recharts';
import { format } from './telemetryUtils';

// Generate realistic fake 24h history
function generate24hData(baseValue, unit, normalMax, warnMax) {
  const now = Date.now();
  return Array.from({ length: 48 }, (_, i) => {
    const t = now - (48 - i) * 30 * 60 * 1000;
    const value = parseFloat((baseValue + (Math.random() - 0.5) * baseValue * 0.12).toFixed(2));
    const status = value >= warnMax ? 'Critical' : value >= normalMax ? 'Warning' : 'Normal';
    return {
      time: new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      value,
      status,
      quality: status === 'Normal' ? 'Good' : status === 'Warning' ? 'Uncertain' : 'Bad',
    };
  });
}

// Status config
function getStatusMeta(status) {
  const map = {
    Normal: { label: 'Normal', variant: 'success', icon: CheckCircle, color: '#22c55e' },
    Warning: { label: 'Warning', variant: 'warning', icon: AlertTriangle, color: '#f59e0b' },
    Critical: { label: 'Critical', variant: 'error', icon: XCircle, color: '#ef4444' },
  };
  return map[status] || map['Normal'];
}

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

const StatCard = ({ label, value, unit, sub, highlight }) => (
  <div className={`rounded-xl p-4 border ${highlight
    ? 'bg-blue-600 border-blue-500 text-white'
    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white'} shadow-sm`}>
    <p className={`text-xs font-medium ${highlight ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>{label}</p>
    <div className="flex items-end space-x-1 mt-1">
      <span className={`text-2xl font-bold ${highlight ? 'text-white' : ''}`}>{value}</span>
      <span className={`text-sm pb-0.5 ${highlight ? 'text-blue-200' : 'text-slate-400'}`}>{unit}</span>
    </div>
    {sub && <p className={`text-xs mt-1 ${highlight ? 'text-blue-200' : 'text-slate-400'}`}>{sub}</p>}
  </div>
);

export default function TelemetryPanel({ node }) {
  const [liveData, setLiveData] = useState([]);
  const [history] = useState(() => generate24hData(node.value, node.unit, node.normalRange[1], node.warningRange[1]));
  const intervalRef = useRef(null);

  const statusMeta = getStatusMeta(node.status);
  const StatusIcon = statusMeta.icon;
  const normalMax = node.normalRange[1];
  const warnMax = node.warningRange[1];

  // Simulate live feed
  useEffect(() => {
    const init = Array.from({ length: 20 }, (_, i) => {
      const t = new Date(Date.now() - (20 - i) * 5000);
      return {
        time: t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        value: parseFloat((node.value + (Math.random() - 0.5) * node.value * 0.06).toFixed(2)),
      };
    });
    setLiveData(init);
    intervalRef.current = setInterval(() => {
      setLiveData(prev => {
        const next = [...prev.slice(-39), {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          value: parseFloat((node.value + (Math.random() - 0.5) * node.value * 0.08).toFixed(2)),
        }];
        return next;
      });
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, [node]);

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="p-2.5 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
            <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Live Telemetry</p>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">{node.name}</h2>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <Badge variant={statusMeta.variant}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {statusMeta.label}
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Current Value" value={node.value} unit={node.unit} sub="Live reading" highlight />
        <StatCard label="Minimum (24h)" value={node.min} unit={node.unit} sub="Lowest recorded" />
        <StatCard label="Maximum (24h)" value={node.max} unit={node.unit} sub="Peak recorded" />
        <StatCard label="24h Average" value={node.average} unit={node.unit} sub="Mean value" />
      </div>

      {/* Threshold Legend */}
      <div className="flex items-center space-x-6 text-xs font-medium">
        <div className="flex items-center space-x-1.5"><span className="w-3 h-1.5 rounded-full bg-green-500 inline-block"></span> Normal (0 – {normalMax} {node.unit})</div>
        <div className="flex items-center space-x-1.5"><span className="w-3 h-1.5 rounded-full bg-yellow-500 inline-block"></span> Warning ({normalMax} – {warnMax} {node.unit})</div>
        <div className="flex items-center space-x-1.5"><span className="w-3 h-1.5 rounded-full bg-red-500 inline-block"></span> Critical (&gt;{warnMax} {node.unit})</div>
      </div>

      {/* Live Trend Chart */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Live Trend</h3>
          <span className="text-xs text-green-500 font-medium flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block"></span>
            <span>Streaming</span>
          </span>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={liveData}>
            <defs>
              <linearGradient id="liveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="time" tick={{ fontSize: 9, fill: '#94a3b8' }} interval="preserveStartEnd" />
            <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} />
            <Tooltip content={<TOOLTIP />} />
            <ReferenceLine y={normalMax} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: 'Warn', position: 'right', fontSize: 9, fill: '#f59e0b' }} />
            <ReferenceLine y={warnMax} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'Crit', position: 'right', fontSize: 9, fill: '#ef4444' }} />
            <Area type="monotone" dataKey="value" name={`${node.name} (${node.unit})`} stroke="#8b5cf6" fill="url(#liveGrad)" strokeWidth={2} dot={false} isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* 24h History Chart */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">24-Hour History</h3>
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={history}>
            <defs>
              <linearGradient id="histGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="time" tick={{ fontSize: 9, fill: '#94a3b8' }} interval={7} />
            <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} />
            <Tooltip content={<TOOLTIP />} />
            <ReferenceArea y1={normalMax} y2={warnMax} fill="#fef9c3" fillOpacity={0.4} />
            <ReferenceArea y1={warnMax} y2={warnMax * 1.5} fill="#fee2e2" fillOpacity={0.4} />
            <ReferenceLine y={normalMax} stroke="#f59e0b" strokeDasharray="3 3" />
            <ReferenceLine y={warnMax} stroke="#ef4444" strokeDasharray="3 3" />
            <Area type="monotone" dataKey="value" name={`${node.name} (${node.unit})`} stroke="#3b82f6" fill="url(#histGrad)" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Telemetry Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Recent Readings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="text-left px-4 py-2.5 font-semibold text-slate-500 dark:text-slate-400">Timestamp</th>
                <th className="text-right px-4 py-2.5 font-semibold text-slate-500 dark:text-slate-400">Value ({node.unit})</th>
                <th className="text-center px-4 py-2.5 font-semibold text-slate-500 dark:text-slate-400">Quality</th>
                <th className="text-center px-4 py-2.5 font-semibold text-slate-500 dark:text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {history.slice(-10).reverse().map((row, i) => {
                const sm = getStatusMeta(row.status);
                const qColor = row.quality === 'Good' ? 'text-green-600 dark:text-green-400' : row.quality === 'Uncertain' ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400';
                return (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-2.5 text-slate-600 dark:text-slate-300 font-mono">{row.time}</td>
                    <td className="px-4 py-2.5 text-right font-bold text-slate-900 dark:text-white">{row.value}</td>
                    <td className={`px-4 py-2.5 text-center font-medium ${qColor}`}>{row.quality}</td>
                    <td className="px-4 py-2.5 text-center">
                      <Badge variant={sm.variant}>{row.status}</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
