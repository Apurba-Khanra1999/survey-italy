import React, { useState } from 'react';
import { X, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { Survey, Question } from '../types/survey';
import QuestionRenderer from './survey/QuestionRenderer';

interface SurveyPreviewProps {
  survey: Survey;
  onClose: () => void;
}

const SurveyPreview = ({ survey, onClose }: SurveyPreviewProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [showComplete, setShowComplete] = useState(false);

  const currentQuestion = survey.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === survey.questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / survey.questions.length) * 100;

  const handleAnswer = (questionId: string, answer: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowComplete(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const canProceed = () => {
    const answer = responses[currentQuestion.id];
    if (!currentQuestion.required) return true;
    if (currentQuestion.type === 'boolean') return answer !== undefined;
    if (currentQuestion.type === 'text') return answer && answer.trim().length > 0;
    return answer !== undefined && answer !== null;
  };

  if (showComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12 max-w-2xl w-full text-center">
          <div className="mb-8">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Survey Preview Complete!</h2>
            <p className="text-xl text-gray-600 mb-8">
              This is how your survey will look to respondents. You can now create the actual survey.
            </p>
          </div>
          <button
            onClick={onClose}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Back to Survey Builder
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Survey Preview</h1>
            <p className="text-gray-600">See how your survey will appear to respondents</p>
          </div>
          <button
            onClick={onClose}
            className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Survey Content */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Survey Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                {survey.title}
              </h1>
              {survey.description && (
                <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                  {survey.description}
                </p>
              )}
              <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-gray-500">
                <span>Question {currentQuestionIndex + 1} of {survey.questions.length}</span>
                <span>•</span>
                <span>Reward: ${survey.rewardPerResponse}</span>
                <span>•</span>
                <span>{survey.companyName}</span>
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="p-8">
            <QuestionRenderer
              question={currentQuestion}
              currentAnswer={responses[currentQuestion.id] || ''}
              onAnswerChange={(questionId, answer) => handleAnswer(questionId, answer)}
            />
          </div>

          {/* Navigation */}
          <div className="p-8 border-t border-gray-200 bg-gray-50/50">
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Previous</span>
              </button>

              <div className="text-sm text-gray-500">
                {currentQuestionIndex + 1} / {survey.questions.length}
              </div>

              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
              >
                <span>{isLastQuestion ? 'Complete Preview' : 'Next'}</span>
                {!isLastQuestion && <ArrowRight className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyPreview;
