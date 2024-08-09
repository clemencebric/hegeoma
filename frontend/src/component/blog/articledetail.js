import React from 'react';
import { useParams } from 'react-router-dom';
import articles from './blog'; // Assurez-vous d'importer les articles ici

function ArticleDetail() {
    const { id } = useParams();
    const article = articles.find(article => article.id === parseInt(id));

    if (!article) {
        return <div>Article non trouvé</div>;
    }

    return (
        <div className='article-detail'>
            <img src={article.image} alt={article.title} className='article-image' />
            <h2 className='titrearticles'>{article.title}</h2>
            <p className='article-content'>{article.content}</p>
            <div className='article-meta'>
                <span>Date: {article.date}</span>
                <span>Créateur: {article.creator}</span>
            </div>
        </div>
    );
}

export default ArticleDetail;
