
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentPackages from '../components/PaymentPackages';
import { PaymentPackage } from '../types/survey';
import { toast } from 'sonner';
import { Sparkles, Shield, Zap } from 'lucide-react';

const PricingPage = () => {
  const [selectedPackage, setSelectedPackage] = useState<PaymentPackage | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleSelectPackage = (pkg: PaymentPackage) => {
    setSelectedPackage(pkg);
  };

  const handlePayment = async () => {
    if (!selectedPackage) return;

    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Payment successful! Redirecting to survey builder...');
      
      setTimeout(() => {
        navigate('/login', { 
          state: { 
            package: selectedPackage,
            message: 'Payment successful! Please login or register to continue.' 
          }
        });
      }, 1000);
      
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-xl opacity-20"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full p-4">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
              Choose Your Survey Package
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Select the perfect plan for your survey needs. All packages include QR code generation, 
            advanced analytics, and user reward distribution.
          </p>
        </div>

        <PaymentPackages 
          onSelectPackage={handleSelectPackage}
          selectedPackage={selectedPackage?.id}
        />

        {selectedPackage && (
          <div className="mt-16 max-w-lg mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/60 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-2">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Order Summary</h3>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div>
                    <span className="text-lg font-semibold text-gray-900">{selectedPackage.name} Package</span>
                    <p className="text-sm text-gray-500">Up to {selectedPackage.maxQuestions} questions</p>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">${selectedPackage.price}</span>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      ${selectedPackage.price}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5" />
                    <span>Pay ${selectedPackage.price}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center space-x-2 mt-4">
                <Shield className="h-4 w-4 text-green-500" />
                <p className="text-sm text-gray-500 text-center">
                  Secure payment processing. Your information is encrypted and protected.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingPage;
