
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, DollarSign } from 'lucide-react';

interface SurveyCompleteProps {
  rewardAmount: number;
}

const SurveyComplete = ({ rewardAmount }: SurveyCompleteProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-lg mx-auto text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-white/20">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              Thank You!
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Your survey response has been submitted successfully.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-inner p-8 mb-8 border border-green-100">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <span className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ${rewardAmount}
              </span>
            </div>
            <p className="text-gray-700 font-medium">Reward earned for completing this survey</p>
            <p className="text-sm text-gray-500 mt-2">
              Payment will be processed within 24-48 hours
            </p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => navigate('/surveys')}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Take More Surveys
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="w-full bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 py-4 px-6 rounded-xl font-medium hover:bg-white/90 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyComplete;
