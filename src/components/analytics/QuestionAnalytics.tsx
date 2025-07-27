
import React from 'react';
import { Survey } from '../../types/survey';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { BarChart3, MessageSquare, Star, CheckCircle } from 'lucide-react';

interface QuestionAnalyticsProps {
  survey: Survey;
}

const QuestionAnalytics = ({ survey }: QuestionAnalyticsProps) => {
  const getQuestionIcon = (type: string) => {
    switch (type) {
      case 'multiple-choice':
        return <CheckCircle className="h-4 w-4" />;
      case 'text':
        return <MessageSquare className="h-4 w-4" />;
      case 'rating':
        return <Star className="h-4 w-4" />;
      case 'boolean':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <BarChart3 className="h-4 w-4" />;
    }
  };

  const getAnswerAnalytics = (questionId: string, question: any) => {
    const answers = survey.responses.map(response => response.answers[questionId]).filter(Boolean);
    
    if (question.type === 'multiple-choice' || question.type === 'boolean') {
      const answerCounts: Record<string, number> = {};
      answers.forEach(answer => {
        const answerStr = Array.isArray(answer) ? answer.join(', ') : String(answer);
        answerCounts[answerStr] = (answerCounts[answerStr] || 0) + 1;
      });
      
      return (
        <div className="space-y-2">
          {Object.entries(answerCounts).map(([answer, count]) => (
            <div key={answer} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{answer}</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${(count / survey.responses.length) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">{count}</span>
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    if (question.type === 'rating') {
      const ratings = answers.map(answer => parseInt(String(answer))).filter(rating => !isNaN(rating));
      const avgRating = ratings.length > 0 ? (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1) : 'N/A';
      
      return (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Average Rating</span>
            <span className="text-lg font-bold text-blue-600">{avgRating}</span>
          </div>
          <div className="text-xs text-gray-500">Based on {ratings.length} responses</div>
        </div>
      );
    }
    
    if (question.type === 'text') {
      return (
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {answers.slice(0, 5).map((answer, index) => (
            <div key={index} className="bg-gray-50 p-2 rounded text-sm text-gray-700">
              "{String(answer)}"
            </div>
          ))}
          {answers.length > 5 && (
            <div className="text-xs text-gray-500">
              +{answers.length - 5} more responses
            </div>
          )}
        </div>
      );
    }
    
    return <div className="text-sm text-gray-500">No responses yet</div>;
  };

  if (survey.responses.length === 0) {
    return (
      <div className="text-center py-8">
        <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
        <h4 className="mt-2 text-lg font-medium text-gray-900">No responses yet</h4>
        <p className="mt-1 text-gray-500">Question analytics will appear here once you receive responses.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-900">Question-by-Question Analysis</h4>
      <div className="grid gap-6">
        {survey.questions.map((question, index) => (
          <Card key={question.id} className="border border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="bg-blue-100 text-blue-600 rounded-lg p-2">
                    {getQuestionIcon(question.type)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base text-gray-900 leading-6">
                    Q{index + 1}. {question.question}
                  </CardTitle>
                  <p className="text-sm text-gray-500 capitalize mt-1">
                    {question.type.replace('-', ' ')} • {survey.responses.length} responses
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {getAnswerAnalytics(question.id, question)}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuestionAnalytics;
