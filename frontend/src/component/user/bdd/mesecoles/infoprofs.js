// frontend/src/SearchTeachers.js
import React, { useState } from 'react';
import axios from 'axios';
import "./infoprofs.css";

const SearchTeachers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const idecole = localStorage.getItem('idecole');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:8081/searchteachers?search=${searchTerm}&idecole=${idecole}`);
      setResults(response.data);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='grandepageinfoecole'>
      <div className='pageinfoecole'>
        <form className='forminfoecole' onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          placeholder='Entrez un nom, un prénom ou une classe'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input type="hidden" name="idecole" value={idecole} />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      <div className='table-container'> {/* Ajouter le conteneur du tableau */}
      <table className='tableinfoprof'>
        <thead className='enteteformprofs'>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Classes</th>
          </tr>
        </thead>
        <tbody className='sliderinfoprof'>
          {results.map((result) => (
            <tr key={result.id}>
              <td>{result.nom}</td>
              <td>{result.prenom}</td>
              <td>{result.classes}</td>
            </tr>
          ))}
        </tbody>
      </table></div>
    </div></div>
  );
};

export default SearchTeachers;
