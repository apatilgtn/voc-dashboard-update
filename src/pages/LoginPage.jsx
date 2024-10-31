import React, { useState } from 'react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check credentials
    if (formData.email === 'admin@insightpulse.com' && formData.password === 'admin123') {
      localStorage.setItem('authToken', 'dummy_jwt_token');
      localStorage.setItem('user', JSON.stringify({
        email: formData.email,
        name: 'Admin User',
        role: 'admin'
      }));
      
      setIsLoading(false);
      window.location.href = '/dashboard';
    } else {
      setIsLoading(false);
      setError('Invalid email or password. Try admin@insightpulse.com / admin123');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="w-1/2 flex items-center justify-center bg-white p-16">
        <div className="max-w-md w-full">
          {/* Logo and Title */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <svg viewBox="0 0 24 24" className="h-12 w-12 text-black" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">InsightPulse</h1>
            <p className="text-gray-500">Customer Experience Analytics Platform</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                />
                <label className="ml-2 text-sm text-gray-600">Remember me</label>
              </div>
              <button
                type="button"
                className="text-sm text-gray-600 hover:text-black transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>

            <div className="text-center text-sm text-gray-500 mt-4">
              Demo credentials:
              <br />
              Email: admin@insightpulse.com
              <br />
              Password: admin123
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Image and Features */}
      <div className="w-1/2 bg-black text-white p-16 flex flex-col justify-center">
        <div className="max-w-lg">
          <h2 className="text-4xl font-bold mb-6">Customer Experience Analytics</h2>
          <p className="text-lg text-gray-300 mb-12">
            Transform your customer feedback into actionable insights with real-time analytics and comprehensive reporting.
          </p>

          <div className="space-y-8">
            <Feature 
              title="Real-time Feedback Analysis"
              description="Monitor and analyze customer feedback as it happens with our advanced analytics tools."
            />
            <Feature 
              title="Customer Sentiment Tracking"
              description="Track customer sentiment across multiple channels and touchpoints."
            />
            <Feature 
              title="Interactive Dashboards"
              description="Visualize your data with customizable dashboards and real-time updates."
            />
            <Feature 
              title="Comprehensive Reporting"
              description="Generate detailed reports with actionable insights for your business."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Feature = ({ title, description }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0">
      <svg className="h-6 w-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <div className="ml-4">
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  </div>
);

export default LoginPage;