import React, { useEffect, useState } from 'react';
import { get } from '../fonctions/getpost';
import "../user/bdd/mesentreprises/infosupentreprise.css"

function OrganismeDetailsAdmin() {
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

    // Ajouter un gestionnaire d'événements pour beforeunload
    const handleBeforeUnload = () => {
      localStorage.removeItem('idorg');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Nettoyer le gestionnaire d'événements lorsque le composant est démonté
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  if (loading) return <div className='pageorganismeinfosup'>Loading...</div>;
  if (error) return <div className='pageorganismeinfosup'>Error: {error}</div>;

  const { organisme, appareils, jamf, appli } = details;

  return (
    <div className='pageorganismeinfosup'>
     <div className='pageblancheinfosup'>
      <div className='detailsinfosup'>
        <h1>Détails de l'Organisme</h1>
        <table className='tableaudetailsinfosup'>
          <tbody>
            <tr>
              <th>Nom</th>
              <td>{organisme.nom}</td>
            </tr>
            <tr>
              <th>Adresse</th>
              <td>{organisme.adresse}</td>
            </tr>
            <tr>
              <th>Code Postal</th>
              <td>{organisme.codepostal}</td>
            </tr>
            <tr>
              <th>Fournisseur</th>
              <td>{organisme.fournisseur}</td>
            </tr>
            <tr>
              <th>Restrictions</th>
              <td>{organisme.restrictions}</td>
            </tr>
          </tbody>
        </table>
        <h3>Appareils</h3>
        <ul>
          {appareils.map((appareil, index) => (
            <li key={index}>{appareil.nom}</li>
          ))}
        </ul>

        <h3>Produit Jamf</h3>
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
    </div>
  );
}

export default OrganismeDetailsAdmin;
