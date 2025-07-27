
import { PaymentPackage } from '../types/survey';

export const PAYMENT_PACKAGES: PaymentPackage[] = [
  {
    id: 'basic',
    name: 'Basic',
    maxQuestions: 10,
    price: 29,
    features: [
      'Up to 10 questions',
      'Basic analytics',
      'QR code generation',
      'Email support'
    ]
  },
  {
    id: 'standard',
    name: 'Standard',
    maxQuestions: 30,
    price: 79,
    features: [
      'Up to 30 questions',
      'Advanced analytics',
      'QR code generation',
      'Priority support',
      'Custom branding'
    ],
    popular: true
  },
  {
    id: 'premium',
    name: 'Premium',
    maxQuestions: 100,
    price: 199,
    features: [
      'Up to 100 questions',
      'Premium analytics',
      'QR code generation',
      '24/7 support',
      'Custom branding',
      'API access',
      'White-label solution'
    ]
  }
];

// Default package for users who haven't purchased anything
export const NO_PACKAGE = {
  id: 'none',
  name: 'No Package',
  maxQuestions: 0,
  price: 0,
  features: []
};
