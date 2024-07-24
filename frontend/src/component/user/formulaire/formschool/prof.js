import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getUserEmailAndStatus } from '../../../header/statut';
import './prof.css';

function Prof() {
    const [nomProf, setNomProf] = useState('');
    const [prenomProf, setPrenomProf] = useState('');
    const [email, setEmail] = useState(''); // Email du professeur
    const [idecole, setIdecole] = useState(localStorage.getItem('idecole') || null);
    const [professeurs, setProfesseurs] = useState([]);
    const [classes, setClasses] = useState([]);
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [refresh, setRefresh] = useState(false); // État pour forcer le rafraîchissement
    const navigate = useNavigate();
    const iduserData = getUserEmailAndStatus();
    const idutilisateur = iduserData.id;

    // Gestion de la sélection des classes
    const handleClassSelect = (idclasse) => {
        if (selectedClasses.includes(idclasse)) {
            setSelectedClasses(selectedClasses.filter((id) => id !== idclasse));
        } else {
            setSelectedClasses([...selectedClasses, idclasse]);
        }
    };

    // Fetch des classes depuis l'API
    const fetchClasses = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/classes/${idecole}`);
            setClasses(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Fetch des professeurs depuis l'API
    const fetchProfesseurs = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/professeurs/${idecole}`);
            const profs = response.data;
            // Pour chaque professeur, fetch des classes associées
            const profsWithClasses = await Promise.all(profs.map(async (prof) => {
                const classNames = await getClassNames(prof.idprof);
                return { ...prof, classe: classNames };
            }));
            setProfesseurs(profsWithClasses);
        } catch (error) {
            console.error(error);
        }
    };

    // Fetch des noms de classes associées à un professeur
    const getClassNames = async (idprof) => {
        try {
            const response = await axios.get(`http://localhost:8081/profclasse/${idprof}`);
            const classNames = response.data.map((item) => item.classe);
            return classNames.join(', ');
        } catch (error) {
            console.error(error);
            return '';
        }
    };

    useEffect(() => {
        fetchClasses();
    }, [idecole, refresh]); // Rechercher les classes au chargement et lors du rafraîchissement

    useEffect(() => {
        fetchProfesseurs();
    }, [refresh]); // Rechercher les professeurs au chargement et lors du rafraîchissement

    // Gestion de l'ajout d'un professeur
    const handleSubmit = async (e) => {
        e.preventDefault();

        const profData = {
            idecole,
            nom: nomProf,
            prenom: prenomProf,
            email,
            idclasses: selectedClasses,
        };

        try {
            const response = await axios.post('http://localhost:8081/createprofesseur', profData);
            // Réinitialiser les champs du formulaire
            setNomProf('');
            setPrenomProf('');
            setEmail('');
            // Ajouter le professeur à la liste et rafraîchir les données
            setProfesseurs(prev => [...prev, response.data]);
            setSelectedClasses([]);
            setRefresh(!refresh);
        } catch (error) {
            console.error(error);
        }
    };

    // Gestion de la suppression d'un professeur
    const handleDeleteProf = async (idprof) => {
        try {
            await axios.delete(`http://localhost:8081/deleteprofesseur/${idprof}`);
            // Mettre à jour la liste des professeurs
            setProfesseurs(prev => prev.filter(prof => prof.idprof !== idprof));
            setRefresh(!refresh);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='pageprof'>
            <div className='pageblancheprof'>
                <h1 className='titreprof'>INFORMATIONS SUR LES PROFESSEURS</h1>
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

                                <div className="class-list">
                                    <h4>Classes</h4>
                                    <div className='intclasslist'>
                                        {classes.map((classe) => (
                                            <div key={classe.idclasse} className="class-item">
                                                <input
                                                    type="checkbox"
                                                    id={`class-checkbox-${classe.idclasse}`}
                                                    checked={selectedClasses.includes(classe.idclasse)}
                                                    onChange={() => handleClassSelect(classe.idclasse)}
                                                />
                                                <label htmlFor={`class-checkbox-${classe.idclasse}`}>{classe.nom}</label>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="boutonajouter add-classes-btn" type="submit">Ajouter</button>
                                </div>
                            </form>
                        </div>
                        <div className='proflist'>
                            <table className='tableauprof'>
                                <thead className='table-headerprof'>
                                    <tr>
                                        <th>Prénom</th>
                                        <th>Nom</th>
                                        <th>Classe</th>
                                        <th>Supprimer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {professeurs.map(prof => (
                                        <tr key={prof.idprof}>
                                            <td>{prof.prenom}</td>
                                            <td>{prof.nom}</td>
                                            <td>{prof.classe}</td>
                                            <td>
                                                <button onClick={() => handleDeleteProf(prof.idprof)}>Supprimer</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div>
                    <button className='boutonsuivantprof' onClick={() => navigate('/userschool')}>Terminer</button>
                </div>
            </div>
        </div>
    );
}

export default Prof;
