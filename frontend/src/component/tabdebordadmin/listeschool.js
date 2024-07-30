import React, { useState, useEffect } from 'react';
import { get } from '../fonctions/getpost.js';
import "./pageadmin.css";

const SchoolList = () => {
    const [schools, setSchools] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    // Fonction pour récupérer les écoles
    const fetchSchools = async (search = '') => {
        try {
            const endpoint = search ? `searchecoles?search=${search}` : 'searchecoles?search='; // Fetch all if no search term
            const response = await get(endpoint, token);
            setSchools(response);
            setError(null);
        } catch (error) {
            setError(error.message);
        }
    };

    // Appeler fetchSchools lors du premier chargement de la page
    useEffect(() => {
        fetchSchools();
    }, [token]); // Appel initial

    // Fonction pour gérer la soumission du formulaire de recherche
    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        fetchSchools(searchTerm); // Recherche basée sur le terme de recherche
    };

    // Fonction pour gérer le changement dans la barre de recherche
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className='pageadmin'>
            <h2>Liste des écoles</h2>
            <div className='search-container'>
                <form onSubmit={handleSubmit} className='search-form'>
                    <input
                        type="text"
                        value={searchTerm}
                        placeholder="Rechercher par nom, adresse ou nom de domaine..."
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
                            <th>Nom de domaine</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schools.length > 0 ? (
                            schools.map((school) => (
                                <tr key={school.idecole}>
                                    <td>{school.nom}</td>
                                    <td>{school.adresse}</td>
                                    <td>{school.ville}</td>
                                    <td>{school.codepostal}</td>
                                    <td>{school.nomdomaine}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">Aucune école trouvée</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SchoolList;
