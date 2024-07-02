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
                <div className='surtitre'>Bienvenue chez</div>
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
        <DivAnimee> 
            <div className='card'>
                <div>Integration</div>
                <div>Hegeoma prépare, installe et déploie vos Mac, iPhone ou iPad, Chromebook, PC, NAS Synology ou tablettes Android
                    dans votre infrastructure actuelle ou à venir.
                    Nous intégrons également en environnement hétérogène.
                    Hegeoma peut travailler au forfait et sait s’adapter à votre budget.
                </div>
                </div>
        </DivAnimee>
        <DivAnimee> 
            <div className='card'>
                <div>Support</div>
                <div>Hegeoma peut prendre en charge le support de tout ou partie de votre parc informatique, y compris vos iPhone, iPad ou Mac, Chromebook ou tablettes Android en situation de mobilité.</div>
            </div>
        </DivAnimee>
        <DivAnimee> 
            <div className='card'>
                <div>Formation</div>
                <div>Vous cherchez une formation sur mesure, matérielle (Mac, iPhone, iPad) ou logicielle (OS X, iOS, intégration dans un environnement Windows sous Active Directory) ?
                    Une formation pour un logiciel donné ? Une formation certifiante ?
                    Hegeoma vous propose ses services en inter ou intra entreprise.</div>
            </div>
            </DivAnimee>
            <DivAnimee> 
            <div className='card'> 
                <div>Mobilité et gestion de flotte</div>
                <div>Vous désirez gérer et déployer plus facilement votre flotte d’appareils avec un MDM ? Pour Mac, iPhone, iPad, PC, tablettes Android ou Chromebook ?
                Hegeoma vous accompagne.</div>
                </div>
            </DivAnimee>
            <DivAnimee> 
            <div className='card'>
                <div>Maintenance</div>
                <div>Vous souhaitez que quelqu’un vous conseille,
assure la bonne évolution matérielle et logicielle de votre parc informatique ?
Vous souhaitez faire évoluer certains Mac, iPhone, iPad, Chromebook ou PC  ?
Hegeoma vous propose ses services.</div>
                </div>
            </DivAnimee>
            <DivAnimee> 
            <div className='card'>
                <div>Audit et conseil</div>
                <div>Vous désirez un conseil indépendant ?
Un audit indépendant effectué par un professionnel certifié Apple ?
Vous souhaitez un audit de sécurité pour vos solutions Apple ?
Hegeoma vous propose ses services.</div>
                </div>
            </DivAnimee>
            
        </div>
        </div>
        
    );
};

export default Home;
/*<img  className='image' src={imageessai}></img>*/