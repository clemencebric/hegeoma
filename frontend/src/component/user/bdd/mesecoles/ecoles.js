import React, { useState, useEffect } from 'react';
import { getUserEmailAndStatus } from '../../../header/statut';
import { get } from '../../../fonctions/getpost';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./ecoles.css";
import { useNavigate } from 'react-router-dom';

const UserSchoolList = () => {
    const [schools, setSchools] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const tokendata = getUserEmailAndStatus();
        const token = tokendata.token;
        const userId = tokendata.id; // récupère l'ID de l'utilisateur connecté

        const fetchSchools = async () => {
            try {
                const response = await get('userschool', token);
                setSchools(response);
            } catch (error) {
                console.error('Error fetching schools:', error);
            }
        };

        fetchSchools();
    }, []);
    const handleEyeClick = (schoolId) => {
        localStorage.setItem('idecole', schoolId);
        navigate('/infoecole'); // remplacez '/pagevuglobale' par le chemin de la page que vous souhaitez afficher
    };

    return (
        <div className='pageadmin'>
            <h2>Liste des écoles</h2>
            <div className='tableauecole'>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Adresse</th>
                        <th>Ville</th>
                        <th>Code Postal</th>
                        <th>Nom de domaine</th>
                        <th>Autres actions</th>
                    </tr>
                </thead>
                <tbody>
                    {schools.map((school) => (
                        <tr key={school.id}>
                            <td>{school.nom}</td>
                            <td>{school.adresse}</td>
                            <td>{school.ville}</td>
                            <td>{school.codepostal}</td>
                            <td>{school.nomdomaine}</td>
                            <td className='caseactions'>
                            <div className='fondeye fondaction' onClick={() => handleEyeClick(school.idecole)}><a className='icons' /*onClick={handleNext}*/><FontAwesomeIcon icon={faEye} style={{ color: "#000000" }} size="lg" /></a></div>
                            <div className='fondbin fondaction'><a className='icons' href="https://fr.linkedin.com/company/hegeoma"><FontAwesomeIcon icon={faTrash} style={{ color: "#000000" }} size="lg" /></a></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table></div>
        </div>
    );
};

export default UserSchoolList;
