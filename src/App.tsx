
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SurveyProvider } from "./contexts/SurveyContext";
import { UserProvider } from "./contexts/UserContext";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import PricingPage from "./pages/PricingPage";
import LoginPage from "./pages/LoginPage";
import UserLoginPage from "./pages/UserLoginPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import UserProfilePage from "./pages/UserProfilePage";
import CompanyProfilePage from "./pages/CompanyProfilePage";
import DashboardPage from "./pages/DashboardPage";
import CreateSurveyPage from "./pages/CreateSurveyPage";
import EditSurveyPage from "./pages/EditSurveyPage";
import SurveyViewPage from "./pages/SurveyViewPage";
import TakeSurveyPage from "./pages/TakeSurveyPage";
import SurveysListPage from "./pages/SurveysListPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SurveyProvider>
        <UserProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-gray-50">
              <Navigation />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/user-login" element={<UserLoginPage />} />
                <Route path="/user-dashboard" element={<UserDashboardPage />} />
                <Route path="/user-profile" element={<UserProfilePage />} />
                <Route path="/company-profile" element={<CompanyProfilePage />} />
                <Route path="/surveys" element={<SurveysListPage />} />
                <Route path="/take-survey/:id" element={<TakeSurveyPage />} />
                
                {/* Protected routes that require login and package */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } />
                <Route path="/create-survey" element={
                  <ProtectedRoute>
                    <CreateSurveyPage />
                  </ProtectedRoute>
                } />
                <Route path="/survey/:id" element={
                  <ProtectedRoute requiresPackage={false}>
                    <SurveyViewPage />
                  </ProtectedRoute>
                } />
                <Route path="/survey/:id/edit" element={
                  <ProtectedRoute>
                    <EditSurveyPage />
                  </ProtectedRoute>
                } />
                <Route path="/survey/:id/qr" element={
                  <ProtectedRoute requiresPackage={false}>
                    <SurveyViewPage />
                  </ProtectedRoute>
                } />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </UserProvider>
      </SurveyProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
