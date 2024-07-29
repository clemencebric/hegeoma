import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserEmailAndStatus } from '../../../header/statut';
import { post } from '../../../fonctions/getpost';
import "./formschool.css";

function SchoolForm() {
  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [ville, setVille] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [nomDomaine, setNomDomaine] = useState('');
  const [emaileleve, setEmaileleve] = useState('');
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
      localStorage.setItem('idecole', response.idecole);
      navigate(`/appecole`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='fond-page-form-ecole'>
      <div className='page-blanche-form-ecole'>
        <h1>Création d'école</h1>
        <form className="school-form" onSubmit={handleSubmit}>
          <label className="label-school-form" htmlFor="nom">Nom:</label>
          <input
            className='form-school-input'
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />

          <label className="label-school-form" htmlFor="adresse">Adresse:</label>
          <input
            className='form-school-input'
            type="text"
            id="adresse"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
            required
          />

          <label className="label-school-form" htmlFor="ville">Ville:</label>
          <input
            className='form-school-input'
            type="text"
            id="ville"
            value={ville}
            onChange={(e) => setVille(e.target.value)}
            required
          />

          <label className="label-school-form" htmlFor="codePostal">Code postal:</label>
          <input
            className='form-school-input'
            type="text"
            id="codePostal"
            value={codePostal}
            onChange={(e) => setCodePostal(e.target.value)}
            required
          />

          <label className="label-school-form" htmlFor="nomDomaine">Nom de domaine:</label>
          <input
            className='form-school-input'
            type="text"
            id="nomDomaine"
            value={nomDomaine}
            onChange={(e) => setNomDomaine(e.target.value)}
            required
          />

          <label className="label-school-form" htmlFor="emaileleve">Emaileleve:</label>
          <select 
            className="select-school-form" 
            id="emaileleve" 
            value={emaileleve} 
            onChange={(e) => setEmaileleve(e.target.value)} 
            required>
            <option value="">Sélectionnez une option</option>
            <option value="prenom.nom@domaine">prenom.nom@domaine</option>
            <option value="initiale.nom@domaine">initiale.nom@domaine</option>
          </select>

          <button className="button-school-form" type="submit">Suivant</button>
        </form>
      </div>
    </div>
  );
}

export default SchoolForm;
