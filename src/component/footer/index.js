// Footer.js
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faSquareFacebook} from "@fortawesome/free-brands-svg-icons";
import './footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            
            <div className='informations'>
            <p className="footer-text">
                Contactez-nous au :<br/>  06 83 63 04 29
            </p>
            </div>
            <div className='reseaux'>
                <div className='titrereseau'>Nos réseaux :</div>
            <div className='reseau'>
                <div className='logoreseau'><FontAwesomeIcon icon={faLinkedin} style={{ color: "#ffffff" }} size="2x" /></div>
                <div className='descreseau'>bonjour</div>
            </div>
            <div className='reseau'>
                <div className='logoreseau'><FontAwesomeIcon icon={faSquareFacebook} style={{ color: "#ffffff" }} size="2x" /></div>
                <div className='descreseau'>au revoir</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
