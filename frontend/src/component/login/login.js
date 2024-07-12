import React, { useState } from 'react';
import "./login.css";
import { Link, useNavigate } from 'react-router-dom';
import Validation from './loginValidation';
import axios from 'axios';

function Login() {
     // State variables for email, password, and error message
     const [email, setEmail] = useState(''); // Modifiez cette ligne
     const [password, setPassword] = useState('');
     const [errorMessage, setErrorMessage] = useState('');
 
     // Initialize useNavigate hook for navigation
     const navigate = useNavigate();
 
     // Function to handle form submission
     const handleSubmit = async (e) => {
         e.preventDefault();
         try {
             // Clear previous error messages
             setErrorMessage('');
 
             // Send login request to server
             const response = await axios.post('http://localhost:8081/login', { email, password });
 
             // If login successful, redirect to MainPage
             if (response.status === 200) {
                 navigate('/');
             }
         } catch (error) {
             console.error('Error:', error);
 
             // If login failed, display error message
             setErrorMessage('Your email and\nPassword are incorrect.');
         }
     };
 
     // JSX structure for login form
     return (
         <div className="formulaiire flex items-center justify-center min-h-screen">
             <div className="mx-auto p-6 bg-white rounded-md shadow-md">
                 <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
                 <form onSubmit={handleSubmit}>
                     <div className="mb-4">
                         <label htmlFor="email" className="block mb-2">email:</label>
                         <input
                            type="text"
                            id="email" // Modifiez cette ligne
                            value={email} // Et modifiez cette ligne
                            onChange={(e) => setEmail(e.target.value)} // Ainsi que cette ligne
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            />
                     </div>
                     <div className="mb-4">
                         <label htmlFor="password" className="block mb-2">Password:</label>
                         <input
                             type="password"
                             id="password"
                             value={password}
                             onChange={(e) => setPassword(e.target.value)}
                             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                         />
                     </div>
                     <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Login</button>
                     {errorMessage && <p className="text-red-500 text-sm whitespace-pre-line text-center mt-4 ">{errorMessage}</p>} {/* Display error message if exists */}
                 </form>
             </div>
         </div>
     );
 }
export default Login;