import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserEmailAndStatus } from '../../../header/statut';
import { get, post, remove } from '../../../fonctions/getpost';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import './classes.css';

function Classes() {
  const [nom, setNom] = useState('');
  const [classes, setClasses] = useState([]);
  const [lastClassId, setLastClassId] = useState(null); // État pour stocker le dernier ID
  const idecole = localStorage.getItem('idecole') || null; // Utilisation directe de idecole ici
  const navigate = useNavigate();
  const iduserData = getUserEmailAndStatus();
  const idutilisateur = iduserData.id;

  const handleNext = () => {
    navigate('/eleves');
  };
  
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await get(`classes/${idecole}`);
        setClasses(response.map(classe => ({ idclasse: classe.idclasse, nom: classe.nom }))); // Utilisation de classe.idclasse au lieu de classe.id
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchClasses();
  }, [idecole]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const classeData = {
      idutilisateur,
      nom,
      idecole,
    };
  
    try {
      const response = await post('createclass', classeData);
      setNom('');
      const newClasse = { idclasse: response.idclasse, nom: response.nom || nom }; // Utilisation de response.idclasse au lieu de response.id
      setClasses([...classes, newClasse]);
      setLastClassId(response.idclasse); // Utilisation de response.idclasse au lieu de response.id
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleDeleteClass = async (classId) => {
    try {
      await remove(`deleteclass/${classId}`);
      setClasses(classes.filter(classe => classe.idclasse !== classId)); // Utilisation de classe.idclasse au lieu de classe.id
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className='pageclasse'>
      <div className='pageblanche'>
        <h1>Creation des classes</h1>
        <div className='partieform'>
          <div className='classeform'>
            <form className="formgauche" onSubmit={handleSubmit}>
              <label htmlFor="nom">Nom de la classe:</label>
              <input
                type="text"
                id="nom"
                value={nom}
                placeholder='Entrez le nom de la classe'
                onChange={(e) => setNom(e.target.value)}
              />
              <button type="submit">Créer</button>
            </form>
          </div>
          <div className='classelist'>
            <div className='slidebar'>
              <table className='tableauclasse'>
                <thead className='hauttableau'>
                  <tr>
                    <th>Nom de la classe</th>
                    <th>Supprimer</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map(classe => (
                    <tr key={classe.idclasse}>
                      <td>{classe.nom}</td>
                      <td>
                        <button
                          className='iconepoubelle'
                          onClick={() => handleDeleteClass(classe.idclasse)}
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
        {lastClassId && <p>Last created class ID: {lastClassId}</p>} {/* Affichage de l'ID */}
      </div>
    </div>
  );
}

export default Classes;
