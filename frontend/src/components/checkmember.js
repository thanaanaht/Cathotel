import React, { useRef, useState, useEffect ,createContext} from 'react';
import Axios from 'axios';
import MemberEdit from '../pages/memberEdit';

export const DataContext = createContext();

const CheckMember = () => {
      // name: name,
    // surname: surname,
    // phonenumber: phonenumber,
    // idnumber: idnumber,
    // lineid: lineid,
    // address: address,
    // catsnumber: catsnumber,
    // score: score,
    // remark: remark,

  const [id, setId] = useState('1');
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
  const [memberlist, setMemberlist] = useState([]);
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
    <div className="container mt-5">
      <h1>Member</h1>
 
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
      <DataContext.Provider value={{ id,name, surname, phonenumber, idnumber, lineid, address, catsnumber, score, remark }}>
          <MemberEdit />
        </DataContext.Provider>

      

  
      
    </div>
    
  );
}

export default CheckMember;
