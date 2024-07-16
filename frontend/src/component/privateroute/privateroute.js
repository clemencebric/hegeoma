import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './authcontext';

const PrivateRoute = () => {
  const { isAuthenticated, userStatus } = useContext(AuthContext); // Utiliser le contexte pour vérifier l'authentification et le statut de l'utilisateur

  // Vérifier si l'utilisateur est authentifié et a le statut "client"
  const isAllowed = isAuthenticated /*&& userStatus === 'client'*/;
  console.log(userStatus);

  return isAllowed ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: window.location.pathname }} />
  );
};

export default PrivateRoute;
