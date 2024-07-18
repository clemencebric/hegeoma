import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {getUserEmailAndStatus } from '../fonctions/jwtDecode';
const AdminRoute = () => {
  
  const userData = getUserEmailAndStatus();
  const statut = userData.statut; // statut de l'user connecte

  // Vérifier si l'utilisateur est authentifié et a le statut "client"
  const isAllowed =  statut === 'admin';
  //console.log(isAllowed);

  return isAllowed ? (
    <Outlet />
  ) : (
    <Navigate to="/erreur" replace state={{ from: window.location.pathname }} />
  );
};

export default AdminRoute;
