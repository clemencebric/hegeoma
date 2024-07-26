import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./login.css";
import Validationn from './signupValidation';
import { post, get } from '../fonctions/getpost.js';

function Signup() {
    const [values, setValues] = useState({
        email: '',
        password: '',
        role: '', // Ajout du champ de rôle
        statut: '' // Ajout du champ de statut
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validationn(values);
        setErrors(validationErrors);

        // Vérification des erreurs après avoir mis à jour les erreurs
        if (validationErrors.email === "" && validationErrors.password === "" ) {
            post('signup', values)
                .then(res => {
                    navigate('/login');
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className='pageformulaire'>
            <div className='formulaire'>
                <h2>Sign-Up</h2>
                <form action='' onSubmit={handleSubmit}>
                    <div className='informations'>
                        <div className='mb-3'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' placeholder='Enter Email' name='email' onChange={handleInput} />
                            {errors.email && <span className='messageerreur'> {errors.email} </span>}
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' placeholder='Enter Password' name='password' onChange={handleInput} />
                            {errors.password && <span className='messageerreur'> {errors.password} </span>}
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='role'>Role</label>
                            <select name='role' onChange={handleInput}>
                                <option value="">Select Role</option>
                                <option value="ecole">École</option>
                                <option value="entreprise">Entreprise</option>
                            </select>
                            {errors.role && <span className='messageerreur'> {errors.role} </span>}
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='statut'>statut</label>
                            <select name='statut' onChange={handleInput}>
                                <option value="">Select statut</option>
                                <option value="admin">Admin</option>
                                <option value="client">Client</option>
                            </select>
                            {errors.statut && <span className='messageerreur'> {errors.statut} </span>}
                        </div>

                        <button type='submit' className='btn btn-success'>Signup</button>
                    </div>

                    <p className='phrase'>You agree to our terms and policies</p>
                    <Link to="/login" className='btn'>Login</Link>
                </form>
            </div>
        </div>
    );
}

export default Signup;
