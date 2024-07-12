// src/components/divAnimee.js
import React, { useEffect, useRef } from 'react';
import './divAnimee.css'; // Créez un fichier CSS pour ce composant si nécessaire

const DivAnimee = ({ children, threshold = 0.1, rootMargin = '0px 0px -50% 0px'}) => {
    const animatedDivRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animatedDivRef.current.classList.add('show');
                    }
                });
            },
            { threshold }
        );

        if (animatedDivRef.current) {
            observer.observe(animatedDivRef.current);
        }

        return () => {
            if (animatedDivRef.current) {
                observer.unobserve(animatedDivRef.current);
            }
        };
    }, [threshold]);

    return (
        <div ref={animatedDivRef} className="animated-div">
            {children}
        </div>
    );
};

export default DivAnimee;
