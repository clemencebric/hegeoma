// frontend/src/SearchBar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { get } from '../../../fonctions/getpost';
import "./infoeleve.css";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const idecole = localStorage.getItem('idecole');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await get(`search?search=${searchTerm}&idecole=${idecole}`);
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
    <div className='pageinfoecole'>
      <div>
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
      </form></div>
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
      <button onClick={handleInfoEcole}>retour en arrière</button>
    </div>
  );
};

export default SearchBar;
