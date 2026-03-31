import React from 'react';
import { Building, Users, Shield, Settings, ChevronRight } from 'lucide-react';

const TENANTS = [
  { id: 'T01', name: 'Global Refinery Operations', industry: 'Oil & Gas – Refining', plants: 3, users: 48, devices: 2480, status: 'Active' },
  { id: 'T02', name: 'Gulf Petrochemicals Ltd.', industry: 'Petrochemicals', plants: 2, users: 31, devices: 1840, status: 'Active' },
  { id: 'T03', name: 'Arabian Energy Storage', industry: 'Energy Storage', plants: 1, users: 12, devices: 420, status: 'Active' },
];

const USERS = [
  { name: 'Rajesh Kumar', email: 'r.kumar@globalref.com', role: 'Plant Engineer', tenant: 'T01', lastLogin: '2026-03-31 14:22', status: 'Active' },
  { name: 'Priya Nair', email: 'p.nair@globalref.com', role: 'Operations Manager', tenant: 'T01', lastLogin: '2026-03-31 15:40', status: 'Active' },
  { name: 'James Martinez', email: 'j.martinez@globalref.com', role: 'HSE Officer', tenant: 'T01', lastLogin: '2026-03-31 09:15', status: 'Active' },
  { name: 'Ali Hassan', email: 'a.hassan@gulfpetro.com', role: 'Reliability Engineer', tenant: 'T02', lastLogin: '2026-03-30 17:02', status: 'Active' },
  { name: 'Sarah Johnson', email: 's.johnson@arabianenergy.com', role: 'Data Analyst', tenant: 'T03', lastLogin: '2026-03-29 11:30', status: 'Inactive' },
];

const ROLES = [
  { name: 'Super Administrator', users: 2, permissions: 'Full platform access' },
  { name: 'Tenant Administrator', users: 5, permissions: 'Tenant config, user management' },
  { name: 'Plant Manager', users: 8, permissions: 'Plant-level view & control' },
  { name: 'Operations Engineer', users: 22, permissions: 'Monitor, acknowledge alerts' },
  { name: 'Read-Only Viewer', users: 11, permissions: 'View dashboards, export reports' },
];

const SectionTitle = ({ icon: Icon, title }) => (
  <div className="flex items-center space-x-2 mb-3">
    <Icon className="w-4 h-4 text-slate-400" />
    <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
  </div>
);

export default function Administration() {
  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full bg-slate-50">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Administration</h1>
        <p className="text-sm text-slate-500 mt-0.5">Tenant management, user access & platform configuration</p>
      </div>

      {/* Tenants */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <SectionTitle icon={Building} title="Tenant Registry" />
        <div className="grid grid-cols-3 gap-4">
          {TENANTS.map(t => (
            <div key={t.id} className="border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center text-xs font-bold text-blue-700">{t.id}</div>
                <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">{t.status}</span>
              </div>
              <p className="text-sm font-semibold text-slate-800">{t.name}</p>
              <p className="text-xs text-slate-400 mt-0.5">{t.industry}</p>
              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100">
                {[['Plants', t.plants], ['Users', t.users], ['Devices', t.devices.toLocaleString()]].map(([l, v]) => (
                  <div key={l} className="text-center">
                    <p className="text-sm font-bold text-slate-900">{v}</p>
                    <p className="text-xs text-slate-400">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Users */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <SectionTitle icon={Users} title="User Accounts" />
          <button className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">+ Invite User</button>
        </div>
        <table className="w-full text-xs">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {['Name', 'Email', 'Role', 'Tenant', 'Last Login', 'Status'].map(h => (
                <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {USERS.map((u, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-medium text-slate-800">{u.name}</td>
                <td className="px-4 py-3 text-slate-500">{u.email}</td>
                <td className="px-4 py-3"><span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded text-xs font-medium">{u.role}</span></td>
                <td className="px-4 py-3 font-mono text-slate-500">{u.tenant}</td>
                <td className="px-4 py-3 font-mono text-slate-400">{u.lastLogin}</td>
                <td className="px-4 py-3">
                  <span className={`flex items-center space-x-1.5 ${u.status === 'Active' ? 'text-emerald-600' : 'text-slate-400'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                    <span className="font-medium">{u.status}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Roles */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <SectionTitle icon={Shield} title="Role Definitions" />
        <div className="space-y-2">
          {ROLES.map((r, i) => (
            <div key={i} className="flex items-center justify-between p-3.5 border border-slate-100 rounded-xl hover:border-slate-200 hover:bg-slate-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-7 h-7 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-3.5 h-3.5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{r.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{r.permissions}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-xs text-slate-500 font-medium">{r.users} users</span>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
