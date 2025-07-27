
import React from 'react';
import { BarChart3 } from 'lucide-react';
import { Company } from '../../types/survey';

interface DashboardHeaderProps {
  company: Company;
}

const DashboardHeader = ({ company }: DashboardHeaderProps) => {
  return (
    <div className="mb-8 lg:mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl p-3 sm:p-4 shadow-lg">
              <BarChart3 className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
              Welcome back, {company.name}
            </h1>
            <p className="text-slate-600 mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg">
              Monitor your surveys and track performance analytics
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
