import { useState, useEffect } from 'react';

export const useWebSocket = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ws;
    try {
      // In a real application, replace with your actual WebSocket server URL
      ws = new WebSocket(url || 'wss://your-api-url/feedback');

      ws.onmessage = (event) => {
        const feedback = JSON.parse(event.data);
        setData(prev => [feedback, ...prev].slice(0, 10));
      };

      ws.onerror = (error) => {
        setError('WebSocket error: ' + error.message);
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
      };
    } catch (err) {
      setError(err.message);
    }

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [url]);

  return { data, error };
};