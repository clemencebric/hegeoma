import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { post } from '../fonctions/getpost';
import "./login.css";
import Validation from './signupValidation';

function Signup() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            post('signup', values)
                .then(response => {
                    console.log('Signup successful:', response);
                    // Rediriger l'utilisateur ou afficher un message de succès
                })
                .catch(error => {
                    console.error('Error during signup:', error);
                    // Afficher un message d'erreur à l'utilisateur
                });
        }
    };

    return (
        <div className='formulaiire'>
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
                        <button type="submit" className='btn btn-success'>Signup</button>
                    </div>

                    <p className='phrase'>You agree to our terms and policies</p>
                    <Link to="/login" className='btn'>Login</Link>
                </form>
            </div>
        </div>
    )
}

export default Signup;

