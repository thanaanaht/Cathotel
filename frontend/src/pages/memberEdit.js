import React, { useRef, useState, useEffect } from 'react';
import Axios from 'axios';
import Manubar from '../components/Manubar';

const MemberEdit = () => {
      // name: name,
    // surname: surname,
    // phonenumber: phonenumber,
    // idnumber: idnumber,
    // lineid: lineid,
    // address: address,
    // catsnumber: catsnumber,
    // score: score,
    // remark: remark,

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurName] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [idnumber, setIdNumber] = useState('');
  const [lineid, setLineid] = useState('');
  const [address, setAddress] = useState('');
  const [catsnumber, setCatsnumber] = useState(0);
  const [score, setScore] = useState('');
  const [remark, setRemark] = useState('');
  const [searchPhoneNumber, setSearchPhoneNumber] = useState('');
  const [selectedPhoneNumber,setSelectedPhoneNumber] = useState('');
  const [seachphonenumber,setSeachPhonenumber] = useState('');
  const [memberlist, setMemberlist] = useState([]);
  const [selectedMember, setSelectedMember] = useState([]);
  const [errortext,setErrorText] = useState('');
  
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
    const confirmed = window.confirm("ยืนยันการแก้ไขสมาชิค");
    if (confirmed ) {
      // Make HTTP request to update data
      Axios.put(`http://localhost:${PORT}/member/update`, {
        id: id,
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
          console.log("Member updated successfully:", response.data);
        })
        .catch((error) => {
          // Handle error
          console.error("Error updating member:", error);
        });
    }
  };

  const handleSelectChange = (event) => {
    const selectedPhoneNumber = event.target.value;
    setId(selectedPhoneNumber);
    // Find the selected member from the member list
    const selectedMember = memberlist.find(member => member.phonenumber === selectedPhoneNumber);


    if (selectedMember) {
      setId(selectedMember.id);
      setName(selectedMember.name);
      setSurName(selectedMember.surname);
      setPhoneNumber(selectedMember.phonenumber);
      setIdNumber(selectedMember.idnumber);
      setLineid(selectedMember.lineid);
      setAddress(selectedMember.address);
      setCatsnumber(selectedMember.catsnumber);
      setScore(selectedMember.score);
      setRemark(selectedMember.remark);
      console.log('id:',selectedMember.id);
      console.log('phonenumber:',selectedMember.phonenumber);
      
    }
  };


  const handleSearchChange = (event) => {
    setSearchPhoneNumber(event.target.value);
  
    // Find the member from the filtered list based on the search phone number
    const foundMember = filteredMembers.find(member => member.phonenumber === event.target.value);
    if (foundMember) {
      setErrorText('')
      setSelectedPhoneNumber(foundMember.phonenumber);
      setId(foundMember.id);
      setName(foundMember.name);
      setSurName(foundMember.surname);
      setPhoneNumber(foundMember.phonenumber);
      setIdNumber(foundMember.idnumber);
      setLineid(foundMember.lineid);
      setAddress(foundMember.address);
      setCatsnumber(foundMember.catsnumber);
      setScore(foundMember.score);
      setRemark(foundMember.remark);
      console.log('id:',foundMember.id);
      console.log('phonenumber:',foundMember.phonenumber);
    } else {
      setErrorText('member not found');
      setSelectedPhoneNumber('');
      setId('');
      setName('');
      setSurName('');
      setPhoneNumber('');
      setIdNumber('');
      setLineid('');
      setAddress('');
      setCatsnumber('');
      setScore('');
      setRemark('');
    }
  };


  

  const filteredMembers = memberlist.filter(member => {
    return member.phonenumber.includes(searchPhoneNumber);
  });


  return (
  <div className="row">
        <div className="col-6 col-md-2" style={{ backgroundColor: 'black' }}>
          <Manubar/>
        </div>
        
        <div className="col" style={{ backgroundColor: 'white' }}>
      <div className='row mb-3'>
        <div className='col text-end'><strong>ค้นหาด้วยเบอร์โทร</strong></div>
        <div className='col'>
          <input
            type="text"
            className="form-control"
            id="searchphonenumber"
            value={searchPhoneNumber}
            onChange={handleSearchChange}
          />
        </div>
        {errortext}
        {filteredMembers.map((val, key) => (
          <option key={key} value={val.phonenumber}>
            Member seach: {val.phonenumber}
          </option>
        ))}
      </div>

      <select className="form-select mb-3" onChange={handleSelectChange} value={selectedPhoneNumber }>
        <option value="">เบอร์โทรศัพท์</option>
        {filteredMembers.map((val, key) => (
          <option key={key} value={val.phonenumber}>
            Member Phone: {val.phonenumber}
          </option>
        ))}
      </select>


      

      { (
        <div className='member-details border p-4'>
          <h2 className='text-center mb-4'>รายละเอียดสมาชิค</h2>
          <div className='row mb-3'>
            <div className='col-6'>

            <div className='row mb-3'>
                <div className='col text-end'><strong>Name</strong></div>
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
                    type="surname" 
                    className="form-control" 
                    id="surname" 
                    value={surname} 
                    onChange={(e) => {
                      const fullcatsnumberValue = e.target.value;
                      setSurName(fullcatsnumberValue);
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
                      setPhoneNumber(fullphonenumberValue);
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


            </div>
          </div>
        </div>
      )}
      <div className='col-6 text-end mt-3'>
        <button className='btn btn-primary' onClick={handleEdit}>UPDATE ข้อมูลสมาชิค</button>
      </div>
    </div>
    </div>
  );
}

export default MemberEdit;
