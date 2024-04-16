import React, { useRef, useState, useEffect } from 'react';
import Axios from 'axios';
import Manubar from '../components/Manubar';

const MemberCreate = () => {
  const contentToPrint = useRef(null);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [catsnumber, setCatsnumber] = useState(0);
  const [remark, setRemark] = useState('');
  const [score, setScore] = useState(0);
  const [address, setAddress] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [idnumber, setIdNumber] = useState('');
  

  const [lineid, setLineid] = useState('');

  const [memberlist, setMemberlist] = useState([]);
  const PORT = 3300;

  useEffect(() => {
    Axios.get(`http://localhost:${PORT}/member`)
      .then((response) => {
        setMemberlist(response.data);
        if (response.data.length > 0) {
          const lastMemberId = response.data[response.data.length - 1].id;
          setId(lastMemberId);
        }
      })
      .catch((error) => {
        console.error("Error fetching member data:", error);
      });
  }, [PORT]);



  const handleEdit = () => {
    const confirmed = window.confirm("ยืนยันการสมัครสมาชิค");
    if (confirmed && phonenumber) {
      // Make HTTP request to update data
      Axios.post(`http://localhost:${PORT}/member/create`, {

        name: name,
        surname: surname,
        phonenumber: phonenumber,
        idnumber: idnumber,
        lineid: lineid,
        address: address,
        catsnumber: catsnumber,
        score: score,
        remark: remark,
      })
        .then((response) => {
          // Handle successful response
          console.log("Member create successfully:", response.data);
          console.log("name",name);
          console.log("surname",surname);
          console.log("phonenumber ", phonenumber);
          console.log("idnumber",idnumber);
          console.log("lineid",lineid);
          console.log("address ", address);
          console.log("catsnumber",catsnumber);
          console.log("score",score);
          console.log("remark",remark);
        })
        .catch((error) => {
          // Handle error
          console.error("Error create member:", error);
        });
     
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
                <div className='col text-end'><strong>ชื่อ</strong></div>
                <div className='col'>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    value={name} 
                    onChange={(e) => {
                      const fullidValue = e.target.value;
                      setName(fullidValue);
                    }} 
                  />
                </div>
              </div>
              <div className='row mb-3'>
                <div className='col text-end'><strong>นามสกุล</strong></div>
                <div className='col'>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="surname" 
                    value={surname} 
                    onChange={(e) => {
                      const fullidValue = e.target.value;
                      setSurname(fullidValue);
                    }} 
                  />
                </div>
              </div>

              <div className='row mb-3'>
                <div className='col text-end'><strong>เลขบัตรประชาชน</strong></div>
                <div className='col'>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="idnumber" 
                    value={idnumber} 
                    onChange={(e) => {
                      const fullidValue = e.target.value;
                      setIdNumber(fullidValue);
                    }} 
                  />
                </div>
              </div>



              <div className='row mb-3'>
                <div className='col text-end'><strong>จำนวนน้องแมว</strong></div>
                <div className='col'>
                  <input 
                    type="number" 
                    className="form-control" 
                    id="catsnumber" 
                    value={catsnumber} 
                    onChange={(e) => {
                      const fullcatsnumberValue = parseFloat(e.target.value);
                      setCatsnumber(fullcatsnumberValue);
                    }} 
                  />
                </div>
              </div>

              <div className='row mb-3'>
                <div className='col text-end'><strong>Remark</strong></div>
                <div className='col'>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="remark" 
                    value={remark} 
                    onChange={(e) => {
                      const fullremarkValue = e.target.value;
                      setRemark(fullremarkValue);
                    }} 
                  />
                </div>
              </div>

              <div className='row mb-3'>
                <div className='col text-end'><strong>คะแนน</strong></div>
                <div className='col'>
                  <input 
                    type="number" 
                    className="form-control" 
                    id="score" 
                    value={score} 
                    onChange={(e) => {
                      const fullscoreValue = parseFloat(e.target.value);
                      setScore(fullscoreValue);
                    }} 
                  />
                </div>
              </div>

              <div className='row mb-3'>
                <div className='col text-end'><strong>ที่อยู่</strong></div>
                <div className='col'>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="address" 
                    value={address} 
                    onChange={(e) => {
                      const fulladdressValue = e.target.value;
                      setAddress(fulladdressValue);
                    }} 
                  />
                </div>
              </div>

              <div className='row mb-3'>
                <div className='col text-end'><strong>เบอร์โทรศัพท์</strong></div>
                <div className='col'>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="phonenumber" 
                    value={phonenumber} 
                    onChange={(e) => {
                      const fullphonenumberValue = e.target.value;
                      setPhonenumber(fullphonenumberValue);
                    }} 
                  />
                </div>
              </div>

              <div className='row mb-3'>
                <div className='col text-end'><strong>LINE ID</strong></div>
                <div className='col'>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="lineid" 
                    value={lineid} 
                    onChange={(e) => {
                      const fulllineidValue = e.target.value;
                      setLineid(fulllineidValue);
                    }} 
                  />
                </div>
              </div>

              <div><strong>Cats Number:</strong> {catsnumber}</div>
              <div><strong>Remark:</strong> {remark}</div>
              <div><strong>Score:</strong> {score}</div>
              <div><strong>Address:</strong> {address}</div>
              <div><strong>Phonenumber:</strong> {phonenumber}</div>
              <div><strong>Line ID:</strong> {lineid}</div>
            </div>
          </div>
        </div>

      <div className='col-6 text-end mt-3'>
        <button className='btn btn-primary' onClick={handleEdit}>สร้างสมาชิคใหม่</button>
      </div>
    </div>

    </div>
    </div>

  );
}

export default MemberCreate;
