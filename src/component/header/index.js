// Header.js
import React, { useState, useEffect } from 'react';
import './header.css';
import logo from './logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [serviceLink, setServiceLink] = useState("#services");

    // Function to toggle menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Function to handle resizing
    const handleResize = () => {
        if (window.innerWidth <= 600) {
            setServiceLink("#servicestel");
        } else {
            setServiceLink("#services");
        }
    };

    // Add resize listener on component mount
    useEffect(() => {
        handleResize(); // Check size on mount
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header className="header">
            <div className="logo-container">
                <img className="logo" src={logo} alt="Hegeoma" />
            </div>
            <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
                <ul>
                    <li><a href="/" onClick={toggleMenu}>Home</a></li>
                    <li><a href={serviceLink} onClick={toggleMenu}>Service</a></li>
                    <li><a href="#blog" onClick={toggleMenu}>Blog</a></li>
                    <li><a href="/contact" onClick={toggleMenu}>Contact</a></li>
                </ul>
                <div className='numdecontact'>Contactez nous au 06 83 63 04 29</div>
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
