import React from 'react';
import './blog.css';
import Card from './blogcard.js';

const Blog = ({ posts }) => {
    return (
        <div className="blog-container">
            {posts.slice(0, 2).map((post, index) => (
                <Card
                    key={index}
                    background={post.background}
                    title={post.title}
                    content={post.content}
                />
            ))}
        </div>
    );
};

export default Blog;
