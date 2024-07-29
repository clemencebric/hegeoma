import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { get, post, remove } from '../../../fonctions/getpost';
import { getUserEmailAndStatus } from '../../../header/statut';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import './eleves.css';

function Eleves() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [selectedClassName, setSelectedClassName] = useState('');
  const [selectedClasses, setSelectedClasses] = useState({});
  const [emailpun, setEmailpun] = useState(''); // email parent 1
  const [emailpdeux, setEmaildeux] = useState(''); // email parent 2
  const [idecole, setIdecole] = useState(localStorage.getItem('idecole') || null);
  const [eleves, setEleves] = useState([]);
  const [classes, setClasses] = useState([]);
  const [idclasse, setIdclasse] = useState('');
  const [refresh, setRefresh] = useState(false); // état pour forcer le rafraîchissement des classes
  const navigate = useNavigate();
  const iduserData = getUserEmailAndStatus();
  const idutilisateur = iduserData.id;

  const handleClassChange = (e, eleveId) => {
    setSelectedClasses(prevSelectedClasses => ({
      ...prevSelectedClasses,
      [eleveId]: e.target.value
    }));
  };

  const getClassName = async (idclasse) => {
    try {
      const response = await get(`classe/${idclasse}`);
      return response.classe;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const updateClasses = (newClass) => {
    setClasses(prevClasses => [...prevClasses, newClass]);
  };

  const fetchClasses = async () => {
    try {
      const idecole = localStorage.getItem('idecole');
      const response = await get(`classes/${idecole}`);
      setClasses(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [idecole, refresh]); // ajouter refresh comme dépendance

  useEffect(() => {
    const fetchEleves = async () => {
      try {
        const idecole = localStorage.getItem('idecole');
        const response = await get(`eleves/${idecole}`);
        setEleves(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEleves();
  }, [idecole, refresh]); // ajouter refresh comme dépendance

  const handleSubmit = async (e) => {
    e.preventDefault();
    const className = await getClassName(idclasse);

    const eleveData = {
      idecole,
      idclasse,
      nom,
      prenom,
      classe: className, // Utilise le nom de la classe sélectionnée
      emailpun,
      emailpdeux
    };

    try {
      const response = await post('createeleve', eleveData);
      const newEleve = { ...response, nom, prenom, classe: className, idclasse };
      setEleves(prevEleves => [...prevEleves, newEleve]);
      setRefresh(!refresh);

      const newClass = { idclasse: idclasse, nom: selectedClassName };
      updateClasses(newClass);

      // Réinitialiser les champs du formulaire
      setNom('');
      setPrenom('');
      setEmailpun('');
      setEmaildeux('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleClassConfirm = async (eleveId) => {
    try {
      const selectedClass = selectedClasses[eleveId];
      const response = await post(`updateeleve/${eleveId}`, { idclasse: selectedClass });
      const updatedClassName = await getClassName(selectedClass);
      setEleves(prevEleves => prevEleves.map(eleve =>
        eleve.ideleve === eleveId ? { ...eleve, idclasse: selectedClass, classe: updatedClassName } : eleve
      ));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteEleve = async (eleveId) => {
    try {
      await remove(`eleve/${eleveId}`);
      setEleves(prevEleves => prevEleves.filter(eleve => eleve.ideleve !== eleveId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='pageeleve'>
      <div className='pageblancheeleve'>
        <h1>Informations sur les Eleves</h1>
        <div className='deuxpartieseleve'>
          <div className='partieformeleve'>
            <div className='eleveform'>
              <form className="formgaucheeleve" onSubmit={handleSubmit}>
                <label htmlFor="classe">Classe:</label>
                <select
                  id="classe"
                  value={idclasse}
                  onChange={(e) => {
                    setIdclasse(e.target.value);
                    const selectedClass = classes.find(classe => classe.idclasse === e.target.value);
                    setSelectedClassName(selectedClass ? selectedClass.nom : '');
                  }}
                >
                  <option value="">Sélectionnez une classe</option>
                  {classes.map((classe) => (
                    <option key={classe.idclasse} value={classe.idclasse}>
                      {classe.nom}
                    </option>
                  ))}
                </select>
                <label htmlFor="nom">Nom:</label>
                <input
                  type="text"
                  id="nom"
                  value={nom}
                  placeholder="Entrez le nom de l'élève"
                  onChange={(e) => setNom(e.target.value)}
                />
                <label htmlFor="prenom">Prénom:</label>
                <input
                  type="text"
                  id="prenom"
                  value={prenom}
                  placeholder="Entrez le prénom de l'élève"
                  onChange={(e) => setPrenom(e.target.value)}
                />
                <label htmlFor="emailpun">Email parent 1:</label>
                <input
                  type="email"
                  id="emailpun"
                  value={emailpun}
                  placeholder="Entrez l'email du parent 1"
                  onChange={(e) => setEmailpun(e.target.value)}
                />
                <label htmlFor="emailpdeux">Email parent 2:</label>
                <input
                  type="email"
                  id="emailpdeux"
                  value={emailpdeux}
                  placeholder="Entrez l'email du parent 2"
                  onChange={(e) => setEmaildeux(e.target.value)}
                />
                <button type="submit">Créer</button>
              </form>
            </div>
            <div className='elevelist'>
              <table className='tableaueleve'>
                <thead className='table-headereleve'>
                  <tr>
                    <th>Prénom</th>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Classe</th>
                    <th>Supprimer</th>
                  </tr>
                </thead>
                <tbody>
                  {eleves.map(eleve => (
                    <tr key={eleve.ideleve}>
                      <td>{eleve.prenom}</td>
                      <td>{eleve.nom}</td>
                      <td>{eleve.email}</td>
                      <td>
                        {eleve.classe ? eleve.classe : (
                          <>
                            <select value={selectedClasses[eleve.ideleve] || ''} onChange={(e) => handleClassChange(e, eleve.ideleve)}>
                              <option value="">Sélectionnez une classe</option>
                              {classes.map((classe) => (
                                <option key={classe.idclasse} value={classe.idclasse}>
                                  {classe.nom}
                                </option>
                              ))}
                            </select>
                            <button onClick={() => handleClassConfirm(eleve.ideleve)}>Confirmer</button>
                          </>
                        )}
                      </td>
                      <td>
                        <button className='poubelleeleve' onClick={() => handleDeleteEleve(eleve.ideleve)}>
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
          <button className='boutonsuivanteleve' onClick={() => navigate('/prof')}>Suivant</button>
        </div>
      </div>
    </div>
  );
}

export default Eleves;
