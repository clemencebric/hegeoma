// UserList.js
import React, { useState, useEffect } from 'react';
import {getUserEmailAndStatus } from "./../fonctions/jwtDecode"
import { post } from '../fonctions/getpost';
import "../login/login.css"
function Status() {
    const [user, setUser] = useState({ email: null, statut: null });
  
    useEffect(() => {
      const userData = getUserEmailAndStatus();
      console.log(userData)
      setUser(userData);
    }, []);
  
    return (
      <div className='pageformulaire'>
        <h1>Profile</h1>
        {user.email && <p>Email: {user.email}</p>}
        {user.statut && <p>Statut: {user.statut}</p>}
      </div>
    );
  }
  
  export default Status;