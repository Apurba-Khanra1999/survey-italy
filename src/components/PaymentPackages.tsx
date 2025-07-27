
import React from 'react';
import { Check, Star } from 'lucide-react';
import { PAYMENT_PACKAGES } from '../data/packages';
import { PaymentPackage } from '../types/survey';

interface PaymentPackagesProps {
  onSelectPackage: (packageType: PaymentPackage) => void;
  selectedPackage?: string;
}

const PaymentPackages = ({ onSelectPackage, selectedPackage }: PaymentPackagesProps) => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Choose Your Survey Package
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Select the perfect plan for your survey needs
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PAYMENT_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-2xl border-2 p-8 shadow-lg transition-all hover:shadow-xl ${
                pkg.popular
                  ? 'border-blue-500 bg-white ring-2 ring-blue-500'
                  : selectedPackage === pkg.id
                  ? 'border-blue-300 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center space-x-1 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    <Star className="h-4 w-4 fill-current" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900">{pkg.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">${pkg.price}</span>
                  <span className="text-lg text-gray-500">/survey</span>
                </div>
                <p className="mt-2 text-gray-600">Up to {pkg.maxQuestions} questions</p>
              </div>

              <ul className="mt-8 space-y-4">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onSelectPackage(pkg)}
                className={`mt-8 w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  pkg.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : selectedPackage === pkg.id
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {selectedPackage === pkg.id ? 'Selected' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentPackages;
