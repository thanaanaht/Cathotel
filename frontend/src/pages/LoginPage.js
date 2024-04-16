import React, { useState, useEffect } from 'react';
import Axios from 'axios';
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
      Axios.get(`http://localhost:${PORT}/login/admin`)
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

    Axios.post(`http://localhost:${PORT}/login/admin`, {
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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Login</h5>
              <div className="form-group">
                <label>Username</label>
                <input
                  value={username}
                  placeholder="Enter your username here"
                  onChange={ev => setUsername(ev.target.value)}
                  className="form-control"
                />
                <small className="text-danger">{usernameError}</small>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  placeholder="Enter your password here"
                  onChange={ev => setPassword(ev.target.value)}
                  className="form-control"
                />
                <small className="text-danger">{passwordError}</small>
              </div>
              <button className="btn btn-primary" onClick={onButtonClick}>Log in</button>
              {errorMessage && <div className="text-danger">{errorMessage}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
