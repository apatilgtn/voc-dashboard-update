import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      weekly_report: true,
      monthly_report: true
    },
    display: {
      theme: 'light',
      language: 'en',
      timezone: 'UTC'
    },
    integrations: {
      slack: true,
      teams: false,
      jira: false
    },
    alerts: {
      negative_feedback: true,
      response_time: true,
      sentiment_drop: true
    }
  });

  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@test.com',
    role: 'Administrator',
    department: 'Customer Experience'
  });

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    // Save settings logic here
    alert('Settings saved successfully!');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <button
            onClick={handleSaveSettings}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>

        {/* Profile Settings */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Profile Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h2>
            <div className="space-y-4">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-gray-700 capitalize">{key.replace('_', ' ')}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Display Settings */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Display Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Theme</label>
                <select
                  value={settings.display.theme}
                  onChange={(e) => handleSettingChange('display', 'theme', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Language</label>
                <select
                  value={settings.display.language}
                  onChange={(e) => handleSettingChange('display', 'language', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Integrations */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Integrations</h2>
            <div className="space-y-4">
              {Object.entries(settings.integrations).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-700 capitalize font-medium">{key}</span>
                    <p className="text-sm text-gray-500">Connect your {key} account</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('integrations', key, !value)}
                    className={`px-4 py-2 rounded-md ${
                      value ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {value ? 'Connected' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alert Settings */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Alert Settings</h2>
            <div className="space-y-4">
              {Object.entries(settings.alerts).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-gray-700 capitalize">{key.replace('_', ' ')}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => handleSettingChange('alerts', key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 shadow rounded-lg">
          <div className="p-6">
            <h2 className="text-lg font-medium text-red-700 mb-4">Danger Zone</h2>
            <div className="space-y-4">
              <button
                onClick={() => confirm('Are you sure you want to reset all settings?')}
                className="px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white"
              >
                Reset All Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default SettingsPage;