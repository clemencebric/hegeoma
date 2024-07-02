import React, { useEffect, useState } from 'react';
import './home.css';

const Typewriter = ({ text, duration = 3500 }) => {
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    // Enveloppe chaque lettre dans un `span`
    const spans = text.split('').map((char, index) => (
      <span key={index} style={{ animationDelay: `${index * (duration / text.length)}ms` }}>
        {char}
      </span>
    ));
    setLetters(spans);
  }, [text, duration]);

  return <div className="typewriter">{letters}</div>;
};

export default Typewriter;
