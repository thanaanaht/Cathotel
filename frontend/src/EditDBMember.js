import Axios from 'axios';
import { useState } from 'react';
import './EditDBMember.css';

function EditDBMember() {
  // username, password, contact, catsnumber, remark, score,
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [catsnumber, setCatsnumber] = useState(0);
  const [remark, setRemark] = useState('');
  const [score, setScore] = useState(0);
  
  const [MemberList, setMemberList] = useState([]);

  const PORT = 3300;

  const addMember = () => {
    Axios.post(`http://localhost:${PORT}/membercreate`, {
      username, password, contact, catsnumber, remark, score,
    }).then(() => {
      setMemberList([
        ...MemberList,
        { username, password, contact, catsnumber, remark, score},
      ]);
    }).catch(error => {
      console.error('Error adding member:', error);
      // Handle error here
    });
  };



  return (
    <div className="App container">
      <h1>ลงทะเบียนสมาชิค</h1>
      <div className="information">
        <form action="">
          <div className="mb-3">
            <label htmlFor="Type" className="form-label">
              Username:
            </label>
            <input 
              type="text"
              className="form-control"
              placeholder="Username"
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="Type" className="form-label">
              Password:
            </label>
            <input 
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
       
          <div className="mb-3">
            <label htmlFor="Type" className="form-label">
              ติดต่อ:
            </label>
            <input 
              type="text"
              className="form-control"
              placeholder="contact"
              onChange={(event) => setContact(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="Type" className="form-label">
              จำนวนน้องแมว:
            </label>
            <input 
              type="number"
              className="form-control"
              placeholder="จำนวนน้องแมว"
              onChange={(event) => setCatsnumber(event.target.value)}
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="Type" className="form-label">
              เพิ่มเติม:
            </label>
            <input 
              type="text"
              className="form-control"
              placeholder="เพิ่มเติม"
              onChange={(event) => setRemark(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Type" className="form-label">
              คะแนน:
            </label>
            <input 
              type="text"
              className="form-control"
              placeholder="คะแนน"
              onChange={(event) => setScore(event.target.value)}
            />
          </div>
          <button className="btn btn-success" onClick={addMember}>Add Member</button>

        </form>
      </div>
      <hr />

      
    </div>
  );
}
// username, password, contact, catsnumber, remark, score,
export default EditDBMember;
