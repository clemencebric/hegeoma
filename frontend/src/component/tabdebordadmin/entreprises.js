// UserList.js
import React, { useState, useEffect } from 'react';
import { get } from '../fonctions/getpost.js';
import "./entreprises.css"

const OrgList = () => {
    const [orgs, setUsers] = useState([]);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await get('listentreprises', token);
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
                          
                        </tr>
                    </thead>
                    <tbody>
                        {orgs.map((org) => (
                            <tr key={org.idecole}>
                                <td>{org.nom}</td>
                                <td>{org.adresse}</td>
                                <td>{org.ville}</td>
                                <td>{org.codepostal}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default OrgList;
