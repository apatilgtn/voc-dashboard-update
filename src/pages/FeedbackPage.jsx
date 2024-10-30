import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { generateSpecializedFeedback } from '../services/specializedFeedback';

function FeedbackPage() {
  const [activeTab, setActiveTab] = useState('mentalHealth');
  const [feedback, setFeedback] = useState({
    mentalHealth: [],
    shopping: [],
    company: []
  });

  // Simulate real-time updates
  useEffect(() => {
    const generateFeedback = () => {
      setFeedback(prev => ({
        mentalHealth: [generateSpecializedFeedback.mentalHealth(), ...prev.mentalHealth].slice(0, 10),
        shopping: [generateSpecializedFeedback.shopping(), ...prev.shopping].slice(0, 10),
        company: [generateSpecializedFeedback.companyReview(), ...prev.company].slice(0, 10)
      }));
    };

    // Initial generation
    generateFeedback();

    // Update every 5 seconds
    const interval = setInterval(generateFeedback, 5000);
    return () => clearInterval(interval);
  }, []);

  const MentalHealthFeedback = ({ data }) => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.map((item, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{item.appName}</h3>
              <p className="text-sm text-gray-500">User Age: {item.userAge}</p>
            </div>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {item.rating}/5
            </span>
          </div>
          <div className="space-y-2">
            <p className="text-sm"><span className="font-medium">Symptoms:</span> {item.symptomsAddressed}</p>
            <p className="text-sm"><span className="font-medium">Improvement:</span> {item.improvement}</p>
            <p className="text-sm"><span className="font-medium">Challenge:</span> {item.challenge}</p>
            <p className="text-sm"><span className="font-medium">Usage:</span> {item.usageDuration}</p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Recommendation Score: {item.recommendationScore}/10</span>
              <span className="text-xs text-gray-400">
                {new Date(item.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const ShoppingFeedback = ({ data }) => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.map((item, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{item.storeName}</h3>
              <p className="text-sm text-gray-500">{item.category}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-sm ${
              item.customerSatisfaction > 80 ? 'bg-green-100 text-green-800' :
              item.customerSatisfaction > 60 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {item.customerSatisfaction}% Satisfied
            </span>
          </div>
          <div className="space-y-2">
            <p className="text-sm"><span className="font-medium">Order Amount:</span> ${item.orderAmount}</p>
            <p className="text-sm"><span className="font-medium">Delivery:</span> {item.deliveryService}</p>
            <p className="text-sm"><span className="font-medium">Payment:</span> {item.paymentMethod}</p>
            <p className="text-sm"><span className="font-medium">Delivery Time:</span> {item.deliveryTime}</p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <div className="text-yellow-400">{'★'.repeat(item.rating)}</div>
              <span className="text-xs text-gray-400">
                {new Date(item.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const CompanyFeedback = ({ data }) => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.map((item, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{item.companyName}</h3>
              <p className="text-sm text-gray-500">{item.department} - {item.position}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-sm ${
              item.employmentStatus === 'Current' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {item.employmentStatus}
            </span>
          </div>
          <div className="space-y-2">
            <div className="bg-green-50 p-2 rounded">
              <p className="text-sm text-green-800"><span className="font-medium">Pros:</span> {item.pros}</p>
            </div>
            <div className="bg-red-50 p-2 rounded">
              <p className="text-sm text-red-800"><span className="font-medium">Cons:</span> {item.cons}</p>
            </div>
            <p className="text-sm"><span className="font-medium">Years at Company:</span> {item.yearsAtCompany}</p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm text-gray-500">Would Recommend: </span>
                <span className={item.recommendToFriend ? 'text-green-600' : 'text-red-600'}>
                  {item.recommendToFriend ? 'Yes' : 'No'}
                </span>
              </div>
              <span className="text-xs text-gray-400">
                {new Date(item.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Feedback Analysis</h1>
          <div className="flex items-center space-x-2">
            <span className="flex items-center text-sm text-green-600">
              <span className="h-2 w-2 bg-green-600 rounded-full mr-2 animate-pulse"></span>
              Live Updates
            </span>
          </div>
        </div>

        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'mentalHealth', label: 'Mental Health' },
              { id: 'shopping', label: 'Shopping Experience' },
              { id: 'company', label: 'Company Reviews' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-6">
          {activeTab === 'mentalHealth' && <MentalHealthFeedback data={feedback.mentalHealth} />}
          {activeTab === 'shopping' && <ShoppingFeedback data={feedback.shopping} />}
          {activeTab === 'company' && <CompanyFeedback data={feedback.company} />}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default FeedbackPage;