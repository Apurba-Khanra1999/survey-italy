
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SurveyErrorStateProps {
  type: 'not-found' | 'inactive' | 'no-questions';
}

const SurveyErrorStates = ({ type }: SurveyErrorStateProps) => {
  const navigate = useNavigate();

  const getErrorContent = () => {
    switch (type) {
      case 'not-found':
        return {
          icon: '❌',
          title: 'Survey Not Found',
          message: "The survey you're looking for doesn't exist or has been removed.",
          bgColor: 'bg-red-100'
        };
      case 'inactive':
        return {
          icon: '⏸️',
          title: 'Survey Inactive',
          message: 'This survey is currently not accepting responses.',
          bgColor: 'bg-yellow-100'
        };
      case 'no-questions':
        return {
          icon: '📝',
          title: 'Survey In Progress',
          message: 'This survey is being prepared. Please check back later.',
          bgColor: 'bg-blue-100'
        };
      default:
        return {
          icon: '❌',
          title: 'Error',
          message: 'Something went wrong.',
          bgColor: 'bg-gray-100'
        };
    }
  };

  const { icon, title, message, bgColor } = getErrorContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
        <div className={`w-20 h-20 mx-auto mb-6 ${bgColor} rounded-full flex items-center justify-center`}>
          <span className="text-3xl">{icon}</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={() => navigate('/')}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default SurveyErrorStates;
