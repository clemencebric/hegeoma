// src/components/ServiceList.js
import React from 'react';
import './tableau.css';

const ServiceList = ({ services }) => {
    return (
        <div className="service-list">
            {services.map((service, index) => (
                <div key={index} className="service-item">
                    <div className="service-title">{service.title}</div>
                    <div className="service-link">
                        <a href="#more-info" className="info-link">Voir plus</a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ServiceList;
