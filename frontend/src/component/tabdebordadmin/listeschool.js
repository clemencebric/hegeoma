// UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserEmailAndStatus } from '../header/statut';
import "./pageadmin.css"

const SchoolList = () => {
    const [schools, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const tokendata = getUserEmailAndStatus();
                const token = tokendata.token;
                console.log(token)
                const response = await axios.get(`http://localhost:8081/school`, {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                  });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
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


export default SchoolList;
