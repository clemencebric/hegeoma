import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getUserEmailAndStatus } from '../fonctions/jwtDecode';


const ClientnoncoRoute = () => {
  const userData = getUserEmailAndStatus();
  const statut = userData.statut; // statut de l'user connecté

  // Vérifier si l'utilisateur est authentifié ou non connecté
  const isAllowed = statut === 'client' || statut === null || statut === undefined;

  return isAllowed ? (
    <Outlet />
  ) : (
    <Navigate to="/erreur" replace state={{ from: window.location.pathname }} />
  );
};

export default ClientnoncoRoute;
