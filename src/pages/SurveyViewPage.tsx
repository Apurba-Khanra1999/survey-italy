import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSurvey } from '../contexts/SurveyContext';
import { Edit, Share2, BarChart3, Users, Calendar, DollarSign, ExternalLink, ArrowLeft, Code, Copy, Check } from 'lucide-react';
import QRCodeGenerator from '../components/QRCodeGenerator';
import { toast } from 'sonner';
import QuestionAnalytics from '../components/analytics/QuestionAnalytics';

const SurveyViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getSurvey, currentCompany } = useSurvey();
  const [activeTab, setActiveTab] = useState<'overview' | 'qr' | 'analytics' | 'embed'>('overview');
  const [embedCopied, setEmbedCopied] = useState(false);
  
  console.log('SurveyViewPage - Survey ID from params:', id);
  
  const survey = getSurvey(id!);
  console.log('SurveyViewPage - Found survey:', survey);
  
  if (!survey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Survey Not Found</h1>
          <p className="text-gray-600 mb-6">The survey you're looking for doesn't exist or has been removed.</p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/surveys')}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
            >
              Browse All Surveys
            </button>
            {currentCompany && (
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
              >
                Back to Dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const surveyUrl = `${window.location.origin}/take-survey/${survey.id}`;
  const isOwner = currentCompany?.id === survey.companyId;

  const generateEmbedCode = (width = '100%', height = '600px') => {
    return `<iframe src="${surveyUrl}" width="${width}" height="${height}" frameborder="0" style="border: none; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);"></iframe>`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(surveyUrl);
    toast.success('Survey link copied to clipboard!');
  };

  const handleCopyEmbed = (embedCode: string) => {
    navigator.clipboard.writeText(embedCode);
    setEmbedCopied(true);
    toast.success('Embed code copied to clipboard!');
    setTimeout(() => setEmbedCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: survey.title,
        text: survey.description,
        url: surveyUrl,
      });
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white/60 rounded-xl transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-gray-600" />
            </button>
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-3">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {survey.title}
              </h1>
              <p className="text-gray-600 mt-2 text-lg">{survey.description}</p>
            </div>
            {isOwner && (
              <Link
                to={`/survey/${survey.id}/edit`}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2"
              >
                <Edit className="h-5 w-5" />
                <span>Edit Survey</span>
              </Link>
            )}
          </div>

          {/* Survey Meta Info */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/60 p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{new Date(survey.createdAt).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600">Created</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <BarChart3 className="h-5 w-5 text-gray-500 mr-2" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{survey.questions.length}</p>
                <p className="text-sm text-gray-600">Questions</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-gray-500 mr-2" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{survey.responses.length}</p>
                <p className="text-sm text-gray-600">Responses</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
                </div>
                <p className="text-2xl font-bold text-gray-900">${survey.rewardPerResponse}</p>
                <p className="text-sm text-gray-600">Per Response</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/60 mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'qr', label: 'QR Code', icon: Share2 },
                { id: 'embed', label: 'Embed Code', icon: Code },
                { id: 'analytics', label: 'Analytics', icon: Users }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Survey Details</h3>
                    <p className="text-gray-600">Share this survey with your audience</p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleCopyLink}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
                    >
                      <Share2 className="h-4 w-4" />
                      <span>Copy Link</span>
                    </button>
                    <Link
                      to={`/take-survey/${survey.id}`}
                      target="_blank"
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Take Survey</span>
                    </Link>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Survey URL</label>
                  <div className="flex">
                    <input
                      type="text"
                      value={surveyUrl}
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Questions Preview</h4>
                  <div className="space-y-4">
                    {survey.questions.map((question, index) => (
                      <div key={question.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </span>
                          <div className="flex-1">
                            <p className="text-gray-900 font-medium">{question.question}</p>
                            <p className="text-sm text-gray-500 capitalize mt-1">{question.type.replace('-', ' ')}</p>
                            {question.options && (
                              <div className="mt-2 space-y-1">
                                {question.options.map((option, optionIndex) => (
                                  <div key={optionIndex} className="text-sm text-gray-600">
                                    • {option}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          {question.required && (
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">Required</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'qr' && (
              <div className="text-center space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">QR Code</h3>
                  <p className="text-gray-600">Scan this QR code to access the survey</p>
                </div>
                <div className="inline-block">
                  <QRCodeGenerator 
                    url={surveyUrl}
                    title={survey.title}
                  />
                </div>
                <div className="max-w-md mx-auto">
                  <button
                    onClick={handleShare}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Share2 className="h-5 w-5" />
                    <span>Share Survey</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'embed' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">Embed Your Survey</h3>
                  <p className="text-gray-600">Copy and paste this code into any website to embed your survey</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Standard Embed */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <Code className="h-5 w-5 text-blue-600" />
                      <span>Standard Embed</span>
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">Responsive iframe that adapts to container width</p>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <code className="text-sm text-gray-800 break-all">
                        {generateEmbedCode()}
                      </code>
                    </div>
                    <button
                      onClick={() => handleCopyEmbed(generateEmbedCode())}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      {embedCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      <span>{embedCopied ? 'Copied!' : 'Copy Code'}</span>
                    </button>
                  </div>

                  {/* Fixed Size Embed */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                      <Code className="h-5 w-5 text-green-600" />
                      <span>Fixed Size Embed</span>
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">Fixed dimensions for consistent layout</p>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <code className="text-sm text-gray-800 break-all">
                        {generateEmbedCode('800px', '600px')}
                      </code>
                    </div>
                    <button
                      onClick={() => handleCopyEmbed(generateEmbedCode('800px', '600px'))}
                      className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      {embedCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      <span>{embedCopied ? 'Copied!' : 'Copy Code'}</span>
                    </button>
                  </div>
                </div>

                {/* Preview */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Preview</h4>
                  <p className="text-sm text-gray-600 mb-4">This is how your survey will appear when embedded</p>
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <iframe 
                      src={surveyUrl} 
                      width="100%" 
                      height="400px" 
                      style={{ border: 'none' }}
                      title={`${survey.title} Preview`}
                    />
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-blue-900 mb-4">How to Use</h4>
                  <div className="space-y-3 text-sm text-blue-800">
                    <div className="flex items-start space-x-3">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                      <p>Copy the embed code above</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                      <p>Paste it into your website's HTML where you want the survey to appear</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                      <p>The survey will automatically appear on your website and collect responses</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Analytics</h3>
                  {survey.responses.length === 0 ? (
                    <div className="text-center py-12">
                      <Users className="mx-auto h-12 w-12 text-gray-400" />
                      <h4 className="mt-2 text-lg font-medium text-gray-900">No responses yet</h4>
                      <p className="mt-1 text-gray-500">Share your survey to start collecting responses.</p>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <h5 className="font-medium text-gray-900">Total Responses</h5>
                          <p className="text-2xl font-bold text-blue-600">{survey.responses.length}</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <h5 className="font-medium text-gray-900">Completion Rate</h5>
                          <p className="text-2xl font-bold text-green-600">100%</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <h5 className="font-medium text-gray-900">Total Rewards</h5>
                          <p className="text-2xl font-bold text-purple-600">
                            ${survey.responses.length * survey.rewardPerResponse}
                          </p>
                        </div>
                      </div>
                      <QuestionAnalytics survey={survey} />
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyViewPage;
