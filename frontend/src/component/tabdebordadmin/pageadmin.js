import React, { useState, useEffect } from 'react';
import { get, remove } from '../fonctions/getpost';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "./pageadmin.css";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

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
            const userDetails = await get(`adminuser/${userId}`);
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

    const handleDelete = (userId) => {
        Swal.fire({
            title: 'Êtes-vous sûr ?',
            text: 'Cette action est irréversible. Voulez-vous vraiment continuer ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer !',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                
                remove(`deleteusers/${userId}`)
                    .then(() => {console.log("reussi");
                        setUsers(users.filter(user => user.id !== userId));
                        Swal.fire(
                            'Supprimé !',
                            'L\'utilisateur a été supprimé.',
                            'success'
                        );
                    })
                    .catch(error => {
                        console.log("echoue")
                        console.error('Error deleting user:', error);
                        Swal.fire(
                            'Erreur !',
                            'Une erreur est survenue lors de la suppression.',
                            'error'
                        );
                    });
            }
        });
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
                                    <button onClick={() => handleDelete(user.id)}>Supprimer</button>
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
