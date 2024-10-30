import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, Area, AreaChart } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('24h');
  const [analyticsData, setAnalyticsData] = useState({
    sentimentTrend: [],
    categoryBreakdown: [],
    responseMetrics: [],
    userEngagement: []
  });

  // Mock data generation
  useEffect(() => {
    const generateData = () => {
      // Sentiment Trend Data
      const sentimentTrend = Array.from({ length: 24 }, (_, hour) => ({
        time: `${hour}:00`,
        positive: Math.floor(Math.random() * 50) + 30,
        negative: Math.floor(Math.random() * 20) + 10,
        neutral: Math.floor(Math.random() * 30) + 20,
      }));

      // Category Distribution
      const categoryBreakdown = [
        { name: 'Technical Issues', value: Math.floor(Math.random() * 100) + 50 },
        { name: 'Feature Requests', value: Math.floor(Math.random() * 80) + 40 },
        { name: 'UI/UX', value: Math.floor(Math.random() * 60) + 30 },
        { name: 'Performance', value: Math.floor(Math.random() * 50) + 25 },
        { name: 'Other', value: Math.floor(Math.random() * 40) + 20 }
      ];

      // Response Time Data
      const responseMetrics = Array.from({ length: 12 }, (_, month) => ({
        month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month],
        avgTime: Math.floor(Math.random() * 30) + 15,
        satisfaction: Math.floor(Math.random() * 20) + 80
      }));

      // User Engagement Data
      const userEngagement = Array.from({ length: 7 }, (_, day) => ({
        day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][day],
        activeUsers: Math.floor(Math.random() * 1000) + 500,
        feedbackCount: Math.floor(Math.random() * 200) + 100
      }));

      setAnalyticsData({
        sentimentTrend,
        categoryBreakdown,
        responseMetrics,
        userEngagement
      });
    };

    generateData();
    const interval = setInterval(generateData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Key metrics for cards
  const metrics = [
    {
      title: 'Average Response Time',
      value: '28m',
      change: '-12%',
      changeType: 'positive'
    },
    {
      title: 'Customer Satisfaction',
      value: '92%',
      change: '+5%',
      changeType: 'positive'
    },
    {
      title: 'Total Feedback',
      value: '1,284',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Resolution Rate',
      value: '94%',
      change: '+3%',
      changeType: 'positive'
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <div className="flex space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm px-4 py-2"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Export Report
            </button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <div key={metric.title} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">{metric.title}</h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
                <p className={`ml-2 text-sm font-medium ${
                  metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sentiment Analysis */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Sentiment Analysis Trend</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsData.sentimentTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="positive" stackId="1" stroke="#10B981" fill="#D1FAE5" name="Positive" />
                  <Area type="monotone" dataKey="neutral" stackId="1" stroke="#6B7280" fill="#F3F4F6" name="Neutral" />
                  <Area type="monotone" dataKey="negative" stackId="1" stroke="#EF4444" fill="#FEE2E2" name="Negative" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Feedback Categories</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.categoryBreakdown}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {analyticsData.categoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Response Time Trend */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Response Time Analysis</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData.responseMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="avgTime" stroke="#0088FE" name="Avg. Response Time" />
                  <Line type="monotone" dataKey="satisfaction" stroke="#00C49F" name="Satisfaction Score" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* User Engagement */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">User Engagement</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData.userEngagement}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="activeUsers" fill="#0088FE" name="Active Users" />
                  <Bar dataKey="feedbackCount" fill="#00C49F" name="Feedback Count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AnalyticsPage;