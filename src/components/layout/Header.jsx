import React, { useState } from 'react';
import { Bell, Search, ChevronDown, Menu, X } from 'lucide-react';

const MLGIoTLogo = () => (
  <div className="flex items-center space-x-2 select-none">
    <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0">
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="32" height="32" rx="7" fill="#1d4ed8" />
        <circle cx="16" cy="16" r="3.5" fill="white" />
        <circle cx="8" cy="10" r="2.5" fill="#93c5fd" />
        <circle cx="24" cy="10" r="2.5" fill="#93c5fd" />
        <circle cx="8" cy="22" r="2.5" fill="#93c5fd" />
        <circle cx="24" cy="22" r="2.5" fill="#93c5fd" />
        <line x1="8" y1="10" x2="16" y2="16" stroke="white" strokeWidth="1.2" strokeOpacity="0.8" />
        <line x1="24" y1="10" x2="16" y2="16" stroke="white" strokeWidth="1.2" strokeOpacity="0.8" />
        <line x1="8" y1="22" x2="16" y2="16" stroke="white" strokeWidth="1.2" strokeOpacity="0.8" />
        <line x1="24" y1="22" x2="16" y2="16" stroke="white" strokeWidth="1.2" strokeOpacity="0.8" />
      </svg>
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-[13px] sm:text-[15px] font-extrabold text-blue-700 tracking-tight">MLGIoT</span>
      <span className="text-[8px] sm:text-[9px] text-slate-400 font-medium tracking-wide mt-0.5">by MXAlgo Technologies</span>
    </div>
  </div>
);

export default function Header({ onLogoClick, onMenuToggle, menuOpen }) {
  return (
    <header className="flex items-center justify-between h-13 sm:h-14 px-3 sm:px-5 bg-white border-b border-slate-200 flex-shrink-0 z-20 shadow-sm" style={{ minHeight: '52px' }}>
      {/* Left: Hamburger (mobile) + Logo */}
      <div className="flex items-center space-x-2 sm:space-x-5">
        {/* Mobile hamburger — only shows inside platform (not on landing) */}
        {onMenuToggle && (
          <button
            onClick={onMenuToggle}
            className="sm:hidden p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        )}

        <button onClick={onLogoClick} className="hover:opacity-80 transition-opacity">
          <MLGIoTLogo />
        </button>

        {/* Tenant selector — hidden on small mobile */}
        <div className="hidden sm:flex items-center space-x-3">
          <div className="h-6 w-px bg-slate-200"></div>
          <button className="flex items-center space-x-1.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            <span className="max-w-[140px] sm:max-w-none truncate">Global Refinery Operations</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          </button>
          <div className="hidden lg:block h-6 w-px bg-slate-200"></div>
          <span className="hidden lg:block text-xs text-slate-400 font-medium">Texas City Plant</span>
        </div>
      </div>

      {/* Right: Search + Notifs + User */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Search — hidden on mobile */}
        <div className="relative hidden md:block">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search equipment, tags…"
            className="w-52 lg:w-64 pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-700 placeholder:text-slate-400"
          />
        </div>

        <button className="relative p-1.5 sm:p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors" aria-label="Notifications">
          <Bell className="w-4.5 h-4.5 w-5 h-5" />
          <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
        </button>

        <div className="flex items-center space-x-2 pl-2 sm:pl-3 border-l border-slate-200">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold shadow-sm flex-shrink-0">
            ID
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-slate-800 leading-none">IIoT Demo</p>
            <p className="text-[10px] text-slate-400 leading-none mt-0.5">Demo User</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export { MLGIoTLogo };
