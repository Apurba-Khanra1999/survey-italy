
import React, { useState } from 'react';
import { useSurvey } from '../contexts/SurveyContext';
import { Building, Mail, Calendar, Package, Save, ArrowLeft, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';

const CompanyProfilePage = () => {
  const { currentCompany, setCurrentCompany, surveys } = useSurvey();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentCompany?.name || '',
    email: currentCompany?.email || '',
  });

  if (!currentCompany) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to continue</h2>
          <Link to="/login" className="text-blue-600 hover:text-blue-500">
            Go to login
          </Link>
        </div>
      </div>
    );
  }

  const companySurveys = surveys.filter(survey => survey.companyId === currentCompany.id);

  const handleSave = () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    const updatedCompany = {
      ...currentCompany,
      name: formData.name.trim(),
      email: formData.email.trim(),
    };

    setCurrentCompany(updatedCompany);
    setIsEditing(false);
    toast.success('Company profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData({
      name: currentCompany.name,
      email: currentCompany.email,
    });
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case 'basic': return 'bg-green-50 text-green-600 border-green-200';
      case 'standard': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'premium': return 'bg-purple-50 text-purple-600 border-purple-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Profile</h1>
          <p className="text-gray-600">Manage your company information and subscription</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Company Information */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    Company Information
                  </CardTitle>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                      >
                        <Save className="h-4 w-4" />
                        <span>Save</span>
                      </button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter company name"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Building className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-900">{currentCompany.name}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter email address"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-900">{currentCompany.email}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Member Since
                    </label>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-900">{formatDate(currentCompany.createdAt)}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Subscription
                    </label>
                    <div className={`flex items-center space-x-3 p-3 rounded-lg border ${getSubscriptionColor(currentCompany.subscription)}`}>
                      <Package className="h-5 w-5" />
                      <span className="font-semibold capitalize">
                        {currentCompany.subscription === 'none' ? 'No Package' : `${currentCompany.subscription} Plan`}
                      </span>
                    </div>
                    {currentCompany.subscription === 'none' && (
                      <Link 
                        to="/pricing" 
                        className="mt-2 inline-block text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Upgrade to create surveys →
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Statistics Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Company Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Total Surveys</span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">
                    {companySurveys.length}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">Active Surveys</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">
                    {companySurveys.filter(s => s.isActive).length}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    <span className="text-sm font-medium text-gray-700">Total Responses</span>
                  </div>
                  <span className="text-lg font-bold text-purple-600">
                    {companySurveys.reduce((acc, survey) => acc + survey.responses.length, 0)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold mb-2">Company Account</h3>
                <p className="text-blue-100 text-sm">
                  Create surveys and gather valuable insights from your audience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfilePage;
