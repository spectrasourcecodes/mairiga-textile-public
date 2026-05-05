import React, { createContext, useContext, useState } from 'react';
import { user as mockUser, loginUser, logoutUser, updateUser } from '../mock/user';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(mockUser);

  const login = (email, password) => {
    const success = loginUser(email, password);
    if (success) {
      setUser({ ...mockUser, isAuthenticated: true, email });
      return true;
    }
    return false;
  };

  const logout = () => {
    logoutUser();
    setUser({ ...mockUser, isAuthenticated: false });
  };

  const updateProfile = (userData) => {
    updateUser(userData);
    setUser({ ...user, ...userData });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};