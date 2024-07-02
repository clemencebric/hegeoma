import React, { useState, useEffect, useRef} from 'react';
import './home.css';
import Typewriter from './Typewriter.js';
import DivAnimee from './divAnimee/divAnimee.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faEyeSlash, faXmark } from "@fortawesome/free-solid-svg-icons";

import imageessai from "/Users/clemence/Documents/site_web/react-first-project/src/images/laptop-2557574.jpg";
const Home = () => {
   
    return (
        <div>
        
        <div className='page1'>
            <div className='partie1'>
                <div className='surtitre'>Bienvenu chez</div>
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                  <Typewriter text="HEGEOMA" />
             </div>
            </div>
            <DivAnimee>
            <div className='partie2'>
                <div className='titreapropos'>A propos</div>
                <div className='texteapropos'> 
                    <div>Membre du réseau Apple Consultant Network, Hegeoma vous propose sur macOS ou iOS</div>
                    <div className='liste' > 
                        <ul>
                            <li>le déploiement (solutions de MDM telles Jamf, Jamf School, Miradore )</li>
                            <li>la sécurisation</li>
                            <li>la sauvegarde </li>
                            <li>l'intégration et le support des appareils de votre flotte informatique</li>
                        </ul>
                    </div>
                </div>
            </div>
            </DivAnimee>
        </div>
        <div className='page2'>
            bon
        </div>
        </div>
        
    );
};

export default Home;
/*<img  className='image' src={imageessai}></img>*/