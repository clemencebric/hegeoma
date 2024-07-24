import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserEmailAndStatus } from '../../../header/statut';
import { get, post, remove } from '../../../fonctions/getpost';
import "./formschool.css";


function SchoolForm() {
  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [ville, setVille] = useState('');
  const [enumValues, setEnumValues] = useState([]);
  const [codePostal, setCodePostal] = useState('');
  const [nomDomaine, setNomDomaine] = useState('');
  const [emaileleve, setEmaileleve] = useState('');
  const [idecole, setIdecole] = useState(null); 
  const navigate = useNavigate();
  const iduserData = getUserEmailAndStatus();
  const idutilisateur = iduserData.id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const schoolData = {
      idutilisateur,
      nom,
      adresse,
      ville,
      codepostal: codePostal,
      nomdomaine: nomDomaine,
      emaileleve,
    };

    try {
      const response = await post('createschool', schoolData);
      setIdecole(response.idecole); //id de l'ecole pour laquelle nous allons creer classe eleves et profs
      localStorage.setItem('idecole', response.idecole);
      navigate(`/appecole`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="schoolform" onSubmit={handleSubmit}>
      <label htmlFor="nom">Nom:</label>
      <input
        type="text"
        id="nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
      />

      <label htmlFor="adresse">Adresse:</label>
      <input
        type="text"
        id="adresse"
        value={adresse}
        onChange={(e) => setAdresse(e.target.value)}
      />

      <label htmlFor="ville">Ville:</label>
      <input
        type="text"
        id="ville"
        value={ville}
        onChange={(e) => setVille(e.target.value)}
      />

      <label htmlFor="codePostal">Code postal:</label>
      <input
        type="text"
        id="codePostal"
        value={codePostal}
        onChange={(e) => setCodePostal(e.target.value)}
      />

      <label htmlFor="nomDomaine">Nom de domaine:</label>
      <input
        type="text"
        id="nomDomaine"
        value={nomDomaine}
        onChange={(e) => setNomDomaine(e.target.value)}
      />

<label htmlFor="emaileleve">Emaileleve:</label>
      <select id="emaileleve" value={emaileleve} onChange={(e) => setEmaileleve(e.target.value)}>
        <option value="">Sélectionnez une option</option>
        <option value="prenom.nom@domaine">prenom.nom@domaine</option>
        <option value="initiale.nom@domaine">initiale.nom@domaine</option>
      </select>

      <button type="submit">Suivant</button>
    </form>
  );
}

export default SchoolForm;
