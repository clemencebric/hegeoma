import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../../../fonctions/getpost';
import { getUserEmailAndStatus } from '../../../header/statut';
import "./orgform.css";

function OrgForm() {
  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [fournisseur, setFournisseur] = useState('');
  const [autreFournisseur, setAutreFournisseur] = useState('');
  const [appareils, setAppareils] = useState([]);
  const [jamfs, setJamfs] = useState([]);
  const [applications, setApplications] = useState(['']);
  const [restriction, setRestriction] = useState('');
  const userData = getUserEmailAndStatus();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const idutilisateur = userData.id;
    const finalFournisseur = fournisseur === 'Autre' ? autreFournisseur : fournisseur;

    const orgData = {
      idutilisateur,
      nom,
      adresse,
      codepostal: codePostal,
      fournisseur: finalFournisseur,
      appareils,
      jamfs,
      appli: applications,
      restriction,
    };

    try {
      const response = await post('createorg', orgData);
      if (response.success) {
        navigate(`/orgform`);
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

  const handleJamfChange = (e) => {
    const value = e.target.value;
    setJamfs((prev) => {
      if (prev.includes(value)) {
        return prev.filter((jamf) => jamf !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleAppareilChange = (e) => {
    const value = e.target.value;
    setAppareils((prev) => {
      if (prev.includes(value)) {
        return prev.filter((appareil) => appareil !== value);
      } else {
        return [...prev, value];
      }
    });
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
          <label className='labelformorg'>Quels types d'appareils avez-vous ?</label>
          <div className='checkbox-group'>
            <label>
              <input
                type="checkbox"
                value="iOS"
                checked={appareils.includes('iOS')}
                onChange={handleAppareilChange}
              />
              iOS
            </label>
            <label>
              <input
                type="checkbox"
                value="MacOS"
                checked={appareils.includes('MacOS')}
                onChange={handleAppareilChange}
              />
              MacOS
            </label>
            <label>
              <input
                type="checkbox"
                value="VisionOS"
                checked={appareils.includes('VisionOS')}
                onChange={handleAppareilChange}
              />
              VisionOS
            </label>
            <label>
              <input
                type="checkbox"
                value="TvOS"
                checked={appareils.includes('TvOS')}
                onChange={handleAppareilChange}
              />
              TvOS
            </label>
            <label>
              <input
                type="checkbox"
                value="Apple Watch"
                checked={appareils.includes('Apple Watch')}
                onChange={handleAppareilChange}
              />
              Apple Watch
            </label>
          </div>
          
         
          
          <label className='labelformorg'>Quel service de Jamf voulez-vous utiliser ?</label>
          <div className='checkbox-group'>
            <label>
              <input
                type="checkbox"
                value="Jamf Pro"
                checked={jamfs.includes('Jamf Pro')}
                onChange={handleJamfChange}
              />
              Jamf Pro
            </label>
            <label>
              <input
                type="checkbox"
                value="Jamf Protect"
                checked={jamfs.includes('Jamf Protect')}
                onChange={handleJamfChange}
              />
              Jamf Protect
            </label>
            <label>
              <input
                type="checkbox"
                value="Jamf Connect"
                checked={jamfs.includes('Jamf Connect')}
                onChange={handleJamfChange}
              />
              Jamf Connect
            </label>
            <label>
              <input
                type="checkbox"
                value="Jamf Business"
                checked={jamfs.includes('Jamf Business')}
                onChange={handleJamfChange}
              />
              Jamf Business
            </label>
          </div>
          
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
