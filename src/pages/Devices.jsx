import React from 'react';
import { Cpu, Wifi, WifiOff, Signal, Clock, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { getStatusBadgeClass, getStatusDotColor } from '../lib/utils';

const DEVICES = [
  { id: 'dev-01', name: 'Vibration Monitor VM-01', vendor: 'Emerson Rosemount', protocol: 'OPC UA', type: 'Vibration Monitor', ip: '192.168.10.115', gateway: 'GW-CDU-01', firmware: 'v2.4.1', signal: 98, dataQuality: 99.2, status: 'Online', lastComm: '< 1 min ago' },
  { id: 'dev-02', name: 'Pressure Transmitter PT-01', vendor: 'Yokogawa EJA', protocol: 'HART', type: 'Pressure Transmitter', ip: '192.168.10.116', gateway: 'GW-CDU-01', firmware: 'v1.1.0', signal: 94, dataQuality: 98.8, status: 'Online', lastComm: '< 1 min ago' },
  { id: 'dev-03', name: 'Temperature Transmitter TT-02', vendor: 'Siemens SITRANS', protocol: 'PROFINET', type: 'Temp Transmitter', ip: '192.168.10.120', gateway: 'GW-CDU-02', firmware: 'v3.0.1', signal: 87, dataQuality: 97.1, status: 'Online', lastComm: '2 min ago' },
  { id: 'dev-04', name: 'Power Meter PM-01', vendor: 'Schneider Electric', protocol: 'Modbus TCP', type: 'Power Meter', ip: '192.168.10.130', gateway: 'GW-HCU-01', firmware: 'v1.8.2', signal: 91, dataQuality: 99.0, status: 'Online', lastComm: '< 1 min ago' },
  { id: 'dev-05', name: 'Flow Meter FT-03', vendor: 'Endress+Hauser', protocol: 'OPC UA', type: 'Flow Meter', ip: '192.168.10.141', gateway: 'GW-CDU-01', firmware: 'v4.2.0', signal: 0, dataQuality: 0, status: 'Offline', lastComm: '47 min ago' },
  { id: 'dev-06', name: 'Level Transmitter LT-04', vendor: 'ABB 266', protocol: 'HART', type: 'Level Transmitter', ip: '192.168.10.142', gateway: 'GW-CDU-02', firmware: 'v2.1.1', signal: 0, dataQuality: 0, status: 'Offline', lastComm: '1.2 hrs ago' },
  { id: 'dev-07', name: 'Gas Detector GD-05', vendor: 'Honeywell Sensepoint', protocol: 'Modbus RTU', type: 'Gas Detector', ip: '192.168.10.150', gateway: 'GW-UTL-01', firmware: 'v1.0.4', signal: 82, dataQuality: 96.5, status: 'Online', lastComm: '< 1 min ago' },
  { id: 'dev-08', name: 'Edge Gateway GW-CDU-01', vendor: 'Siemens SINEMA', protocol: 'EtherNet/IP', type: 'RTU Gateway', ip: '192.168.10.100', gateway: 'N/A', firmware: 'v5.1.0', signal: 100, dataQuality: 100, status: 'Online', lastComm: '< 1 min ago' },
];

const GATEWAY_DATA = [
  { name: 'GW-CDU-01', devices: 24, online: 22, offline: 2 },
  { name: 'GW-CDU-02', devices: 18, online: 17, offline: 1 },
  { name: 'GW-HCU-01', devices: 20, online: 19, offline: 1 },
  { name: 'GW-UTL-01', devices: 15, online: 14, offline: 1 },
];

const CONN_DATA = [
  { name: 'OPC UA', count: 980 }, { name: 'HART', count: 640 },
  { name: 'Modbus TCP', count: 420 }, { name: 'PROFINET', count: 280 },
  { name: 'EtherNet/IP', count: 130 },
];

const Tooltip2 = ({ active, payload, label }) => {
  if (active && payload && payload.length) return (
    <div className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-lg text-xs">
      <p className="font-semibold text-slate-700 mb-1">{label}</p>
      {payload.map((p, i) => <p key={i} style={{ color: p.color }}>{p.name}: <b>{p.value}</b></p>)}
    </div>
  );
  return null;
};

const SignalBar = ({ value }) => {
  if (value === 0) return <span className="text-xs text-slate-400">— N/A</span>;
  const color = value >= 85 ? '#10b981' : value >= 60 ? '#f59e0b' : '#ef4444';
  return (
    <div className="flex items-center space-x-1.5">
      <div className="flex space-x-0.5 items-end h-3">
        {[25, 50, 75, 100].map((t, i) => (
          <div key={i} className="w-1.5 rounded-sm" style={{ height: `${40 + i * 20}%`, background: value >= t ? color : '#e2e8f0' }}></div>
        ))}
      </div>
      <span className="text-xs font-medium" style={{ color }}>{value}%</span>
    </div>
  );
};

export default function Devices() {
  const online = DEVICES.filter(d => d.status === 'Online').length;
  const offline = DEVICES.filter(d => d.status === 'Offline').length;

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full bg-slate-50">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Devices</h1>
          <p className="text-sm text-slate-500 mt-0.5">Field instrument connectivity & health</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Devices', value: '2,480', icon: Cpu, color: 'bg-blue-600' },
          { label: 'Online', value: `${online < 10 ? '2,4' : '2,'}${online < 10 ? '5' : ''}0`, icon: Wifi, color: 'bg-emerald-600' },
          { label: 'Offline', value: '30', icon: WifiOff, color: 'bg-red-600' },
          { label: 'Avg Signal Quality', value: '96.2%', icon: Signal, color: 'bg-violet-600' },
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

      {/* Charts */}
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Devices by Protocol</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={CONN_DATA} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: '#64748b' }} width={72} axisLine={false} tickLine={false} />
              <Tooltip content={<Tooltip2 />} />
              <Bar dataKey="count" name="Devices" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Gateway Health Summary</h3>
          <div className="space-y-3">
            {GATEWAY_DATA.map(gw => (
              <div key={gw.name} className="flex items-center space-x-3">
                <span className="text-xs font-mono text-slate-600 w-24">{gw.name}</span>
                <div className="flex-1 flex items-center space-x-1">
                  <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="h-2 bg-emerald-500 rounded-full" style={{ width: `${(gw.online / gw.devices) * 100}%` }}></div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-emerald-600 font-semibold">{gw.online}</span>
                  <span className="text-slate-300">/</span>
                  <span className="text-slate-500">{gw.devices}</span>
                  {gw.offline > 0 && <span className="text-red-500 font-medium">-{gw.offline}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Device Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800">Device Registry</h3>
          {offline > 0 && <span className="flex items-center text-xs text-red-600 space-x-1"><AlertTriangle className="w-3.5 h-3.5" /><span>{offline} offline</span></span>}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {['Device', 'Type', 'Vendor', 'Protocol', 'Gateway', 'Firmware', 'Signal', 'Data Quality', 'Last Comm', 'Status'].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {DEVICES.map(d => (
                <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-2.5 font-medium text-slate-800">{d.name}</td>
                  <td className="px-4 py-2.5 text-slate-500">{d.type}</td>
                  <td className="px-4 py-2.5 text-slate-600">{d.vendor}</td>
                  <td className="px-4 py-2.5"><span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded text-xs font-medium">{d.protocol}</span></td>
                  <td className="px-4 py-2.5 font-mono text-slate-500">{d.gateway}</td>
                  <td className="px-4 py-2.5 font-mono text-slate-400">{d.firmware}</td>
                  <td className="px-4 py-2.5"><SignalBar value={d.signal} /></td>
                  <td className="px-4 py-2.5">
                    {d.dataQuality > 0 ? (
                      <span className={`font-semibold ${d.dataQuality >= 99 ? 'text-emerald-600' : d.dataQuality >= 95 ? 'text-amber-600' : 'text-red-600'}`}>{d.dataQuality}%</span>
                    ) : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="px-4 py-2.5 text-slate-500">{d.lastComm}</td>
                  <td className="px-4 py-2.5">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(d.status)}`}>{d.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
