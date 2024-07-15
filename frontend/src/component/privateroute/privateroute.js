// PrivateRoute.js

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from './authservice.js';

const PrivateRoute = () => {
  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: window.location.pathname }} />
  );
};

export default PrivateRoute;
