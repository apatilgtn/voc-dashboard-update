import React, { useState, useEffect } from 'react';
import { Menu, Home, BarChart2, MessageSquare, Phone, Settings, LogOut, X, MessageCircle } from 'lucide-react';
import { generateSpecializedFeedback } from '../services/specializedFeedback';

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedbackCount, setNewFeedbackCount] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  useEffect(() => {
    const generateNewFeedback = () => {
      const types = ['mental', 'shopping', 'company'];
      const type = types[Math.floor(Math.random() * types.length)];
      let newFeedback;

      switch (type) {
        case 'mental':
          newFeedback = {
            ...generateSpecializedFeedback.mentalHealth(),
            type: 'Mental Health'
          };
          break;
        case 'shopping':
          newFeedback = {
            ...generateSpecializedFeedback.shopping(),
            type: 'Shopping'
          };
          break;
        case 'company':
          newFeedback = {
            ...generateSpecializedFeedback.company(),
            type: 'Company'
          };
          break;
        default:
          break;
      }

      setFeedbacks(prev => [newFeedback, ...prev].slice(0, 50));
      if (!isChatOpen) {
        setNewFeedbackCount(prev => prev + 1);
      }
    };

    const interval = setInterval(generateNewFeedback, 5000);
    return () => clearInterval(interval);
  }, [isChatOpen]);

  const ChatBox = () => (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-2xl z-50 border border-gray-200">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 bg-black rounded-t-lg">
        <div className="flex items-center">
          <MessageCircle className="w-5 h-5 text-white mr-2" />
          <h3 className="text-white font-semibold">Real-time Feedback</h3>
          <div className="flex items-center ml-3 bg-white/10 px-2 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-1"></div>
            <span className="text-xs text-white">Live</span>
          </div>
        </div>
        <button 
          onClick={() => setIsChatOpen(false)}
          className="text-white/80 hover:text-white transition-colors hover:bg-white/10 p-1 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="h-[32rem] overflow-y-auto p-4 space-y-4">
        {feedbacks.map((feedback, index) => (
          <div key={index} 
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:border-gray-300"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {feedback.type}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(feedback.timestamp).toLocaleTimeString()}
              </span>
            </div>
            
            <div className="space-y-2">
              {feedback.type === 'Mental Health' && (
                <>
                  <p className="text-base font-medium text-gray-900">{feedback.appName}</p>
                  <p className="text-sm text-gray-600 italic">"{feedback.improvement}"</p>
                  <div className="flex items-center mt-2">
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                      Rating: {feedback.rating}/5
                    </span>
                  </div>
                </>
              )}
              {feedback.type === 'Shopping' && (
                <>
                  <p className="text-base font-medium text-gray-900">{feedback.storeName}</p>
                  <div className="flex space-x-2">
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                      Satisfaction: {feedback.customerSatisfaction}%
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                      ${feedback.orderAmount}
                    </span>
                  </div>
                </>
              )}
              {feedback.type === 'Company' && (
                <>
                  <p className="text-base font-medium text-gray-900">{feedback.companyName}</p>
                  <p className="text-sm text-gray-600">{feedback.pros}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                      {feedback.recommendToFriend ? 'Recommended' : 'Not Recommended'}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gray-50 font-['Inter',sans-serif]">
      {/* Sidebar */}
      <div className={`bg-black text-white ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          {isSidebarOpen && (
            <h1 className="text-xl font-bold text-white tracking-tight">
              InsightPulse
            </h1>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu size={20} className="text-white/90" />
          </button>
        </div>
        
        <nav className="mt-6 space-y-1 px-2">
          <NavLink href="/dashboard" icon={<Home size={20} />} label="Dashboard" isOpen={isSidebarOpen} />
          <NavLink href="/analytics" icon={<BarChart2 size={20} />} label="Analytics" isOpen={isSidebarOpen} />
          <NavLink href="/feedback" icon={<MessageSquare size={20} />} label="Feedback" isOpen={isSidebarOpen} />
          <NavLink href="/contact-center" icon={<Phone size={20} />} label="Contact Center" isOpen={isSidebarOpen} />
          <NavLink href="/settings" icon={<Settings size={20} />} label="Settings" isOpen={isSidebarOpen} />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header with Logout */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex justify-end px-6 py-3">
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-red-500 transition-colors rounded-lg hover:bg-gray-50 font-medium"
            >
              <LogOut size={20} className="mr-2" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Chat Toggle Button */}
      {!isChatOpen && (
        <button
          onClick={() => {
            setIsChatOpen(true);
            setNewFeedbackCount(0);
          }}
          className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <MessageCircle className="w-6 h-6" />
          {newFeedbackCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
              {newFeedbackCount}
            </span>
          )}
          <span className="absolute right-16 bg-black px-3 py-1 rounded-lg text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity shadow-sm whitespace-nowrap">
            View Live Feedback
          </span>
        </button>
      )}

      {/* Chat Box */}
      {isChatOpen && <ChatBox />}
    </div>
  );
};

const NavLink = ({ href, icon, label, isOpen }) => {
  const isActive = window.location.pathname === href;
  
  return (
    <a
      href={href}
      className={`
        flex items-center px-4 py-3 rounded-lg
        transition-all duration-150
        font-medium text-sm
        ${isActive 
          ? 'bg-white/10 text-white' 
          : 'text-white/80 hover:bg-white/10 hover:text-white'}
      `}
    >
      <span>{icon}</span>
      {isOpen && <span className="ml-4 tracking-wide">{label}</span>}
    </a>
  );
};

export default DashboardLayout;