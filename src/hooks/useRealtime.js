import { useState, useEffect } from 'react';

// Simulated WebSocket for real-time data
const simulateWebSocket = (callback) => {
  const generateRandomData = () => {
    return {
      sentiment_score: Math.random() * 2 - 1,
      response_time: Math.floor(Math.random() * 60),
      feedback_count: Math.floor(Math.random() * 100),
      customer_satisfaction: Math.random() * 5
    };
  };

  const interval = setInterval(() => {
    callback(generateRandomData());
  }, 5000); // Update every 5 seconds

  return () => clearInterval(interval);
};

export const useRealtime = () => {
  const [realtimeData, setRealtimeData] = useState({
    sentiment_score: 0,
    response_time: 0,
    feedback_count: 0,
    customer_satisfaction: 0
  });

  useEffect(() => {
    return simulateWebSocket((data) => {
      setRealtimeData(prev => ({
        ...prev,
        ...data
      }));
    });
  }, []);

  return realtimeData;
};