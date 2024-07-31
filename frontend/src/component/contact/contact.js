import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import "./contact.css";
import { post } from '../fonctions/getpost';
import { getUserEmailAndStatus } from '../fonctions/jwtDecode';

function Contact() {
  const [message, setMessage] = useState('');
  const [nom, setNom] = useState('');
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const userData = getUserEmailAndStatus();
  const userEmail = userData.email;
  const userId = userData.id;

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const answer = num1 + num2;
    setCaptcha({ num1, num2, answer });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseInt(userAnswer) !== captcha.answer) {
      Swal.fire({
        icon: 'error',
        title: 'Captcha incorrect',
        text: 'Veuillez réessayer.',
      });
      return;
    }

    // Afficher la boîte de dialogue de confirmation
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, submit it!'
    });

    // Si l'utilisateur confirme, envoyer le message
    if (result.isConfirmed) {
      try {
        const response = await post('submit-message', { userId, userEmail, message, nom });
        console.log('Response from server:', response); // Ajouter un log ici
        if (response.message === 'Message submitted successfully') {
          Swal.fire({
            icon: 'success',
            title: 'Message submitted successfully',
            showConfirmButton: false,
            timer: 1500
          });
          setMessage('');
          setNom('');
          setUserAnswer('');
          generateCaptcha();
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
    }
  };

  return (
    <div className="pagecontact">
      <div className='minipage'>
        <h1>Contactez-nous</h1>
        <form className="formulairecontact" onSubmit={handleSubmit}>
          <div className="partiegauche">
            votre email : {userEmail}
          </div>
          <div className="partiedroite">
            <label>
              Nom de l'organisme:
              <input
                className='textareacontact'
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />
            </label>
            <label>
              Message:
              <textarea
                className='textareacontact'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </label>
            <div>
            <label>
              Captcha: {captcha.num1} + {captcha.num2} = ?
              <input
                className='textareacontact'
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                required
              />
            </label>
            </div>
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
