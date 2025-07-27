
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSurvey } from '../contexts/SurveyContext';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import SurveyHeader from '../components/survey/SurveyHeader';
import ProgressBar from '../components/survey/ProgressBar';
import QuestionRenderer from '../components/survey/QuestionRenderer';
import UserInfoForm from '../components/survey/UserInfoForm';
import SurveyNavigation from '../components/survey/SurveyNavigation';
import SurveyComplete from '../components/survey/SurveyComplete';
import SurveyErrorStates from '../components/survey/SurveyErrorStates';

const TakeSurveyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getSurvey, addResponse } = useSurvey();
  
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  
  // Get survey and ensure it exists
  const survey = id ? getSurvey(id) : null;
  
  if (!survey) {
    return <SurveyErrorStates type="not-found" />;
  }

  if (!survey.isActive) {
    return <SurveyErrorStates type="inactive" />;
  }

  // Check if survey has questions
  if (!survey.questions || survey.questions.length === 0) {
    return <SurveyErrorStates type="no-questions" />;
  }

  const currentQuestion = survey.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === survey.questions.length - 1;
  
  // Fix the canProceed logic to handle different answer types properly
  const canProceed = !currentQuestion.required || Boolean(answers[currentQuestion.id]);

  const handleAnswerChange = (questionId: string, value: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (!canProceed) {
      toast.error('Please answer this required question');
      return;
    }
    
    if (isLastQuestion) {
      handleSubmit();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(prev => prev - 1);
  };

  const handleSubmit = () => {
    if (!userName.trim() || !userEmail.trim()) {
      toast.error('Please provide your name and email');
      return;
    }

    addResponse({
      surveyId: survey.id,
      userId: uuidv4(),
      answers,
      rewardClaimed: false
    });

    setIsSubmitted(true);
    toast.success(`Congratulations! You've earned $${survey.rewardPerResponse}`);
  };

  if (isSubmitted) {
    return <SurveyComplete rewardAmount={survey.rewardPerResponse} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SurveyHeader survey={survey} currentQuestionIndex={currentQuestionIndex} />

        {/* Progress Bar */}
        <ProgressBar currentQuestionIndex={currentQuestionIndex} totalQuestions={survey.questions.length} />

        {/* Question */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {currentQuestion.question}
            {currentQuestion.required && <span className="text-red-500 ml-2">*</span>}
          </h2>
          
          <QuestionRenderer
            question={currentQuestion}
            currentAnswer={answers[currentQuestion.id] || ''}
            onAnswerChange={handleAnswerChange}
          />
        </div>

        {/* User Info (Last Question) */}
        {isLastQuestion && (
          <UserInfoForm
            userName={userName}
            userEmail={userEmail}
            onUserNameChange={setUserName}
            onUserEmailChange={setUserEmail}
          />
        )}

        {/* Navigation */}
        <SurveyNavigation
          currentQuestionIndex={currentQuestionIndex}
          isLastQuestion={isLastQuestion}
          canProceed={canProceed}
          userName={userName}
          userEmail={userEmail}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};

export default TakeSurveyPage;
