import React, { useContext, useState } from 'react';
import './header.css';
import logo from './logo.png';
import { isAuthenticated, removeAuthenticationToken } from "../privateroute/authservice.js";
import { AuthContext } from '../privateroute/authcontext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import {isUserAuthorized} from "./statut.js";

const Header = () => {

  const { isAuthenticated: contextIsAuthenticated, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img className="logo" src={logo} alt="Hegeoma" />
      </div>
      <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          

        {(contextIsAuthenticated && isUserAuthorized('client')) || !contextIsAuthenticated ? (
            <>
              <li><a href="/" onClick={toggleMenu}>Home</a></li>
              <li><a href="/services" onClick={toggleMenu}>Service</a></li>
              <li><a href="/blog" onClick={toggleMenu}>Blog</a></li>
            </>
          ) : null}
          {contextIsAuthenticated && isUserAuthorized('client') && (
            <li><a href="/faq" onClick={toggleMenu}>FAQ</a></li>
          )}
          {contextIsAuthenticated && isUserAuthorized('client') && (
            <li><a href="/schoolform" onClick={toggleMenu}>SchoolForm</a></li>
          )}
                    
                    
          {contextIsAuthenticated && isUserAuthorized('client') && (
            <li><a href="/userschool" onClick={toggleMenu}>Ecoles</a></li>
          )}
          {contextIsAuthenticated && isUserAuthorized('admin') && (
            <li><a href="/admin" onClick={toggleMenu}>Admin</a></li>
          )}
          {contextIsAuthenticated && isUserAuthorized('admin') && (
            <li><a href="/school" onClick={toggleMenu}>Ecoles</a></li>
          )}
          {contextIsAuthenticated && isUserAuthorized('hegeoma') && (
            <li><a href="/reponse-formulaire" onClick={toggleMenu}>Formulaires</a></li>
          )}
          {(contextIsAuthenticated && isUserAuthorized('client')) || !contextIsAuthenticated ? (
          <>
          <li><a href="/contact" onClick={toggleMenu}>Contact</a></li>
          </>
           ) : null}
          {contextIsAuthenticated ? (
            <li><a href="#" onClick={logout}>Déconnexion</a></li>
          ) : (
            <li><a href="/login" onClick={toggleMenu}>Se connecter</a></li>
          )}
        </ul>
        <div className='numdecontact'>Contactez nous au <a href="tel:0683630429"> 06 83 63 04 29</a></div>
      </nav>
      <div className={`burger ${isMenuOpen ? 'hidden' : ''}`} onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} style={{ color: "#205883" }} size="2x" />
      </div>
      <div className={`croix ${isMenuOpen ? '' : 'hidden'}`} onClick={toggleMenu}>
        <FontAwesomeIcon icon={faXmark} style={{ color: "#205883" }} size="2x" />
      </div>
    </header>
  );
};


export default Header;
