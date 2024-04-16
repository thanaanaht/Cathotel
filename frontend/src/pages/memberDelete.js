import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Manubar from '../components/Manubar';

const MemberDelete = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberlist, setMemberlist] = useState([]);
  const PORT = 3300;

  useEffect(() => {
    Axios.get(`http://localhost:${PORT}/member`)
      .then((response) => {
        setMemberlist(response.data);
        if (response.data.length > 0) {
          setSelectedMember(response.data[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching member data:", error);
      });
  }, [PORT]);

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    const selectedMember = memberlist.find(member => member.id === selectedId);
    setSelectedMember(selectedMember);
  };

  const deleteMember = () => {
    const confirmed = window.confirm("Are you sure you want to delete this member?");
    if (confirmed && selectedMember) {
      Axios.delete(`http://localhost:${PORT}/member/delete`, { data: { id: selectedMember.id } })
        .then(response => {
          console.log('Member deleted successfully:', response.data);
          setMemberlist(memberlist.filter(member => member.id !== selectedMember.id));
          setSelectedMember(null);
          alert("Member deleted successfully");
        })
        .catch(error => {
          console.error('Error deleting member:', error);
          alert("Failed to delete member");
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
      <h1>Delete Member</h1>
      <select className="form-select mb-3" onChange={handleSelectChange} value={selectedMember ? selectedMember.id : ''}>
        <option value="">Select Member</option>
        {memberlist.map((val) => (
          <option key={val.id} value={val.id}>
            {val.username} - {val.phonenumber}
          </option>
        ))}
      </select>
      {selectedMember && (
        <div className='member-details border p-4'>
          <h2 className='text-center mb-4'>Member Details</h2>
          <div className='row mb-3'>
            <div className='col-6'>
              <div><strong>ID:</strong> {selectedMember.id}</div>
              <div><strong>Username:</strong> {selectedMember.username}</div>
              <div><strong>Cats Number:</strong> {selectedMember.catsnumber}</div>
              <div><strong>Remark:</strong> {selectedMember.remark}</div>
              <div><strong>Score:</strong> {selectedMember.score}</div>
              <div><strong>Level:</strong> {selectedMember.level}</div>
              <div><strong>Address:</strong> {selectedMember.address}</div>
              <div><strong>Phone Number:</strong> {selectedMember.phonenumber}</div>
              <div><strong>LINE ID:</strong> {selectedMember.lineid}</div>
              <button className="btn btn-danger" onClick={deleteMember}>Delete Member</button>
            </div>
          </div>
        </div>
      )}
    </div>

    </div>
    </div>

  );
}

export default MemberDelete;
