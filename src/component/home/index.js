import React from 'react';
import './home.css';
import Typewriter from './Typewriter.js';
import CardSlider from './slider/slider.js';
import Card from './slider/card.js';
import ServiceList from './tableau/tableau.js';
import Blog from './blog/blog.js';
import DivAnimee from './divAnimee/divAnimee.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faPhone, faGraduationCap, faShip, faRecycle, faPen, faCheck } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
    const cards = [//contenu des cards du slider
        <Card logo={faGear} title="Integration" content="Hegeoma prépare, installe et déploie vos Mac, iPhone ou iPad, Chromebook, PC, NAS Synology ou tablettes Androiddans votre infrastructure actuelle ou à venir. Nous intégrons également en environnement hétérogène. Hegeoma peut travailler au forfait et sait s’adapter à votre budget." />,
        <Card logo={faPhone} title="Support" content="Hegeoma peut prendre en charge le support de tout ou partie de votre parc informatique, y compris vos iPhone, iPad ou Mac, Chromebook ou tablettes Android en situation de mobilité." />,
        <Card logo={faGraduationCap} title="Formation" content="Vous cherchez une formation sur mesure, matérielle (Mac, iPhone, iPad) ou logicielle (OS X, iOS, intégration dans un environnement Windows sous Active Directory) ? Une formation pour un logiciel donné ? Une formation certifiante ? Hegeoma vous propose ses services en inter ou intra entreprise." />,
        <Card logo={faShip} title="Mobilité et gestion de flotte (MDM)" content="Vous désirez gérer et déployer plus facilement votre flotte d’appareils avec un MDM ? Pour Mac, iPhone, iPad, PC, tablettes Android ou Chromebook ? Hegeoma vous accompagne." />,
        <Card logo={faRecycle} title="Maintenance" content="Vous souhaitez que quelqu’un vous conseille, assure la bonne évolution matérielle et logicielle de votre parc informatique ? Vous souhaitez faire évoluer certains Mac, iPhone, iPad, Chromebook ou PC ? Hegeoma vous propose ses services." />,
        <Card logo={faPen} title="Audit et conseil" content="Vous désirez un conseil indépendant ? Un audit indépendant effectué par un professionnel certifié Apple ? Vous souhaitez un audit de sécurité pour vos solutions Apple ? Hegeoma vous propose ses services." />,
    ];

    const services = [//contenu du tableau version telephone des services
        { title: "Intégration" },
        { title: "Support" },
        { title: "Formation" },
        { title: "Mobilité & Gestion de flotte" },
        { title: "Maintenance" },
        { title: "Audit & Conseil" }
    ];

    const blogPosts = [//contenu des articles du blog
        {
            background: require("../../images/pexels-brett-sayles-1869322.jpg"), // image dans le cadre
            title: "Arrêter la notification de mise à jour iOS",
            content: "Vous êtes quotidiennement confronté à une proposition de mise à jour système d’iOS et ne souhaitez plus voir la notification sans pour autant désactiver les mises à jour automatiques des applications ? Il est possible de changer ce comportement, en tout cas pour un temps, en allant sous iOS dans Réglages, Général, Stockage et utilisation d’iCloud, Gérer le stockage",
        },
        {
            background: require("./laptop-2557574.jpg"), // image dans le cadre
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
                <DivAnimee>
                <div className='partie3'>
                    <div className='elt'>
                        <div className='eltlogo'><FontAwesomeIcon icon={faCheck} style={{ color: "#36f529" }} size="2x" /></div>
                        <div className='eltdescription'>Déploiement</div>
                    </div>
                    <div className='elt'>
                        <div className='eltlogo'><FontAwesomeIcon icon={faCheck} style={{ color: "#36f529" }} size="2x" /></div>
                        <div className='eltdescription'>Sécurisation</div>
                    </div>
                    <div className='elt'>
                        <div className='eltlogo'><FontAwesomeIcon icon={faCheck} style={{ color: "#36f529" }} size="2x" /></div>
                        <div className='eltdescription'>Sauvegarde</div>
                    </div>
                    <div className='elt'>
                        <div className='eltlogo'><FontAwesomeIcon icon={faCheck} style={{ color: "#36f529" }} size="2x" /></div>
                        <div className='eltdescription'>Intégration</div>
                    </div>

                </div>
                </DivAnimee>
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
