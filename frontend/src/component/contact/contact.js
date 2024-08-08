import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';
import "./contact.css";

// Initialiser EmailJS avec votre clé publique
emailjs.init('2PP13utTMxQGvLJLl');

function Contact() {
  const [message, setMessage] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const answer = num1 + num2;
    setCaptcha({ num1, num2, answer });
  };

  const handleSubmit = (e) => {
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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, submit it!'
    }).then((result) => {
      // Si l'utilisateur confirme, envoyer l'email
      if (result.isConfirmed) {
        sendEmail();
      }
    });
  };

  const sendEmail = () => {
    const templateParams = {
      from_name: `${nom} ${prenom}`,
      from_email: email,
      message: message,
      telephone: telephone
    };

    emailjs.send('YOUR_SERVICE_ID', 'template_0wpxz9s', templateParams)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        Swal.fire({
          icon: 'success',
          title: 'Message submitted successfully',
          showConfirmButton: false,
          timer: 1500
        });
        setMessage('');
        setNom('');
        setPrenom('');
        setEmail('');
        setTelephone('');
        setUserAnswer('');
        generateCaptcha();
      }, (error) => {
        console.log('FAILED...', error);
        Swal.fire({
          icon: 'error',
          title: 'Error submitting message',
          text: error.text,
        });
      });
  };

  return (
    <div className="pagecontact">
      <div className='minipage'>
        <h1>Contactez-nous</h1>
        <form className="formulairecontact" onSubmit={handleSubmit}>
          <div className="partiedroite">
            <label>
              Nom:
              <input
                className='textareacontact premierchamp'
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />
            </label>
            <label>
              Prénom:
              <input
                className='textareacontact premierchamp'
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                required
              />
            </label>
            <label>
              Email:
              <input
                className='textareacontact premierchamp'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Téléphone:
              <input
                className='textareacontact premierchamp'
                type="tel"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
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
