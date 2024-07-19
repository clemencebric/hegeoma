import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getUserEmailAndStatus } from '../../../header/statut';
import './eleves.css';

function Eleves() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [classe, setClasse] = useState('');
  const [emailpun, setEmailpun] = useState(''); //email parent 1
  const [emailpdeux, setEmaildeux] = useState(''); //email parent 2
  const [idecole, setIdecole] = useState(localStorage.getItem('idecole') || null); // Déplacer la déclaration de idecole en dehors de handleSubmit
  const [eleves, setEleves] = useState([]);
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();
  const iduserData = getUserEmailAndStatus();
  const idutilisateur = iduserData.id;

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const idecole = localStorage.getItem('idecole');
        const response = await axios.get(`http://localhost:8081/classes/${idecole}`);
        setClasses(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchClasses();
  }, []);
  useEffect(() => {
    const fetchEleves = async () => {
      try {
        const idecole = localStorage.getItem('idecole');
        const response = await axios.get(`http://localhost:8081/eleves/${idecole}`); // Ajouter l'id de l'école à l'URL
        console.log("bonjour", response.data)
        setEleves(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchEleves();
  }, [idecole]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const eleveData = {
      idutilisateur,
      idecole,// Ajouter idecole aux données de la classe
      nom,
      prenom,
      classe,
      emailpun,
      emailpdeux,
    };
  
    try {
      const response = await axios.post('http://localhost:8081/createeleve', eleveData);
      console.log(response.data);
      setNom('');
      // Vérifier si response.data a un nom, sinon utiliser le nom du state
      const newEleve = { ...response.data, nom: response.data.nom || nom };
      setEleves([...eleves, newEleve]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='pageeleve'>
      <div className='pageblancheeleve'>
        <div className='deuxpartieseleve'>
      <div className='partieformeleve'>
      <div className='eleveform'>
      <form className="formgauche" onSubmit={handleSubmit}>
  <label htmlFor="nom">Nom:</label>
  <input
    type="text"
    id="nom"
    value={nom}
    placeholder="Entrez le nom de l'élève"
    onChange={(e) => setNom(e.target.value)}
  />
  <label htmlFor="prenom">Prénom:</label>
  <input
    type="text"
    id="prenom"
    value={prenom}
    placeholder="Entrez le prénom de l'élève"
    onChange={(e) => setPrenom(e.target.value)}
  />
<label htmlFor="classe">Classe:</label>
<select id="classe" value={classe} onChange={(e) => setClasse(e.target.value)}>
  <option value="">Sélectionnez une classe</option>
  {classes.map((classe) => (
    <option key={classe.id} value={classe.nom}>
      {classe.nom}
    </option>
  ))}
</select>
  <label htmlFor="emailpun">Email parent 1:</label>
  <input
    type="email"
    id="emailpun"
    value={emailpun}
    placeholder="Entrez l'email du parent 1"
    onChange={(e) => setEmailpun(e.target.value)}
  />
  <label htmlFor="emailpdeux">Email parent 2:</label>
  <input
    type="email"
    id="emailpdeux"
    value={emailpdeux}
    placeholder="Entrez l'email du parent 2"
    onChange={(e) => setEmaildeux(e.target.value)}
  />
  <button type="submit">Créer</button>
</form>

      </div>
      <div className='elevelist'>
  <table className='tableaueleve'>
    <thead className='table-headereleve' >
      <tr>
        <th>Nom de la classe</th>
        <th>Supprimer</th>
      </tr>
    </thead>
    <tbody>
      {eleves.map(eleve => (
        <tr key={eleve.id}>
          <td>{eleve.nom}</td>
          <td>
            <button >Supprimer</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div></div>
<div>
  <button className='boutonsuivanteleve'> suivant </button>
</div>
    </div></div>
  );
}

export default Eleves;
