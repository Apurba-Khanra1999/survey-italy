
import React from 'react';

interface ProgressBarProps {
  currentQuestionIndex: number;
  totalQuestions: number;
}

const ProgressBar = ({ currentQuestionIndex, totalQuestions }: ProgressBarProps) => {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="mb-12">
      <div className="bg-gray-200 rounded-full h-3 shadow-inner">
        <div
          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 shadow-lg"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>Start</span>
        <span>Complete</span>
      </div>
    </div>
  );
};

export default ProgressBar;
