import React, { useState, useEffect } from 'react';
import { feedbackService } from '../services/feedbackService';

function ExternalFeedback() {
  const [feedbackData, setFeedbackData] = useState({
    mentalHealth: [],
    shopping: [],
    amazon: [],
    twitter: []
  });
  const [selectedSource, setSelectedSource] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExternalFeedback = async () => {
      setLoading(true);
      try {
        const [mentalHealthData, shoppingData] = await Promise.all([
          feedbackService.getMentalHealthAppReviews(),
          feedbackService.getShoppingReviews()
        ]);

        setFeedbackData({
          mentalHealth: mentalHealthData,
          shopping: shoppingData,
          amazon: [], // Will be populated when implemented
          twitter: []  // Will be populated when implemented
        });
      } catch (err) {
        setError('Failed to fetch external feedback');
      } finally {
        setLoading(false);
      }
    };

    fetchExternalFeedback();
    // Set up polling for real-time updates
    const interval = setInterval(fetchExternalFeedback, 30000);
    return () => clearInterval(interval);
  }, []);

  const renderSentimentBadge = (sentiment) => {
    const colors = {
      positive: 'bg-green-100 text-green-800',
      negative: 'bg-red-100 text-red-800',
      mixed: 'bg-yellow-100 text-yellow-800',
      neutral: 'bg-gray-100 text-gray-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[sentiment]}`}>
        {sentiment}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Source Filter */}
      <div className="flex justify-between items-center">
        <select
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm"
        >
          <option value="all">All Sources</option>
          <option value="mentalHealth">Mental Health Apps</option>
          <option value="shopping">Shopping Reviews</option>
          <option value="amazon">Amazon Reviews</option>
          <option value="twitter">Twitter Feedback</option>
        </select>
        <div className="flex items-center text-sm text-green-600">
          <span className="h-2 w-2 bg-green-600 rounded-full mr-2 animate-pulse"></span>
          Live Updates
        </div>
      </div>

      {/* Feedback Grid */}
      <div className="grid grid-cols-1 gap-6">
        {Object.entries(feedbackData)
          .filter(([source]) => selectedSource === 'all' || source === selectedSource)
          .map(([source, reviews]) => (
            reviews.map((review) => (
              <div 
                key={review.id} 
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {review.appName || review.store}
                    </h3>
                    <p className="mt-1 text-gray-500">
                      {review.user} • {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {renderSentimentBadge(review.sentiment)}
                    <span className="text-yellow-400">
                      {"★".repeat(Math.round(review.rating))}
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">
                  {review.review}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {review.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">
                    Source: {source.charAt(0).toUpperCase() + source.slice(1)}
                  </span>
                </div>
              </div>
            ))
          ))}
      </div>
    </div>
  );
}

export default ExternalFeedback;