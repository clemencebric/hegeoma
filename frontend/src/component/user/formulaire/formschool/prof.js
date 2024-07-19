import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getUserEmailAndStatus } from '../../../header/statut';
import './prof.css';

function Prof() {
    const [nomProf, setNomProf] = useState('');
    const [prenomProf, setPrenomProf] = useState('');
    const [selectedClassName, setSelectedClassName] = useState('');
    const [email, setEmail] = useState(''); //email du professeur
    const [idecole, setIdecole] = useState(localStorage.getItem('idecole') || null);
    const [professeurs, setProfesseurs] = useState([]);
    const [classes, setClasses] = useState([]);
    const [idclasse, setIdclasse] = useState('');
    const [refresh, setRefresh] = useState(false); // état pour forcer le rafraîchissement des classes
    const navigate = useNavigate();
    const iduserData = getUserEmailAndStatus();
    const idutilisateur = iduserData.id;


  const getClassName = async (idclasse) => {
    try {
      const response = await axios.get(`http://localhost:8081/classe/${idclasse}`);
      console.log(response);
      return response.data.classe;
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
      const response = await axios.get(`http://localhost:8081/classes/${idecole}`);
      setClasses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [idecole, refresh]); // ajouter refresh comme dépendance


  const handleSubmit = async (e) => {
    e.preventDefault();
    const classeName = await getClassName(idclasse);
  
    const profData = {
      idecole,
      idclasse,
      nom: nomProf,
      prenom: prenomProf,
      classe: classeName, // Utilise le nom de la classe sélectionnée
      email,
    };
  
    try {
      const response = await axios.post('http://localhost:8081/createprofesseur', profData);
      setNomProf('');
      setPrenomProf('');
      setEmail('');
      setProfesseurs([...professeurs, response.data]);
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className='pageprof'>
      <div className='pageblancheprof'>
        <div className='deuxpartiesprof'>
          <div className='partieformprof'>
            <div className='profform'>
              <form className="formgaucheprof" onSubmit={handleSubmit}>
              <label htmlFor="nom">Nom:</label>
        <input
          type="text"
          id="nom"
          value={nomProf}
          placeholder="Entrez le nom du professeur"
          onChange={(e) => setNomProf(e.target.value)}
        />
        <label htmlFor="prenom">Prénom:</label>
        <input
          type="text"
          id="prenom"
          value={prenomProf}
          placeholder="Entrez le prénom du professeur"
          onChange={(e) => setPrenomProf(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          placeholder="Entrez l'email du professeur"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Créer</button>
      </form>
            </div>
            <div className='proflist'>
              <table className='tableauprof'>
                <thead className='table-headerprof'>
                  <tr>
                    <th>Prenom</th>
                    <th>Nom</th>
                    <th>Classe</th>
                    <th>Supprimer</th>
                  </tr>
                </thead>
                <tbody>
                    {professeurs.map(prof => (
                        <tr key={prof.id}>
                            <td>{prof.prenom}</td>
                            <td>{prof.nom}</td>
                            <td>{prof.classe}</td>
                            <td>
                            <button>Supprimer</button>
                           </td>
                        </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <button className='boutonsuivantprof' onClick={() => navigate('/eleves')}>Suivant</button>
        </div>
      </div>
    </div>
  );
}

export default Prof;
