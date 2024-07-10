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
                <a className='lien' href="/contact">Contactez-nous par message<br/></a>  <a className="lien" href="tel:0683630429">ou au : 06 83 63 04 29</a>
            </p>

            </div>
            <div>
            <p >
                <a className='lien' href='/mentionslegales'>Mentions légales</a>
            </p>
            </div>
            <div className='reseaux'>
                <div className='titrereseau'>Nos réseaux :</div>
                <div className='reseau'>
                    <div className='logoreseau'><a className='icons' href="https://fr.linkedin.com/company/hegeoma"><FontAwesomeIcon icon={faLinkedin} style={{ color: "#ffffff" }} size="2x" /></a></div>
                    <div className='logoreseau'><a className='icons' href="https://www.facebook.com/hegeoma/"><FontAwesomeIcon icon={faSquareFacebook} style={{ color: "#ffffff" }} size="2x" /></a></div>
                </div></div>

        </footer>
    );
};

export default Footer;
