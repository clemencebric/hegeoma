import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserEmailAndStatus } from '../../../header/statut';
import { get, post, remove } from '../../../fonctions/getpost';
import "./orgform.css";


function OrgForm() {
  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [ville, setVille] = useState('');
  const [enumValues, setEnumValues] = useState([]);
  const [codePostal, setCodePostal] = useState('');
  const [nomDomaine, setNomDomaine] = useState('');
 
  const navigate = useNavigate();
  const iduserData = getUserEmailAndStatus();
  const idutilisateur = iduserData.id;

  /*const handleSubmit = async (e) => {
    e.preventDefault();

    const OrgData = {
      idutilisateur,
      nom,
      adresse,
      ville,
      codepostal: codePostal,
    };

    try {
      const response = await post('createorg', orgData);
      setIdecole(response.idorg); //id de l'ecole pour laquelle nous allons creer classe eleves et profs
      localStorage.setItem('idorg', response.idorg);
     // navigate(`/appecole`);
    } catch (error) {
      console.error(error);
    }
  };*/

  return (
    <div className='pageorgform'>
        <div className='pageblancheorg'>
            <h1>Créer un formulaire</h1>
        <form className="orgform" >
            <label className='labelformorg'>Nom de l'organisme</label>
            <input className='inputformorg' placeholder='entrez le nom'></input>
            <label className='labelformorg'>Adresse de l'organisme</label>
            <input className='inputformorg'  placeholder="entrez l'adresse"></input>
            <label className='labelformorg'>entrez le code postal</label>
            <input className='inputformorg' placeholder="entrez le code postal"></input>
            <hr/>
            <label className='labelformorg'>Quel type d'appareil avez vous ?</label>
            <input className='inputformorg'></input>
            <label className='labelformorg'>Quel service de Jamf voulez vous utiliser ?</label>
            <input className='inputformorg'></input>
            <label className='labelformorg'>Quel fournisseur d'identité utilisez-vous ?</label>
            <input className='inputformorg'></input>
            <label className='labelformorg'>Quel restriction voulez vous imposer ?</label>
            <textarea className='inputformorg formlong'></textarea>
            <label className='labelformorg'> Quelles application voulez vous distribuer ?</label>
            <textarea className='inputformorg formlong'></textarea>
        </form>
        </div>
    </div>
  );
}

export default OrgForm;
