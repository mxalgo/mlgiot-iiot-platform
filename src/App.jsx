import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard, Factory, Settings, Cpu, Activity, BarChart2,
  Bell, FileText, Wrench, LineChart, Shield, ChevronRight, Home,
} from 'lucide-react';
import Header from './components/layout/Header';
import { cn } from './lib/utils';

// Page modules
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Operations from './pages/Operations';
import Assets from './pages/Assets';
import DevicesPage from './pages/Devices';
import Telemetry from './pages/Telemetry';
import KPIs from './pages/KPIs';
import Alerts from './pages/Alerts';
import Reports from './pages/Reports';
import Maintenance from './pages/Maintenance';
import Analytics from './pages/Analytics';
import Administration from './pages/Administration';

// Data
import assetsData from './data/assets.json';

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'operations', label: 'Operations', icon: Factory },
  { id: 'assets', label: 'Assets', icon: Settings },
  { id: 'devices', label: 'Devices', icon: Cpu },
  { id: 'telemetry', label: 'Telemetry', icon: Activity },
  { id: 'kpis', label: 'KPIs', icon: BarChart2 },
  { id: 'alerts', label: 'Alerts', icon: Bell },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'maintenance', label: 'Maintenance', icon: Wrench },
  { id: 'analytics', label: 'Analytics', icon: LineChart },
  { id: 'administration', label: 'Admin', icon: Shield },
];

function findPath(root, target, path = []) {
  if (root.id === target?.id) return [...path, root];
  for (const c of (root.children || [])) {
    const r = findPath(c, target, [...path, root]);
    if (r) return r;
  }
  return null;
}

function PageContent({ id }) {
  switch (id) {
    case 'dashboard': return <Dashboard />;
    case 'operations': return <Operations />;
    case 'assets': return <Assets />;
    case 'devices': return <DevicesPage />;
    case 'telemetry': return <Telemetry />;
    case 'kpis': return <KPIs />;
    case 'alerts': return <Alerts />;
    case 'reports': return <Reports />;
    case 'maintenance': return <Maintenance />;
    case 'analytics': return <Analytics />;
    case 'administration': return <Administration />;
    default: return <Dashboard />;
  }
}

// The sidebar nav list, reused in both desktop and mobile drawer
function NavList({ activeNav, onNav, onHome, collapsed, onCollapsToggle }) {
  return (
    <>
      {/* Back to Home */}
      <button
        onClick={onHome}
        className={cn(
          'flex items-center space-x-2.5 px-3 py-3 w-full text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors border-b border-slate-800',
          collapsed && 'justify-center'
        )}
      >
        <Home className="w-3.5 h-3.5 flex-shrink-0" />
        {!collapsed && <span className="text-xs font-medium">Home</span>}
      </button>

      {/* Nav items */}
      <div className="flex-1 py-2 space-y-0.5 overflow-y-auto">
        {NAV.map(item => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              title={collapsed ? item.label : ''}
              className={cn(
                'flex items-center px-3 py-2.5 transition-all duration-150 rounded-lg text-left',
                collapsed ? 'justify-center w-10 mx-auto' : 'space-x-2.5 w-[calc(100%-16px)] mx-2',
                isActive
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-900/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="text-xs font-medium truncate flex-1">{item.label}</span>
                  {isActive && <ChevronRight className="w-3 h-3 text-white/50 flex-shrink-0" />}
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* Collapse toggle — desktop only */}
      {onCollapsToggle && (
        <button
          onClick={onCollapsToggle}
          className="hidden sm:flex items-center justify-center h-9 border-t border-slate-800 text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors text-xs w-full"
        >
          {collapsed ? '›' : '‹ Collapse'}
        </button>
      )}
    </>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState('landing');
  const [selectedNode, setSelectedNode] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const breadcrumb = useMemo(() => {
    if (!selectedNode) return [];
    return findPath(assetsData, selectedNode) || [];
  }, [selectedNode]);

  const handleNav = (id) => {
    setActiveNav(id);
    setSelectedNode(null);
    setMobileMenuOpen(false); // close drawer on mobile after nav
  };

  const handleHome = () => {
    setActiveNav('landing');
    setSelectedNode(null);
    setMobileMenuOpen(false);
  };

  const isLanding = activeNav === 'landing';
  const activeLabel = NAV.find(n => n.id === activeNav)?.label || '';

  return (
    <div
      className="flex flex-col h-screen bg-slate-50 overflow-hidden"
      style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
    >
      <Header
        onLogoClick={handleHome}
        onMenuToggle={isLanding ? undefined : () => setMobileMenuOpen(p => !p)}
        menuOpen={mobileMenuOpen}
      />

      {isLanding ? (
        /* ── LANDING PAGE ── */
        <div className="flex-1 overflow-hidden">
          <LandingPage onNavigate={handleNav} />
        </div>
      ) : (
        /* ── PLATFORM ── */
        <div className="flex flex-1 overflow-hidden relative">

          {/* ── Mobile overlay backdrop ── */}
          {mobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-30 sm:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}

          {/* ── Sidebar ──
              Desktop: permanent, collapsible
              Mobile: slide-in drawer over content */}
          <nav className={cn(
            // Desktop: always visible, width toggles
            'sm:flex sm:flex-col bg-slate-900 border-r border-slate-800 flex-shrink-0 transition-all duration-200',
            sidebarCollapsed ? 'sm:w-[56px]' : 'sm:w-[200px]',
            // Mobile: fixed drawer
            'fixed sm:relative inset-y-0 left-0 z-40 w-[220px] flex flex-col',
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0',
            'transition-transform sm:transition-all duration-200 ease-in-out'
          )}>
            <NavList
              activeNav={activeNav}
              onNav={handleNav}
              onHome={handleHome}
              collapsed={sidebarCollapsed}
              onCollapsToggle={() => setSidebarCollapsed(p => !p)}
            />
          </nav>

          {/* ── Main Content ── */}
          <div className="flex-1 flex flex-col overflow-hidden min-w-0">
            {/* Breadcrumb bar */}
            <div className="flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-5 h-9 bg-white border-b border-slate-200 flex-shrink-0 text-xs text-slate-400 overflow-x-auto whitespace-nowrap">
              <button onClick={handleHome} className="text-slate-400 hover:text-blue-600 transition-colors flex items-center space-x-1 flex-shrink-0">
                <Home className="w-3 h-3" />
                <span>Home</span>
              </button>
              <ChevronRight className="w-3 h-3 flex-shrink-0" />
              <span className="font-semibold text-slate-600 flex-shrink-0">{activeLabel}</span>
              {breadcrumb.length > 1 && breadcrumb.map((bc, i) => (
                <React.Fragment key={bc.id}>
                  <ChevronRight className="w-3 h-3 flex-shrink-0" />
                  <button
                    onClick={() => setSelectedNode(bc)}
                    className={cn(
                      'hover:text-blue-600 transition-colors flex-shrink-0 max-w-[100px] truncate',
                      i === breadcrumb.length - 1 ? 'font-semibold text-slate-700' : 'text-slate-400'
                    )}
                  >
                    {bc.name}
                  </button>
                </React.Fragment>
              ))}
            </div>

            {/* Page content */}
            <div className="flex-1 overflow-hidden">
              <PageContent id={activeNav} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
