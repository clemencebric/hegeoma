// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { setAuthenticationToken, removeAuthenticationToken, getAuthenticationToken } from '../privateroute/authservice.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getAuthenticationToken());

  const login = (token) => {
    setAuthenticationToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeAuthenticationToken();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    setIsAuthenticated(!!getAuthenticationToken());
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
