import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [area, setArea] = useState('');
  const [local, setLocal] = useState('');
  const [level, setLevel] = useState('');
  const [loginlist, setLoginlist] = useState([]);
  const [token, setToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Moved inside the component
  const [usernameError ,setUsernameError] = useState('');
  const [passwordError ,setPasswordError] = useState('');

  const navigate = useNavigate(); // Moved inside the component
  const PORT = 3300;
  useEffect(() => {
    if (token && isAuthenticated) {
      navigate('/',{
       
      }); // Redirect to dashboard or any authenticated route
    }
  }, [token, isAuthenticated, navigate]);


  useEffect(() => {
    const resLogin = () => {
      Axios.get(`http://localhost:${PORT}/login`)
        .then(response => {
          console.log(response.data);

          const receivedToken = response.data.token;
          const receivedUsername = response.data.username;
          const receivedArea = response.data.area;
          const receivedLocal = response.data.local;
          const receivedLevel = response.data.level;

          setToken(receivedToken);
          setUsername(receivedUsername);
          setArea(receivedArea);
          setLocal(receivedLocal);
          setLevel(receivedLevel);

          if (receivedToken) {
            setIsAuthenticated(true);
          }
        })
        .catch(error => {
          console.error('Error fetching login data', error);
        });
    };

 
    resLogin();
  }, []); 

  const onButtonClick = () => {
    // Set initial error values to empty
    setUsernameError('')
    setPasswordError('')
    // Check if the user has entered both fields correctly
    if ('' === username) {
      setUsernameError('Please enter your username')
      return
    }
    if ('' === password) {
      setPasswordError('Please enter a password')
      return
    }
    addLogin();
  }

  const addLogin = () => {
    Axios.post(`http://localhost:${PORT}/login`, {
      username,
      password,
    }).then(() => {
      setLoginlist(prevLoginlist => [
        ...prevLoginlist,
        {
          username,
          password,
          area,
          local,
          level,
        },
      ]);

    });
  };



  return (

    <div className={'mainContainer'}>
    <div className={'titleContainer'}>
      <div>ลงทะเบียนเข้าใช้งาน</div>
    </div>
    <br />
    
    <div className={'inputContainer'}>
    <label>บัญชีผู้ใช้</label>
      <input
        value={username}
        placeholder="Enter your username here"
        onChange={(ev) => setUsername(ev.target.value)}
        className={'inputBox'}
      />
      <label className="errorLabel">{usernameError}</label>
    </div>
    <br />
    <div className={'inputContainer'}>
      <label>รหัสผ่าน</label>
      <input
        type="password" 
        value={password}
        placeholder="Enter your password here"
        onChange={(ev) => setPassword(ev.target.value)}
        className={'inputBox'}
      />
      <label className="errorLabel">{passwordError}</label>

    </div>
    <br />
    <div className={'inputContainer'}>
      <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
    </div>
  </div>
  );
}

export default LoginPage;
