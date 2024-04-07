import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
<div className="navbar">
<div className="navbarleft">
      <Link to="/home">หน้าแรก</Link>
      <Link to="/login">Login</Link>
      <Link to="/booking">จองที่พัก</Link>
      <Link to="/editmember">ลงทะเบียนสมาชิค</Link>
      <Link to="/invoice">ใบเสร็จ</Link>
    </div>
    <div className="navbarright">
        {username}
    </div>
</div>

  );
}


export default Manubar;
