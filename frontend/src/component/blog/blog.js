// src/App.js
import React, { useState } from 'react';
import './blog.css';

const articles = [
    { id: 1, title: 'Lorem Ipsum', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', date: '2023-10-01', creator: 'Aristote' },
    { id: 2, title: 'Section 1.10.32 du "De Finibus Bonorum et Malorum"', content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?', date: '45 av. J.-C', creator: 'Ciceron' },
    { id: 3, title: 'Section 1.10.33 du "De Finibus Bonorum et Malorum"', content: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.', date: '45 av. J.-C.', creator: 'Ciceron' },
    { id: 4, title: 'grands oiseaux', content: 'Un pingouin manchot', date: '2023-10-04', creator: 'Auteur 4' },
    { id: 5, title: 'felins', content: 'Un chat chauve', date: '2023-10-04', creator: 'Auteur 4' },
    { id: 6, title: 'foret', content: 'un gorille déplumé', date: '2023-10-04', creator: 'Auteur 4' },
    { id: 7, title: 'pampa', content: 'un iguane aveugle', date: '2023-10-04', creator: 'Auteur 4' },
    { id: 8, title: 'grands oiseaux', content: 'un flament-vert', date: '2023-10-04', creator: 'Auteur 4' },
    { id: 9, title: 'animaux lents', content: 'une tortue-yoga', date: '2023-10-04', creator: 'Auteur 4' },
    { id: 10, title: 'la plage', content: 'un bernard-thierry', date: '2023-10-04', creator: 'Auteur 4' },
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
                        <h2>{article.title}</h2>
                        <p className='article-content'>{article.content}</p>
                        <div className='article-meta'>
                            <span>Date: {article.date}</span>
                            <span>Créateur: {article.creator}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Blogg;
