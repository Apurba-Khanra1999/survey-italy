
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, PlusCircle, Calendar, QrCode } from 'lucide-react';
import { Survey } from '../../types/survey';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface DashboardRecentSurveysProps {
  surveys: Survey[];
}

const DashboardRecentSurveys = ({ surveys }: DashboardRecentSurveysProps) => {
  return (
    <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <div>
            <CardTitle className="text-xl sm:text-2xl text-slate-900">Your Surveys</CardTitle>
            <CardDescription>Manage and monitor your survey collection</CardDescription>
          </div>
          <Link
            to="/create-survey"
            className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-full sm:w-auto"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Survey
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {surveys.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="mx-auto w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <BarChart3 className="h-12 w-12 text-slate-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">No surveys yet</h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Get started by creating your first survey and start collecting valuable responses.
            </p>
            <Link
              to="/create-survey"
              className="inline-flex items-center px-6 py-3 border border-transparent shadow-lg text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Create Your First Survey
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {surveys.map((survey) => (
              <Card key={survey.id} className="border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-200 bg-white">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-4">
                      <CardTitle className="text-base sm:text-lg text-slate-900 line-clamp-2">{survey.title}</CardTitle>
                      <CardDescription className="mt-1 line-clamp-2">{survey.description}</CardDescription>
                    </div>
                    <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${
                      survey.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-slate-100 text-slate-800'
                    }`}>
                      {survey.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-xl sm:text-2xl font-bold text-slate-900">{survey.questions.length}</p>
                      <p className="text-xs text-slate-600">Questions</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl sm:text-2xl font-bold text-slate-900">{survey.responses.length}</p>
                      <p className="text-xs text-slate-600">Responses</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl sm:text-2xl font-bold text-slate-900">${survey.rewardPerResponse}</p>
                      <p className="text-xs text-slate-600">Per Response</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>Created {new Date(survey.createdAt).toLocaleDateString()}</span>
                    </div>
                    <span className="capitalize font-medium text-slate-600">{survey.packageType} Package</span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Link
                      to={`/survey/${survey.id}`}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-2 px-3 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                    >
                      View Survey
                    </Link>
                    <Link
                      to={`/survey/${survey.id}/qr`}
                      className="flex items-center justify-center p-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shrink-0"
                      title="Generate QR Code"
                    >
                      <QrCode className="h-4 w-4 text-slate-600" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardRecentSurveys;
