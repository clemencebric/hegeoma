import React, { useState, useEffect } from 'react';
import { get } from '../fonctions/getpost.js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./pageadmin.css";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate(); // Initialiser useNavigate

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

    const handleVoirPlus = async (userId) => {
        localStorage.setItem('userId', userId);

        try {
            const userDetails = await get(`adminuser/${userId}`); // Supposons que cette route renvoie les détails de l'utilisateur
            const userNature = userDetails.data.nature;
            
            if (userNature === 'ecole') {
                navigate(`/infoschool`);
            } else if (userNature === 'organisme') {
                navigate(`/infousersorg`);
            } else {
                console.error('Nature inconnue:', userNature);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    return (
        <div className='pageadmin'>
            <h2>Liste des utilisateurs</h2>
            <div className='table-container'>
                <table>
                    <thead className='titretableaupadmin'>
                        <tr>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Nature</th>
                            <th>Active</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.email}</td>
                                <td>{user.statut}</td>
                                <td>{user.nature}</td>
                                <td>{user.actif}</td>
                                <td>
                                    <button onClick={() => handleVoirPlus(user.id)}>Voir plus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;
