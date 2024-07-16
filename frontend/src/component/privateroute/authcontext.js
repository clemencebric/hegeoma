// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { setAuthenticationToken, removeAuthenticationToken, getAuthenticationToken } from '../privateroute/authservice.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getAuthenticationToken());
  const [userStatus, setUserStatus] = useState(null);

  const login = (token, status) => {
    setAuthenticationToken(token);
    setIsAuthenticated(true);
    setUserStatus(status);
  };

  const logout = () => {
    removeAuthenticationToken();
    setIsAuthenticated(false);
    setUserStatus(null);
  };

  useEffect(() => {
    setIsAuthenticated(!!getAuthenticationToken());
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
