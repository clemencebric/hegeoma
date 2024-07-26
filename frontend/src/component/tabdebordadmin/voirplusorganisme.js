import React, { useState, useEffect } from 'react';
import { get } from '../fonctions/getpost.js'; // Votre fonction pour faire des requêtes GET
import { useNavigate } from 'react-router-dom';
import "./voirplusecole.css"
const OrgList = () => {
    const [orgs, setorg] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchorg = async () => {
            try {
                const response = await get(`infoorg/${userId}`);
                setorg(response);
            } catch (error) {
                setError('Error fetching org');
            } finally {
                setLoading(false);
            }
        };
        if (userId) {
            fetchorg();
        } else {
            setError('No user ID found in local storage');
            setLoading(false);
        }
    }, [userId]);

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
                                <th>Code Postal</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orgs.map((org) => (
                                <tr key={org.id}>
                                    <td>{org.nom}</td>
                                    <td>{org.adresse}</td>
                                    <td>{org.codepostal}</td>
                                    <td>
                                        <button onClick={() => navigate(`/org/${org.id}`)}>Telecharger en excel</button>
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

export default OrgList;
