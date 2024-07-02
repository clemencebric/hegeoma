import React, { useState } from 'react';
import './home.css';
import Typewriter from './Typewriter.js';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const Home = () => {

    return (
        <div>
        
        <div className='page1'>
            <div className='partie1'>
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                  <Typewriter text="HEGEOMA" />
             </div>
            </div>
            <div className='partie2'>
               
            </div>
        </div>
        </div>
        
    );
};

export default Home;