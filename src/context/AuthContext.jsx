import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // We can't use the useToast hook directly here since it's a provider component
  // We'll create methods that accept toast functions as parameters
  
  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authAPI.getProfile()
        .then(response => {
          setUser(response.data);
        })
        .catch(err => {
          console.error('Error fetching user profile:', err);
          localStorage.removeItem('token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials, showSuccessToast, showErrorToast) => {
    try {
      setError(null);
      const response = await authAPI.login(credentials);
      localStorage.setItem('token', response.data.token);
      const userResponse = await authAPI.getProfile();
      setUser(userResponse.data);
      
      // Show success toast if function was provided
      if (showSuccessToast) {
        showSuccessToast(`Welcome back, ${userResponse.data.name || 'user'}!`);
      }
      
      return userResponse.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      
      // Show error toast if function was provided
      if (showErrorToast) {
        showErrorToast(errorMessage);
      }
      
      throw err;
    }
  };

  const register = async (userData, showSuccessToast, showErrorToast) => {
    try {
      setError(null);
      const response = await authAPI.register(userData);
      localStorage.setItem('token', response.data.token);
      const userResponse = await authAPI.getProfile();
      setUser(userResponse.data);
      
      // Show success toast if function was provided
      if (showSuccessToast) {
        showSuccessToast(`Welcome, ${userResponse.data.name || 'new user'}!`);
      }
      
      return userResponse.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      
      // Show error toast if function was provided
      if (showErrorToast) {
        showErrorToast(errorMessage);
      }
      
      throw err;
    }
  };

  const logout = (showSuccessToast) => {
    localStorage.removeItem('token');
    setUser(null);
    
    // Show success toast if function was provided
    if (showSuccessToast) {
      showSuccessToast('Logged out successfully');
    }
  };

  const updateProfile = async (profileData, showSuccessToast, showErrorToast) => {
    try {
      setError(null);
      const response = await authAPI.updateProfile(profileData);
      setUser(response.data);
      
      // Show success toast if function was provided
      if (showSuccessToast) {
        showSuccessToast('Profile updated successfully');
      }
      
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Profile update failed';
      setError(errorMessage);
      
      // Show error toast if function was provided
      if (showErrorToast) {
        showErrorToast(errorMessage);
      }
      
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 