// Header.js
import React, { useState } from 'react';
import './header.css';
import logo from './logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            <div className="header-logo">
                <div className="header-title">Contacter au <br /> 06 06 06 06 06</div>
            </div>
            <img className="logo" src={logo} alt="Hegeoma" />
            <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
               <div className='menu'>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">Service</a></li>
                    <li><a href="#services">Blog</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                </div>
            </nav>
            <div className='burger' onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars} style={{ color: "#205883" }} size="2x" />
            </div>
            <div className='croix' onClick={toggleMenu}>
                <FontAwesomeIcon icon={faXmark} style={{ color: "#205883" }} size="2x" />
            </div>
        </header>
    );
};

export default Header;
