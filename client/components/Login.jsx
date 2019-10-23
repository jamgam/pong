import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as sc from '../styled-components/sc.Login';

const Login = (props) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [signup, setSignup] = useState('');


  const handleChange = (e) => {
    if (e.target.id === 'user') {
      setUser(e.target.value);
    } else if (e.target.id === 'pass') {
      setPass(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/login', {
        user,
        pass,
      })
      .then((response) => {
        console.log('RESPONSE: ', response);
      })
      .catch((err) => {
        console.log('ERROR: ', err);
      });
    setUser('');
    setPass('');
    console.log(e.target);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (signup) {
      if (signup === pass) {
        console.log('same');
        axios
          .post('/signup', {
            user,
            pass,
          })
          .then((response) => {
            console.log(response);
            setSignup('');
            setPass('');
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log('diff');
      }
    } else {
      setPass('');
      setSignup(pass);
    }
  };

  return (
    <sc.Login>
      <form onSubmit={handleSubmit}>
        <sc.UserLabel signup={signup}>Username:</sc.UserLabel>
        <sc.UserInput signup={signup} type="text" name="user" id="user" value={user} onChange={handleChange} required />
        <sc.Label>{signup ? 'Confirm Password:' : 'Password:'}</sc.Label>
        <sc.PassInput type="password" id="pass" value={pass} onChange={handleChange} required />
        <sc.Submit signup={signup} id="login" type="submit" value="Login" />
        <sc.Submit id="signup" type="submit" value="Signup" onClick={handleSignup} />
        <sc.Button id="logout" type="button">Logout</sc.Button>
      </form>
    </sc.Login>
  );
};

export default Login;
