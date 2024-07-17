// UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Statut = () => {
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
            <h2>User List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <strong>Email:</strong> {user.email}, 
                        <strong>Status:</strong> {user.statut}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Statut;