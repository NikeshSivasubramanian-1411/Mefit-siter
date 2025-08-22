import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isContributor: boolean;
  isAdmin: boolean;
  hasProfile: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id' | 'hasProfile'> & { password: string }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('mefit_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Mock authentication - in real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'admin@mefit.com' && password === 'admin123') {
      const userData = {
        id: '1',
        email,
        firstName: 'Admin',
        lastName: 'User',
        isContributor: true,
        isAdmin: true,
        hasProfile: true
      };
      setUser(userData);
      localStorage.setItem('mefit_user', JSON.stringify(userData));
    } else if (email === 'contributor@mefit.com' && password === 'contrib123') {
      const userData = {
        id: '2',
        email,
        firstName: 'Contributor',
        lastName: 'User',
        isContributor: true,
        isAdmin: false,
        hasProfile: true
      };
      setUser(userData);
      localStorage.setItem('mefit_user', JSON.stringify(userData));
    } else if (email === 'user@mefit.com' && password === 'user123') {
      const userData = {
        id: '3',
        email,
        firstName: 'Regular',
        lastName: 'User',
        isContributor: false,
        isAdmin: false,
        hasProfile: true
      };
      setUser(userData);
      localStorage.setItem('mefit_user', JSON.stringify(userData));
    } else {
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };

  const register = async (userData: Omit<User, 'id' | 'hasProfile'> & { password: string }) => {
    setIsLoading(true);
    
    // Mock registration
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      isContributor: userData.isContributor,
      isAdmin: userData.isAdmin,
      hasProfile: false // New users need to create profile
    };
    
    setUser(newUser);
    localStorage.setItem('mefit_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mefit_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};