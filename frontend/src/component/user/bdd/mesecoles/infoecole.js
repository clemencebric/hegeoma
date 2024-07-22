// frontend/src/SearchBar.js
import React, { useState } from 'react';
import axios from 'axios';
import "./infoecole.css";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:8081/search?search=${searchTerm}`);
      setResults(response.data);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='pageinfoecole'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      <ul>
        {results.map((result) => (
          <li key={result.id}>
            {result.nom}
            {result.prenom}
            {result.classe}
            </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;

