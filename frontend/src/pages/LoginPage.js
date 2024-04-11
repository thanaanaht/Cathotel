import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PORT = 3300;
  const navigate = useNavigate();

  useEffect(() => {
    const resLogin = () => {
      Axios.get(`http://localhost:${PORT}/login`)
        .then(response => {
          console.log(response.data);

          const receivedToken = response.data.token;
          if (receivedToken) {
            setIsAuthenticated(true);
          }
        })
        .catch(error => {
          console.error('Error fetching login data', error);
        });
    };

    resLogin();
  }, [PORT]);

  const onButtonClick = () => {
    setUsernameError('');
    setPasswordError('');
    setErrorMessage('');

    if (username.trim() === '') {
      setUsernameError('Please enter your username');
      return;
    }

    if (password.trim() === '') {
      setPasswordError('Please enter a password');
      return;
    }

    Axios.post(`http://localhost:${PORT}/login`, {
      username,
      password,
    })
      .then(response => {
        console.log(response.data);
        const receivedToken = response.data.token;
        if (receivedToken) {
          setIsAuthenticated(true);
          navigate('/dashboard');
        } else {
          setErrorMessage('Sorry, wrong username or password');
        }
      })
      .catch(error => {
        console.error('Error logging in', error);
      });
  };

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>ลงทะเบียนเข้าใช้งาน</div>
      </div>
      <br />
      <div className="inputContainer">
        <label>บัญชีผู้ใช้</label>
        <input
          value={username}
          placeholder="Enter your username here"
          onChange={ev => setUsername(ev.target.value)}
          className="inputBox"
        />
        <label className="errorLabel">{usernameError}</label>
      </div>
      <br />
      <div className="inputContainer">
        <label>รหัสผ่าน</label>
        <input
          type="password"
          value={password}
          placeholder="Enter your password here"
          onChange={ev => setPassword(ev.target.value)}
          className="inputBox"
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className="inputContainer">
        <input className="inputButton" type="button" onClick={onButtonClick} value={'Log in'} />
        {errorMessage && <div className="errorLabel">{errorMessage}</div>}

      </div>
    </div>
  );
}

export default LoginPage;
