import React from 'react';
import { Wrench, Calendar, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { getStatusBadgeClass } from '../lib/utils';

const WORK_ORDERS = [
  { id: 'WO-2026-0142', title: 'Pump P-101 Bearing Replacement', equipment: 'Crude Feed Pump P-101', type: 'Corrective', priority: 'High', status: 'In Progress', assigned: 'Rajesh Kumar', due: '2026-04-02', est: '8 hrs' },
  { id: 'WO-2026-0141', title: 'FH-110 Inspection & Cleaning', equipment: 'Furnace Heater FH-110', type: 'Preventive', priority: 'Medium', status: 'Scheduled', assigned: 'Anand Sharma', due: '2026-04-05', est: '16 hrs' },
  { id: 'WO-2026-0140', title: 'HC-201 Compressor Valve Overhaul', equipment: 'Hydrogen Compressor HC-201', type: 'Predictive', priority: 'High', status: 'Planned', assigned: 'Suresh Patel', due: '2026-04-10', est: '24 hrs' },
  { id: 'WO-2026-0139', title: 'Annual Safety Relief Valve Test', equipment: 'SRV-CDU-01 to 05', type: 'Regulatory', priority: 'Critical', status: 'Scheduled', assigned: 'James Martinez', due: '2026-04-15', est: '6 hrs' },
  { id: 'WO-2026-0138', title: 'DC-01 Tray Performance Inspection', equipment: 'Distillation Column DC-01', type: 'Condition-Based', priority: 'Low', status: 'Completed', assigned: 'Ali Hassan', due: '2026-03-28', est: '12 hrs' },
  { id: 'WO-2026-0137', title: 'CT-01 Fan Blade Replacement', equipment: 'Cooling Tower Fan CT-01', type: 'Corrective', priority: 'Medium', status: 'Completed', assigned: 'Priya Nair', due: '2026-03-25', est: '10 hrs' },
];

const SCHEDULE = [
  { week: 'Week 1 (Apr 1–7)', items: ['Crude Feed Pump P-101 bearing – 8 hrs', 'Furnace Heater FH-110 inspection – 16 hrs'] },
  { week: 'Week 2 (Apr 8–14)', items: ['Hydrogen Compressor HC-201 overhaul – 24 hrs', 'Pressure Test CDU Lines – 4 hrs'] },
  { week: 'Week 3 (Apr 15–21)', items: ['Safety Relief Valve Test – 6 hrs', 'AC-12 Air Compressor servicing – 8 hrs'] },
];

const priorityColor = { Critical: 'bg-red-50 text-red-700 border border-red-200', High: 'bg-orange-50 text-orange-700 border border-orange-200', Medium: 'bg-amber-50 text-amber-700 border border-amber-200', Low: 'bg-slate-50 text-slate-600 border border-slate-200' };
const typeColor = { Corrective: 'bg-red-50 text-red-700', Preventive: 'bg-blue-50 text-blue-700', Predictive: 'bg-violet-50 text-violet-700', Regulatory: 'bg-rose-50 text-rose-700', 'Condition-Based': 'bg-emerald-50 text-emerald-700' };

export default function Maintenance() {
  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full bg-slate-50">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Maintenance</h1>
          <p className="text-sm text-slate-500 mt-0.5">Work orders, schedules & service history</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          <Wrench className="w-3.5 h-3.5" />
          <span>New Work Order</span>
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Open Work Orders', value: '14', icon: Wrench, color: 'bg-blue-600' },
          { label: 'In Progress', value: '3', icon: Clock, color: 'bg-amber-500' },
          { label: 'Overdue', value: '1', icon: AlertTriangle, color: 'bg-red-600' },
          { label: 'Completed (Mar)', value: '28', icon: CheckCircle, color: 'bg-emerald-600' },
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

      {/* Work Orders Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-800">Active Work Orders</h3>
        </div>
        <table className="w-full text-xs">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {['WO Number', 'Title', 'Equipment', 'Type', 'Priority', 'Status', 'Assigned To', 'Due Date', 'Est. Hours'].map(h => (
                <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {WORK_ORDERS.map(wo => (
              <tr key={wo.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-mono text-blue-700 font-semibold">{wo.id}</td>
                <td className="px-4 py-3 font-medium text-slate-800 max-w-xs truncate">{wo.title}</td>
                <td className="px-4 py-3 text-slate-600">{wo.equipment}</td>
                <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-xs font-medium ${typeColor[wo.type]}`}>{wo.type}</span></td>
                <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityColor[wo.priority]}`}>{wo.priority}</span></td>
                <td className="px-4 py-3"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(wo.status === 'Completed' ? 'Running' : wo.status === 'In Progress' ? 'Warning' : 'Standby')}`}>{wo.status}</span></td>
                <td className="px-4 py-3 text-slate-600">{wo.assigned}</td>
                <td className="px-4 py-3 text-slate-500">{wo.due}</td>
                <td className="px-4 py-3 text-slate-500">{wo.est}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upcoming Schedule */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-semibold text-slate-800">Upcoming Maintenance Schedule</h3>
        </div>
        <div className="space-y-4">
          {SCHEDULE.map(s => (
            <div key={s.week}>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">{s.week}</p>
              <div className="space-y-1.5 pl-3 border-l-2 border-blue-200">
                {s.items.map((item, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
