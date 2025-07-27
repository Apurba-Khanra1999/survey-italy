
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { useSurvey } from '../contexts/SurveyContext';
import DashboardStats from '../components/DashboardStats';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardStatsGrid from '../components/dashboard/DashboardStatsGrid';
import DashboardQuickActions from '../components/dashboard/DashboardQuickActions';
import DashboardRecentSurveys from '../components/dashboard/DashboardRecentSurveys';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const DashboardPage = () => {
  const { surveys, currentCompany, getCompanyStats } = useSurvey();
  
  if (!currentCompany) return null;
  
  const companySurveys = surveys.filter(s => s.companyId === currentCompany.id);
  const stats = getCompanyStats(currentCompany.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
        <DashboardHeader company={currentCompany} />
        
        <DashboardStatsGrid stats={stats} />

        {/* Analytics Section */}
        <div className="mb-8 lg:mb-12">
          <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-2">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-xl sm:text-2xl text-slate-900">Analytics Overview</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <DashboardStats companyId={currentCompany.id} />
            </CardContent>
          </Card>
        </div>

        <DashboardQuickActions />
        
        <DashboardRecentSurveys surveys={companySurveys} />
      </div>
    </div>
  );
};

export default DashboardPage;
