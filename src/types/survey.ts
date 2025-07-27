export interface Question {
  id: string;
  type: 'multiple-choice' | 'text' | 'rating' | 'boolean';
  question: string;
  options?: string[];
  required: boolean;
}

export interface SurveyResponse {
  id: string;
  surveyId: string;
  userId: string;
  answers: Record<string, string | string[]>;
  completedAt: string;
  rewardClaimed: boolean;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  companyId: string;
  companyName: string;
  questions: Question[];
  responses: SurveyResponse[];
  createdAt: string;
  expiresAt?: string;
  isActive: boolean;
  packageType: 'basic' | 'standard' | 'premium';
  maxQuestions: number;
  rewardPerResponse: number;
}

export interface PaymentPackage {
  id: string;
  name: string;
  maxQuestions: number;
  price: number;
  features: string[];
  popular?: boolean;
}

export interface Company {
  id: string;
  name: string;
  email: string;
  subscription: 'basic' | 'standard' | 'premium' | 'none';
  surveys: string[];
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  favoritesSurveys: string[];
  completedSurveys: string[];
}

export interface UserContextType {
  currentUser: User | null;
  loginUser: (email: string, password: string) => User | null;
  registerUser: (name: string, email: string, password: string) => string;
  setCurrentUser: (user: User | null) => void;
  toggleFavorite: (surveyId: string) => void;
  isFavorite: (surveyId: string) => boolean;
}
