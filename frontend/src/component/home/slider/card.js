import React from 'react';
import './card.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




const Card = ({ logo, title, content }) => (
    <div className="cardd">
        <div className='interieur'><div className='exterieur'><FontAwesomeIcon icon={logo} style={{ color: "#205883" }} size="2x" /></div></div>
        <div className='titrecard'> <h3>{title}</h3></div>
        <div className='description'><p>{content}</p></div>
    </div>
);

export default Card;
