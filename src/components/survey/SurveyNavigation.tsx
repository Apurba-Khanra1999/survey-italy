
import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface SurveyNavigationProps {
  currentQuestionIndex: number;
  isLastQuestion: boolean;
  canProceed: boolean;
  userName: string;
  userEmail: string;
  onPrevious: () => void;
  onNext: () => void;
}

const SurveyNavigation = ({ 
  currentQuestionIndex, 
  isLastQuestion, 
  canProceed, 
  userName, 
  userEmail, 
  onPrevious, 
  onNext 
}: SurveyNavigationProps) => {
  const isSubmitDisabled = !canProceed || (isLastQuestion && (!userName.trim() || !userEmail.trim()));

  return (
    <div className="flex justify-between items-center">
      <button
        onClick={onPrevious}
        disabled={currentQuestionIndex === 0}
        className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Previous</span>
      </button>
      
      <button
        onClick={onNext}
        disabled={isSubmitDisabled}
        className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        <span>{isLastQuestion ? 'Submit Survey' : 'Next'}</span>
        {!isLastQuestion && <ArrowRight className="h-4 w-4" />}
      </button>
    </div>
  );
};

export default SurveyNavigation;
