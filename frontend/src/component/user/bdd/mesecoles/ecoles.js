import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserEmailAndStatus } from '../../../header/statut';
import { get } from '../../../fonctions/getpost';
import "./ecoles.css";

const UserSchoolList = () => {
    const [schools, setSchools] = useState([]);

    useEffect(() => {
        const tokendata = getUserEmailAndStatus();
        const token = tokendata.token;
        const userId = tokendata.id; // récupère l'ID de l'utilisateur connecté
        console.log(userId);
        const fetchSchools = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/userschool`, {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                  });
                setSchools(response.data);
            } catch (error) {
                console.error('Error fetching schools:', error);
            }
        };

        fetchSchools();
    }, []);

    return (
        <div className='pageadmin'>
            <h2>Liste des écoles</h2>
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
                    {schools.map((school) => (
                        <tr key={school.id}>
                            <td>{school.nom}</td>
                            <td>{school.adresse}</td>
                            <td>{school.ville}</td>
                            <td>{school.codepostal}</td>
                            <td>{school.nomdomaine}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserSchoolList;
