import React, { useState } from 'react';
import './blog.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faGear, faPhone, faGraduationCap, faShip, faRecycle, faPen, faCheck } from "@fortawesome/free-solid-svg-icons";
import Card from './blogcard.js';
import GrandBlog from './blog.js';

const Blog = ({ posts }) => {
    const blogPosts = [
        {
            background: require("../../../images/pexels-brett-sayles-1869322.jpg"),
            title: "Arrêter la notification de mise à jour iOS",
            content: "Vous êtes quotidiennement confronté à une proposition de mise à jour système d’iOS et ne souhaitez plus voir la notification sans pour autant désactiver les mises à jour automatiques des applications ? Il est possible de changer ce comportement, en tout cas pour un temps, en allant sous iOS dans Réglages, Général.",
        },
        {
            background: require("../../../images/laptop-2557574.jpg"),
            title: "Educatec Educatice Zuludesk",
            content: "Hegeoma a le plaisir de participer au Salon Educatec Educatice avec Zuludesk. Venez découvrir ou échanger à propos de Zuludesk, le logiciel de MDM (Mobile Device Management / gestion des appareils à distance) de référence pour les appareils Apple dans le monde de l’éducation.",
        },
    ];

    const blogMiniPosts = [
        {
            background: require("../../../images/fond-abstrait-bleu-elegant-espace-texte_1017-46766 copie.jpg"),
            title: "Arrêter la notification de mise à jour iOS",
            content: "Vous êtes quotidiennement confronté à une proposition de mise à jour système d’iOS et ne souhaitez plus voir la notification sans pour autant désactiver les mises à jour automatiques des applications ?",
            texteCache: "Voici le texte caché qui s'affiche pour l'article 1. "
        },
        {
            background: require("../../../images/fond-abstrait-bleu-elegant-espace-texte_1017-46766 copie.jpg"),
            title: "Educatec Educatice Zuludesk",
            content: "Hegeoma a le plaisir de participer au Salon Educatec Educatice avec Zuludesk. ",
            texteCache: "Voici le texte caché qui s'affiche pour l'article 2."
        },
        {
            background: require("../../../images/fond-abstrait-bleu-elegant-espace-texte_1017-46766 copie.jpg"),
            title: "Educatec Educatice Zuludesk",
            content: "Hegeoma a le plaisir de participer au Salon Educatec Educatice avec Zuludesk.",
            texteCache: "Venez découvrir ou échanger à propos de Zuludesk, le logiciel de MDM (Mobile Device Management / gestion des appareils à distance) de référence pour les appareils Apple dans le monde de l’éducation."
        },
        {
            background: require("../../../images/fond-abstrait-bleu-elegant-espace-texte_1017-46766 copie.jpg"),
            title: "Educatec Educatice Zuludesk",
            content: "Hegeoma a le plaisir de participer au Salon Educatec Educatice avec Zuludesk.",
            texteCache: "Venez découvrir ou échanger à propos de Zuludesk, le logiciel de MDM (Mobile Device Management / gestion des appareils à distance) de référence pour les appareils Apple dans le monde de l’éducation."
        },
        {
            background: require("../../../images/fond-abstrait-bleu-elegant-espace-texte_1017-46766 copie.jpg"),
            title: "Educatec Educatice Zuludesk",
            content: "Hegeoma a le plaisir de participer au Salon Educatec Educatice avec Zuludesk.",
            texteCache: "Venez découvrir ou échanger à propos de Zuludesk, le logiciel de MDM (Mobile Device Management / gestion des appareils à distance) de référence pour les appareils Apple dans le monde de l’éducation."
        },
    ];
    const [openArticleIndex, setOpenArticleIndex] = useState(null);

    const toggleArticle = (index) => {
        if (openArticleIndex === index) {
            setOpenArticleIndex(null); // Close the currently open article
        } else {
            setOpenArticleIndex(index); // Open the clicked article
        }
    };

    return (
        <div>
            <div className='page3' id="blog">
                <div className='blog'>
                    <GrandBlog posts={blogPosts} />
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
    </div></div>
    );
};

export default Blog;
