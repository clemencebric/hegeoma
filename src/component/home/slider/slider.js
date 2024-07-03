// src/components/CardSlider.js
import React, { useState, useEffect } from 'react';
import './cardslider.css';
import DivAnimee from '../divAnimee/divAnimee.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const CardSlider = ({ cards }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsPerPage, setCardsPerPage] = useState(3); // Default to 3

    const cardWidth = 375; // Adjust this to your card width plus margin

    useEffect(() => {
        const updateCardsPerPage = () => {
            if (window.innerWidth < 853) {
                setCardsPerPage(1);
            } else if (window.innerWidth < 1200) {
                setCardsPerPage(2);
            } else if (window.innerWidth < 600) {
                setCardsPerPage(3);
                const cardWidth = 100; 
            } else {
                setCardsPerPage(3);
            }
        };

        window.addEventListener('resize', updateCardsPerPage);
        updateCardsPerPage(); // Initial call

        return () => window.removeEventListener('resize', updateCardsPerPage);
    }, []);

    const goToNext = () => {
        if (currentIndex < cards.length - cardsPerPage) {
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
                className={`slider-button ${currentIndex >= cards.length - cardsPerPage ? 'disabled' : ''}`}
                disabled={currentIndex >= cards.length - cardsPerPage}
            >
                <FontAwesomeIcon icon={faChevronRight} style={{ color: "#7c7c7c" }} size="3x" />
            </button>
        </div>
    );
};

export default CardSlider;
