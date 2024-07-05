import React from 'react';
import './home.css';
import Typewriter from './Typewriter.js';
import CardSlider from './slider/slider.js';
import Card from './slider/card.js';
import ServiceList from './tableau/tableau.js';
import Blog from './blog/blog.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faPhone, faGraduationCap, faShip, faRecycle, faPen } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
    const cards = [
        <Card logo={faGear} title="Integration" content="Hegeoma prépare, installe et déploie vos Mac, iPhone ou iPad, Chromebook, PC, NAS Synology ou tablettes Androiddans votre infrastructure actuelle ou à venir. Nous intégrons également en environnement hétérogène. Hegeoma peut travailler au forfait et sait s’adapter à votre budget." />,
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

    const blogPosts = [
        {
            background: require("../../images/pexels-brett-sayles-1869322.jpg"), // Utilisation de require avec une URL absolue
            title: "Hegeoma recrute un(e) spécialiste mobilités",
            content: "Description de poste Hegeoma recherche un(e) spécialiste mobilités dans le cadre d’un Contrat à Durée Indéterminée (CDI). Poste basé sur Grenoble centre. Hegeoma intègre, conseille et apporte un support à ses clients avec une spécialisation forte autour des technologies Apple et Google. Votre rôle sera d’accompagner techniquement les clients d’Hegeoma,[…]",
        },
        {
            background: require("./laptop-2557574.jpg"), // Utilisation de require avec un chemin relatif
            title: "Educatec Educatice Zuludesk",
            content: "Hegeoma a le plaisir de participer au Salon Educatec Educatice avec Zuludesk. Venez découvrir ou échanger à propos de Zuludesk, le logiciel de MDM (Mobile Device Management / gestion des appareils à distance) de référence pour les appareils Apple dans le monde de l’éducation.",
        },
    ];

    return (
        <div>
            <div className='page1' id="home">
                <div className='partie1'>
                    <div className='surtitre'>Bienvenue chez</div>
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                        <Typewriter text="HEGEOMA" />
                    </div>
                </div>
                <div className='partie2'>
                    <div className='titreapropos'>A propos</div>
                    <div className='texteapropos'>
                        <div>Membre du réseau Apple Consultant Network, Hegeoma vous propose sur macOS ou iOS</div>
                        <div className='liste'>
                            <ul>
                                <li>le déploiement (solutions de MDM telles Jamf, Jamf School, Miradore)</li>
                                <li>la sécurisation</li>
                                <li>la sauvegarde</li>
                                <li>l'intégration et le support des appareils de votre flotte informatique</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className='page2' id="services">
                <CardSlider cards={cards} />
            </div>
            <div className='page2tel' id="servicestel">
                <div className='titreservices'>NOS SERVICES : </div>
                <div><ServiceList services={services} /></div>
            </div>

            <div className='page3' id="blog">
                <div className='blog'>
                    <Blog posts={blogPosts} />
                </div>
            </div>
        </div>
    );
};

export default Home;
