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
  const { login } = useContext(AuthContext); // Utiliser le contexte d'authentification

  // Lire le message d'expiration de la connexion depuis l'état de navigation
  const expirationMessage = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage('');
      const response = await post('login', { email, password });

      if (response.token) {
        const token = response.token;
        const userEmail = response.email;

        login(token, userEmail); // Utiliser la fonction login du contexte pour gérer le token et le statut de l'utilisateur

        localStorage.setItem('token', token); // on stocke le token
        const userData = getUserEmailAndStatus();
        const statut = userData.statut; // statut de l'user connecté
        if (statut === 'admin') {
          navigate('/admin'); // Rediriger l'utilisateur vers la page d'admin
        } else {
          navigate('/'); // Rediriger l'utilisateur vers la page d'accueil
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
      <div className="formulaire">
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
