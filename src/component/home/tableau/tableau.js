// src/components/ServiceList.js
import React, { useState } from 'react';
import './tableau.css';

const ServiceList = ({ services }) => {
    const [openServiceIndex, setOpenServiceIndex] = useState(null);

    const toggleService = (index) => {
        if (openServiceIndex === index) {
            setOpenServiceIndex(null);
        } else {
            setOpenServiceIndex(index);
        }
    };

    return (
        <div className="service-list">
            {services.map((service, index) => (
                <div key={index} className="service-item-container">
                    <div className="service-item">
                        <div className="service-title">{service.title}</div>
                        <div className="service-link">
                            <button onClick={() => toggleService(index)} className="info-link">
                                Voir plus
                            </button>
                        </div>
                    </div>
                    {openServiceIndex === index && (
                        <div className="service-description">
                            <div className="description-content">
                                Contenu détaillé pour {service.title}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ServiceList;
