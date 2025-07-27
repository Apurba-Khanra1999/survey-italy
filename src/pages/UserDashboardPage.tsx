
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useSurvey } from '../contexts/SurveyContext';
import { Heart, DollarSign, BarChart3, Clock, Star, Zap, Filter, Search, Award, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const UserDashboardPage = () => {
  const { currentUser, toggleFavorite, isFavorite } = useUser();
  const { surveys } = useSurvey();
  const [activeTab, setActiveTab] = useState<'available' | 'favorites' | 'completed'>('available');
  const [searchTerm, setSearchTerm] = useState('');

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to continue</h2>
          <Link to="/user-login" className="text-blue-600 hover:text-blue-500">
            Go to login
          </Link>
        </div>
      </div>
    );
  }

  const activeSurveys = surveys.filter(survey => survey.isActive);
  const favoriteSurveys = activeSurveys.filter(survey => isFavorite(survey.id));
  const completedSurveys = surveys.filter(survey => 
    currentUser.completedSurveys.includes(survey.id)
  );

  const filteredSurveys = () => {
    let surveysToFilter = [];
    
    switch (activeTab) {
      case 'available':
        surveysToFilter = activeSurveys;
        break;
      case 'favorites':
        surveysToFilter = favoriteSurveys;
        break;
      case 'completed':
        surveysToFilter = completedSurveys;
        break;
    }

    if (searchTerm) {
      surveysToFilter = surveysToFilter.filter(survey =>
        survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        survey.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        survey.companyName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return surveysToFilter;
  };

  const totalEarnings = completedSurveys.reduce((acc, survey) => acc + survey.rewardPerResponse, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {currentUser.name}!
          </h1>
          <p className="text-gray-600">
            Continue earning rewards by completing surveys
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Total Earnings</p>
                  <p className="text-3xl font-bold">${totalEarnings}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Completed Surveys</p>
                  <p className="text-3xl font-bold">{completedSurveys.length}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Favorite Surveys</p>
                  <p className="text-3xl font-bold">{favoriteSurveys.length}</p>
                </div>
                <Heart className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Available Surveys</p>
                  <p className="text-3xl font-bold">{activeSurveys.length}</p>
                </div>
                <Award className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('available')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'available'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Available Surveys
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'favorites'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Favorites ({favoriteSurveys.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'completed'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Completed ({completedSurveys.length})
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search surveys..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Filter className="h-5 w-5 text-gray-600" />
            <span className="text-gray-600">Filter</span>
          </button>
        </div>

        {/* Surveys Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSurveys().map((survey) => (
            <Card key={survey.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/90 backdrop-blur-sm overflow-hidden transform hover:scale-105">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
              
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                      {survey.title}
                    </CardTitle>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {survey.description}
                    </p>
                  </div>
                  <div className="ml-4 flex flex-col items-end space-y-2">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl px-3 py-2 shadow-lg">
                      <div className="flex items-center font-bold text-lg">
                        <DollarSign className="h-5 w-5" />
                        <span>{survey.rewardPerResponse}</span>
                      </div>
                      <div className="text-xs text-green-100">per response</div>
                    </div>
                    <button
                      onClick={() => toggleFavorite(survey.id)}
                      className={`p-2 rounded-full transition-all duration-200 ${
                        isFavorite(survey.id)
                          ? 'bg-red-100 text-red-600 hover:bg-red-200'
                          : 'bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-600'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${isFavorite(survey.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-xl mb-4">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <Award className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{survey.companyName}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 capitalize">{survey.packageType} package</span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-500 ml-1">Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                    <div className="text-xl font-bold text-green-600">{survey.questions.length}</div>
                    <div className="text-xs text-green-600">Questions</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                    <div className="text-xl font-bold text-blue-600">{survey.responses.length}</div>
                    <div className="text-xs text-blue-600">Completed</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                    <div className="text-xl font-bold text-purple-600">{Math.ceil(survey.questions.length * 0.5)}</div>
                    <div className="text-xs text-purple-600">Minutes</div>
                  </div>
                </div>

                <div className="flex items-center justify-center mb-6 p-3 bg-yellow-50 rounded-xl">
                  <Clock className="h-4 w-4 mr-2 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-700">
                    ~{Math.ceil(survey.questions.length * 0.5)} minutes to complete
                  </span>
                </div>

                {activeTab === 'completed' ? (
                  <div className="w-full bg-gray-100 text-gray-600 py-4 px-4 rounded-xl font-semibold text-center">
                    ✓ Completed - Earned ${survey.rewardPerResponse}
                  </div>
                ) : (
                  <Link
                    to={`/take-survey/${survey.id}`}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 text-center block shadow-lg hover:shadow-xl transform group-hover:scale-105"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Zap className="h-5 w-5" />
                      <span>Start Survey & Earn ${survey.rewardPerResponse}</span>
                    </div>
                  </Link>
                )}

                <div className="flex items-center justify-between mt-4 text-xs">
                  <div className="flex items-center text-green-600">
                    <Award className="h-3 w-3 mr-1" />
                    <span>Instant Payout</span>
                  </div>
                  <div className="flex items-center text-blue-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>High Rating</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSurveys().length === 0 && (
          <Card className="text-center py-12 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent>
              <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {activeTab === 'favorites' ? 'No favorite surveys yet' : 
                 activeTab === 'completed' ? 'No completed surveys yet' : 
                 'No surveys found'}
              </h3>
              <p className="text-gray-500 mb-6">
                {activeTab === 'favorites' ? 'Start adding surveys to your favorites!' : 
                 activeTab === 'completed' ? 'Complete some surveys to see them here!' : 
                 'Try adjusting your search terms.'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default UserDashboardPage;
