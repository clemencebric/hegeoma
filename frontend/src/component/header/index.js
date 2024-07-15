// Header.js
import React, { useState, useEffect } from 'react';
import './header.css';
import logo from './logo.png';
import { isAuthenticated } from "../privateroute/authservice.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark,  } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [serviceLink, setServiceLink] = useState("#services");

    // Function to toggle menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    // Add resize listener on component mount


    return (
        <header className="header">
            <div className="logo-container">
                <img className="logo" src={logo} alt="Hegeoma" />
            </div>
            <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
                <ul>
                    <li><a href="/" onClick={toggleMenu}>Home</a></li>
                    <li><a href="/services" onClick={toggleMenu}>Service</a></li>
                    {isAuthenticated() && (
                      <li><a href="/faq" onClick={toggleMenu}>FAQ</a></li>
                    )}
                    <li><a href="/blog" onClick={toggleMenu}>Blog</a></li>
                    <li><a href="/contact" onClick={toggleMenu}>Contact</a></li>
                    <li><a href="/login" onClick={toggleMenu}>Se connecter</a></li>
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
