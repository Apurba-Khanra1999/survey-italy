import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Survey, Company, SurveyResponse } from '../types/survey';
import { v4 as uuidv4 } from 'uuid';

interface SurveyContextType {
  surveys: Survey[];
  companies: Company[];
  currentCompany: Company | null;
  addSurvey: (survey: Omit<Survey, 'id' | 'createdAt' | 'responses'>) => string;
  updateSurvey: (id: string, updates: Partial<Survey>) => void;
  getSurvey: (id: string) => Survey | undefined;
  addCompany: (company: Omit<Company, 'id' | 'createdAt' | 'surveys'>) => string;
  setCurrentCompany: (company: Company | null) => void;
  addResponse: (response: Omit<SurveyResponse, 'id' | 'completedAt'>) => void;
  getCompanyStats: (companyId: string) => { totalSurveys: number; totalResponses: number; totalRewardsPaid: number };
  loginCompany: (email: string, password: string) => Company | null;
  registerCompany: (name: string, email: string, password: string, subscription: string) => string;
}

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
};

// Dummy data
const dummyCompanies: Company[] = [
  {
    id: 'comp-1',
    name: 'TechCorp Solutions',
    email: 'admin@techcorp.com',
    subscription: 'premium',
    surveys: ['survey-1', 'survey-2'],
    createdAt: '2024-01-15T08:30:00Z'
  },
  {
    id: 'comp-2',
    name: 'Marketing Plus',
    email: 'team@marketingplus.com',
    subscription: 'standard',
    surveys: ['survey-3'],
    createdAt: '2024-02-20T14:15:00Z'
  },
  {
    id: 'comp-3',
    name: 'Startup Ventures',
    email: 'hello@startupventures.com',
    subscription: 'basic',
    surveys: ['survey-4'],
    createdAt: '2024-03-10T10:45:00Z'
  }
];

const dummySurveys: Survey[] = [
  {
    id: 'survey-1',
    title: 'Customer Satisfaction Survey 2024',
    description: 'Help us understand how we can better serve our customers and improve our products and services.',
    companyId: 'comp-1',
    companyName: 'TechCorp Solutions',
    packageType: 'premium',
    maxQuestions: 50,
    rewardPerResponse: 5,
    isActive: true,
    createdAt: '2024-01-15T09:00:00Z',
    questions: [
      {
        id: 'q1',
        type: 'rating',
        question: 'How satisfied are you with our overall service?',
        options: ['Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'],
        required: true
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'Which of our products do you use most frequently?',
        options: ['Web Platform', 'Mobile App', 'API Services', 'Desktop Software'],
        required: true
      },
      {
        id: 'q3',
        type: 'text',
        question: 'What improvements would you like to see in our products?',
        required: false
      },
      {
        id: 'q4',
        type: 'boolean',
        question: 'Would you recommend our services to others?',
        required: true
      }
    ],
    responses: [
      {
        id: 'resp-1',
        surveyId: 'survey-1',
        userId: 'user-1',
        answers: {
          'q1': 'Satisfied',
          'q2': 'Web Platform',
          'q3': 'Better mobile integration',
          'q4': 'yes'
        },
        completedAt: '2024-01-16T14:30:00Z',
        rewardClaimed: true
      },
      {
        id: 'resp-2',
        surveyId: 'survey-1',
        userId: 'user-2',
        answers: {
          'q1': 'Very Satisfied',
          'q2': 'Mobile App',
          'q3': 'More customization options',
          'q4': 'yes'
        },
        completedAt: '2024-01-17T11:15:00Z',
        rewardClaimed: true
      }
    ]
  },
  {
    id: 'survey-2',
    title: 'Product Feature Feedback',
    description: 'Share your thoughts on our new features and help us prioritize future development.',
    companyId: 'comp-1',
    companyName: 'TechCorp Solutions',
    packageType: 'premium',
    maxQuestions: 50,
    rewardPerResponse: 3,
    isActive: true,
    createdAt: '2024-02-01T13:20:00Z',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'Which new feature interests you most?',
        options: ['AI Assistant', 'Advanced Analytics', 'Team Collaboration', 'API Improvements'],
        required: true
      },
      {
        id: 'q2',
        type: 'rating',
        question: 'How important is mobile optimization to you?',
        options: ['Not Important', 'Slightly Important', 'Moderately Important', 'Very Important', 'Extremely Important'],
        required: true
      },
      {
        id: 'q3',
        type: 'text',
        question: 'What other features would you like to see?',
        required: false
      }
    ],
    responses: [
      {
        id: 'resp-3',
        surveyId: 'survey-2',
        userId: 'user-3',
        answers: {
          'q1': 'AI Assistant',
          'q2': 'Very Important',
          'q3': 'Better reporting tools'
        },
        completedAt: '2024-02-02T09:45:00Z',
        rewardClaimed: true
      }
    ]
  },
  {
    id: 'survey-3',
    title: 'Brand Awareness Study',
    description: 'Help us understand market perception and brand recognition in your industry.',
    companyId: 'comp-2',
    companyName: 'Marketing Plus',
    packageType: 'standard',
    maxQuestions: 30,
    rewardPerResponse: 4,
    isActive: true,
    createdAt: '2024-02-20T15:00:00Z',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'How did you first hear about our company?',
        options: ['Social Media', 'Search Engine', 'Word of Mouth', 'Advertisement', 'Other'],
        required: true
      },
      {
        id: 'q2',
        type: 'rating',
        question: 'How would you rate our brand compared to competitors?',
        options: ['Much Worse', 'Worse', 'About the Same', 'Better', 'Much Better'],
        required: true
      },
      {
        id: 'q3',
        type: 'boolean',
        question: 'Are you likely to continue using our services?',
        required: true
      }
    ],
    responses: []
  },
  {
    id: 'survey-4',
    title: 'Market Research Survey',
    description: 'Quick survey to understand consumer preferences and market trends.',
    companyId: 'comp-3',
    companyName: 'Startup Ventures',
    packageType: 'basic',
    maxQuestions: 10,
    rewardPerResponse: 2,
    isActive: true,
    createdAt: '2024-03-10T11:00:00Z',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'What is your primary age group?',
        options: ['18-25', '26-35', '36-45', '46-55', '56+'],
        required: true
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'Which industry do you work in?',
        options: ['Technology', 'Healthcare', 'Finance', 'Education', 'Other'],
        required: true
      },
      {
        id: 'q3',
        type: 'text',
        question: 'What challenges do you face in your daily work?',
        required: false
      }
    ],
    responses: [
      {
        id: 'resp-4',
        surveyId: 'survey-4',
        userId: 'user-4',
        answers: {
          'q1': '26-35',
          'q2': 'Technology',
          'q3': 'Managing multiple projects efficiently'
        },
        completedAt: '2024-03-11T16:20:00Z',
        rewardClaimed: true
      },
      {
        id: 'resp-5',
        surveyId: 'survey-4',
        userId: 'user-5',
        answers: {
          'q1': '36-45',
          'q2': 'Finance',
          'q3': 'Keeping up with regulatory changes'
        },
        completedAt: '2024-03-12T10:30:00Z',
        rewardClaimed: true
      }
    ]
  }
];

