import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900';
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">InsightPulse</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/dashboard"
                className={`${isActive('/dashboard')} inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                  location.pathname === '/dashboard' ? 'border-blue-500' : 'border-transparent'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/analytics"
                className={`${isActive('/analytics')} inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                  location.pathname === '/analytics' ? 'border-blue-500' : 'border-transparent'
                }`}
              >
                Analytics
              </Link>
              <Link
                to="/feedback"
                className={`${isActive('/feedback')} inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                  location.pathname === '/feedback' ? 'border-blue-500' : 'border-transparent'
                }`}
              >
                Feedback
              </Link>
              <Link
                to="/contact-center"
                className={`${isActive('/contact-center')} inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                  location.pathname === '/contact-center' ? 'border-blue-500' : 'border-transparent'
                }`}
              >
                Contact Center
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">{user.email}</span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;