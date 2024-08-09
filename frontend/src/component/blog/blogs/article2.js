// src/components/Article1.js
import React from 'react';
import articleImage1 from '../../../images/pexels-jourdan-wee-2023410-3644098.jpg';
import './articles.css';
function Article2() {
    return (
        <div className='article-detail'>
            
            <img src={articleImage1} alt="Lorem Ipsum" className='article-image' />
            <div className='articleentier'>
            <h2>Section 1.10.32 du "De Finibus Bonorum et Malorum"</h2>
            <p className='indent'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            
            <div className='listeagauche'>
            <ul>
                <li>un truc</li>
                <li>un truc</li>
                <li>un truc</li>
                <li>un truc</li>
            </ul>
            
            <ol>
                <li>des trucs</li>
                <li>des machins</li>
                <li>encore qqc</li>
            </ol>
            
                <ul>
                    <li>un truc à gauche</li>
                    <li>un machin à gauche</li>
                </ul>
            </div>

            <p className='indent'>Un autre texte Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <div className='article-meta'>
                <span>Date: 2023-10-01</span>
                <span>Créateur: Aristote</span>
            </div>
        </div></div>
    );
}

export default Article2;
