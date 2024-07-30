import React, { useState } from 'react';
import axios from 'axios';
import "./contact.css";
import { post } from '../fonctions/getpost';
import { getUserEmailAndStatus } from '../fonctions/jwtDecode';
function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const userData = getUserEmailAndStatus();
  const userEmail = userData.email;
  const userId = userData.id;
  console.log(userData.email);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await post('submit-message', { userId, userEmail, message });
      alert('Message submitted successfully');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting message:', error);
      alert('Error submitting message');
    }
  };

  return (
    <div className="pagecontact">
      <div className='minipage'>
        <h1>Contactez-nous</h1>
        <form onSubmit={handleSubmit}>
          <div className="partiegauche">
            votre email : {userEmail}
          </div>
          <div className="partiedroite">
            <label>
              Message:
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="soumettre">
            <button type="submit">Soumettre</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
