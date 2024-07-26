import React, { useEffect, useState } from 'react';
import './entreprise.css';
import { getUserEmailAndStatus } from '../../../header/statut';
import { useNavigate } from 'react-router-dom';
import { get, remove } from '../../../fonctions/getpost';

function Entreprises() {
  const [organismes, setOrganismes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userData = getUserEmailAndStatus();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idutilisateur = userData.id;
        const response = await get(`organismes/${idutilisateur}`);
        setOrganismes(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleVoirPlus = (idorg) => {
    localStorage.setItem('idorg', idorg);
    navigate(`/infoorg`);
  };

  const handleDeleteOrganisme = async (idorg) => {
    try {
      const response = await remove(`deleteorganisme/${idorg}`);
      if (response.success) {
        // Mettre à jour la liste des organismes après la suppression
        setOrganismes(prev => prev.filter(organisme => organisme.idorg !== idorg));
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className='pageentreprise'>Loading...</div>;
  if (error) return <div className='pageentreprise'>Error: {error}</div>;

  return (
    <div className='pageentreprise'>
      <div className='pageblancheentreprise'>
        <h1>Informations sur les Organismes</h1>
        <table className='tableauorganismes'>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Adresse</th>
              <th>Code Postal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {organismes.map((organisme) => (
              <tr key={organisme.idorg}>
                <td>{organisme.nom}</td>
                <td>{organisme.adresse}</td>
                <td>{organisme.codepostal}</td>
                <td>
                  <button onClick={() => handleVoirPlus(organisme.idorg)}>Voir plus</button>
                  <button onClick={() => handleDeleteOrganisme(organisme.idorg)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Entreprises;
