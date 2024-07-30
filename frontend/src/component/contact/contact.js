import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import "./contact.css";
import { post } from '../fonctions/getpost';
import { getUserEmailAndStatus } from '../fonctions/jwtDecode';

function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const userData = getUserEmailAndStatus();
  const userEmail = userData.email;
  const userId = userData.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await post('submit-message', { userId, userEmail, message });
      console.log('Response from server:', response); // Ajouter un log ici
      if (response.message === 'Message submitted successfully') {
        Swal.fire({
          icon: 'success',
          title: 'Message submitted successfully',
          showConfirmButton: false,
          timer: 1500
        });
        setEmail('');
        setMessage('');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error submitting message',
          text: response.message,
        });
      }
    } catch (error) {
      console.error('Error submitting message:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error submitting message',
        text: error.message,
      });
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
