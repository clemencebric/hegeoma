import React, { useContext, useState, useEffect } from 'react';
import './header.css';
import logo from './logo.png';
import { isAuthenticated, removeAuthenticationToken } from "../privateroute/authservice.js";
import { AuthContext } from '../privateroute/authcontext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import {isUserAuthorized} from "./statut.js";
import { getUserEmailAndStatus } from '../fonctions/jwtDecode.js';

const Header = () => {
  const userData = getUserEmailAndStatus();
  const { isAuthenticated: contextIsAuthenticated, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Function to toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo-container">
        <img className="logo" src={logo} alt="Hegeoma" />
      </div>
      <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          {(contextIsAuthenticated && isUserAuthorized('client')) || !contextIsAuthenticated ? (
            <>
              <li><a href="/" className={`ecritureheader ${isScrolled ? 'scrolled' : ''}`} onClick={toggleMenu}>Home</a></li>
              <li><a href="/services" className={`ecritureheader ${isScrolled ? 'scrolled' : ''}`} onClick={toggleMenu}>Service</a></li>
              <li><a href="/blog" className={`ecritureheader ${isScrolled ? 'scrolled' : ''}`} onClick={toggleMenu}>Blog</a></li>
            </>
          ) : null}
          {contextIsAuthenticated && isUserAuthorized('client')  && (
            <li><a href="/faq" className={`ecritureheader ${isScrolled ? 'scrolled' : ''}`} onClick={toggleMenu}>FAQ</a></li>
          )}
          {contextIsAuthenticated && isUserAuthorized('client') && userData.nature == "ecole" && (
            <li><a href="/schoolform" className={`ecritureheader ${isScrolled ? 'scrolled' : ''}`} onClick={toggleMenu}>SchoolForm</a></li>
          )}
          {contextIsAuthenticated && isUserAuthorized('client')  && userData.nature == "ecole" && (
            <li><a href="/userschool" className={`ecritureheader ${isScrolled ? 'scrolled' : ''}`} onClick={toggleMenu}>Ecoles</a></li>
          )}
          {contextIsAuthenticated && isUserAuthorized('client')  && userData.nature == "organisme" && (
            <li><a href="/orgform" className={`ecritureheader ${isScrolled ? 'scrolled' : ''}`} onClick={toggleMenu}>Form</a></li>
          )}
          {contextIsAuthenticated && isUserAuthorized('client')  && userData.nature == "organisme" && (
            <li><a href="/organismes" className={`ecritureheader ${isScrolled ? 'scrolled' : ''}`} onClick={toggleMenu}>Organismes</a></li>
          )}
          {contextIsAuthenticated && isUserAuthorized('admin') && (
            <li><a href="/admin" className={`ecritureheader ${isScrolled ? 'scrolled' : ''}`} onClick={toggleMenu}>Utilisateurs</a></li>
          )}
          {contextIsAuthenticated && isUserAuthorized('admin') && (
            <li><a href="/school" className={`ecritureheader ${isScrolled ? 'scrolled' : ''}`} onClick={toggleMenu}>Ecoles</a></li>
          )}
          {contextIsAuthenticated && isUserAuthorized('admin') && (
            <li><a href="/entreprises" className={`ecritureheader ${isScrolled ? 'scrolled' : ''}`} onClick={toggleMenu}>Entreprises</a></li>
          )}
          {contextIsAuthenticated && isUserAuthorized('admin') && (
            <li><a href="/ajoutfaq" className={`ecritureheader ${isScrolled ? 'scrolled' : ''}`} onClick={toggleMenu}>FAQ</a></li>
          )}
          {contextIsAuthenticated && isUserAuthorized('admin') && (
            <li><a href="/signup" className={`ecritureheader ${isScrolled ? 'scrolled' : ''}`} onClick={toggleMenu}>Creer un compte</a></li>
          )}
          {contextIsAuthenticated && isUserAuthorized('hegeoma') && (
            <li><a href="/reponse-formulaire" className={`ecritureheader ${isScrolled ? 'scrolled' : ''}`} onClick={toggleMenu}>Formulaires</a></li>
          )}
          {(contextIsAuthenticated && isUserAuthorized('client')) || !contextIsAuthenticated ? (
          <>
          <li><a href="/contact" className={`ecritureheader ${isScrolled ? 'scrolled' : ''}`} onClick={toggleMenu}>Contact</a></li>
          </>
           ) : null}
          {contextIsAuthenticated ? (
            <li><a href="#" className={`ecritureheader ${isScrolled ? 'scrolled' : ''}`} onClick={logout} >Déconnexion</a></li>
          ) : (
            <li><a href="/login" className={`ecritureheader ${isScrolled ? 'scrolled' : ''}`} onClick={toggleMenu}>Se connecter</a></li>
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
