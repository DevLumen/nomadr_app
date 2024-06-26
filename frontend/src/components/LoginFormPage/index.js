// frontend/src/components/LoginFormPage/index.js
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        console.log(data);
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1 className="login-msg">Welcome.</h1>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      Username or Email:<input
        placeholder='username or email'
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
        Password:<input
        placeholder='password'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      <button className='login-btn' type="submit">Log In</button>
      <div className='tree__container'>
        Nomadr.<i className="fas fa-tree"></i>
      </div>
    </form>
  );
}

export default LoginFormPage;
