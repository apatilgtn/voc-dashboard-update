import React, { useState } from 'react';
import { Menu, Home, BarChart2, MessageSquare, Phone, Settings, LogOut } from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-['Inter',sans-serif]">
      {/* Sidebar - Soft blue gradient */}
      <div className={`bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 text-white ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
        <div className="p-4 flex items-center justify-between border-b border-blue-500/30">
          {isSidebarOpen && (
            <h1 className="text-xl font-bold text-white tracking-tight">
              InsightPulse
            </h1>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors"
          >
            <Menu size={20} className="text-white/90" />
          </button>
        </div>
        
        <nav className="mt-6 space-y-1">
          <NavLink href="/dashboard" icon={<Home size={20} />} label="Dashboard" isOpen={isSidebarOpen} />
          <NavLink href="/analytics" icon={<BarChart2 size={20} />} label="Analytics" isOpen={isSidebarOpen} />
          <NavLink href="/feedback" icon={<MessageSquare size={20} />} label="Feedback" isOpen={isSidebarOpen} />
          <NavLink href="/contact-center" icon={<Phone size={20} />} label="Contact Center" isOpen={isSidebarOpen} />
          <NavLink href="/settings" icon={<Settings size={20} />} label="Settings" isOpen={isSidebarOpen} />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-slate-50">
        {/* Top Header with Logout */}
        <header className="bg-white border-b border-slate-200 shadow-sm">
          <div className="flex justify-end px-6 py-3">
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-slate-600 hover:text-red-500 transition-colors rounded-lg hover:bg-slate-50 font-medium"
            >
              <LogOut size={20} className="mr-2" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

const NavLink = ({ href, icon, label, isOpen }) => {
  const isActive = window.location.pathname === href;
  
  return (
    <a
      href={href}
      className={`
        flex items-center px-4 py-3 text-white/90
        transition-all duration-150
        font-medium text-sm
        ${isActive 
          ? 'bg-blue-500/20 border-l-4 border-white' 
          : 'hover:bg-blue-500/20 border-l-4 border-transparent hover:border-white/50'}
      `}
    >
      <span className={`${isActive ? 'text-white' : 'text-white/80'}`}>
        {icon}
      </span>
      {isOpen && (
        <span className={`ml-4 tracking-wide ${isActive ? 'text-white' : 'text-white/90'}`}>
          {label}
        </span>
      )}
    </a>
  );
};

export default DashboardLayout;