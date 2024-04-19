import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CheckLogin() {
  const PORT = 3300;
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('No login');

  useEffect(() => {
    Axios.get(`http://localhost:${PORT}/login/admin`)
      .then(response => {
        console.log(response.data);
        if (response.data.token) {
          setUsername(response.data.username)
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          navigate('/login');
        }
      })
      .catch(error => {
        console.error('Error fetching login data', error);
        setIsLoggedIn(false);
        navigate('/login');
      });
  }, [navigate]);

  // Render different UI based on login status
  if (isLoggedIn) {
    return <div>{username}</div>; // Or any other loading indicator
  } else {
    return null; // Or you can render a login form here
  }
}

export default CheckLogin;
