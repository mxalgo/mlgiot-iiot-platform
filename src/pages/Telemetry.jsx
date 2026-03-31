import React, { useState } from 'react';
import { Activity, Search } from 'lucide-react';
import assetsData from '../data/assets.json';
import TreeView from '../components/tree/TreeView';
import DetailsPanel from '../components/panels/DetailsPanel';

const TAG_BROWSER = [
  { path: 'CDU/P101/VIB/VELOCITY', name: 'Pump Vibration Velocity', unit: 'mm/s', value: 5.8, quality: 'Good', rate: '1s', status: 'Normal', protocol: 'OPC UA' },
  { path: 'CDU/P101/TEMP/BEARING', name: 'Bearing Temperature', unit: '°C', value: 68.5, quality: 'Good', rate: '5s', status: 'Normal', protocol: 'OPC UA' },
  { path: 'CDU/P101/PRESS/DISCH', name: 'Discharge Pressure', unit: 'bar', value: 15.2, quality: 'Good', rate: '1s', status: 'Normal', protocol: 'HART' },
  { path: 'CDU/FH110/TEMP/SKIN', name: 'Skin Temperature', unit: '°C', value: 415, quality: 'Good', rate: '2s', status: 'Warning', protocol: 'PROFINET' },
  { path: 'HCU/HC201/PWR/CONS', name: 'Power Consumption', unit: 'kW', value: 450.5, quality: 'Good', rate: '1s', status: 'Normal', protocol: 'Modbus TCP' },
  { path: 'CDU/FT03/FLOW/VOL', name: 'Volumetric Flow Rate', unit: 'm³/hr', value: null, quality: 'Bad', rate: '1s', status: 'Offline', protocol: 'OPC UA' },
  { path: 'UTL/GD05/GAS/H2S', name: 'H₂S Concentration', unit: 'ppm', value: 0.4, quality: 'Good', rate: '1s', status: 'Normal', protocol: 'Modbus RTU' },
  { path: 'HCU/P102/PRESS/SUCT', name: 'Suction Pressure', unit: 'bar', value: 6.8, quality: 'Good', rate: '1s', status: 'Normal', protocol: 'HART' },
];

const qColor = { Good: 'text-emerald-600', Uncertain: 'text-amber-600', Bad: 'text-red-600' };
const statColor = { Normal: 'bg-emerald-50 text-emerald-700 border-emerald-200', Warning: 'bg-amber-50 text-amber-700 border-amber-200', Offline: 'bg-red-50 text-red-700 border-red-200' };

export default function Telemetry() {
  const [view, setView] = useState('tags');
  const [selectedNode, setSelectedNode] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = TAG_BROWSER.filter(t =>
    t.path.toLowerCase().includes(search.toLowerCase()) ||
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-full bg-slate-50">
      {view === 'live' ? (
        <>
          <div className="w-72 flex-shrink-0 flex flex-col bg-white border-r border-slate-200">
            <div className="px-4 py-3 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-800">Tag Browser</h2>
                <button onClick={() => setView('tags')} className="text-xs text-blue-600 hover:underline">Tag List</button>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Select a Tag to view live telemetry</p>
            </div>
            <div className="flex-1 overflow-hidden">
              <TreeView data={[assetsData]} onSelect={setSelectedNode} selectedId={selectedNode?.id} />
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <DetailsPanel node={selectedNode} />
          </div>
        </>
      ) : (
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Telemetry</h1>
              <p className="text-sm text-slate-500 mt-0.5">Real-time tag browser & live data explorer</p>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => setView('tags')} className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${view === 'tags' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600'}`}>Tag Browser</button>
              <button onClick={() => setView('live')} className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${view === 'live' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600'}`}>Live View</button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-5">
            {[
              { label: 'Total Tags', value: '14,820' },
              { label: 'Good Quality', value: '14,650' },
              { label: 'Uncertain', value: '140' },
              { label: 'Bad Quality', value: '30' },
            ].map(c => (
              <div key={c.label} className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
                <p className="text-xs text-slate-500">{c.label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{c.value}</p>
              </div>
            ))}
          </div>

          <div className="relative mb-4 max-w-sm">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tags by path or name..." className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 flex items-center space-x-2">
              <Activity className="w-4 h-4 text-blue-500" />
              <h3 className="text-sm font-semibold text-slate-800">Available Tags</h3>
            </div>
            <table className="w-full text-xs">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['Tag Path', 'Description', 'Protocol', 'Eng. Unit', 'Last Value', 'Quality', 'Sampling Rate', 'Status'].map(h => (
                    <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((tag, i) => (
                  <tr key={i} className="hover:bg-slate-50 cursor-pointer" onClick={() => { setSelectedNode({ ...tag, type: 'Parameter', id: `tag-${i}`, normalRange: [0, 7], warningRange: [7, 9], min: tag.value ? tag.value * 0.9 : 0, max: tag.value ? tag.value * 1.1 : 0, average: tag.value ? tag.value * 0.98 : 0 }); setView('live'); }}>
                    <td className="px-4 py-2.5 font-mono text-blue-700 font-medium">{tag.path}</td>
                    <td className="px-4 py-2.5 text-slate-700">{tag.name}</td>
                    <td className="px-4 py-2.5"><span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">{tag.protocol}</span></td>
                    <td className="px-4 py-2.5 text-slate-500">{tag.unit}</td>
                    <td className="px-4 py-2.5 font-bold text-slate-900">{tag.value !== null ? tag.value : '—'}</td>
                    <td className={`px-4 py-2.5 font-semibold ${qColor[tag.quality]}`}>{tag.quality}</td>
                    <td className="px-4 py-2.5 text-slate-400">{tag.rate}</td>
                    <td className="px-4 py-2.5"><span className={`px-2 py-0.5 rounded-full border text-xs font-medium ${statColor[tag.status]}`}>{tag.status}</span></td>
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
