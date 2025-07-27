
import React from 'react';
import { DollarSign } from 'lucide-react';
import { Survey } from '../../types/survey';

interface SurveyHeaderProps {
  survey: Survey;
  currentQuestionIndex: number;
}

const SurveyHeader = ({ survey, currentQuestionIndex }: SurveyHeaderProps) => {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/20 mb-6">
        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
        <span className="text-sm font-medium text-gray-600">{survey.companyName}</span>
      </div>
      
      <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
        {survey.title}
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">{survey.description}</p>
      
      <div className="flex items-center justify-center space-x-8">
        <div className="flex items-center space-x-2 text-gray-600">
          <span className="text-sm font-medium">
            Question {currentQuestionIndex + 1} of {survey.questions.length}
          </span>
        </div>
        <div className="flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full px-4 py-2">
          <DollarSign className="h-4 w-4 text-green-600" />
          <span className="text-sm font-bold text-green-700">${survey.rewardPerResponse} reward</span>
        </div>
      </div>
    </div>
  );
};

export default SurveyHeader;
