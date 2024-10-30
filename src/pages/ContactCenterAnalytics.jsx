import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, Area, AreaChart } from 'recharts';
import { Globe, Users, Clock, PhoneCall, BarChart2, AlertCircle } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

function ContactCenterAnalytics() {
  const [timeRange, setTimeRange] = useState('realtime');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countryData, setCountryData] = useState(null);
  const [agentData, setAgentData] = useState([]);
  const [customerMetrics, setCustomerMetrics] = useState({});
  const [queueMetrics, setQueueMetrics] = useState([]);
  const [realTimeAlerts, setRealTimeAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all countries for dropdown
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const sortedCountries = data.sort((a, b) => 
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Fetch country-specific data when a country is selected
  useEffect(() => {
    const fetchCountryData = async () => {
      if (!selectedCountry) return;

      setLoading(true);
      try {
        // Fetch specific country data
        const countryResponse = await fetch(`https://restcountries.com/v3.1/name/${selectedCountry}`);
        const [countryDetails] = await countryResponse.json();

        // Generate realistic contact center metrics based on population
        const population = countryDetails.population;
        const baseCallVolume = Math.floor(population * 0.001); // 0.1% of population makes calls
        const timeSlots = Array.from({ length: 24 }, (_, i) => i);
        
        // Generate hourly data
        const hourlyData = timeSlots.map(hour => {
          // More calls during business hours
          const isBusinessHour = hour >= 9 && hour <= 17;
          const multiplier = isBusinessHour ? 1.5 : 0.5;
          const callVolume = Math.floor(baseCallVolume * multiplier * Math.random());
          
          return {
            hour: `${hour.toString().padStart(2, '0')}:00`,
            callVolume,
            waitTime: Math.floor(Math.random() * 300) + 60, // 1-6 minutes
            satisfaction: (Math.random() * 1 + 4).toFixed(1), // 4-5 rating
            serviceLevel: Math.floor(Math.random() * 20 + 80), // 80-100%
          };
        });

        // Generate agent data for the country
        const agentCount = Math.floor(baseCallVolume / 100); // 1 agent per 100 calls
        const newAgentData = Array.from({ length: agentCount }, (_, index) => ({
          id: `${countryDetails.cca2}-${index + 1}`,
          name: `Agent ${index + 1}`,
          status: ['Available', 'On Call', 'After Call Work'][Math.floor(Math.random() * 3)],
          activeTime: Math.floor(Math.random() * 480) + 120,
          callsHandled: Math.floor(Math.random() * 30) + 10,
          avgHandleTime: Math.floor(Math.random() * 300) + 120,
          satisfaction: (Math.random() * 2 + 3).toFixed(1),
          firstCallResolution: Math.floor(Math.random() * 20 + 80)
        }));

        // Update state with new data
        setCountryData({
          ...countryDetails,
          hourlyData,
          metrics: {
            totalCalls: baseCallVolume,
            avgWaitTime: Math.floor(Math.random() * 180) + 30,
            satisfaction: (Math.random() * 1 + 4).toFixed(1),
            serviceLevel: Math.floor(Math.random() * 10 + 90)
          }
        });
        setAgentData(newAgentData);
        setQueueMetrics(hourlyData);
        
        // Generate relevant alerts
        const newAlerts = generateCountryAlerts(countryDetails.name.common);
        setRealTimeAlerts(newAlerts);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching country data:', error);
        setLoading(false);
      }
    };

    fetchCountryData();
    
    if (selectedCountry) {
      const interval = setInterval(fetchCountryData, 30000); // Update every 30 seconds
      return () => clearInterval(interval);
    }
  }, [selectedCountry]);

  // Generate country-specific alerts
  const generateCountryAlerts = (countryName) => {
    const alertTypes = [
      `High call volume detected in ${countryName}`,
      `Service level alert for ${countryName}`,
      `Staff shortage alert in ${countryName}`,
      `Peak hour warning for ${countryName}`,
      `Customer satisfaction drop in ${countryName}`
    ];

    return Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => ({
      id: Math.random().toString(36).substr(2, 9),
      message: alertTypes[Math.floor(Math.random() * alertTypes.length)],
      timestamp: new Date().toISOString(),
      severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)]
    }));
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'on call': return 'bg-blue-100 text-blue-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header with Country Selector */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contact Center Analytics</h1>
            <p className="text-sm text-gray-500">
              {selectedCountry ? `Viewing data for ${selectedCountry}` : 'Select a country to view data'}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="min-w-[200px] rounded-md border-gray-300 shadow-sm px-4 py-2"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.cca3} value={country.name.common}>
                  {country.name.common}
                </option>
              ))}
            </select>
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

        {selectedCountry && countryData ? (
          <>
            {/* Country Overview */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-4 mb-6">
                <img 
                  src={countryData.flags.svg} 
                  alt={`${selectedCountry} flag`} 
                  className="w-16 h-10 object-cover rounded shadow"
                />
                <div>
                  <h2 className="text-xl font-bold">{selectedCountry}</h2>
                  <p className="text-sm text-gray-500">
                    Population: {countryData.population.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard 
                title="Total Calls"
                value={countryData.metrics.totalCalls.toLocaleString()}
                icon={<PhoneCall className="text-sky-500" />}
                change="+12%"
              />
              <MetricCard 
                title="Avg Wait Time"
                value={`${countryData.metrics.avgWaitTime}s`}
                icon={<Clock className="text-sky-500" />}
                change="-5%"
              />
              <MetricCard 
                title="Satisfaction"
                value={`${countryData.metrics.satisfaction}/5`}
                icon={<Users className="text-sky-500" />}
                change="+0.2"
              />
              <MetricCard 
                title="Service Level"
                value={`${countryData.metrics.serviceLevel}%`}
                icon={<BarChart2 className="text-sky-500" />}
                change="+5%"
              />
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

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Call Volume Trend */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Call Volume Trend</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={countryData.hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="callVolume" 
                        stroke="#0088FE" 
                        name="Call Volume" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Service Level Metrics */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Service Level Metrics</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={countryData.hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="serviceLevel" 
                        stroke="#82ca9d" 
                        fill="#82ca9d" 
                        name="Service Level %" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="satisfaction" 
                        stroke="#8884d8" 
                        fill="#8884d8" 
                        name="Satisfaction" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Agent Status Table */}
              <div className="bg-white rounded-lg shadow p-6 col-span-2">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Agent Status</h2>
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
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <Globe className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No Country Selected</h3>
            <p className="mt-1 text-sm text-gray-500">
              Select a country from the dropdown to view contact center analytics
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

// Metric Card Component
const MetricCard = ({ title, value, icon, change }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="p-3 bg-sky-50 rounded-full">
        {icon}
      </div>
    </div>
    <div className="mt-4">
      <span className={`text-sm ${
        change.startsWith('+') ? 'text-green-600' : 'text-red-600'
      }`}>
        {change}
      </span>
    </div>
  </div>
);

export default ContactCenterAnalytics;