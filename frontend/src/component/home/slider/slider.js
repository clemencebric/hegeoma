// src/components/CardSlider.js
import React, { useState, useEffect } from 'react';
import './cardslider.css';
import DivAnimee from '../divAnimee/divAnimee.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const CardSlider = ({ cards }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsPerPage, setCardsPerPage] = useState(3); // Default to 3

    // Function to determine the number of cards per page based on window width
    const updateCardsPerPage = () => {
        if (window.innerWidth < 600) {
            setCardsPerPage(1);
        } else if (window.innerWidth < 853) {
            setCardsPerPage(1); // As per CSS
        } else if (window.innerWidth < 1200) {
            setCardsPerPage(2);
        } else if (window.innerWidth < 1500) {
            setCardsPerPage(3);
        } else if (window.innerWidth < 2000) {
            setCardsPerPage(4);
        } else if (window.innerWidth < 2200) {
            setCardsPerPage(5);
        } else {
            setCardsPerPage(6); // For very large screens
        }
    };

    useEffect(() => {
        window.addEventListener('resize', updateCardsPerPage);
        updateCardsPerPage(); // Initial call

        return () => window.removeEventListener('resize', updateCardsPerPage);
    }, []);

    const cardWidth = 375; // Adjust this to your card width plus margin

    const totalPages = Math.max(1, Math.ceil(cards.length / cardsPerPage)); // Calculate total pages

    const goToNext = () => {
        if (currentIndex < totalPages - 1) {
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
                className={`slider-button ${currentIndex >= totalPages - 1 ? 'disabled' : ''}`}
                disabled={currentIndex >= totalPages - 1}
            >
                <FontAwesomeIcon icon={faChevronRight} style={{ color: "#7c7c7c" }} size="3x" />
            </button>
        </div>
    );
};

export default CardSlider;
