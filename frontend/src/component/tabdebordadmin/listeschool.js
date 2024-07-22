// UserList.js
import React, { useState, useEffect } from 'react';
import { get } from '../fonctions/getpost.js';
import "./pageadmin.css"

const SchoolList = () => {
    const [schools, setUsers] = useState([]);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await get('school', token);
                setUsers(response);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);


    return (
        <div className='pageadmin'>
            <h2>Liste des écoles</h2>
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
                        {schools.map((school) => (
                            <tr key={school.idecole}>
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
        </div>
    );
};


export default SchoolList;
