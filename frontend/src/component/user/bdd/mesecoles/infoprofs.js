// frontend/src/SearchTeachers.js
import React, { useState } from 'react';
import axios from 'axios';
import { get } from '../../../fonctions/getpost';
import { useNavigate } from 'react-router-dom';
import "./infoprofs.css";

const SearchTeachers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const idecole = localStorage.getItem('idecole');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await get(`searchteachers?search=${searchTerm}&idecole=${idecole}`);
      setResults(response);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };  
  const handleInfoEcole = () => {
    navigate('/infoecole');
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
    </div>
    <button onClick={handleInfoEcole}>retour en arrière</button></div>
  );
};

export default SearchTeachers;
