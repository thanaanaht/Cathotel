import React, { useState, useEffect } from 'react';

import './Manubar.css';


const Manubar = () => {
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

  


  return (
<div class="navbar">
    <div class="navbarleft">
        <a href="/home">หน้าแรก</a>
        <a href="/login">Login</a>
        <a href="/booking">จองที่พัก</a>
        <a href="/editmember">ลงทะเบียนสมาชิค</a>
    </div>
    <div class="navbarright">
        {username}
    </div>
</div>

  );
}


export default Manubar;
