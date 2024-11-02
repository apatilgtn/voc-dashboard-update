import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, ChevronRight, Bell, Lock, Globe, BarChart2, Users, MessageSquare, Activity } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const [stats] = useState({
    users: 15000,
    feedback: 50000,
    countries: 25,
    satisfaction: 98
  });

  const features = [
    {
      icon: <Activity className="h-6 w-6" />,
      title: "Real-time Analytics",
      description: "Monitor customer feedback and sentiment in real-time",
      color: "text-blue-500"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Customer Insights",
      description: "Deep dive into customer behavior and preferences",
      color: "text-green-500"
    },
    {
      icon: <BarChart2 className="h-6 w-6" />,
      title: "Advanced Reporting",
      description: "Generate comprehensive reports and analytics",
      color: "text-purple-500"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Coverage",
      description: "Analytics across multiple regions and languages",
      color: "text-indigo-500"
    }
  ];

  // Auto-rotate features
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [features.length]);

  // Handle lockout countdown
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (countdown === 0 && isLockedOut) {
      setIsLockedOut(false);
      setLoginAttempts(0);
    }
  }, [countdown, isLockedOut]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (isLockedOut) {
      setError(`Account locked. Try again in ${countdown} seconds`);
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    // Password validation
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

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
      setLoginAttempts(prev => prev + 1);
      
      if (loginAttempts + 1 >= 3) {
        setIsLockedOut(true);
        setCountdown(30);
        setError('Too many failed attempts. Account locked for 30 seconds.');
      } else {
        setError(`Invalid credentials. ${3 - (loginAttempts + 1)} attempts remaining.`);
      }
      setIsLoading(false);
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
              <div className="relative">
                <svg viewBox="0 0 24 24" className="h-12 w-12 text-black" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div className="absolute -top-2 -right-2">
                  <span className="flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">InsightPulse</h1>
            <p className="text-gray-500">Customer Experience Analytics Platform</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 p-4 rounded-lg animate-shake">
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
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
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
              disabled={isLoading || isLockedOut}
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
              ) : isLockedOut ? (
                `Try again in ${countdown}s`
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

      {/* Right side - Features and Stats */}
      <div className="w-1/2 bg-black text-white p-16 flex flex-col justify-between">
        {/* Features Section */}
        <div className="space-y-8">
          <h2 className="text-4xl font-bold mb-6">Transform Your Customer Experience</h2>
          
          {/* Current Feature Highlight */}
          <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm transition-all duration-500">
            <div className={`${features[currentFeatureIndex].color} mb-4`}>
              {features[currentFeatureIndex].icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {features[currentFeatureIndex].title}
            </h3>
            <p className="text-gray-400">
              {features[currentFeatureIndex].description}
            </p>
          </div>

          {/* Feature Navigation Dots */}
          <div className="flex space-x-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentFeatureIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentFeatureIndex === index ? 'bg-white w-8' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-8 mt-12">
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{stats.users.toLocaleString()}+</div>
            <div className="text-gray-400">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{stats.feedback.toLocaleString()}+</div>
            <div className="text-gray-400">Feedback Analyzed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{stats.countries}+</div>
            <div className="text-gray-400">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{stats.satisfaction}%</div>
            <div className="text-gray-400">Customer Satisfaction</div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center mt-12 py-4 px-6 bg-white/5 rounded-lg">
          <Lock className="text-gray-400 mr-2 h-4 w-4" />
          <span className="text-sm text-gray-400">Enterprise-grade security with advanced encryption</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;