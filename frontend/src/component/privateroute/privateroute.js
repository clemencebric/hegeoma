import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './authcontext';

const PrivateRoute = () => {
  const { isAuthenticated } = useContext(AuthContext); // Utiliser le contexte pour vérifier l'authentification

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: window.location.pathname }} />
  );
};

export default PrivateRoute;
