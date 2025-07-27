
import React from 'react';
import { BarChart3, Users, DollarSign, ArrowUpRight, Activity, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface DashboardStatsGridProps {
  stats: {
    totalSurveys: number;
    totalResponses: number;
    totalRewardsPaid: number;
  };
}

const DashboardStatsGrid = ({ stats }: DashboardStatsGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 lg:mb-12">
      <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/30 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Total Surveys</CardTitle>
          <div className="p-2 bg-blue-100 rounded-lg">
            <BarChart3 className="h-4 w-4 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900">{stats.totalSurveys}</div>
          <div className="flex items-center mt-1">
            <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
            <p className="text-xs text-slate-600">+12% from last month</p>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-green-50/30 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Total Responses</CardTitle>
          <div className="p-2 bg-green-100 rounded-lg">
            <Users className="h-4 w-4 text-green-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900">{stats.totalResponses}</div>
          <div className="flex items-center mt-1">
            <Activity className="h-3 w-3 text-green-500 mr-1" />
            <p className="text-xs text-slate-600">Active engagement</p>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-purple-50/30 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Rewards Distributed</CardTitle>
          <div className="p-2 bg-purple-100 rounded-lg">
            <DollarSign className="h-4 w-4 text-purple-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900">${stats.totalRewardsPaid}</div>
          <div className="flex items-center mt-1">
            <TrendingUp className="h-3 w-3 text-purple-500 mr-1" />
            <p className="text-xs text-slate-600">Growing rewards</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStatsGrid;
