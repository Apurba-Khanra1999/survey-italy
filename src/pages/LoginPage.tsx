
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Building2, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useSurvey } from '../contexts/SurveyContext';
import { toast } from 'sonner';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  const navigate = useNavigate();
  const location = useLocation();
  const { loginCompany, registerCompany, companies } = useSurvey();
  
  const packageInfo = location.state?.package;
  const message = location.state?.message;

  React.useEffect(() => {
    if (message) {
      toast.success(message);
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submitted:', { isLogin, email: formData.email });
    
    if (isLogin) {
      // Login logic
      try {
        console.log('Attempting login...');
        const company = loginCompany(formData.email, formData.password);
        
        if (company) {
          console.log('Login successful:', company);
          toast.success('Login successful!');
          
          // Check if company has a valid subscription
          if (!company.subscription || company.subscription === 'none') {
            toast.info('Please select a package to continue');
            navigate('/pricing');
          } else {
            navigate('/dashboard');
          }
        } else {
          console.log('Login failed - company not found');
          console.log('Available companies:', companies.map(c => c.email));
          toast.error('Invalid email or password. Please check your credentials or register a new account.');
        }
      } catch (error) {
        console.error('Login error:', error);
        toast.error('Login failed. Please try again.');
      }
    } else {
      // Register logic
      try {
        console.log('Attempting registration...');
        
        // For registration, require package selection
        if (!packageInfo) {
          toast.info('Please select a package first');
          navigate('/pricing');
          return;
        }
        
        const companyId = registerCompany(
          formData.name,
          formData.email,
          formData.password,
          packageInfo.id
        );
        
        console.log('Registration successful:', companyId);
        toast.success('Registration successful!');
        navigate('/dashboard');
      } catch (error: any) {
        console.error('Registration error:', error);
        toast.error(error.message || 'Registration failed. Please try again.');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Building2 className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Create your company account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? 'Welcome back! Please sign in to continue.' : 'Join SurveyPro and start creating surveys'}
          </p>
        </div>

        {/* Demo credentials for testing */}
        {isLogin && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="text-center">
              <h3 className="text-sm font-medium text-yellow-900">Demo Credentials</h3>
              <p className="text-xs text-yellow-700 mt-1">
                Email: admin@techcorp.com<br />
                Password: any password (demo mode)
              </p>
            </div>
          </div>
        )}

        {packageInfo && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="text-center">
              <h3 className="text-sm font-medium text-blue-900">Selected Package</h3>
              <p className="text-lg font-semibold text-blue-600">{packageInfo.name} - ${packageInfo.price}</p>
              <p className="text-xs text-blue-700">Up to {packageInfo.maxQuestions} questions</p>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <div className="mt-1 relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={!isLogin}
                    value={formData.name}
                    onChange={handleInputChange}
                    className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your company name"
                  />
                  <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email"
                />
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none relative block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
                />
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-500 text-sm font-medium"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
