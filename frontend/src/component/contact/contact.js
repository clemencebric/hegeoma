import React, { useState } from 'react';
import "./contact.css"
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Email envoyé avec succès!');
            } else {
                alert('Erreur lors de l\'envoi de l\'email.');
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert('Erreur lors de l\'envoi de l\'email.');
        });
    };

    return (
      <div className='pagecontact'>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Nom:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required /><br /><br />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required /><br /><br />

            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} required /><br /><br />

            <button type="submit">Envoyer</button>
        </form></div>
    );
};

export default Contact;
