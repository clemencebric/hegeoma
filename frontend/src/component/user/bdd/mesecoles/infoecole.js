import React, { useEffect, useState } from 'react';
import { get } from '../../../fonctions/getpost';
import { useNavigate } from 'react-router-dom';
import "./infoecole.css";
const EcoleInfo = () => {
  const [ecole, setEcole] = useState({});
    const navigate = useNavigate();
  useEffect(() => {
    const idecole = localStorage.getItem('idecole');

    const fetchEcole = async () => {
      try {
        const response = await get(`ecole?idecole=${idecole}`);
        setEcole(response[0]);
      } catch (error) {
        console.error('Error fetching ecole:', error);
      }
    };

    fetchEcole();
  }, []);
  const handleEleves = () => {
    navigate('/infoeleve');
  };
  const handleProf = () => {
    navigate('/infoprof');
  };
  const handleRetour = () => {
    navigate('/userschool');
  };
  return (
    <div className='pageinfoecolee'>
        <h1>{ecole.nom}</h1>
      <table>
        <thead>
          <tr>
            <th>Adresse</th>
            <th>Ville</th>
            <th>Code postal</th>
            <th>Nom de domaine</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            
            <td>{ecole.adresse}</td>
            <td>{ecole.ville}</td>
            <td>{ecole.codepostal}</td>
            <td>{ecole.nomdomaine}</td>
          </tr>
        </tbody>
      </table>
      <div className='boutonsinfos'>
      <button onClick={handleEleves} className='boutoninfo'>Eleves</button>
      <button onClick={handleProf} className='boutoninfo'>Professeurs</button>
      </div>
      <button onClick={handleRetour} >Retour en arrière</button>
    </div>
  );
};

export default EcoleInfo;
