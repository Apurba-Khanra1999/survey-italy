
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSurvey } from '../contexts/SurveyContext';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresPackage?: boolean;
}

const ProtectedRoute = ({ children, requiresPackage = true }: ProtectedRouteProps) => {
  const { currentCompany } = useSurvey();

  // Check if user is logged in
  if (!currentCompany) {
    toast.error('Please login to access this page');
    return <Navigate to="/login" replace />;
  }

  // Check if user has a valid package subscription
  if (requiresPackage && (!currentCompany.subscription || currentCompany.subscription === 'none')) {
    toast.info('Please select a package to access this feature');
    return <Navigate to="/pricing" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
