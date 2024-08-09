import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './blog.css';

import articleImage1 from '../../images/pexels-annpoan-5797939.jpg';
import articleImage2 from '../../images/pexels-jourdan-wee-2023410-3644098.jpg';
import articleImage3 from '../../images/pexels-ekaterina-bolovtsova-6192119.jpg';
import articleImage4 from '../../images/pexels-morningtrain-18104.jpg';
import articleImage5 from '../../images/pexels-pixabay-270694.jpg';
import articleImage6 from '../../images/pexels-tranmautritam-370470.jpg';
import articleImage7 from '../../images/pexels-pixabay-269323.jpg';
import articleImage8 from '../../images/pexels-nietjuh-796602.jpg';
import articleImage9 from '../../images/pexels-matthiaszomer-914915.jpg';
import articleImage10 from '../../images/pexels-kevin-ku-92347-577585.jpg';

const articles = [
    { id: 1, title: 'Lorem Ipsum', content: 'Lorem ipsum...', date: '2023-10-01', creator: 'Aristote', image: articleImage1 },
    { id: 2, title: 'Section 1.10.32 du "De Finibus Bonorum et Malorum"', content: 'Sed ut perspiciatis...', date: '45 av. J.-C', creator: 'Ciceron', image: articleImage2 },
    // ... autres articles
];

function Blogg() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.creator.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='pageblogg'>
            <h1>Blog</h1>
            <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={handleSearch}
                className='search-bar'
            />
            <ul className='article-list'>
                {filteredArticles.map(article => (
                    <li key={article.id} className='articleunite'>
                        <Link to={`/article/${article.id}`}>
                            <img src={article.image} alt={article.title} className='article-image' />
                            <h2>{article.title}</h2>
                        </Link>
                        <p className='article-content'>{article.content}</p>
                        <div className='article-meta'>
                            <span>Date: {article.date}</span>
                            <span>
                                <Link to={`/article/${article.id}`}>
                                    <button>En savoir plus</button>
                                </Link>
                            </span>
                            <span>Créateur: {article.creator}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Blogg;
