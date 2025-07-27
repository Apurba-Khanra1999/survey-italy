
import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, DollarSign, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

const DashboardQuickActions = () => {
  return (
    <div className="mb-8 lg:mb-12">
      <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl text-slate-900">Quick Actions</CardTitle>
          <CardDescription>Get started with these common tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/create-survey"
              className="group flex items-center p-4 sm:p-6 border border-slate-200 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-200 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors mr-4">
                <PlusCircle className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 group-hover:text-blue-900 text-sm sm:text-base">Create New Survey</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">Build a new survey from scratch</p>
              </div>
            </Link>

            <Link
              to="/pricing"
              className="group flex items-center p-4 sm:p-6 border border-slate-200 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:border-green-200 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors mr-4">
                <DollarSign className="h-6 w-6 sm:h-7 sm:w-7 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 group-hover:text-green-900 text-sm sm:text-base">Upgrade Package</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">Get more questions and features</p>
              </div>
            </Link>

            <Link
              to="/surveys"
              className="group flex items-center p-4 sm:p-6 border border-slate-200 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:border-purple-200 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg sm:col-span-2 lg:col-span-1"
            >
              <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors mr-4">
                <Eye className="h-6 w-6 sm:h-7 sm:w-7 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 group-hover:text-purple-900 text-sm sm:text-base">View Public Surveys</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">See all available surveys</p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardQuickActions;
