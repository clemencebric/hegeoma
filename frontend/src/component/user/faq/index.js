import React, { useState, useEffect } from 'react';
import { get } from '../../fonctions/getpost';
import '../../tabdebordadmin/ajoutquestionfaq.css';
import './faq.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

function Faq() {
  const [faqs, setFaqs] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleQuestionClick = (id) => {
    setActiveQuestion(prevActiveQuestion =>
      prevActiveQuestion === id ? null : id
    );
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await get(`searchfaq?query=${searchTerm}`);
      setFaqs(response);
    } catch (error) {
      console.error('Erreur lors de la recherche des FAQ:', error);
    }
  };

  return (
    <div className='pagefaqadmin'>
      <div>
        <h1 className='titrefaqclient'>Questions de la FAQ</h1>
      </div>
      <form onSubmit={handleSearch} className='search-form'>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher..."
          className='search-input'
        />
        <button type="submit" className='search-button'>Rechercher</button>
      </form>
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
