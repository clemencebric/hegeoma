// UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./pageadmin.css"

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8081/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
<div className='pageadmin'>
            <h2>Liste des utilisateurs</h2>
            <table>
                <thead>
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
    );
};


export default UserList;
