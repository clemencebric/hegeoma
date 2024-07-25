import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../../../fonctions/getpost';
import "./orgform.css";

function OrgForm() {
  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [fournisseur, setFournisseur] = useState('');
  const [autreFournisseur, setAutreFournisseur] = useState('');
  const [appareil, setAppareil] = useState('');
  const [jamf, setJamf] = useState('');
  const [applications, setApplications] = useState(['']);
  const [restriction, setRestriction] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalFournisseur = fournisseur === 'Autre' ? autreFournisseur : fournisseur;

    const orgData = {
      nom,
      adresse,
      codepostal: codePostal,
      fournisseur: finalFournisseur,
      appareil,
      jamf,
      appli: applications,
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

  const handleApplicationChange = (index, value) => {
    const newApplications = [...applications];
    newApplications[index] = value;
    setApplications(newApplications);
  };

  const addApplicationField = () => {
    setApplications([...applications, '']);
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

          <label className='labelformorg'>Quel type d'appareil avez-vous ?</label>
          <select className='inputformorg' value={appareil} onChange={(e) => setAppareil(e.target.value)} required>
            <option value="" disabled>Choisissez un type d'appareil</option>
            <option value="iOS">iOS</option>
            <option value="MacOS">MacOS</option>
            <option value="VisionOS">VisionOS</option>
            <option value="TvOS">TvOS</option>
            <option value="Apple Watch">Apple Watch</option>
          </select>
          
          <label className='labelformorg'>Quel est votre fournisseur d'identité</label>
          <select className='inputformorg' value={fournisseur} onChange={(e) => setFournisseur(e.target.value)} required>
            <option value="" disabled>Choisissez un fournisseur</option>
            <option value="Office 365">Office 365</option>
            <option value="WorkSpace">WorkSpace</option>
            <option value="Okta">Okta</option>
            <option value="OneLogin">OneLogin</option>
            <option value="Autre">Autre</option>
          </select>
          {fournisseur === 'Autre' && (
            <input 
              className='inputformorg' 
              placeholder="Entrez un autre fournisseur" 
              value={autreFournisseur} 
              onChange={(e) => setAutreFournisseur(e.target.value)} 
              required 
            />
          )}
          
          <label className='labelformorg'>Quel service de Jamf voulez-vous utiliser ?</label>
          <select className='inputformorg' value={jamf} onChange={(e) => setJamf(e.target.value)} required>
            <option value="" disabled>Choisissez un service Jamf</option>
            <option value="Service 1">Jamf Pro</option>
            <option value="Service 2">Jamf Protect</option>
            <option value="Service 3">Jamf Connect</option>
            <option value="Service 4">Jamf Business</option>
          </select>
          
          <label className='labelformorg'>Quelles applications voulez-vous distribuer ?</label>
          {applications.map((application, index) => (
            <div key={index}>
              <input
                className='inputformorg'
                placeholder={`Application ${index + 1}`}
                value={application}
                onChange={(e) => handleApplicationChange(index, e.target.value)}
                required
              />
            </div>
          ))}
          <button type="button" onClick={addApplicationField} className='addAppButton'>
            Ajouter une application
          </button>

          <label className='labelformorg'>Quelles restrictions voulez-vous mettre en place ?</label>
          <textarea className='inputformorg formlong' placeholder="Listez les restrictions" value={restriction} onChange={(e) => setRestriction(e.target.value)} required />
          
          <button type="submit" className='submitformorg'>Soumettre</button>
        </form>
      </div>
    </div>
  );
}

export default OrgForm;
