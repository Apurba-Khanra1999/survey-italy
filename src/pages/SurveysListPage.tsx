
import React from 'react';
import { Link } from 'react-router-dom';
import { useSurvey } from '../contexts/SurveyContext';
import { useUser } from '../contexts/UserContext';
import { Clock, DollarSign, BarChart3, Users, Star, TrendingUp, Award, Zap, Filter, Search, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const SurveysListPage = () => {
  const { surveys } = useSurvey();
  const { currentUser, toggleFavorite, isFavorite } = useUser();
  
  const activeSurveys = surveys.filter(survey => survey.isActive);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-4 shadow-lg">
                <DollarSign className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1 animate-bounce">
                <Zap className="h-4 w-4 text-yellow-800" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4">
            Available Surveys
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Complete surveys and earn money instantly. Each survey shows the reward amount before you start.
          </p>

          {/* CTA for users not logged in */}
          {!currentUser && (
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 mb-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-2">Ready to Start Earning?</h3>
              <p className="text-green-100 mb-4">Join thousands of users earning money by sharing their opinions</p>
              <Link
                to="/user-login"
                className="inline-flex items-center space-x-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                <Heart className="h-5 w-5" />
                <span>Sign Up & Start Earning</span>
              </Link>
            </div>
          )}

          {/* Live Stats Banner */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 mb-8 text-white shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <BarChart3 className="h-6 w-6" />
                  <span className="text-3xl font-bold">{activeSurveys.length}</span>
                </div>
                <div className="text-green-100">Available Surveys</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <DollarSign className="h-6 w-6" />
                  <span className="text-3xl font-bold">
                    ${activeSurveys.reduce((acc, survey) => acc + survey.rewardPerResponse, 0)}
                  </span>
                </div>
                <div className="text-green-100">Total Possible Earnings</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Users className="h-6 w-6" />
                  <span className="text-3xl font-bold">
                    {activeSurveys.reduce((acc, survey) => acc + survey.responses.length, 0)}
                  </span>
                </div>
                <div className="text-green-100">Responses Submitted</div>
              </div>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search surveys..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="text-gray-600">Filter</span>
            </button>
          </div>
        </div>

        {/* Surveys Grid */}
        {activeSurveys.length === 0 ? (
          <Card className="text-center py-12 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent>
              <BarChart3 className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No surveys available</h3>
              <p className="text-gray-500 mb-6">
                Check back later for new survey opportunities.
              </p>
              <Link
                to="/"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span>Explore Platform</span>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {activeSurveys.map((survey) => (
              <Card key={survey.id} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white/90 backdrop-blur-sm overflow-hidden transform hover:scale-105">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                
                <CardHeader className="pb-4">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
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
                      {currentUser && (
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
                      )}
                    </div>
                  </div>

                  {/* Company */}
                  <div className="flex items-center p-3 bg-gray-50 rounded-xl mb-4">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <Users className="h-4 w-4 text-blue-600" />
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
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                      <div className="text-xl font-bold text-blue-600">{survey.questions.length}</div>
                      <div className="text-xs text-blue-600">Questions</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                      <div className="text-xl font-bold text-purple-600">{survey.responses.length}</div>
                      <div className="text-xs text-purple-600">Completed</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                      <div className="text-xl font-bold text-green-600">{Math.ceil(survey.questions.length * 0.5)}</div>
                      <div className="text-xs text-green-600">Minutes</div>
                    </div>
                  </div>

                  {/* Estimated Time */}
                  <div className="flex items-center justify-center mb-6 p-3 bg-yellow-50 rounded-xl">
                    <Clock className="h-4 w-4 mr-2 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-700">
                      ~{Math.ceil(survey.questions.length * 0.5)} minutes to complete
                    </span>
                  </div>

                  {/* Action Button */}
                  <Link
                    to={`/take-survey/${survey.id}`}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 text-center block shadow-lg hover:shadow-xl transform group-hover:scale-105"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Zap className="h-5 w-5" />
                      <span>Start Survey & Earn ${survey.rewardPerResponse}</span>
                    </div>
                  </Link>

                  {/* Quality Indicators */}
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
        )}

        {/* How it Works */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-900 text-center mb-4">
              How It Works
            </CardTitle>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">
              Start earning money in just a few simple steps
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Choose a Survey</h3>
                <p className="text-gray-600 text-sm">
                  Browse available surveys and select one that interests you. See the reward amount upfront.
                </p>
              </div>
              
              <div className="text-center group">
                <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Answer Questions</h3>
                <p className="text-gray-600 text-sm">
                  Complete the survey by answering all questions honestly and thoroughly.
                </p>
              </div>
              
              <div className="text-center group">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Get Paid</h3>
                <p className="text-gray-600 text-sm">
                  Receive your reward instantly after completing the survey. Payment processed within 24-48 hours.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SurveysListPage;
