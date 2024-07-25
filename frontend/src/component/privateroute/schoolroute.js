import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../privateroute/authcontext';
import {jwtDecode} from 'jwt-decode';

const SchoolRoute = () => {
const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const nature = decodedToken.nature;
    // Vérifier si l'utilisateur a la nature "école"
    const isAllowed = nature === 'ecole';
    return isAllowed ? <Outlet /> : <Navigate to="/erreur" replace />;
  } catch (error) {
    console.error('Token decoding error:', error);
    return <Navigate to="/erreur" replace />;
  }
};

export default SchoolRoute;
