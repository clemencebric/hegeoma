import React from 'react';
import "./services.css"
import CardSlider from "../../component/home/slider/slider.js";
import Card from '../home/slider/card.js';
import ServiceList from '../home/tableau/tableau.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faGear, faPhone, faGraduationCap, faShip, faRecycle, faPen, faCheck } from "@fortawesome/free-solid-svg-icons";

function Services() {
    const cards = [
        <Card logo={faGear} title="Integration" content="Hegeoma prépare, installe et déploie vos Mac, iPhone ou iPad, Chromebook, PC, NAS Synology ou tablettes Android dans votre infrastructure actuelle ou à venir. Nous intégrons également en environnement hétérogène. Hegeoma peut travailler au forfait et sait s’adapter à votre budget." />,
        <Card logo={faPhone} title="Support" content="Hegeoma peut prendre en charge le support de tout ou partie de votre parc informatique, y compris vos iPhone, iPad ou Mac, Chromebook ou tablettes Android en situation de mobilité." />,
        <Card logo={faGraduationCap} title="Formation" content="Vous cherchez une formation sur mesure, matérielle (Mac, iPhone, iPad) ou logicielle (OS X, iOS, intégration dans un environnement Windows sous Active Directory) ? Une formation pour un logiciel donné ? Une formation certifiante ? Hegeoma vous propose ses services en inter ou intra entreprise." />,
        <Card logo={faShip} title="Mobilité et gestion de flotte (MDM)" content="Vous désirez gérer et déployer plus facilement votre flotte d’appareils avec un MDM ? Pour Mac, iPhone, iPad, PC, tablettes Android ou Chromebook ? Hegeoma vous accompagne." />,
        <Card logo={faRecycle} title="Maintenance" content="Vous souhaitez que quelqu’un vous conseille, assure la bonne évolution matérielle et logicielle de votre parc informatique ? Vous souhaitez faire évoluer certains Mac, iPhone, iPad, Chromebook ou PC ? Hegeoma vous propose ses services." />,
        <Card logo={faPen} title="Audit et conseil" content="Vous désirez un conseil indépendant ? Un audit indépendant effectué par un professionnel certifié Apple ? Vous souhaitez un audit de sécurité pour vos solutions Apple ? Hegeoma vous propose ses services." />,
    ];
    const services = [
        { title: "Intégration" },
        { title: "Support" },
        { title: "Formation" },
        { title: "Mobilité & Gestion de flotte" },
        { title: "Maintenance" },
        { title: "Audit & Conseil" }
    ];
  return (
    <div className="pagesservice">
        <div className='page2' id="services">
            <CardSlider cards={cards} />
        </div>
        <div className='page2tel' id="servicestel">
            <div className='titreservices'>NOS SERVICES : </div>
            <div><ServiceList services={services} /></div>
        </div>
        <div className='pagesecurite'>
            <div className='pagesecuriteinterieur'>
                <div className='titresecurite titreligne'>Securite</div>
                <div className='descritionsecurite'>
                        <div className='secu'>Mise en conformité</div>
                        <div className='secu'>Firewall</div>
                        <div className='secu'>Antivirus</div>
                        <div className='secu'>Sauvegarde</div>
                </div>
            </div>
        </div>
        <div className='pagenouveauxservices'>
            <div className='ligne ligneun'>
                <div className='service ligneunserviceun'>
                    <div className='titreligne'>Integration</div>
                    <div className='descriptionligne'>Hegeoma prépare, installe et déploie vos Mac, iPhone ou iPad, Chromebook, PC, NAS Synology ou tablettes Android dans votre infrastructure actuelle ou à venir. Nous intégrons également en environnement hétérogène. Hegeoma peut travailler au forfait et sait s’adapter à votre budget.</div>
                </div>
                <div className='service ligneunservicedeux'>
                    <div className='titreligne'> Support</div>
                    <div className='descriptionligne'>Hegeoma peut prendre en charge le support de tout ou partie de votre parc informatique, y compris vos iPhone, iPad ou Mac, Chromebook ou tablettes Android en situation de mobilité.</div>
                </div>
            </div>
            <div className='ligne lignedeux'>
                <div className='service lignedeuxserviceun'>
                    <div className='titreligne'>Formation</div>
                    <div className='descriptionligne'>Vous cherchez une formation sur mesure, matérielle (Mac, iPhone, iPad) ou logicielle (OS X, iOS, intégration dans un environnement Windows sous Active Directory) ? Une formation pour un logiciel donné ? Une formation certifiante ? Hegeoma vous propose ses services en inter ou intra entreprise.</div>
                </div>
                <div className='service lignedeuxservicedeux'>
                    <div className='titreligne'>Mobilité et gestion de flotte</div>
                    <div className='descriptionligne'>Vous désirez gérer et déployer plus facilement votre flotte d’appareils avec un MDM ? Pour Mac, iPhone, iPad, PC, tablettes Android ou Chromebook ? Hegeoma vous accompagne.</div>
                </div>
            </div>
            <div className='ligne lignetrois'>
                <div className='service lignetroisserviceun'>
                    <div className='titreligne'>Maintenance</div>
                    <div className='descriptionligne'>Vous souhaitez que quelqu’un vous conseille, assure la bonne évolution matérielle et logicielle de votre parc informatique ? Vous souhaitez faire évoluer certains Mac, iPhone, iPad, Chromebook ou PC ? Hegeoma vous propose ses services.</div>
                </div>
                <div className='service lignetroisservicedeux'>
                    <div className='titreligne'>Audit et conseil</div>
                    <div className='descriptionligne'>Vous désirez un conseil indépendant ? Un audit indépendant effectué par un professionnel certifié Apple ? Vous souhaitez un audit de sécurité pour vos solutions Apple ? Hegeoma vous propose ses services.</div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Services;
