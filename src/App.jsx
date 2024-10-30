import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import FeedbackPage from './pages/FeedbackPage';
import ContactCenterAnalytics from './pages/ContactCenterAnalytics';
import SettingsPage from './pages/SettingsPage';

function App() {
  const authToken = localStorage.getItem('authToken');
  const isAuthenticated = Boolean(authToken);

  console.log('Current authToken:', authToken);
  console.log('isAuthenticated:', isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />
          } 
        />
        <Route 
          path="/analytics" 
          element={
            isAuthenticated ? <AnalyticsPage /> : <Navigate to="/login" />
          } 
        />
        <Route 
          path="/feedback" 
          element={
            isAuthenticated ? <FeedbackPage /> : <Navigate to="/login" />
          } 
        />
        <Route 
          path="/contact-center" 
          element={
            isAuthenticated ? <ContactCenterAnalytics /> : <Navigate to="/login" />
          } 
        />
        <Route 
          path="/settings" 
          element={
            isAuthenticated ? <SettingsPage /> : <Navigate to="/login" />
          } 
        />
        <Route 
          path="/" 
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;