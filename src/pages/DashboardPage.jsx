import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import RealTimeFeed from '../components/RealTimeFeed';
import { useRealtime } from '../hooks/useRealtime';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function DashboardPage() {
  const realtimeData = useRealtime();

  // Sample data for charts
  const trendData = [
    { name: '00:00', sentiment: 0.6, volume: 20 },
    { name: '04:00', sentiment: 0.8, volume: 32 },
    { name: '08:00', sentiment: 0.4, volume: 45 },
    { name: '12:00', sentiment: 0.7, volume: 50 },
    { name: '16:00', sentiment: 0.9, volume: 40 },
    { name: '20:00', sentiment: 0.5, volume: 35 }
  ];

  const sourceData = [
    { name: 'Website', value: 400 },
    { name: 'Mobile App', value: 300 },
    { name: 'Email', value: 200 },
    { name: 'Social Media', value: 100 }
  ];

  const stats = [
    {
      title: 'Total Feedback',
      value: realtimeData.feedback_count || '0',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Average Rating',
      value: (realtimeData.customer_satisfaction || 0).toFixed(1) + '/5',
      change: '+0.3',
      changeType: 'positive'
    },
    {
      title: 'Response Rate',
      value: '92%',
      change: '-3%',
      changeType: 'negative'
    },
    {
      title: 'Active Users',
      value: '156',
      change: '+8%',
      changeType: 'positive'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex space-x-4">
            <select className="rounded-md border-gray-300 shadow-sm px-4 py-2">
              <option>Last 24 hours</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Export Data
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {stat.title}
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {stat.value}
                </dd>
                <dd className={`mt-2 text-sm ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </dd>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sentiment Trend Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Sentiment Trend</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="sentiment" 
                      stroke="#2563eb" 
                      name="Sentiment Score"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="volume" 
                      stroke="#16a34a" 
                      name="Volume"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Source Distribution Chart */}
          <div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Feedback Sources</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sourceData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#2563eb"
                      label
                    />
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Real-time Feed */}
          <div className="lg:col-span-3">
            <RealTimeFeed />
          </div>

          {/* Response Time Chart */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Response Time Analysis</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="volume" fill="#2563eb" name="Response Volume" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;