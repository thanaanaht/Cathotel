import React, { useRef, useState, useEffect } from 'react';
import Axios from 'axios';
import Manubar from '../components/Manubar';

const AdminCreate = () => {
  const contentToPrint = useRef(null);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [level, setLevel] = useState('admin');
  const [token , setToken] = useState('');

  const [memberlist, setMemberlist] = useState([]);
  const PORT = 3300;

  useEffect(() => {
    Axios.get(`http://localhost:${PORT}/admin`)
      .then((response) => {
        setMemberlist(response.data);
        if (response.data.length > 0) {
          const lastMemberId = response.data[response.data.length - 1].id;
          setId(lastMemberId);
          setToken(response.data.token);
        }
      })
      .catch((error) => {
        console.error("Error fetching member data:", error);
      });
  }, [PORT]);



  const handleEdit = () => {
    const confirmed = window.confirm("ยืนยันการสมัครสมาชิค");
    if (confirmed &&token) {
      // Make HTTP request to update data
      Axios.post(`http://localhost:${PORT}/admin`, {

        username: username,
        password: password,
        level: level,

        
      })
        .then((response) => {
          // Handle successful response
          console.log("Admin create successfully:", response.data);
        })
        .catch((error) => {
          // Handle error
          console.error("Error create admin:", error);
        });
        console.log("username",username);
    }
  };
  


  return (
    <div className="row">
    <div className="col-6 col-md-2" style={{ backgroundColor: 'black' }}>
      <Manubar/>
    </div>
    <div className="col" style={{ backgroundColor: 'white' }}>
    <div className="container mt-5">
      <h1>สมัครสมาชิค</h1>

   
        <div className='member-details border p-4'>
          <h2 className='text-center mb-4'>รายละเอียดสมาชิค</h2>
          <div className='row mb-3'>
            <div className='col-6'>

            <div className='row mb-3'>
                <div className='col text-end'><strong>Username</strong></div>
                <div className='col'>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="username" 
                    value={username} 
                    onChange={(e) => {
                      const fullidValue = e.target.value;
                      setUsername(fullidValue);
                    }} 
                  />
                </div>
              </div>

              
            <div className='row mb-3'>
                <div className='col text-end'><strong>Password</strong></div>
                <div className='col'>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    value={password} 
                    onChange={(e) => {
                      const fullidValue = e.target.value;
                      setPassword(fullidValue);
                    }} 
                  />
                </div>
              </div>



              <div className='row mb-3'>
                <div className='col text-end'><strong>ระดับการเข้าถึง</strong></div>
                <div className='col'>
                  <select 
                    className="form-select" 
                    id="level" 
                    value={level} 
                    onChange={(e) => {
                      const selectedLevel = e.target.value;
                      setLevel(selectedLevel);
                    }}
                  >
                    <option value="">เลือกระดับการเข้าถึง</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
              </div>



              <div><strong>Level:</strong> {level}</div>
              <div><strong>Username:</strong> {username}</div>
              <div><strong>password:</strong> {password}</div>

            </div>
          </div>
        </div>

      <div className='col-6 text-end mt-3'>
        <button className='btn btn-primary' onClick={handleEdit}>สร้าง Admin</button>
      </div>
    </div>

    </div>
    </div>

  );
}

export default AdminCreate;
