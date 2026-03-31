import React from 'react';
import { Gauge, BarChart2, Building, Factory, Layers, CheckCircle2, TrendingUp } from 'lucide-react';
import { Badge } from '../ui/Badge';
import UseCasePanel from './UseCasePanel';
import AssetPanel from './AssetPanel';
import DevicePanel from './DevicePanel';
import TelemetryPanel from './TelemetryPanel';
import ExecutiveDashboard from './ExecutiveDashboard';

// KPI Detail Panel
const KPIPanel = ({ node }) => (
  <div className="p-6 space-y-4 overflow-y-auto h-full">
    <div className="flex items-start space-x-3">
      <div className="p-2.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
        <Gauge className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
      </div>
      <div>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">KPI Indicator</p>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">{node.name}</h2>
      </div>
    </div>
    <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-6 flex flex-col items-center">
      <p className="text-xs text-indigo-500 font-medium uppercase tracking-wide mb-2">Current Value</p>
      <p className="text-5xl font-extrabold text-indigo-700 dark:text-indigo-300">{node.value}</p>
      <div className="flex items-center space-x-1 mt-3 text-green-600">
        <TrendingUp className="w-4 h-4" />
        <span className="text-sm font-semibold">On Target</span>
      </div>
    </div>
  </div>
);

// Generic placeholder
const PlaceholderPanel = ({ node }) => (
  <div className="p-6 flex items-center justify-center h-full">
    <div className="text-center space-y-3">
      {node.type === 'Organization' ? <Building className="w-12 h-12 text-slate-300 mx-auto" /> :
       node.type === 'Plant' ? <Factory className="w-12 h-12 text-slate-300 mx-auto" /> :
       <Layers className="w-12 h-12 text-slate-300 mx-auto" />}
      <div>
        <p className="text-lg font-bold text-slate-800 dark:text-slate-200">{node.name}</p>
        <p className="text-sm text-slate-400 mt-1">{node.type}</p>
        {node.children && (
          <p className="text-xs text-slate-400 mt-2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full inline-block">
            {node.children.length} child node{node.children.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>
      <p className="text-xs text-slate-400 dark:text-slate-500">Select a child node to explore details</p>
    </div>
  </div>
);

export default function DetailsPanel({ node }) {
  if (!node) return <ExecutiveDashboard />;

  switch (node.type) {
    case 'Organization':
      return node.type === 'Organization' ? <ExecutiveDashboard /> : <PlaceholderPanel node={node} />;
    case 'Plant':
    case 'Unit':
      return <PlaceholderPanel node={node} />;
    case 'UseCase':
      return <UseCasePanel node={node} />;
    case 'KPI':
      return <KPIPanel node={node} />;
    case 'Asset':
      return <AssetPanel node={node} />;
    case 'Device':
      return <DevicePanel node={node} />;
    case 'Parameter':
      return <TelemetryPanel node={node} />;
    default:
      return <PlaceholderPanel node={node} />;
  }
}
