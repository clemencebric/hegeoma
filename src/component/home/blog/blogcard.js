import React from 'react';

const Card = ({ background, title, content }) => (
    <div className="carddd">
        <div
            className="image"
            style={{ backgroundImage: `url(${background})` }}
        ></div>
        <div className='titrecardblog'> {title}</div>
        <div className='descriptionblog'><p className='contentblog'>{content}</p></div>
    </div>
);

export default Card;
