import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserEmailAndStatus } from '../../../header/statut';
import { post } from '../../../fonctions/getpost';
import "./orgform.css";

function OrgForm() {
  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [fournisseur, setFournisseur] = useState('');
  const [appareil, setAppareil] = useState('');
  const [jamf, setJamf] = useState('');
  const [appli, setAppli] = useState('');
  const [restriction, setRestriction] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orgData = {
      nom,
      adresse,
      codepostal: codePostal,
      fournisseur,
      appareil,
      jamf,
      appli,
      restriction,
    };

    try {
      const response = await post('createorg', orgData);
      if (response.success) {
        navigate(`/appecole/${response.idOrganisme}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='pageorgform'>
      <div className='pageblancheorg'>
        <h1>Créer un formulaire</h1>
        <form className="orgform" onSubmit={handleSubmit}>
          <label className='labelformorg'>Nom de l'organisme</label>
          <input className='inputformorg' placeholder='Entrez le nom' value={nom} onChange={(e) => setNom(e.target.value)} required />
          
          <label className='labelformorg'>Adresse de l'organisme</label>
          <input className='inputformorg' placeholder="Entrez l'adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} required />
          
          <label className='labelformorg'>Code postal</label>
          <input className='inputformorg' placeholder="Entrez le code postal" value={codePostal} onChange={(e) => setCodePostal(e.target.value)} required />
         
          <hr/>

          <label className='labelformorg'>Quel est votre fournisseur d'identité</label>
          <input className='inputformorg' placeholder="Entrez le fournisseur" value={fournisseur} onChange={(e) => setFournisseur(e.target.value)} required />
          
          <label className='labelformorg'>Quel type d'appareil avez-vous ?</label>
          <input className='inputformorg' placeholder="Entrez le type d'appareil" value={appareil} onChange={(e) => setAppareil(e.target.value)} required />
          
          <label className='labelformorg'>Quel service de Jamf voulez-vous utiliser ?</label>
          <input className='inputformorg' placeholder="Entrez le service Jamf" value={jamf} onChange={(e) => setJamf(e.target.value)} required />
          
          <label className='labelformorg'>Quelles applications voulez-vous distribuer ?</label>
          <textarea className='inputformorg formlong' placeholder="Listez les applications" value={appli} onChange={(e) => setAppli(e.target.value)} required />

          <label className='labelformorg'>Quelles restrictions voulez vous mettre en place ?</label>
          <textarea className='inputformorg formlong' placeholder="Listez les restrictions" value={restriction} onChange={(e) => setRestriction(e.target.value)} required />
          
          <button type="submit" className='submitformorg'>Soumettre</button>
        </form>
      </div>
    </div>
  );
}

export default OrgForm;
