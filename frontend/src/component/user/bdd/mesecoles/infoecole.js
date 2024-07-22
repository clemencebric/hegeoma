// frontend/src/SearchBar.js
import React, { useState } from 'react';
import axios from 'axios';
import { get } from '../../../fonctions/getpost';
import "./infoecole.css";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const idecole = localStorage.getItem('idecole');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:8081/search?search=${searchTerm}&idecole=${idecole}`);
      setResults(response.data);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='pageinfoecole'>
      <form className='forminfoecole' onSubmit={handleSubmit}>
        <input
          className='inputforminfoecole'
          type="text"
          value={searchTerm}
          placeholder='Entrez un nom, prenom ou classe'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input type="hidden" name="idecole" value={idecole} />
        <button className="boutonchercher" type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      <div className='tableinfoecole'>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Classe</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id}>
              <td>{result.nom}</td>
              <td>{result.prenom}</td>
              <td>{result.classe}</td>
            </tr>
          ))}
        </tbody>
      </table></div>
    </div>
  );
};

export default SearchBar;
