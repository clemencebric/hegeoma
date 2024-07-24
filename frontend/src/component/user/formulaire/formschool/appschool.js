import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserEmailAndStatus } from '../../../header/statut';
import { get, post, remove } from '../../../fonctions/getpost';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import './classes.css';

function Schoolapp() {
  const [nomapp, setNomApp] = useState('');
  const [apps, setApps] = useState([]);
  const navigate = useNavigate();
  const iduserData = getUserEmailAndStatus();
  const idecole = localStorage.getItem('idecole') || null;

  const handleNext = () => {
    navigate('/classes');
  };

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const response = await get(`getapps/${idecole}`);
        setApps(response.map(app => ({ idapp: app.idapp, nomapp: app.nomapp })));
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchApps();
  }, [idecole]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const AppData = {
      idecole,
      nomapp,
    };
  
    try {
      const response = await post('createappshcool', AppData);
      const newApp = { idapp: response.insertId, nomapp: response.nomapp || nomapp }; // Utilisation de insertId
      setApps([...apps, newApp]);
      setNomApp('');
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleDelete = async (appId) => {
    try {
      console.log(appId);
      await remove(`deleteapp/${appId}`);
      setApps(apps.filter(app => app.idapp !== appId));
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className='pageclasse'>
      <div className='pageblanche'>
        <h1>Ajout des Applications</h1>
        <div className='partieform'>
          <div className='classeform'>
            <form className="formgauche" onSubmit={handleSubmit}>
              <label htmlFor="nomapp">Nom de l'application:</label>
              <input
                type="text"
                id="nomapp"
                value={nomapp}
                placeholder="Entrez le nom de l'application"
                onChange={(e) => setNomApp(e.target.value)}
              />
              <button type="submit">Créer</button>
            </form>
          </div>
          <div className='classelist'>
            <div className='slidebar'>
              <table className='tableauclasse'>
                <thead className='hauttableau'>
                  <tr>
                    <th>Nom de l'application</th>
                    <th>Supprimer</th>
                  </tr>
                </thead>
                <tbody>
                  {apps.map(app => (
                    <tr key={app.id}>
                      <td>{app.nomapp}</td>
                      <td>
                        <button
                          className='iconepoubelle'
                          onClick={() => handleDelete(app.idapp)}
                        >
                          <FontAwesomeIcon icon={faTrash} style={{ color: "#000000" }} size="2x" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <button onClick={handleNext} className='boutonsuivant'>Suivant</button>
        </div>
      </div>
    </div>
  );
}

export default Schoolapp;
