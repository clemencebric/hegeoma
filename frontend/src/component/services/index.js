import React from 'react';
import "./services.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faGear, faPhone, faGraduationCap, faShip, faRecycle, faPen, faCheck } from "@fortawesome/free-solid-svg-icons";

function Services() {

    const serviceDetails = [
        {
            title: "Integration",
            description: "Hegeoma prépare, installe et déploie vos Mac, iPhone ou iPad, Chromebook, PC, NAS Synology ou tablettes Android dans votre infrastructure actuelle ou à venir. Nous intégrons également en environnement hétérogène. Hegeoma peut travailler au forfait et sait s’adapter à votre budget."
        },
        {
            title: "Support",
            description: "Hegeoma peut prendre en charge le support de tout ou partie de votre parc informatique, y compris vos iPhone, iPad ou Mac, Chromebook ou tablettes Android en situation de mobilité."
        },
        {
            title: "Formation",
            description: "Vous cherchez une formation sur mesure, matérielle (Mac, iPhone, iPad) ou logicielle (OS X, iOS, intégration dans un environnement Windows sous Active Directory) ? Une formation pour un logiciel donné ? Une formation certifiante ? Hegeoma vous propose ses services en inter ou intra entreprise."
        },
        {
            title: "Mobilité et gestion de flotte",
            description: "Vous désirez gérer et déployer plus facilement votre flotte d’appareils avec un MDM ? Pour Mac, iPhone, iPad, PC, tablettes Android ou Chromebook ? Hegeoma vous accompagne."
        },
        {
            title: "Maintenance",
            description: "Vous souhaitez que quelqu’un vous conseille, assure la bonne évolution matérielle et logicielle de votre parc informatique ? Vous souhaitez faire évoluer certains Mac, iPhone, iPad, Chromebook ou PC ? Hegeoma vous propose ses services."
        },
        {
            title: "Audit et conseil",
            description: "Vous désirez un conseil indépendant ? Un audit indépendant effectué par un professionnel certifié Apple ? Vous souhaitez un audit de sécurité pour vos solutions Apple ? Hegeoma vous propose ses services."
        }
    ];

    const renderServiceRows = () => {
        const rows = [];
        for (let i = 0; i < serviceDetails.length; i += 2) {
            rows.push(
                <div className="ligne" key={i}>
                    <div className={`service ${i % 4 === 0 ? 'ligneunserviceun' : 'lignedeuxserviceun'}`}>
                        <div className='titreligne'>{serviceDetails[i].title}</div>
                        <div className='descriptionligne'>{serviceDetails[i].description}</div>
                    </div>
                    {serviceDetails[i + 1] && (
                        <div className={`service ${i % 4 === 0 ? 'ligneunservicedeux' : 'lignedeuxservicedeux'}`}>
                            <div className='titreligne'>{serviceDetails[i + 1].title}</div>
                            <div className='descriptionligne'>{serviceDetails[i + 1].description}</div>
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
                                <div className='secu'>Mise en conformité</div>
                                <div className='secu'>Firewall</div>
                                <div className='secu'>Antivirus</div>
                                <div className='secu'>Sauvegarde</div>
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
