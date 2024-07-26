import React, { useEffect, useState } from 'react';
import { get } from '../../../fonctions/getpost';
import './infosupentreprise.css';

function OrganismeDetails() {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const idorg = localStorage.getItem('idorg');
      if (!idorg) {
        setError('No organisme ID found in localStorage');
        setLoading(false);
        return;
      }
      try {
        const response = await get(`organisme/${idorg}`);
        setDetails(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className='pageorganismeinfosup'>Loading...</div>;
  if (error) return <div className='pageorganismeinfosup'>Error: {error}</div>;

  const { organisme, appareils, jamf, appli } = details;

  return (
    <div className='pageorganismeinfosup'>
      <div className='details'>
        <h1>Détails de l'Organisme</h1>
        <h2>{organisme.nom}</h2>
        <p>Adresse: {organisme.adresse}</p>
        <p>Code Postal: {organisme.codepostal}</p>
        <p>Fournisseur: {organisme.fournisseur}</p>
        <p>Restrictions: {organisme.restrictions}</p>

        <h3>Appareils</h3>
        <ul>
          {appareils.map((appareil, index) => (
            <li key={index}>{appareil.nom}</li>
          ))}
        </ul>

        <h3>Jamf</h3>
        <ul>
          {jamf.map((j, index) => (
            <li key={index}>{j.nom}</li>
          ))}
        </ul>

        <h3>Applications</h3>
        <ul>
          {appli.map((a, index) => (
            <li key={index}>{a.nom}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OrganismeDetails;
