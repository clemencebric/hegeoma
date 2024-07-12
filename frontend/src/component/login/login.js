import React, { useState } from 'react';
import "./login.css";
import { Link } from 'react-router-dom';
import Validation from './loginValidation';

function Login() {
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
    setErrors(Validation(values));
  };
  
  return (
    <div className='formulaiire'>
      <div className='formulaire'>
        <h2>Login</h2>
        <form action='' onSubmit={handleSubmit}>
          <div className='informations'>
            <div className='mb-3'>
              <label htmlFor='email'><strong>Email</strong></label>
              <input type='email' placeholder='Enter Email' name="email" onChange={handleInput}/>
              {errors.email && <span className='messageerreur'> {errors.email} </span>}
            </div>
            <div className='mb-3'>
              <label htmlFor='password'><strong>Password</strong></label>
              <input type='password' placeholder='Enter Password' name="password" onChange={handleInput}/>
              {errors.password && <span className='messageerreur'> {errors.password} </span>}
            </div>
            <button type='submit' className='btn btn-success'>Login</button>
          </div>
          <p className='phrase'>You are agree to our terms and policies</p>
          <Link to="/signup" className='btn'>Create Account</Link>
        </form>
      </div>
    </div>
  )
}

export default Login;