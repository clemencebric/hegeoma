import React, { useState, useEffect } from 'react';
import { get, post } from '../../fonctions/getpost';
import '../../tabdebordadmin/ajoutquestionfaq.css';
import './faq.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faXmark } from "@fortawesome/free-solid-svg-icons";

function Faq() {
  const [question, setQuestion] = useState('');
  const [reponse, setReponse] = useState('');
  const [faqs, setFaqs] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null); // Utiliser un seul identifiant pour la question active

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
    setActiveQuestion(prevActiveQuestion =>
      prevActiveQuestion === id ? null : id
    );
  };

  return (
    <div className='pagefaqadmin'>
       <div>
        <h1 className='titrefaqclient'>Questions de la FAQ</h1>
       </div>
      <div className='faq-list'>
        {faqs.map((faq, index) => (
       
          <div key={faq.id} className='faq-item'>
            <div className='faq-question' onClick={() => handleQuestionClick(index)}>
              {faq.question}
              <div>
              <FontAwesomeIcon 
                icon={activeQuestion === index ? faChevronUp : faChevronDown} 
                style={{ color: "#dddddd", marginLeft: "10px" }} 
                size="1x" 
              />
              </div>
            </div>
            
            
            <div className={`faq-answer ${activeQuestion === index ? 'active' : ''}`}>
              {faq.reponse}
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faq;
