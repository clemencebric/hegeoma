import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { get, post, remove } from '../../../fonctions/getpost';
import { getUserEmailAndStatus } from '../../../header/statut';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import './prof.css';

function Prof() {
    const [nomProf, setNomProf] = useState('');
    const [prenomProf, setPrenomProf] = useState('');
    const [idecole, setIdecole] = useState(localStorage.getItem('idecole') || null);
    const [professeurs, setProfesseurs] = useState([]);
    const [classes, setClasses] = useState([]);
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();
    const iduserData = getUserEmailAndStatus();
    const idutilisateur = iduserData.id;

    const handleClassSelect = (idclasse) => {
        if (selectedClasses.includes(idclasse)) {
            setSelectedClasses(selectedClasses.filter((id) => id !== idclasse));
        } else {
            setSelectedClasses([...selectedClasses, idclasse]);
        }
    };

    const fetchClasses = async () => {
        try {
            const response = await get(`classes/${idecole}`);
            setClasses(response);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchProfesseurs = async () => {
        try {
            const response = await get(`professeurs/${idecole}`);
            const profs = response;
            const profsWithClasses = await Promise.all(profs.map(async (prof) => {
                const classNames = await getClassNames(prof.idprof);
                return { ...prof, classe: classNames };
            }));
            setProfesseurs(profsWithClasses);
        } catch (error) {
            console.error(error);
        }
    };

    const getClassNames = async (idprof) => {
        try {
            const response = await get(`profclasse/${idprof}`);
            const classNames = response.map((item) => item.classe);
            return classNames.join(', ');
        } catch (error) {
            console.error(error);
            return '';
        }
    };

    useEffect(() => {
        fetchClasses();
    }, [idecole, refresh]);

    useEffect(() => {
        fetchProfesseurs();
    }, [refresh]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const profData = {
            idecole,
            nom: nomProf,
            prenom: prenomProf,
            idclasses: selectedClasses,
        };

        try {
            const response = await post('createprofesseur', profData);
            setNomProf('');
            setPrenomProf('');
            setSelectedClasses([]);
            setRefresh(!refresh);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteProf = async (idprof) => {
        try {
            await remove(`deleteprofesseur/${idprof}`);
            setRefresh(!refresh);
        } catch (error) {
            console.error('Erreur lors de la suppression du professeur :', error);
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
                                        <th>Email</th>
                                        <th>Classe</th>
                                        <th>Supprimer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {professeurs.map(prof => (
                                        <tr key={prof.idprof}>
                                            <td>{prof.prenom}</td>
                                            <td>{prof.nom}</td>
                                            <td>{prof.email}</td>
                                            <td>{prof.classe}</td>
                                            <td>
                                                <button className="poubelleprof" onClick={() => handleDeleteProf(prof.idprof)}>
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
                    <button className='boutonsuivantprof' onClick={() => navigate('/userschool')}>Terminer</button>
                </div>
            </div>
        </div>
    );
}

export default Prof;
