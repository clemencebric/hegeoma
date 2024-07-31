import React, { useState, useEffect } from 'react';
import { get, post } from '../fonctions/getpost';
import './ajoutquestionfaq.css';

function AjoutFaq() {
  const [question, setQuestion] = useState('');
  const [reponse, setReponse] = useState('');
  const [faqs, setFaqs] = useState([]);
  const [activeQuestions, setActiveQuestions] = useState([]); // Utiliser un tableau pour suivre les questions actives

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await get('faq');
      setFaqs(response);
    } catch (error) {
      console.error('Erreur lors de la récupération des FAQ:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await post('createfaq', {
        question,
        reponse,
      });
      console.log(response);
      setQuestion('');
      setReponse('');
      fetchFaqs(); // Recharge les FAQ après l'ajout
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la FAQ:', error);
    }
  };

  const handleQuestionClick = (id) => {
    setActiveQuestions((prevActiveQuestions) =>
      prevActiveQuestions.includes(id)
        ? prevActiveQuestions.filter((questionId) => questionId !== id)
        : [...prevActiveQuestions, id]
    );
  };

  return (
    <div className='pagefaq'>
      <div className='formfaqadmin'>
        <h1>Ajouter des questions à la FAQ</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Question:</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Réponse:</label>
            <textarea
              className='textareafaq'
              value={reponse}
              onChange={(e) => setReponse(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit">Ajouter</button>
        </form>
      </div>
      <div className='faq-list'>
        {faqs.map((faq, index) => (
          <div key={faq.id} className='faq-item'>
            <div className='faq-question' onClick={() => handleQuestionClick(index)}>
              {faq.question}
            </div>
            <div className={`faq-answer ${activeQuestions.includes(index) ? 'active' : ''}`}>
              {faq.reponse}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AjoutFaq;
