
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Users, QrCode, DollarSign, CheckCircle, Star, Sparkles, TrendingUp, Clock, Award, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full p-4">
                  <BarChart3 className="h-16 w-16 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1 animate-bounce">
                  <Sparkles className="h-4 w-4 text-yellow-800" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Create Surveys That
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-pulse">
                Pay & Get Paid
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              The ultimate survey platform where companies create engaging surveys with flexible pricing packages, 
              and users earn money for their valuable responses. Join thousands already earning!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/pricing"
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span>Start Creating Surveys</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/surveys"
                className="group border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  <span>Earn Money Taking Surveys</span>
                </span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <Award className="h-4 w-4 text-yellow-500" />
                <span>Verified Companies</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4 text-blue-500" />
                <span>Instant Rewards</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <Star className="h-4 w-4 text-purple-500" />
                <span>98% Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        </div>
      </div>

      {/* Real-time Stats Banner */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-8 text-center">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 animate-bounce" />
              <span className="font-semibold">$2,847 earned in the last 24 hours</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>1,234 active survey takers online now</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose SurveyPro?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform bridges the gap between companies seeking insights and users wanting to earn money
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Survey Creation</h3>
                <p className="text-gray-600">Build professional surveys with our intuitive drag-and-drop builder</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-green-50 to-white">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible Pricing</h3>
                <p className="text-gray-600">Choose from multiple packages based on your survey needs</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-white">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <QrCode className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">QR Code Sharing</h3>
                <p className="text-gray-600">Generate QR codes for easy survey distribution and access</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-orange-50 to-white">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">User Rewards</h3>
                <p className="text-gray-600">Users earn money for completing surveys, increasing response rates</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Simple steps to create surveys and start earning
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* For Companies */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 text-center flex items-center justify-center space-x-2">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                  </div>
                  <span>For Companies</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { step: 1, title: "Choose Your Package", desc: "Select from Basic (10 questions), Standard (30 questions), or Premium (100 questions)" },
                    { step: 2, title: "Make Payment", desc: "Secure payment processing with instant access to survey builder" },
                    { step: 3, title: "Build Your Survey", desc: "Create custom questions with our easy-to-use survey builder" },
                    { step: 4, title: "Share & Analyze", desc: "Generate QR codes, share survey links, and analyze responses" }
                  ].map((item) => (
                    <div key={item.step} className="flex items-start space-x-4">
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm shadow-lg">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* For Users */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 text-center flex items-center justify-center space-x-2">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <span>For Survey Takers</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { step: 1, title: "Find Surveys", desc: "Browse available surveys or scan QR codes shared by companies" },
                    { step: 2, title: "Complete Survey", desc: "Answer all questions honestly and thoroughly" },
                    { step: 3, title: "Earn Money", desc: "Receive instant rewards for completed surveys" },
                    { step: 4, title: "Get Paid", desc: "Withdraw earnings or continue taking surveys to earn more" }
                  ].map((item) => (
                    <div key={item.step} className="flex items-start space-x-4">
                      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm shadow-lg">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Statistics</h2>
            <p className="text-lg text-gray-600">Real numbers from our growing community</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 group-hover:shadow-lg transition-all duration-300">
                <div className="text-4xl font-bold text-blue-600 mb-2">12.5K+</div>
                <div className="text-gray-600 font-medium">Surveys Created</div>
                <div className="text-sm text-green-600 mt-1">↗ +15% this month</div>
              </div>
            </div>
            <div className="group">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 group-hover:shadow-lg transition-all duration-300">
                <div className="text-4xl font-bold text-green-600 mb-2">87K+</div>
                <div className="text-gray-600 font-medium">Active Users</div>
                <div className="text-sm text-green-600 mt-1">↗ +23% this month</div>
              </div>
            </div>
            <div className="group">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 group-hover:shadow-lg transition-all duration-300">
                <div className="text-4xl font-bold text-purple-600 mb-2">$250K+</div>
                <div className="text-gray-600 font-medium">Rewards Paid</div>
                <div className="text-sm text-green-600 mt-1">↗ +31% this month</div>
              </div>
            </div>
            <div className="group">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 group-hover:shadow-lg transition-all duration-300">
                <div className="text-4xl font-bold text-orange-600 mb-2">98.5%</div>
                <div className="text-gray-600 font-medium">Satisfaction Rate</div>
                <div className="text-sm text-green-600 mt-1">↗ +0.5% this month</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of companies and users who are already using SurveyPro to create meaningful connections and earn money
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/pricing"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Create Your First Survey
              </Link>
              <Link
                to="/surveys"
                className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors transform hover:scale-105"
              >
                Start Earning Money
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
