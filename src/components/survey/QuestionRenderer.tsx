
import React from 'react';
import { Star } from 'lucide-react';
import { Question } from '../../types/survey';

interface QuestionRendererProps {
  question: Question;
  currentAnswer: string | string[];
  onAnswerChange: (questionId: string, value: string | string[]) => void;
}

const QuestionRenderer = ({ question, currentAnswer, onAnswerChange }: QuestionRendererProps) => {
  switch (question.type) {
    case 'multiple-choice':
      return (
        <div className="space-y-4">
          {question.options?.map((option, index) => (
            <label key={index} className="group flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer transition-all duration-200">
              <input
                type="radio"
                name={question.id}
                value={option}
                checked={currentAnswer === option}
                onChange={(e) => onAnswerChange(question.id, e.target.value)}
                className="w-5 h-5 text-blue-600 focus:ring-blue-500 focus:ring-2"
              />
              <span className="text-gray-700 font-medium group-hover:text-blue-700 transition-colors">{option}</span>
            </label>
          ))}
        </div>
      );

    case 'text':
      return (
        <textarea
          value={currentAnswer as string}
          onChange={(e) => onAnswerChange(question.id, e.target.value)}
          placeholder="Type your answer here..."
          rows={5}
          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-all duration-200 resize-none text-gray-700"
        />
      );

    case 'rating':
      return (
        <div className="space-y-4">
          {question.options?.map((option, index) => (
            <label key={index} className="group flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-xl hover:border-yellow-300 hover:bg-yellow-50/50 cursor-pointer transition-all duration-200">
              <input
                type="radio"
                name={question.id}
                value={option}
                checked={currentAnswer === option}
                onChange={(e) => onAnswerChange(question.id, e.target.value)}
                className="w-5 h-5 text-yellow-600 focus:ring-yellow-500 focus:ring-2"
              />
              <div className="flex items-center space-x-3">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="text-gray-700 font-medium group-hover:text-yellow-700 transition-colors">{option}</span>
              </div>
            </label>
          ))}
        </div>
      );

    case 'boolean':
      return (
        <div className="space-y-4">
          <label className="group flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50/50 cursor-pointer transition-all duration-200">
            <input
              type="radio"
              name={question.id}
              value="yes"
              checked={currentAnswer === 'yes'}
              onChange={(e) => onAnswerChange(question.id, e.target.value)}
              className="w-5 h-5 text-green-600 focus:ring-green-500 focus:ring-2"
            />
            <span className="text-gray-700 font-medium group-hover:text-green-700 transition-colors">Yes</span>
          </label>
          <label className="group flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50/50 cursor-pointer transition-all duration-200">
            <input
              type="radio"
              name={question.id}
              value="no"
              checked={currentAnswer === 'no'}
              onChange={(e) => onAnswerChange(question.id, e.target.value)}
              className="w-5 h-5 text-red-600 focus:ring-red-500 focus:ring-2"
            />
            <span className="text-gray-700 font-medium group-hover:text-red-700 transition-colors">No</span>
          </label>
        </div>
      );

    default:
      return null;
  }
};

export default QuestionRenderer;
