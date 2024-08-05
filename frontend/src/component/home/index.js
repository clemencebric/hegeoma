import React, { useState } from 'react';
import './home.css';
import Typewriter from './Typewriter.js';
import DivAnimee from './divAnimee/divAnimee.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel from '../home/caroussel/carousel.js';
import ServiceList from './tableau/tableau.js';
import Blog from './blog/blog.js';
import BackToTop from './Backtotop/index.js';
import { faChevronDown, faCheck } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const image1 = require('../../images/pexels-gabriel-freytez-110599-341523.jpg');
  const image2 = require('../../images/pexels-pixabay-4158.jpg');
  const image3 = require('../../images/pexels-jeshoots-218863.jpg');
  const image4 = require('../../images/pexels-donatellotrisolino-1336855.jpg');
  const image5 = require('../../images/pexels-michaela-87369-295826 (1).jpg');
  const image6 = require('../../images/pexels-karolina-grabowska-7679634.jpg');

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
      background: require("../../images/pexels-brett-sayles-1869322.jpg"),
      title: "Arrêter la notification de mise à jour iOS",
      content: "Vous êtes quotidiennement confronté à une proposition de mise à jour système d’iOS et ne souhaitez plus voir la notification sans pour autant désactiver les mises à jour automatiques des applications ? Il est possible de changer ce comportement, en tout cas pour un temps, en allant sous iOS dans Réglages, Général.",
    },
    {
      background: require("./laptop-2557574.jpg"),
      title: "Educatec Educatice Zuludesk",
      content: "Hegeoma a le plaisir de participer au Salon Educatec Educatice avec Zuludesk. Venez découvrir ou échanger à propos de Zuludesk, le logiciel de MDM (Mobile Device Management / gestion des appareils à distance) de référence pour les appareils Apple dans le monde de l’éducation.",
    },
  ];

  const blogMiniPosts = [
    {
      background: require("../../images/pexels-brett-sayles-1869322.jpg"),
      title: "Arrêter la notification de mise à jour iOS",
      content: "Vous êtes quotidiennement confronté à une proposition de mise à jour système d’iOS et ne souhaitez plus voir la notification sans pour autant désactiver les mises à jour automatiques des applications ?",
      texteCache: "Voici le texte caché qui s'affiche pour l'article 1. "
    },
    {
      background: require("./laptop-2557574.jpg"),
      title: "Educatec Educatice Zuludesk",
      content: "Hegeoma a le plaisir de participer au Salon Educatec Educatice avec Zuludesk. ",
      texteCache: "Voici le texte caché qui s'affiche pour l'article 2."
    },
    {
      background: require("./laptop-2557574.jpg"),
      title: "Educatec Educatice Zuludesk",
      content: "Hegeoma a le plaisir de participer au Salon Educatec Educatice avec Zuludesk.",
      texteCache: "Venez découvrir ou échanger à propos de Zuludesk, le logiciel de MDM (Mobile Device Management / gestion des appareils à distance) de référence pour les appareils Apple dans le monde de l’éducation."
    },
    {
      background: require("./laptop-2557574.jpg"),
      title: "Educatec Educatice Zuludesk",
      content: "Hegeoma a le plaisir de participer au Salon Educatec Educatice avec Zuludesk.",
      texteCache: "Venez découvrir ou échanger à propos de Zuludesk, le logiciel de MDM (Mobile Device Management / gestion des appareils à distance) de référence pour les appareils Apple dans le monde de l’éducation."
    },
    {
      background: require("./laptop-2557574.jpg"),
      title: "Educatec Educatice Zuludesk",
      content: "Hegeoma a le plaisir de participer au Salon Educatec Educatice avec Zuludesk.",
      texteCache: "Venez découvrir ou échanger à propos de Zuludesk, le logiciel de MDM (Mobile Device Management / gestion des appareils à distance) de référence pour les appareils Apple dans le monde de l’éducation."
    },
  ];

  const [openArticleIndex, setOpenArticleIndex] = useState(null);

  const toggleArticle = (index) => {
    if (openArticleIndex === index) {
      setOpenArticleIndex(null);
    } else {
      setOpenArticleIndex(index);
    }
  };

  const carouselItems = [
    {
      image: image1,
      alt: 'Slide 1',
      caption: 'Mobilité et gestion de flotte (MDM)',
      paragraphs: [
        'Vous désirez gérer et déployer plus facilement votre flotte d’appareils avec un MDM ?',
        'Pour Mac, iPhone, iPad, PC, tablettes Android ou Chromebook ? Hegeoma vous accompagne.'
      ]
    },
    {
      image: image2,
      alt: 'Slide 2',
      caption: 'Intégration',
      paragraphs: [
        'Hegeoma prépare, installe et déploie vos Mac, iPhone ou iPad, Chromebook, PC, NAS Synology ou tablettes Android dans votre infrastructure actuelle ou à venir.',
        'Nous intégrons également en environnement hétérogène. Hegeoma peut travailler au forfait et sait s’adapter à votre budget.'
      ]
    },
    {
        image: image3,
        alt: 'Slide 3',
        caption: 'Intégration',
        paragraphs: [
          'Hegeoma prépare, installe et déploie vos Mac, iPhone ou iPad, Chromebook, PC, NAS Synology ou tablettes Android dans votre infrastructure actuelle ou à venir.',
          'Nous intégrons également en environnement hétérogène. Hegeoma peut travailler au forfait et sait s’adapter à votre budget.'
        ]
      },
      {
        image: image4,
        alt: 'Slide 4',
        caption: 'Intégration',
        paragraphs: [
          'Hegeoma prépare, installe et déploie vos Mac, iPhone ou iPad, Chromebook, PC, NAS Synology ou tablettes Android dans votre infrastructure actuelle ou à venir.',
          'Nous intégrons également en environnement hétérogène. Hegeoma peut travailler au forfait et sait s’adapter à votre budget.'
        ]
      },
      {
        image: image5,
        alt: 'Slide 5',
        caption: 'Intégration',
        paragraphs: [
          'Hegeoma prépare, installe et déploie vos Mac, iPhone ou iPad, Chromebook, PC, NAS Synology ou tablettes Android dans votre infrastructure actuelle ou à venir.',
          'Nous intégrons également en environnement hétérogène. Hegeoma peut travailler au forfait et sait s’adapter à votre budget.'
        ]
      },
      {
        image: image6,
        alt: 'Slide 6',
        caption: 'Intégration',
        paragraphs: [
          'Hegeoma prépare, installe et déploie vos Mac, iPhone ou iPad, Chromebook, PC, NAS Synology ou tablettes Android dans votre infrastructure actuelle ou à venir.',
          'Nous intégrons également en environnement hétérogène. Hegeoma peut travailler au forfait et sait s’adapter à votre budget.'
        ]
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
            <div className='elt'>
              <div className='eltlogo'><FontAwesomeIcon icon={faCheck} style={{ color: "#36f529" }} size="2x" /></div>
              <div className='eltdescription'>Support</div>
            </div>
          </div>
        </DivAnimee>
      </div>
      <Carousel items={carouselItems} />

      <div className='page2tel' id="servicestel">
        <div className='titreservices'>NOS SERVICES : </div>
        <div><ServiceList services={services} /></div>
      </div>

      <div className='page3' id="blog">
        <div className='blog'>
          <Blog posts={blogPosts} />
        </div>
      </div>
      <div className='containerminiarticle'>
        <div className='miniarticles'>
          {blogMiniPosts.map((post, index) => (
            <div key={index}>
              <div className='articlem'>
                <div className='partiegauche'>
                  <div className='titrearticlem'>{post.title}</div>
                  <div className='descriptionminiarticle'>01/12/2024</div>
                </div>
                <div className='contenuminiarticle'>{post.content}</div>
                <div
                  className='buttonarticle'
                  onClick={() => toggleArticle(index)}
                >
                  <FontAwesomeIcon icon={faChevronDown} style={{ color: "#dddddd" }} size="2x" />
                </div>
              </div>
              {openArticleIndex === index && (
                <div className='divcachee'>
                  <div className='cachée'>
                    {post.texteCache}
                  </div>
                </div>
              )}
            </div>
          ))}

        </div>
        <BackToTop />
      </div>
    </div>
  );
};

export default Home;
