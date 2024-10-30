import React, { useState, useEffect } from 'react';

function RealTimeFeed() {
  const [feedbacks, setFeedbacks] = useState([]);

  // Simulate real-time feedback data
  useEffect(() => {
    const mockFeedback = [
      {
        id: 1,
        customer: "John Doe",
        message: "Really impressed with the customer service!",
        sentiment: "positive",
        source: "Website",
        timestamp: new Date().toISOString(),
        rating: 5
      },
      {
        id: 2,
        customer: "Sarah Smith",
        message: "Had some issues with the mobile app",
        sentiment: "negative",
        source: "Mobile App",
        timestamp: new Date().toISOString(),
        rating: 2
      }
    ];

    // Initial data
    setFeedbacks(mockFeedback);

    // Simulate real-time updates
    const interval = setInterval(() => {
      const newFeedback = {
        id: Date.now(),
        customer: `Customer ${Math.floor(Math.random() * 1000)}`,
        message: ["Great experience!", "Need improvement", "Average service", "Outstanding support!"][
          Math.floor(Math.random() * 4)
        ],
        sentiment: Math.random() > 0.5 ? "positive" : "negative",
        source: ["Website", "Mobile App", "Email", "Social Media"][
          Math.floor(Math.random() * 4)
        ],
        timestamp: new Date().toISOString(),
        rating: Math.floor(Math.random() * 5) + 1
      };

      setFeedbacks(prev => [newFeedback, ...prev].slice(0, 10));
    }, 5000); // Add new feedback every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const getSentimentColor = (sentiment) => {
    return sentiment === 'positive' ? 'text-green-600' : 'text-red-600';
  };

  const getSourceIcon = (source) => {
    switch (source.toLowerCase()) {
      case 'website':
        return '🌐';
      case 'mobile app':
        return '📱';
      case 'email':
        return '📧';
      case 'social media':
        return '💬';
      default:
        return '📝';
    }
  };

  const getRatingStars = (rating) => {
    return '⭐'.repeat(rating);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Real-time Feedback</h3>
      </div>
      <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="font-medium text-gray-900">{feedback.customer}</span>
                  <span className="ml-2 text-sm text-gray-500">via {getSourceIcon(feedback.source)} {feedback.source}</span>
                </div>
                <p className="mt-1 text-gray-600">{feedback.message}</p>
                <div className="mt-2 flex items-center space-x-4">
                  <span className={`text-sm ${getSentimentColor(feedback.sentiment)}`}>
                    {feedback.sentiment === 'positive' ? '😊' : '😕'} {feedback.sentiment}
                  </span>
                  <span className="text-sm text-yellow-500">{getRatingStars(feedback.rating)}</span>
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(feedback.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Updating in real-time</span>
          <span className="flex items-center">
            <span className="h-2 w-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            Live
          </span>
        </div>
      </div>
    </div>
  );
}

export default RealTimeFeed;