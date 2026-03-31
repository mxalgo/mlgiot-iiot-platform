import React, { useState } from 'react';
import { Search, Filter, AlertTriangle, CheckCircle, XCircle, Settings } from 'lucide-react';
import { getStatusBadgeClass, getStatusDotColor } from '../lib/utils';
import assetsData from '../data/assets.json';
import TreeView from '../components/tree/TreeView';
import DetailsPanel from '../components/panels/DetailsPanel';

const ASSET_TABLE = [
  { tag: 'CDU-PMP-101', name: 'Crude Feed Pump P-101', class: 'Rotating', unit: 'CDU', status: 'Running', health: 88, lastInsp: '2025-12-10', criticality: 'High' },
  { tag: 'CDU-HTR-110', name: 'Furnace Heater FH-110', class: 'Static', unit: 'CDU', status: 'Maintenance', health: 72, lastInsp: '2025-11-20', criticality: 'High' },
  { tag: 'HCU-CMP-201', name: 'Hydrogen Compressor HC-201', class: 'Rotating', unit: 'HCU', status: 'Running', health: 80, lastInsp: '2025-10-05', criticality: 'Critical' },
  { tag: 'CDU-PMP-102', name: 'Reflux Pump P-102', class: 'Rotating', unit: 'CDU', status: 'Running', health: 91, lastInsp: '2026-01-15', criticality: 'Medium' },
  { tag: 'HCU-RV-22', name: 'Reactor Vessel RV-22', class: 'Static', unit: 'HCU', status: 'Running', health: 69, lastInsp: '2025-09-01', criticality: 'Critical' },
  { tag: 'UTL-AC-12', name: 'Air Compressor AC-12', class: 'Rotating', unit: 'UTL', status: 'Running', health: 85, lastInsp: '2026-02-10', criticality: 'Medium' },
  { tag: 'CDU-DC-01', name: 'Distillation Column DC-01', class: 'Static', unit: 'CDU', status: 'Running', health: 93, lastInsp: '2026-01-22', criticality: 'High' },
  { tag: 'ARU-CT-01', name: 'Cooling Tower Fan CT-01', class: 'Rotating', unit: 'ARU', status: 'Standby', health: 95, lastInsp: '2026-03-01', criticality: 'Low' },
];

const HealthBar = ({ value }) => {
  const color = value >= 85 ? '#10b981' : value >= 70 ? '#f59e0b' : '#ef4444';
  return (
    <div className="flex items-center space-x-2">
      <div className="w-16 bg-slate-100 rounded-full h-1.5">
        <div className="h-1.5 rounded-full" style={{ width: `${value}%`, background: color }}></div>
      </div>
      <span className="text-xs font-semibold" style={{ color }}>{value}%</span>
    </div>
  );
};

const critColor = { High: 'bg-red-50 text-red-700 border border-red-200', Medium: 'bg-amber-50 text-amber-700 border border-amber-200', Low: 'bg-slate-50 text-slate-600 border border-slate-200', Critical: 'bg-red-100 text-red-800 border border-red-300' };

export default function Assets() {
  const [view, setView] = useState('table');
  const [search, setSearch] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);

  const filtered = ASSET_TABLE.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.tag.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-full bg-slate-50">
      {view === 'explorer' ? (
        <>
          {/* Tree Panel */}
          <div className="w-72 flex-shrink-0 flex flex-col bg-white border-r border-slate-200">
            <div className="px-4 py-3 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-800">Equipment Explorer</h2>
              <p className="text-xs text-slate-400 mt-0.5">Organization → Plant → Equipment</p>
            </div>
            <div className="flex-1 overflow-hidden">
              <TreeView data={[assetsData]} onSelect={setSelectedNode} selectedId={selectedNode?.id} />
            </div>
          </div>
          {/* Panel */}
          <div className="flex-1 overflow-hidden">
            <DetailsPanel node={selectedNode} />
          </div>
        </>
      ) : (
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Assets</h1>
              <p className="text-sm text-slate-500 mt-0.5">Equipment register — Texas City Plant</p>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => setView('table')} className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${view === 'table' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>Table</button>
              <button onClick={() => setView('explorer')} className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${view === 'explorer' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>Explorer</button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-4 mb-5">
            {[
              { label: 'Total Equipment', value: '1,240', icon: Settings, color: 'bg-blue-600' },
              { label: 'Running', value: '1,120', icon: CheckCircle, color: 'bg-emerald-600' },
              { label: 'Warning', value: '85', icon: AlertTriangle, color: 'bg-amber-500' },
              { label: 'Critical', value: '35', icon: XCircle, color: 'bg-red-600' },
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

          {/* Search */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search equipment by name or tag..." className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['Tag / Code', 'Equipment Name', 'Class', 'Unit', 'Status', 'Health Index', 'Last Inspection', 'Criticality'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(a => (
                  <tr key={a.tag} className="hover:bg-slate-50 transition-colors cursor-pointer">
                    <td className="px-4 py-3 font-mono text-xs text-blue-700 font-semibold">{a.tag}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${getStatusDotColor(a.status)}`}></span>
                        <span className="text-sm font-medium text-slate-800">{a.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">{a.class}</td>
                    <td className="px-4 py-3"><span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded font-medium">{a.unit}</span></td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(a.status)}`}>{a.status}</span>
                    </td>
                    <td className="px-4 py-3 w-36"><HealthBar value={a.health} /></td>
                    <td className="px-4 py-3 text-xs text-slate-500">{a.lastInsp}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${critColor[a.criticality]}`}>{a.criticality}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
