import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getUserEmailAndStatus } from '../../../header/statut';
import './classes.css';

function Classes() {
  const [nom, setNom] = useState('');
  const [classes, setClasses] = useState([]);
  const [idecole, setIdecole] = useState(localStorage.getItem('idecole') || null); // Déplacer la déclaration de idecole en dehors de handleSubmit
  const navigate = useNavigate();
  const iduserData = getUserEmailAndStatus();
  const idutilisateur = iduserData.id;

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:8081/classes');
        setClasses(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClasses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const classeData = {
      idutilisateur,
      nom,
      idecole, // Ajouter idecole aux données de la classe
    };

    try {
      const response = await axios.post('http://localhost:8081/createclass', classeData);
      console.log(response.data);
      setNom('');
      setClasses([...classes, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='pageclasse'>
      <div className='classeform'>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nom">Nom de la classe:</label>
          <input
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
          <button type="submit">Créer</button>
        </form>
      </div>
      <div className='classelist'>
  <table>
    <thead>
      <tr>
        <th>Nom de la classe</th>
      </tr>
    </thead>
    <tbody>
      {classes.map(classe => (
        <tr key={classe.id}>
          <td>{classe.nom}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
<div>
  <button> suivant </button>
</div>
    </div>
  );
}

export default Classes;
