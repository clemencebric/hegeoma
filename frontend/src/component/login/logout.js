// Logout.js

import React from 'react';
import "./login.css"
import { useNavigate } from 'react-router-dom';
import { removeAuthenticationToken } from '../privateroute/authservice.js';

const Logout = () => {
  
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAuthenticationToken();
    localStorage.removeItem('idecole');
    navigate('/');
  };

  return (
    <div className='pageformulaire'>
      <h2>Déconnexion</h2>
      <p>Etes-vous sûr de vouloir vous déconnecter ?</p>
      <button onClick={handleLogout}>Déconnexion</button>
    </div>
  );
};

export default Logout;
