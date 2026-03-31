import React from 'react';
import { Cpu, Wifi, Clock, Shield, Hash, Globe } from 'lucide-react';
import { Badge } from '../ui/Badge';

const Field = ({ icon: Icon, label, value }) => (
  <div className="flex items-start space-x-3 py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
    <div className="mt-0.5 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
      <Icon className="w-3.5 h-3.5 text-slate-500" />
    </div>
    <div>
      <p className="text-xs text-slate-400 dark:text-slate-500">{label}</p>
      <p className="text-sm font-semibold text-slate-800 dark:text-white mt-0.5">{value}</p>
    </div>
  </div>
);

export default function DevicePanel({ node }) {
  if (!node) return null;

  const lastSeenDate = node.lastSeen ? new Date(node.lastSeen) : null;
  const now = new Date();
  const diffMin = lastSeenDate ? Math.floor((now - lastSeenDate) / 60000) : null;
  const isOnline = diffMin !== null && diffMin < 30;

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Header */}
      <div className="flex items-start space-x-3">
        <div className="p-2.5 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl">
          <Cpu className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Field Device</p>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">{node.name}</h2>
          <div className="flex items-center space-x-2 mt-2">
            <div className="flex items-center space-x-1.5">
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
              <Badge variant={isOnline ? 'success' : 'error'}>{isOnline ? 'Online' : 'Offline'}</Badge>
            </div>
            <span className="text-xs text-slate-400">{node.vendor}</span>
          </div>
        </div>
      </div>

      {/* Details Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Device Details</h3>
        <Field icon={Cpu} label="Device Vendor" value={node.vendor} />
        <Field icon={Wifi} label="Protocol" value={node.protocol} />
        <Field icon={Hash} label="Firmware Version" value={node.firmware} />
        <Field icon={Globe} label="IP Address" value={node.ipAddress} />
        <Field icon={Shield} label="Connectivity" value={node.connectivity} />
        <Field icon={Clock} label="Last Seen" value={
          lastSeenDate ? `${lastSeenDate.toLocaleTimeString()} · ${diffMin} min ago` : 'Unknown'
        } />
      </div>

      {/* Parameters Summary */}
      {node.children && node.children.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Telemetry Parameters</h3>
          <div className="space-y-2">
            {node.children.map(param => (
              <div key={param.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{param.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{param.unit}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-base font-bold text-slate-900 dark:text-white">{param.value}</span>
                  <Badge variant={param.status === 'Normal' ? 'success' : param.status === 'Warning' ? 'warning' : 'error'}>
                    {param.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
