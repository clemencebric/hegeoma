import "./mentionlegale.css"
import React, { useState } from 'react';
import BackToTop from '../home/Backtotop/index.js';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function Mentions() {
  const blogMiniPosts = [
    {
        title: "Mentions légales Obligatoires",
       
        texteCache: "Voici le texte caché qui s'affiche pour l'article 1. "
    },
    {
        title: "Prestataire",
        content: "Hegeoma a le plaisir de participer au Salon Educatec Educatice avec Zuludesk. ",
        texteCache: "Voici le texte caché qui s'affiche pour l'article 2."
    },
    {
        title: "Logiciels utilisés",
       
        texteCache: "Venez découvrir ou échanger à propos de Zuludesk, le logiciel de MDM (Mobile Device Management / gestion des appareils à distance) de référence pour les appareils Apple dans le monde de l’éducation."
    },
    {
        title: "Liens hypertextes",
       
        texteCache: "Venez découvrir ou échanger à propos de Zuludesk, le logiciel de MDM (Mobile Device Management / gestion des appareils à distance) de référence pour les appareils Apple dans le monde de l’éducation."
    },
    {
        title: "Porpriété intellectuelle",
        
        texteCache: "Venez découvrir ou échanger à propos de Zuludesk, le logiciel de MDM (Mobile Device Management / gestion des appareils à distance) de référence pour les appareils Apple dans le monde de l’éducation."
    },
];
    // State to keep track of which article is open
    const [openArticleIndex, setOpenArticleIndex] = useState(null);

    // Function to toggle the visibility of the hidden div
    const toggleArticle = (index) => {
      if (openArticleIndex === index) {
          setOpenArticleIndex(null); // Close the currently open article
      } else {
          setOpenArticleIndex(index); // Open the clicked article
      }
  };

  return (
    <div className="pagementions">
        <div className='debut'>
            <div className="titremention"> Mentions légales </div>
            <div className='containerminiarticles'>
                <div className='miniarticles'>
                    {blogMiniPosts.map((post, index) => (
                        <div key={index}>
                            <div className='articlem'>
                                <div className='partiegauche'>
                                    <div className='titrearticlem'>{post.title}</div>
                                </div>
                           
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
    </div>
  );
}

export default Mentions;