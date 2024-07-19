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
  const handleNext = () => {
    navigate('/eleves');
  };
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const idecole = localStorage.getItem('idecole');
        const response = await axios.get(`http://localhost:8081/classes/${idecole}`); // Ajouter l'id de l'école à l'URL
        setClasses(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchClasses();
  }, [idecole]);

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
      // Vérifier si response.data a un nom, sinon utiliser le nom du state
      const newClasse = { ...response.data, nom: response.data.nom || nom };
      setClasses([...classes, newClasse]);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/deleteclass/${id}`);
      setClasses(classes.filter(classe => classe.id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='pageclasse'>
      <div className='pageblanche'>
      <div className='partieform'>
      <div className='classeform'>
        <form className="formgauche" onSubmit={handleSubmit}>
          <label htmlFor="nom">Nom de la classe:</label>
          <input
            type="text"
            id="nom"
            value={nom}
            placeholder='Entrez le nom de la classe'
            onChange={(e) => setNom(e.target.value)}
          />
          <button type="submit">Créer</button>
        </form>
      </div>
      <div className='classelist'>
        <div className='slidebar'>
  <table className='tableauclasse'>
    <thead className='hauttableau'>
      <tr>
        <th>Nom de la classe</th>
        <th>Supprimer</th>
      </tr>
    </thead>
    <tbody>
      {classes.map(classe => (
        <tr key={classe.id}>
          <td>{classe.nom}</td>
          <td>
            <button onClick={() => handleDelete(classe.id)}>Supprimer</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table></div>
</div>
</div>
<div>
  <button onClick={handleNext} className='boutonsuivant'> suivant </button>
</div>
    </div></div>
  );
}

export default Classes;
