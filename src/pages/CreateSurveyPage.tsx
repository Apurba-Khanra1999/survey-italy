
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSurvey } from '../contexts/SurveyContext';
import { Question } from '../types/survey';
import { PAYMENT_PACKAGES } from '../data/packages';
import SurveyBuilder from '../components/SurveyBuilder';
import SurveyPreview from '../components/SurveyPreview';
import { toast } from 'sonner';
import { FileText, Settings, Rocket, DollarSign, Eye, Calendar, Star, Sparkles } from 'lucide-react';

const CreateSurveyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addSurvey, currentCompany } = useSurvey();
  
  const packageFromState = location.state?.package;
  const defaultPackage = packageFromState || PAYMENT_PACKAGES[0];
  
  const [surveyData, setSurveyData] = useState({
    title: '',
    description: '',
    rewardPerResponse: 2,
    packageType: defaultPackage.id as 'basic' | 'standard' | 'premium',
    isActive: false,
    expiresAt: ''
  });
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  
  if (!currentCompany) {
    navigate('/login');
    return null;
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

    const surveyId = addSurvey({
      title: surveyData.title,
      description: surveyData.description,
      companyId: currentCompany.id,
      companyName: currentCompany.name,
      questions,
      isActive: surveyData.isActive,
      packageType: surveyData.packageType,
      maxQuestions: selectedPackage.maxQuestions,
      rewardPerResponse: surveyData.rewardPerResponse,
      expiresAt: surveyData.expiresAt || undefined
    });

    toast.success('Survey created successfully!');
    navigate(`/survey/${surveyId}/qr`);
  };

  const handlePreview = () => {
    if (!surveyData.title.trim()) {
      toast.error('Please enter a survey title to preview');
      return;
    }
    
    if (questions.length === 0) {
      toast.error('Please add at least one question to preview');
      return;
    }
    
    setShowPreview(true);
  };

  if (showPreview) {
    return (
      <SurveyPreview
        survey={{
          id: 'preview',
          title: surveyData.title,
          description: surveyData.description,
          questions,
          companyId: currentCompany.id,
          companyName: currentCompany.name,
          packageType: surveyData.packageType,
          maxQuestions: selectedPackage.maxQuestions,
          rewardPerResponse: surveyData.rewardPerResponse,
          isActive: surveyData.isActive,
          responses: [],
          createdAt: new Date().toISOString(),
          expiresAt: surveyData.expiresAt || undefined
        }}
        onClose={() => setShowPreview(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="bg-gradient-to-r from-violet-600 to-blue-600 rounded-2xl p-4 shadow-lg transform rotate-3">
                <FileText className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Create Amazing Survey
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Build engaging surveys that capture valuable insights from your audience with our powerful survey builder
          </p>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-500 ml-2">Trusted by 10,000+ companies</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Survey Basic Info */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500"></div>
            
            <div className="flex items-center space-x-4 mb-8">
              <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-3 shadow-lg">
                <Settings className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Survey Information</h2>
                <p className="text-gray-600 mt-1">Set up the basic details for your survey</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="lg:col-span-2">
                <label className="block text-sm font-bold text-gray-800 mb-3">
                  Survey Title *
                </label>
                <input
                  type="text"
                  value={surveyData.title}
                  onChange={(e) => setSurveyData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Give your survey an engaging title..."
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-400 transition-all duration-300 bg-gray-50/50 text-lg font-medium"
                />
              </div>

              <div className="lg:col-span-2">
                <label className="block text-sm font-bold text-gray-800 mb-3">
                  Description
                </label>
                <textarea
                  value={surveyData.description}
                  onChange={(e) => setSurveyData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what this survey is about and why it matters..."
                  rows={4}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-400 transition-all duration-300 bg-gray-50/50 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-3">
                  Package Type
                </label>
                <select
                  value={surveyData.packageType}
                  onChange={(e) => setSurveyData(prev => ({ 
                    ...prev, 
                    packageType: e.target.value as 'basic' | 'standard' | 'premium' 
                  }))}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-400 transition-all duration-300 bg-gray-50/50 font-medium"
                >
                  {PAYMENT_PACKAGES.map(pkg => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} - Up to {pkg.maxQuestions} questions
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-3">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
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
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-400 transition-all duration-300 bg-gray-50/50 font-medium"
                />
              </div>

              <div className="lg:col-span-2">
                <label className="block text-sm font-bold text-gray-800 mb-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span>Expiry Date (Optional)</span>
                  </div>
                </label>
                <input
                  type="datetime-local"
                  value={surveyData.expiresAt}
                  onChange={(e) => setSurveyData(prev => ({ ...prev, expiresAt: e.target.value }))}
                  min={new Date().toISOString().slice(0, 16)}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-violet-500/20 focus:border-violet-400 transition-all duration-300 bg-gray-50/50 font-medium"
                />
                <p className="text-sm text-gray-500 mt-2">Leave empty for no expiry date</p>
              </div>

              <div className="lg:col-span-2">
                <label className="flex items-center space-x-4 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 cursor-pointer hover:from-green-100 hover:to-emerald-100 transition-all duration-200">
                  <input
                    type="checkbox"
                    checked={surveyData.isActive}
                    onChange={(e) => setSurveyData(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="w-6 h-6 rounded-lg border-2 border-green-300 text-green-600 focus:ring-green-500 focus:ring-4"
                  />
                  <span className="text-lg font-bold text-green-700">Make survey active immediately</span>
                </label>
              </div>
            </div>
          </div>

          {/* Survey Builder */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            <SurveyBuilder
              questions={questions}
              onQuestionsChange={setQuestions}
              maxQuestions={selectedPackage.maxQuestions}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-6 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-all duration-200 font-bold text-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePreview}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-3 text-lg"
              >
                <Eye className="h-6 w-6" />
                <span>Preview Survey</span>
              </button>
            </div>
            <button
              type="submit"
              className="px-12 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl hover:from-violet-700 hover:to-purple-700 transition-all duration-200 font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center space-x-3 text-lg"
            >
              <Rocket className="h-6 w-6" />
              <span>Create Survey</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSurveyPage;
