
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSurvey } from '../contexts/SurveyContext';
import { Question } from '../types/survey';
import { PAYMENT_PACKAGES } from '../data/packages';
import SurveyBuilder from '../components/SurveyBuilder';
import { toast } from 'sonner';
import { FileText, Settings, Save, DollarSign, Calendar } from 'lucide-react';

const EditSurveyPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getSurvey, updateSurvey, currentCompany } = useSurvey();
  
  const survey = getSurvey(id!);
  
  const [surveyData, setSurveyData] = useState({
    title: '',
    description: '',
    rewardPerResponse: 2,
    packageType: 'basic' as 'basic' | 'standard' | 'premium',
    isActive: false,
    expiresAt: ''
  });
  
  const [questions, setQuestions] = useState<Question[]>([]);
  
  useEffect(() => {
    if (survey) {
      setSurveyData({
        title: survey.title,
        description: survey.description,
        rewardPerResponse: survey.rewardPerResponse,
        packageType: survey.packageType,
        isActive: survey.isActive,
        expiresAt: survey.expiresAt ? new Date(survey.expiresAt).toISOString().slice(0, 16) : ''
      });
      setQuestions(survey.questions);
    }
  }, [survey]);
  
  if (!currentCompany) {
    navigate('/login');
    return null;
  }

  if (!survey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Survey Not Found</h1>
          <p className="text-gray-600 mb-6">The survey you're trying to edit doesn't exist.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const selectedPackage = PAYMENT_PACKAGES.find(p => p.id === surveyData.packageType) || PAYMENT_PACKAGES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!surveyData.title.trim()) {
      toast.error('Please enter a survey title');
      return;
    }
    
    if (questions.length === 0) {
      toast.error('Please add at least one question');
      return;
    }
    
    if (questions.some(q => !q.question.trim())) {
      toast.error('Please fill in all question fields');
      return;
    }

    updateSurvey(survey.id, {
      title: surveyData.title,
      description: surveyData.description,
      questions,
      isActive: surveyData.isActive,
      packageType: surveyData.packageType,
      maxQuestions: selectedPackage.maxQuestions,
      rewardPerResponse: surveyData.rewardPerResponse,
      expiresAt: surveyData.expiresAt || undefined
    });

    toast.success('Survey updated successfully!');
    navigate(`/survey/${survey.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-3">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Edit Survey
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Update your survey and modify questions
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Survey Basic Info */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/60 p-8">
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-2">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Survey Information</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Survey Title *
                </label>
                <input
                  type="text"
                  value={surveyData.title}
                  onChange={(e) => setSurveyData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter your survey title..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200 bg-gray-50/50"
                />
              </div>

              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Description
                </label>
                <textarea
                  value={surveyData.description}
                  onChange={(e) => setSurveyData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what this survey is about..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200 bg-gray-50/50 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Package Type
                </label>
                <select
                  value={surveyData.packageType}
                  onChange={(e) => setSurveyData(prev => ({ 
                    ...prev, 
                    packageType: e.target.value as 'basic' | 'standard' | 'premium' 
                  }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200 bg-gray-50/50"
                >
                  {PAYMENT_PACKAGES.map(pkg => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} - Up to {pkg.maxQuestions} questions
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4" />
                    <span>Reward per Response ($)</span>
                  </div>
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  step="0.5"
                  value={surveyData.rewardPerResponse}
                  onChange={(e) => setSurveyData(prev => ({ 
                    ...prev, 
                    rewardPerResponse: parseFloat(e.target.value) 
                  }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200 bg-gray-50/50"
                />
              </div>

              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Expiry Date (Optional)</span>
                  </div>
                </label>
                <input
                  type="datetime-local"
                  value={surveyData.expiresAt}
                  onChange={(e) => setSurveyData(prev => ({ ...prev, expiresAt: e.target.value }))}
                  min={new Date().toISOString().slice(0, 16)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200 bg-gray-50/50"
                />
                <p className="text-xs text-gray-500 mt-1">Leave empty for no expiry date</p>
              </div>

              <div className="lg:col-span-2">
                <label className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <input
                    type="checkbox"
                    checked={surveyData.isActive}
                    onChange={(e) => setSurveyData(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm font-semibold text-green-700">Survey is active</span>
                </label>
              </div>
            </div>
          </div>

          {/* Survey Builder */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/60 p-8">
            <SurveyBuilder
              questions={questions}
              onQuestionsChange={setQuestions}
              maxQuestions={selectedPackage.maxQuestions}
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(`/survey/${survey.id}`)}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"
            >
              <Save className="h-5 w-5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSurveyPage;
