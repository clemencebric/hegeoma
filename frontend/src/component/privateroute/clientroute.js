import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {getUserEmailAndStatus } from '../fonctions/jwtDecode';
const ClientRoute = () => {
  
  const userData = getUserEmailAndStatus();
  const statut = userData.statut; // statut de l'user connecte

  // Vérifier si l'utilisateur est authentifié et a le statut "client"
  const isAllowed =  statut === 'client';
  console.log(isAllowed);

  return isAllowed ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: window.location.pathname }} />
  );
};

export default ClientRoute;
