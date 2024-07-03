// src/components/CardSlider.js
import React, { useState } from 'react';
import './cardslider.css';
import DivAnimee from '../divAnimee/divAnimee.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronRight, faChevronLeft} from "@fortawesome/free-solid-svg-icons";


const CardSlider = ({ cards }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardWidth = 300; // Adjust this to the actual width of your card

    const goToNext = () => {
        if (currentIndex < cards.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const goToPrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="slider-container">
            <button 
                onClick={goToPrevious} 
                className={`slider-button ${currentIndex === 0 ? 'disabled' : ''}`}
                disabled={currentIndex === 0}
            >
                <FontAwesomeIcon icon={faChevronLeft} style={{ color: "#7c7c7c" }} size="3x" />
            </button>
            <div className="card-container">
                <div 
                    className="card-slider" 
                    style={{ transform: `translateX(-${currentIndex * cardWidth}px)` }}
                >
                    {cards.map((card, index) => (
                        <DivAnimee key={index}>
                            <div className="card">
                                {card}
                            </div>
                        </DivAnimee>
                    ))}
                </div>
            </div>
            <button 
                onClick={goToNext} 
                className={`slider-button ${currentIndex === cards.length - 1 ? 'disabled' : ''}`}
                disabled={currentIndex === cards.length - 1}
            >
                <FontAwesomeIcon icon={faChevronRight} style={{ color: "#7c7c7c" }} size="3x" />
            </button>
        </div>
    );
};

export default CardSlider;
