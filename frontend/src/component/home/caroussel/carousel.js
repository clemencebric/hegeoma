import React, { useState } from 'react';
import './carousel.css'; // Assurez-vous d'avoir un fichier CSS pour le style

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === items.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="carousel">
      <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {items.map((item, index) => (
          <div className="carousel-item" key={index}>
            <img src={item.image} alt={item.alt} />
            <p>{item.caption}</p>
          </div>
        ))}
      </div>
      <button className="left-arrow" onClick={goToPrevious}>
        ❮
      </button>
      <button className="right-arrow" onClick={goToNext}>
        ❯
      </button>
    </div>
  );
};

export default Carousel;
