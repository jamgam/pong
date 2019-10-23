import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as sc from '../styled-components/sc.Auth';

const Auth = (props) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [signup, setSignup] = useState('');

  const {
    loggedin, loggedUser, setLoggedin, setLoggedUser,
  } = props;

  const handleChange = (e) => {
    if (e.target.id === 'user') {
      setUser(e.target.value);
    } else if (e.target.id === 'pass') {
      setPass(e.target.value);
    }
  };

  useEffect(() => {
    axios.get('/sessionStatus')
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          setLoggedin(true);
          setLoggedUser(response.data);
        }
      });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post('/login', {
        user,
        pass,
      })
      .then((response) => {
        console.log('RESPONSE: ', response);
        setLoggedin(true);
        setLoggedUser(user);
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
            handleLogin({ preventDefault: () => { } });
            // setPass('');
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log('diff');
        setSignup('');
        setUser('');
        setPass('');
      }
    } else {
      setPass('');
      setSignup(pass);
    }
  };

  const handleLogout = () => {
    axios
      .post('/logout')
      .then((response) => {
        console.log(response);
        setLoggedin(false);
        setLoggedUser('anon');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return !loggedin
    ? (
      <sc.Login>
        <form onSubmit={handleLogin}>
          <sc.UserLabel signup={signup}>Username:</sc.UserLabel>
          <sc.UserInput signup={signup} type="text" name="user" id="user" value={user} onChange={handleChange} required />
          <sc.Label>{signup ? 'Confirm Password:' : 'Password:'}</sc.Label>
          <sc.PassInput type="password" id="pass" value={pass} onChange={handleChange} required />
          <sc.Submit signup={signup} id="login" type="submit" value="Login" />
          <sc.Button id="signup" type="button" onClick={handleSignup}>Signup</sc.Button>
        </form>
      </sc.Login>
    ) : (
      <sc.Login>
        <sc.LoggedInMessage>
          {'Logged in as '}
          <b>
            {loggedUser}
          </b>
        </sc.LoggedInMessage>
        <sc.Button id="logout" type="button" onClick={handleLogout}>Logout</sc.Button>
      </sc.Login>
    );
};

export default Auth;
