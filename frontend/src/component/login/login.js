import React, { useState, useContext } from 'react';
import "./login.css";
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../privateroute/authcontext';
import { post } from '../fonctions/getpost.js';
import { getUserEmailAndStatus } from '../header/statut.js';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  const expirationMessage = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage('');
      const response = await post('login', { email, password });

      if (response.token) {
        const token = response.token;
        const userEmail = response.email;

        login(token, userEmail);

        localStorage.setItem('token', token);
        const userData = getUserEmailAndStatus();
        const statut = userData.statut;
        if (statut === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setErrorMessage('Invalid credentials');
      }
    } catch (error) {
      setErrorMessage('An error occurred while processing your request.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="pageformulaire">
      <div className="formulairelogin">
        <div className="titreform">Login</div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="inputlogin"
              placeholder='Entrez votre Email'
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="inputlogin"
              placeholder='Entrez votre mot de passe'
            />
          </div>
          <button type="submit" className="btnlogin">Login</button>
          {errorMessage && <p className="messageerreur">{errorMessage}</p>}
          {expirationMessage && <p style={{ color: 'red' }}>{expirationMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