// Helper functions for localStorage
const saveToLocalStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    console.log(`Saved ${key} to localStorage:`, data);
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

const loadFromLocalStorage = (key: string, defaultValue: any = null) => {
  try {
    const saved = localStorage.getItem(key);
    const parsed = saved ? JSON.parse(saved) : defaultValue;
    console.log(`Loaded ${key} from localStorage:`, parsed);
    return parsed;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

export const SurveyProvider = ({ children }: { children: ReactNode }) => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [currentCompany, setCurrentCompany] = useState<Company | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize data from localStorage or dummy data
  useEffect(() => {
    console.log('Initializing data from localStorage...');
    
    let savedSurveys = loadFromLocalStorage('surveyPro_surveys');
    let savedCompanies = loadFromLocalStorage('surveyPro_companies');
    const savedCurrentCompany = loadFromLocalStorage('surveyPro_currentCompany');

    // Initialize with dummy data if no saved data exists
    if (!savedSurveys || savedSurveys.length === 0) {
      console.log('No saved surveys found, using dummy data');
      savedSurveys = dummySurveys;
      saveToLocalStorage('surveyPro_surveys', dummySurveys);
    }

    if (!savedCompanies || savedCompanies.length === 0) {
      console.log('No saved companies found, using dummy data');
      savedCompanies = dummyCompanies;
      saveToLocalStorage('surveyPro_companies', dummyCompanies);
    }

    setSurveys(savedSurveys);
    setCompanies(savedCompanies);
    
    if (savedCurrentCompany) {
      console.log('Restoring current company:', savedCurrentCompany);
      setCurrentCompany(savedCurrentCompany);
    }
    
    setIsInitialized(true);
  }, []);

  // Save surveys to localStorage whenever they change (after initialization)
  useEffect(() => {
    if (isInitialized && surveys.length > 0) {
      console.log('Saving surveys to localStorage');
      saveToLocalStorage('surveyPro_surveys', surveys);
    }
  }, [surveys, isInitialized]);

  // Save companies to localStorage whenever they change (after initialization)
  useEffect(() => {
    if (isInitialized && companies.length > 0) {
      console.log('Saving companies to localStorage');
      saveToLocalStorage('surveyPro_companies', companies);
    }
  }, [companies, isInitialized]);

  // Save current company to localStorage whenever it changes (after initialization)
  useEffect(() => {
    if (isInitialized) {
      if (currentCompany) {
        console.log('Saving current company to localStorage:', currentCompany);
        saveToLocalStorage('surveyPro_currentCompany', currentCompany);
      } else {
        console.log('Removing current company from localStorage');
        localStorage.removeItem('surveyPro_currentCompany');
      }
    }
  }, [currentCompany, isInitialized]);

  const loginCompany = (email: string, password: string): Company | null => {
    console.log('Attempting login for email:', email);
    console.log('Available companies:', companies.map(c => ({ id: c.id, email: c.email, name: c.name })));
    
    // For demo purposes, we're not actually checking passwords
    // In a real app, you'd verify the password hash
    const company = companies.find(c => c.email.toLowerCase() === email.toLowerCase());
    
    if (company) {
      console.log('Login successful for company:', company);
      setCurrentCompany(company);
      return company;
    } else {
      console.log('No company found with email:', email);
      return null;
    }
  };

  const registerCompany = (name: string, email: string, password: string, subscription: string): string => {
    console.log('Attempting registration:', { name, email, subscription });
    
    // Check if company already exists
    const existingCompany = companies.find(c => c.email.toLowerCase() === email.toLowerCase());
    if (existingCompany) {
      console.log('Company already exists with email:', email);
      throw new Error('Company with this email already exists');
    }

    const id = uuidv4();
    const newCompany: Company = {
      id,
      name,
      email,
      subscription: subscription as 'basic' | 'standard' | 'premium' | 'none',
      surveys: [],
      createdAt: new Date().toISOString()
    };

    console.log('Creating new company:', newCompany);
    
    const updatedCompanies = [...companies, newCompany];
    setCompanies(updatedCompanies);
    setCurrentCompany(newCompany);
    
    return id;
  };

  const addSurvey = (surveyData: Omit<Survey, 'id' | 'createdAt' | 'responses'>) => {
    const id = uuidv4();
    const newSurvey: Survey = {
      ...surveyData,
      id,
      createdAt: new Date().toISOString(),
      responses: []
    };
    
    const updatedSurveys = [...surveys, newSurvey];
    setSurveys(updatedSurveys);
    
    // Update company's surveys list
    const updatedCompanies = companies.map(company => 
      company.id === surveyData.companyId 
        ? { ...company, surveys: [...company.surveys, id] }
        : company
    );
    setCompanies(updatedCompanies);
    
    return id;
  };

  const updateSurvey = (id: string, updates: Partial<Survey>) => {
    const updatedSurveys = surveys.map(survey => 
      survey.id === id ? { ...survey, ...updates } : survey
    );
    setSurveys(updatedSurveys);
  };

  const getSurvey = (id: string) => {
    return surveys.find(survey => survey.id === id);
  };

  const addCompany = (companyData: Omit<Company, 'id' | 'createdAt' | 'surveys'>) => {
    const id = uuidv4();
    const newCompany: Company = {
      ...companyData,
      id,
      createdAt: new Date().toISOString(),
      surveys: []
    };
    
    const updatedCompanies = [...companies, newCompany];
    setCompanies(updatedCompanies);
    return id;
  };

  const addResponse = (responseData: Omit<SurveyResponse, 'id' | 'completedAt'>) => {
    const response: SurveyResponse = {
      ...responseData,
      id: uuidv4(),
      completedAt: new Date().toISOString()
    };

    const updatedSurveys = surveys.map(survey => 
      survey.id === responseData.surveyId 
        ? { ...survey, responses: [...survey.responses, response] }
        : survey
    );
    setSurveys(updatedSurveys);
  };

  const getCompanyStats = (companyId: string) => {
    const companySurveys = surveys.filter(s => s.companyId === companyId);
    const totalSurveys = companySurveys.length;
    const totalResponses = companySurveys.reduce((acc, survey) => acc + survey.responses.length, 0);
    const totalRewardsPaid = companySurveys.reduce((acc, survey) => 
      acc + (survey.responses.length * survey.rewardPerResponse), 0
    );

    return { totalSurveys, totalResponses, totalRewardsPaid };
  };

  return (
    <SurveyContext.Provider value={{
      surveys,
      companies,
      currentCompany,
      addSurvey,
      updateSurvey,
      getSurvey,
      addCompany,
      setCurrentCompany,
      addResponse,
      getCompanyStats,
      loginCompany,
      registerCompany
    }}>
      {children}
    </SurveyContext.Provider>
  );
};
