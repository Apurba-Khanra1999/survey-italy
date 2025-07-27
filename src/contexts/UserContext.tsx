
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserContextType } from '../types/survey';
import { v4 as uuidv4 } from 'uuid';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Dummy users for demo
const dummyUsers: User[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    createdAt: '2024-01-10T10:00:00Z',
    favoritesSurveys: ['survey-1'],
    completedSurveys: ['survey-4']
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    createdAt: '2024-01-15T14:30:00Z',
    favoritesSurveys: ['survey-2', 'survey-3'],
    completedSurveys: ['survey-1']
  }
];

// Helper functions for localStorage
const saveUsersToLocalStorage = (users: User[]) => {
  try {
    localStorage.setItem('surveyPro_users', JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users to localStorage:', error);
  }
};

const loadUsersFromLocalStorage = (): User[] => {
  try {
    const saved = localStorage.getItem('surveyPro_users');
    return saved ? JSON.parse(saved) : dummyUsers;
  } catch (error) {
    console.error('Error loading users from localStorage:', error);
    return dummyUsers;
  }
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize data from localStorage
  useEffect(() => {
    const savedUsers = loadUsersFromLocalStorage();
    const savedCurrentUser = localStorage.getItem('surveyPro_currentUser');
    
    setUsers(savedUsers);
    
    if (savedCurrentUser) {
      try {
        setCurrentUser(JSON.parse(savedCurrentUser));
      } catch (error) {
        console.error('Error parsing current user:', error);
      }
    }
    
    setIsInitialized(true);
  }, []);

  // Save users to localStorage whenever they change
  useEffect(() => {
    if (isInitialized && users.length > 0) {
      saveUsersToLocalStorage(users);
    }
  }, [users, isInitialized]);

  // Save current user to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      if (currentUser) {
        localStorage.setItem('surveyPro_currentUser', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('surveyPro_currentUser');
      }
    }
  }, [currentUser, isInitialized]);

  const loginUser = (email: string, password: string): User | null => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (user) {
      setCurrentUser(user);
      return user;
    }
    
    return null;
  };

  const registerUser = (name: string, email: string, password: string): string => {
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const id = uuidv4();
    const newUser: User = {
      id,
      name,
      email,
      createdAt: new Date().toISOString(),
      favoritesSurveys: [],
      completedSurveys: []
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUser(newUser);
    
    return id;
  };

  const toggleFavorite = (surveyId: string) => {
    if (!currentUser) return;

    const isFav = currentUser.favoritesSurveys.includes(surveyId);
    const updatedFavorites = isFav
      ? currentUser.favoritesSurveys.filter(id => id !== surveyId)
      : [...currentUser.favoritesSurveys, surveyId];

    const updatedUser = {
      ...currentUser,
      favoritesSurveys: updatedFavorites
    };

    setCurrentUser(updatedUser);
    
    const updatedUsers = users.map(user =>
      user.id === currentUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
  };

  const isFavorite = (surveyId: string): boolean => {
    return currentUser?.favoritesSurveys.includes(surveyId) || false;
  };

  return (
    <UserContext.Provider value={{
      currentUser,
      loginUser,
      registerUser,
      setCurrentUser,
      toggleFavorite,
      isFavorite
    }}>
      {children}
    </UserContext.Provider>
  );
};
