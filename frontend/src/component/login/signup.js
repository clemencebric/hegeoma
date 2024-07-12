import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./login.css";
import Validationn from './signupValidation';
import axios from 'axios'
function Signup() {

    const [values, setValues] = useState({
        email: '',
        password: ''
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
        if(validationErrors.email === "" && validationErrors.password === "") {
            axios.post('http://localhost:8081/signup', values)
            .then(res => {
                navigate('/login');
            })
            .catch(err => console.log(err));
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
          <input type='password' placeholder='Enter Password' name='password' onChange={handleInput}/>
          {errors.password && <span className='messageerreur'> {errors.password} </span>}
        </div>
        <button  type='submit' className='btn btn-success'>Signup</button>
        </div>


        <p className='phrase'>You agree to  our terms and policies</p>
        <Link to="/login" className='btn'>Login</Link>
      </form>
    </div>
  </div>
  )
}

export default Signup
