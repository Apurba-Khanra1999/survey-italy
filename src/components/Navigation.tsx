
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSurvey } from '../contexts/SurveyContext';
import { useUser } from '../contexts/UserContext';
import { ChartBar, LogOut, User, FileText, Plus, Package, Heart, BarChart3, Settings } from 'lucide-react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Navigation = () => {
  const { currentCompany, setCurrentCompany } = useSurvey();
  const { currentUser, setCurrentUser } = useUser();
  const navigate = useNavigate();

  const handleCompanyLogout = () => {
    setCurrentCompany(null);
    navigate('/');
  };

  const handleUserLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  const handleCreateSurvey = () => {
    if (!currentCompany) {
      toast.error('Please login first');
      navigate('/login');
      return;
    }
    
    if (!currentCompany.subscription || currentCompany.subscription === 'none') {
      toast.info('Please select a package to create surveys');
      navigate('/pricing');
      return;
    }
    
    navigate('/create-survey');
  };

  const hasValidPackage = currentCompany?.subscription && currentCompany.subscription !== 'none';

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <ChartBar className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">SurveyPro</span>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <Link
              to="/surveys"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Browse Surveys
            </Link>
            
            {/* User Authentication Section */}
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/user-dashboard"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>My Dashboard</span>
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    <User className="h-4 w-4 text-green-500" />
                    <span>{currentUser.name}</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Survey Taker
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/user-profile" className="flex items-center space-x-2">
                        <Settings className="h-4 w-4" />
                        <span>Profile Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleUserLogout} className="flex items-center space-x-2 text-red-600">
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : currentCompany ? (
              /* Company Authentication Section */
              <>
                {hasValidPackage ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1"
                    >
                      <FileText className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                    
                    <button
                      onClick={handleCreateSurvey}
                      className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Create Survey</span>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/pricing"
                    className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1"
                  >
                    <Package className="h-4 w-4" />
                    <span>Select Package</span>
                  </Link>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    <User className="h-4 w-4 text-blue-500" />
                    <span>{currentCompany.name}</span>
                    {hasValidPackage && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full capitalize">
                        {currentCompany.subscription}
                      </span>
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/company-profile" className="flex items-center space-x-2">
                        <Settings className="h-4 w-4" />
                        <span>Company Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleCompanyLogout} className="flex items-center space-x-2 text-red-600">
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              /* No Authentication - Show Login Options */
              <div className="flex items-center space-x-4">
                <Link
                  to="/user-login"
                  className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1"
                >
                  <Heart className="h-4 w-4" />
                  <span>Earn Rewards</span>
                </Link>
                <Link
                  to="/login"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Company Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
