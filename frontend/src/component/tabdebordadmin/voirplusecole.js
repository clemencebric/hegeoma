import React, { useState, useEffect } from 'react';
import { get } from '../fonctions/getpost.js'; // Votre fonction pour faire des requêtes GET
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from '../fonctions/getpost.js';
import "./voirplusecole.css";

const SchoolListt = () => {
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const response = await get(`infoschools/${userId}`);
                setSchools(response);
            } catch (error) {
                setError('Error fetching schools');
            } finally {
                setLoading(false);
            }
        };
        if (userId) {
            fetchSchools();
        } else {
            setError('No user ID found in local storage');
            setLoading(false);
        }

        const handleUnload = () => {
            localStorage.removeItem('userId');
        };

        window.addEventListener('unload', handleUnload);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('unload', handleUnload);
        };
    }, [userId]);

    const handleDownload = (schoolId) => {
        const url = getApiUrl(`downloadExcel/${schoolId}`);
        window.location.href = url;
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='pagevoirplusecole'>
            <div className='page-contentvoirplusecole'>
                <h2>Liste des Écoles</h2>
                <div className='table-container'>
                    <table>
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Adresse</th>
                                <th>Ville</th>
                                <th>Code Postal</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schools.map((school) => (
                                <tr key={school.idecole}>
                                    <td>{school.nom}</td>
                                    <td>{school.adresse}</td>
                                    <td>{school.ville}</td>
                                    <td>{school.codepostal}</td>
                                    <td>
                                        <button onClick={() => handleDownload(school.idecole)}>Télécharger en Excel</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SchoolListt;
