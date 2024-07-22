// UserList.js
import React, { useState, useEffect } from 'react';
import { get } from '../fonctions/getpost.js';
import "./pageadmin.css"

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await get('users');
                setUsers(response);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
<div className='pageadmin'>
            <h2>Liste des utilisateurs</h2>
            <div className='table-container'>
                <table>
                    <thead className='titretableaupadmin'>
                        <tr>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.email}</td>
                                <td>{user.statut}</td>
                                <td>{user.actif}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};



export default UserList;
