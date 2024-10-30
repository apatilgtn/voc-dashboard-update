import React, { useState } from 'react';
import { 
  Menu, 
  Home, 
  BarChart2, 
  MessageSquare, 
  Phone, 
  Settings, 
  LogOut 
} from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar - Ocean gradient background */}
      <div className={`bg-gradient-to-b from-cyan-800 to-blue-900 text-white ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
        <div className="p-4 flex items-center justify-between border-b border-cyan-700">
          {isSidebarOpen && <h1 className="text-xl font-bold text-cyan-50">InsightPulse</h1>}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-cyan-700 rounded transition-colors"
          >
            <Menu size={20} className="text-cyan-50" />
          </button>
        </div>
        
        <nav className="mt-8">
          <NavLink href="/dashboard" icon={<Home size={20} />} label="Dashboard" isOpen={isSidebarOpen} />
          <NavLink href="/analytics" icon={<BarChart2 size={20} />} label="Analytics" isOpen={isSidebarOpen} />
          <NavLink href="/feedback" icon={<MessageSquare size={20} />} label="Feedback" isOpen={isSidebarOpen} />
          <NavLink href="/contact-center" icon={<Phone size={20} />} label="Contact Center" isOpen={isSidebarOpen} />
          <NavLink href="/settings" icon={<Settings size={20} />} label="Settings" isOpen={isSidebarOpen} />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-cyan-50 to-white">
        {/* Top Header with Logout */}
        <header className="bg-white shadow-sm border-b border-cyan-100">
          <div className="flex justify-end px-4 py-3">
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-cyan-800 hover:text-red-600 transition-colors rounded-md hover:bg-cyan-50"
            >
              <LogOut size={20} className="mr-2" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

// NavLink component with ocean-themed hover states
const NavLink = ({ href, icon, label, isOpen }) => (
  <a
    href={href}
    className="flex items-center px-4 py-3 text-cyan-100 hover:bg-cyan-700 hover:text-white transition-colors border-l-4 border-transparent hover:border-cyan-400"
  >
    {icon}
    {isOpen && <span className="ml-4">{label}</span>}
  </a>
);

export default DashboardLayout;