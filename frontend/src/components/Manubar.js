import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Axios } from 'axios';


import './Manubar.css';
import CheckLogin from './checklogin';


const Manubar = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [area, setArea] = useState('');
  const [local, setLocal] = useState('');
  const [level, setLevel] = useState('');
  const [loginlist, setLoginlist] = useState([]);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Moved inside the component
  const [usernameError ,setUsernameError] = useState('');
  const [passwordError ,setPasswordError] = useState('');

  
  const PORT = 3300;
  const navigate = useNavigate();
  const [token , setToken] = useState('');




  return (
<div>
  
<div className="login-name">
         <CheckLogin/>
  </div>
  
<div className="navbar">
  <a href="#home">Home</a>
  <div className="subnav">
    <button className="subnavbtn">จัดการการจอง <i className="fa fa-caret-down"></i></button>
    <div className="subnav-content">
      <a href="#company">จองห้อง</a>
      <a href="#team">ยกเลิกการจอง</a>
    </div>
  </div> 
  <div className="subnav">
    <button className="subnavbtn">จัดการที่พัก <i className="fa fa-caret-down"></i></button>
    <div className="subnav-content">
      <a href="#bring">เพิ่มห้องพัก</a>
      <a href="#deliver">ลบห้องพัก</a>
      <a href="#package">แก้ไขข้อมูลที่พัก</a>

    </div>
  </div> 
  <div className="subnav">
    <button className="subnavbtn">ข้อมูลสมาชิค <i className="fa fa-caret-down"></i></button>
    <div class="subnav-content">
      <a href="#link1">เพิ่มสมาชิค</a>
      <a href="#link2">ลดสมาชิค</a>
      <a href="#link3">แก้ไขข้อมูลสมาชิค</a>
    </div>
  </div>
  <a href="#contact">พิมพ์ใบเสร็จ</a>
  <a href="/login">Login</a>
</div>


</div>


  );
}


export default Manubar;


{/* <nav>
<div class="container">
  <div class="nav-con">
    <div class="logo">
      <a href="#">Narbar</a>
    </div>
    <ul class="menu">
      <li><a href="#">menu#1</a></li>
      <li><a href="#">menu#2</a></li>
      <li><a href="#">menu#3</a></li>
      <li>
        <input type="text" class="nav-search-box" /><a href="">🔍</a>
      </li>
      <li>
        <div class="auth-box">
          <button class="nav-login-btn">LOGIN</button>
          <button class="nav-signup-btn">SIGNUP</button>
        </div>
      </li>
    </ul>
  </div>
</div>
</nav> */}