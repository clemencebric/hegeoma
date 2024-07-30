import React, { useState, useEffect } from 'react';
import { get } from '../fonctions/getpost.js';
import "./entreprises.css";

const OrgList = () => {
    const [orgs, setOrgs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    // Fonction pour récupérer les entreprises
    const fetchOrgs = async (search = '') => {
        try {
            const endpoint = search ? `searchentreprises?search=${search}` : 'searchentreprises?search='; // Fetch all if no search term
            const response = await get(endpoint, token);
            setOrgs(response);
            setError(null);
        } catch (error) {
            setError(error.message);
        }
    };

    // Appeler fetchOrgs lors du premier chargement de la page
    useEffect(() => {
        fetchOrgs();
    }, [token]); // Appel initial

    // Fonction pour gérer la soumission du formulaire de recherche
    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        fetchOrgs(searchTerm); // Recherche basée sur le terme de recherche
    };

    // Fonction pour gérer le changement dans la barre de recherche
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className='pageadmin'>
            <h2>Liste des entreprises</h2>
            <div className='search-container'>
                <form onSubmit={handleSubmit} className='search-form'>
                    <input
                        type="text"
                        value={searchTerm}
                        placeholder="Rechercher par nom, adresse ou ville..."
                        onChange={handleSearchChange}
                    />
                    <button type="submit">Rechercher</button>
                </form>
            </div>
            {error && <p className='error-message'>{error}</p>}
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Adresse</th>
                            <th>Ville</th>
                            <th>Code Postal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orgs.length > 0 ? (
                            orgs.map((org) => (
                                <tr key={org.id}>
                                    <td>{org.nom}</td>
                                    <td>{org.adresse}</td>
                                    <td>{org.ville}</td>
                                    <td>{org.codepostal}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">Aucune entreprise trouvée</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrgList;
