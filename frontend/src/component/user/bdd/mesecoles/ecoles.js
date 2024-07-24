import React, { useState, useEffect } from 'react';
import { getUserEmailAndStatus } from '../../../header/statut';
import { get } from '../../../fonctions/getpost';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash, faPlus, faPen } from "@fortawesome/free-solid-svg-icons";
import "./ecoles.css";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { remove } from '../../../fonctions/getpost';
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
    const handlePlusClick = (schoolId) => {
        localStorage.setItem('idecole', schoolId);
        navigate('/classes'); // remplacez '/pagevuglobale' par le chemin de la page que vous souhaitez afficher
    };
    const handleDeleteClick = async (schoolId) => {
        const result = await Swal.fire({
          title: 'Êtes-vous sûr de vouloir supprimer cette école ?',
          text: 'Cette action supprimera également toutes les classes, élèves et profs associés.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Oui',
          cancelButtonText: 'Non'
        });
      
        if (result.isConfirmed) {
          try {
            const tokendata = getUserEmailAndStatus();
            const token = tokendata.token;
      
            await deleteSchool(schoolId, token);
      
            // Mettez à jour l'état de votre composant en filtrant les écoles
            setSchools(schools.filter(school => school.idecole !== schoolId));
      
            Swal.fire({
              title: 'École supprimée',
              text: 'L\'école et toutes les classes, élèves et profs associés ont été supprimés.',
              icon: 'success'
            });
          } catch (error) {
            console.error('Error deleting school:', error);
            Swal.fire({
              title: 'Erreur',
              text: 'Une erreur s\'est produite lors de la suppression de l\'école.',
              icon: 'error'
            });
          }
        }
      };
      
      
      
      const deleteSchool = async (schoolId, token) => {
        try {
            console.log(schoolId);
          const response = await remove(`schools/${schoolId}`, token);
          return response.data;
        } catch (error) {
          throw error;
        }
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
                        <tr key={school.idecole} >
                            <td>{school.nom}</td>
                            <td>{school.adresse}</td>
                            <td>{school.ville}</td>
                            <td>{school.codepostal}</td>
                            <td>{school.nomdomaine}</td>
                            <td className='caseactions'>
                            <div className='fondplus fondaction' onClick={() => handlePlusClick(school.idecole)}><a className='icons'><FontAwesomeIcon icon={faPen} style={{ color: "#000000" }} size="lg" /></a></div>
                            <div className='fondeye fondaction' onClick={() => handleEyeClick(school.idecole)}><a className='icons'><FontAwesomeIcon icon={faEye} style={{ color: "#000000" }} size="lg" /></a></div>
                            <div className='fondbin fondaction' onClick={() => handleDeleteClick(school.idecole)} ><a className='icons' ><FontAwesomeIcon icon={faTrash} style={{ color: "#000000" }} size="lg" /></a></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table></div>
        </div>
    );
};

export default UserSchoolList;
