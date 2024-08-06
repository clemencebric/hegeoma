import React from 'react';
import "./services.css";

import integrationImage from "../../images/pexels-morningtrain-18105.jpg";
import supportImage from "../../images/ordifondnoiretblanc.jpg";
import formationImage from "../../images/laptop-2557574.jpg";
import mobiliteImage from "../../images/pexels-fauxels-3184451.jpg";
import maintenanceImage from "../../images/pexels-brett-sayles-1869322.jpg";
import auditImage from "../../images/pexels-jourdan-wee-2023410-3644098.jpg";

function Services() {
    const serviceDetails = [
        {
            title: "Integration",
            description: "Hegeoma prépare, installe et déploie vos Mac, iPhone ou iPad, Chromebook, PC, NAS Synology ou tablettes Android dans votre infrastructure actuelle ou à venir. Nous intégrons également en environnement hétérogène. Hegeoma peut travailler au forfait et sait s’adapter à votre budget.",
            backgroundImage: integrationImage
        },
        {
            title: "Support",
            description: "Hegeoma peut prendre en charge le support de tout ou partie de votre parc informatique, y compris vos iPhone, iPad ou Mac, Chromebook ou tablettes Android en situation de mobilité.",
            backgroundImage: supportImage
        },
        {
            title: "Formation",
            description: "Vous cherchez une formation sur mesure, matérielle (Mac, iPhone, iPad) ou logicielle (OS X, iOS, intégration dans un environnement Windows sous Active Directory) ? Une formation pour un logiciel donné ? Une formation certifiante ? Hegeoma vous propose ses services en inter ou intra entreprise.",
            backgroundImage: formationImage
        },
        {
            title: "Mobilité et gestion de flotte",
            description: "Vous désirez gérer et déployer plus facilement votre flotte d’appareils avec un MDM ? Pour Mac, iPhone, iPad, PC, tablettes Android ou Chromebook ? Hegeoma vous accompagne.",
            backgroundImage: mobiliteImage
        },
        {
            title: "Maintenance",
            description: "Vous souhaitez que quelqu’un vous conseille, assure la bonne évolution matérielle et logicielle de votre parc informatique ? Vous souhaitez faire évoluer certains Mac, iPhone, iPad, Chromebook ou PC ? Hegeoma vous propose ses services.",
            backgroundImage: maintenanceImage
        },
        {
            title: "Audit et conseil",
            description: "Vous désirez un conseil indépendant ? Un audit indépendant effectué par un professionnel certifié Apple ? Vous souhaitez un audit de sécurité pour vos solutions Apple ? Hegeoma vous propose ses services.",
            backgroundImage: auditImage
        }
    ];

    const renderServiceRows = () => {
        const rows = [];
        for (let i = 0; i < serviceDetails.length; i += 2) {
            rows.push(
                <div className="ligne" key={i}>
                    <div className="service" style={{ backgroundImage: `url(${serviceDetails[i].backgroundImage})` }}>
                        <div className='grostitre'>{serviceDetails[i].title}</div>
                        <div className='fondtexte'>
                            <div className='titreligne'>{serviceDetails[i].title}</div>
                            <div className='descriptionligne'>{serviceDetails[i].description}</div>
                        </div>
                    </div>
                    {serviceDetails[i + 1] && (
                        <div className="service" style={{ backgroundImage: `url(${serviceDetails[i + 1].backgroundImage})` }}>
                            <div className='grostitre'>{serviceDetails[i + 1].title}</div>
                            <div className='fondtexte'>
                                <div className='titreligne'>{serviceDetails[i + 1].title}</div>
                                <div className='descriptionligne'>{serviceDetails[i + 1].description}</div>
                            </div>
                        </div>
                    )}
                </div>
            );
        }
        return rows;
    };

    return (
        <div className="arc-background">
            <div className="content">
                <div className="pagesservice">
                    <div className='pagesecurite'>
                        <div className='pagesecuriteinterieur'>
                            <div className='espaceheader'></div>
                            <div className='nosservicesheader'>NOS SERVICES</div>
                            <div className='divsecu'>
                                <div className='titresecurite titreligne'>Securite</div>
                                <div className='descritionsecurite'>
                                    <div className='descriptionligne'>bonjour je suis la description de la securité...</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='pagenouveauxservices'>
                        {renderServiceRows()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Services;
