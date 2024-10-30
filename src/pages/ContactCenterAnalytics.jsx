import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, Area, AreaChart } from 'recharts';

function ContactCenterAnalytics() {
  const [timeRange, setTimeRange] = useState('realtime');
  const [agentData, setAgentData] = useState([]);
  const [customerMetrics, setCustomerMetrics] = useState({});
  const [queueMetrics, setQueueMetrics] = useState([]);
  const [realTimeAlerts, setRealTimeAlerts] = useState([]);

  //  Simulate real-time data updates
  useEffect(() => {
    const generateRealTimeData = () => {
      // Agent Performance Data
      const agents = [
        { name: 'John Doe', id: 'A001' },
        { name: 'Sarah Smith', id: 'A002' },
        { name: 'Mike Johnson', id: 'A003' },
        { name: 'Emily Brown', id: 'A004' },
        { name: 'Alex Wilson', id: 'A005' }
      ];

      const newAgentData = agents.map(agent => ({
        ...agent,
        status: ['Available', 'On Call', 'After Call Work'][Math.floor(Math.random() * 3)],
        activeTime: Math.floor(Math.random() * 480) + 120, // in minutes
        callsHandled: Math.floor(Math.random() * 30) + 10,
        avgHandleTime: Math.floor(Math.random() * 300) + 120, // in seconds
        satisfaction: (Math.random() * 2 + 3).toFixed(1), // 3-5 rating
        firstCallResolution: Math.floor(Math.random() * 20 + 80) // percentage
      }));

      // Customer Experience Metrics
      const newCustomerMetrics = {
        waitTime: Math.floor(Math.random() * 180) + 30, // seconds
        satisfaction: (Math.random() * 1 + 4).toFixed(1),
        abandonRate: (Math.random() * 5).toFixed(1),
        firstCallResolution: Math.floor(Math.random() * 15 + 85),
        nps: Math.floor(Math.random() * 20 + 60)
      };

      // Queue Metrics
      const newQueueMetrics = Array.from({ length: 24 }, (_, hour) => ({
        hour: `${hour}:00`,
        callsInQueue: Math.floor(Math.random() * 10),
        avgWaitTime: Math.floor(Math.random() * 120) + 30,
        serviceLevel: Math.floor(Math.random() * 20 + 80)
      }));

      // Real-time Alerts
      const possibleAlerts = [
        'High call volume detected',
        'Service level dropping below threshold',
        'Long wait time alert',
        'Agent performance exceeding targets',
        'Customer satisfaction spike'
      ];

      const newAlerts = Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => ({
        id: Math.random().toString(36).substr(2, 9),
        message: possibleAlerts[Math.floor(Math.random() * possibleAlerts.length)],
        timestamp: new Date().toISOString(),
        severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)]
      }));

      setAgentData(newAgentData);
      setCustomerMetrics(newCustomerMetrics);
      setQueueMetrics(newQueueMetrics);
      setRealTimeAlerts(prev => [...newAlerts, ...prev].slice(0, 5));
    };

    generateRealTimeData();
    const interval = setInterval(generateRealTimeData, 3000); // Update every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'on call': return 'bg-blue-100 text-blue-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contact Center Command Center</h1>
            <p className="text-sm text-gray-500">Real-time monitoring and analytics</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-sm text-green-600">
              <span className="h-2 w-2 bg-green-600 rounded-full mr-2 animate-pulse"></span>
              Live Data
            </span>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm px-4 py-2"
            >
              <option value="realtime">Real-time</option>
              <option value="1h">Last Hour</option>
              <option value="4h">Last 4 Hours</option>
              <option value="24h">Last 24 Hours</option>
            </select>
          </div>
        </div>

        {/* Real-time Alerts */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Real-time Alerts</h2>
          <div className="space-y-2">
            {realTimeAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`p-3 rounded-lg ${
                  alert.severity === 'high' ? 'bg-red-50 text-red-700' :
                  alert.severity === 'medium' ? 'bg-yellow-50 text-yellow-700' :
                  'bg-blue-50 text-blue-700'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{alert.message}</span>
                  <span className="text-sm">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500">Avg Wait Time</h3>
            <p className="text-2xl font-semibold text-gray-900">{customerMetrics.waitTime}s</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500">CSAT Score</h3>
            <p className="text-2xl font-semibold text-gray-900">{customerMetrics.satisfaction}/5</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500">Abandon Rate</h3>
            <p className="text-2xl font-semibold text-gray-900">{customerMetrics.abandonRate}%</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500">First Call Resolution</h3>
            <p className="text-2xl font-semibold text-gray-900">{customerMetrics.firstCallResolution}%</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500">NPS</h3>
            <p className="text-2xl font-semibold text-gray-900">{customerMetrics.nps}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Queue Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Queue Status</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={queueMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="callsInQueue" stroke="#0088FE" name="Calls in Queue" />
                  <Line yAxisId="right" type="monotone" dataKey="serviceLevel" stroke="#00C49F" name="Service Level %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Agent Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Current Agent Status</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calls Handled</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Handle Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CSAT</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {agentData.map((agent) => (
                    <tr key={agent.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                        <div className="text-sm text-gray-500">ID: {agent.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(agent.status)}`}>
                          {agent.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {agent.callsHandled}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {agent.avgHandleTime}s
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{agent.satisfaction}</div>
                        <div className="text-sm text-gray-500">FCR: {agent.firstCallResolution}%</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Customer Experience */}
          <div className="bg-white rounded-lg shadow p-6 col-span-2">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Customer Experience Timeline</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={queueMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="avgWaitTime" stackId="1" stroke="#8884d8" fill="#8884d8" name="Wait Time" />
                  <Area type="monotone" dataKey="serviceLevel" stackId="2" stroke="#82ca9d" fill="#82ca9d" name="Service Level" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ContactCenterAnalytics;