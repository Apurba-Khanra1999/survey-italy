
import React from 'react';
import { User, Mail } from 'lucide-react';

interface UserInfoFormProps {
  userName: string;
  userEmail: string;
  onUserNameChange: (name: string) => void;
  onUserEmailChange: (email: string) => void;
}

const UserInfoForm = ({ userName, userEmail, onUserNameChange, onUserEmailChange }: UserInfoFormProps) => {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-3xl shadow-xl border border-indigo-100 p-8 mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Almost Done! 🎉
      </h3>
      <p className="text-gray-600 text-center mb-8">
        Please provide your details to receive your reward
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            <User className="inline h-4 w-4 mr-2" />
            Full Name *
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => onUserNameChange(e.target.value)}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-all duration-200"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            <Mail className="inline h-4 w-4 mr-2" />
            Email Address *
          </label>
          <input
            type="email"
            value={userEmail}
            onChange={(e) => onUserEmailChange(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-all duration-200"
          />
        </div>
      </div>
    </div>
  );
};

export default UserInfoForm;
