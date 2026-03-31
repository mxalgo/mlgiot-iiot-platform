import React from 'react';
import { Settings, Calendar, Building, Hash, MapPin, Tag } from 'lucide-react';
import { Badge } from '../ui/Badge';

const statusVariant = {
  Running: 'success',
  Stopped: 'secondary',
  Maintenance: 'warning',
  Fault: 'error',
  Standby: 'outline',
};

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

export default function AssetPanel({ node }) {
  if (!node) return null;

  const variant = statusVariant[node.status] || 'secondary';

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Header */}
      <div className="flex items-start space-x-3">
        <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <Settings className="w-6 h-6 text-slate-600 dark:text-slate-300" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">{node.class}</p>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">{node.name}</h2>
          <div className="flex items-center space-x-2 mt-2">
            <Badge variant={variant}>{node.status}</Badge>
            <span className="text-xs text-slate-400">{node.assetCode}</span>
          </div>
        </div>
      </div>

      {/* Details Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Asset Details</h3>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          <Field icon={Tag} label="Asset Code" value={node.assetCode} />
          <Field icon={Settings} label="Equipment Class" value={node.class} />
          <Field icon={Building} label="Manufacturer / OEM" value={node.manufacturer} />
          <Field icon={Hash} label="Serial Number" value={node.serialNumber} />
          <Field icon={Calendar} label="Installation Date" value={new Date(node.installDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} />
        </div>
      </div>

      {/* Connected Devices Summary */}
      {node.children && node.children.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Connected Devices</h3>
          <div className="space-y-3">
            {node.children.map(dev => (
              <div key={dev.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{dev.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{dev.vendor} · {dev.protocol}</p>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">Online</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
