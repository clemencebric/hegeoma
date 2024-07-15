// AuthContext.js

import React, { createContext, useState } from 'react';
import { isAuthenticated, setAuthenticationToken, removeAuthenticationToken } from './authservice.js';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(isAuthenticated());

  const login = (token) => {
    setAuthenticationToken(token);
    setIsAuthenticatedState(true);
  };

  const logout = () => {
    removeAuthenticationToken();
    setIsAuthenticatedState(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: isAuthenticatedState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
