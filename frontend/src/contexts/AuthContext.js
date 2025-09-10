import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      console.log('AuthContext: Attempting login with:', username);
      const response = await authAPI.login(username, password);
      console.log('AuthContext: API response:', response);
      
      if (response.success) {
        // Create a mock employee object for the user
        const userWithEmployee = {
          ...response.user,
          employee: {
            id: response.user.id,
            name: 'John Doe',
            designation: 'Software Engineer',
            department: 'Engineering',
            joinDate: '2023-01-15'
          }
        };
        
        console.log('AuthContext: Setting user:', userWithEmployee);
        setUser(userWithEmployee);
        localStorage.setItem('user', JSON.stringify(userWithEmployee));
        return { success: true };
      } else {
        console.log('AuthContext: Login failed:', response.message);
        return { success: false, error: response.message || 'Login failed' };
      }
    } catch (error) {
      console.error('AuthContext: Login error:', error);
      return { success: false, error: error.message || 'Network error occurred' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 