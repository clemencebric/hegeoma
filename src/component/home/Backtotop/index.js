import React from 'react';
import './backtotop.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";


const BackToTop = () => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button className= "boutonbacktotop" onClick={handleClick}><FontAwesomeIcon icon={faArrowUp} style={{ color: "#ffffff" }} size="2x" /></button>
  );
};

export default BackToTop;
