import React, { useState } from 'react';
import * as sc from '../styled-components/sc.Login';

const Login = (props) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleChange = (e) => {
    if (e.target.id === 'user') {
      setUser(e.target.value);
    } else if (e.target.id === 'pass') {
      setPass(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser('');
    setPass('');
    console.log(e.target);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <sc.Login>
      <form onSubmit={handleSubmit}>
        <sc.Label>Username:</sc.Label>
        <input type="text" name="user" id="user" value={user} onChange={handleChange} required />
        <sc.Label>Password:</sc.Label>
        <input type="password" id="pass" value={pass} onChange={handleChange} required />
        <sc.Submit id="login" type="submit" value="Login" />
        <sc.Submit id="signup" type="submit" value="Signup" onClick={handleSignup} />
      </form>
    </sc.Login>
  );
};

export default Login;
