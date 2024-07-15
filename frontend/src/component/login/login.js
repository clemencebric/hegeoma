import React, { useState } from 'react';
import "./login.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setAuthenticationToken } from "../privateroute/authservice.js";

function Login() {
    const [email, setEmail] = useState(''); // Utilisez email ici
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setErrorMessage('');

            const response = await axios.post('http://localhost:8081/login', { email, password });

            if (response.status === 200) {
                setAuthenticationToken(response.data.authToken); // Assurez-vous que la clé est authToken
                navigate('/');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Your email and\nPassword are incorrect.');
        }
    };

    return (
        <div className="pageformulaire flex items-center justify-center min-h-screen">
            <div className="formulaire mx-auto p-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2">Email:</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="inputlogin"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="inputlogin"
                        />
                    </div>
                    <button type="submit" className="btnlogin">Login</button>
                    {errorMessage && <p className="text-red-500 text-sm whitespace-pre-line text-center mt-4 ">{errorMessage}</p>}
                </form>
            </div>
        </div>
    );
}

export default Login;
