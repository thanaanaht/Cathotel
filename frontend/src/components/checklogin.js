import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CheckLogin() {
  const PORT = 3300;
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    Axios.get(`http://localhost:${PORT}/login`)
      .then(response => {
        console.log(response.data);
        setUsername(response.data.username);
      })
      .catch(error => {
        console.error('Error fetching login data', error);
        navigate('/login'); // Redirect to login page if not logged in
      });
  }, [navigate]);

  return username;
}

export default CheckLogin;
