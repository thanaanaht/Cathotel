import React, { useRef, useState, useEffect } from 'react';
import Axios from 'axios';
import { Stack } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Manubar from '../components/Manubar';

const PORT = 3300;

function BookCancel() {
    const [calendarData, setCalendarData] = useState([]);
    const [checkindatetime, setCheckinDatetime] = useState(new Date());
    const [checkoutdatetime, setCheckoutDatetime] = useState(new Date());
    const [checkindate, setCheckindate] = useState('');
    const [checkoutdate, setCheckoutdate] = useState('');
    const [columnNames, setColumnNames] = useState([]);
    const [id, setId] = useState('');
    const [bookingID, setBookingID] = useState('');
    const [roomname, setRoomName]= useState('');
    const [memberlist, setMemberlist] = useState([]);
    const [bookinglist, setBookinglist] = useState([]);
    const [fullprice, setFullprice]= useState(0);
    const [discount, setDiscount]= useState(0);
    const [priceVat, setPriceVat]= useState(0);
    const [price, setPrice]= useState(0);
    const [remark , setRemark] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurName] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [idnumber, setIdNumber] = useState('');
    const [lineid, setLineid] = useState('');
    const [address, setAddress] = useState('');
    const [catsnumber, setCatsnumber] = useState(0);
    const [score, setScore] = useState(0);
    const [searchPhoneNumber, setSearchPhoneNumber] = useState('');
    const [errortext,setErrorText] = useState('');
    const [addscore, setAddscore] = useState(0);
    const [prevscore,setPrevScore] = useState(0);
    const [details, setDetails] = useState('');
    const [deleteid , setDeleteID]= useState('');
    const [days,setDays] = useState(0);

    const [company, setCompany] = useState('');
    const [companyaddress, setCompanyAddress] = useState('');

 
    useEffect(() => {
        Axios.get(`http://localhost:${PORT}/bookingcontrol`)
          .then((response) => {
            setBookinglist(response.data);
            if (response.data.length > 0) {
              const lastBookingId = response.data[response.data.length - 1].id;
              setId(lastBookingId);
            }
          })
          .catch((error) => {
            console.error("Error fetching booking data:", error);
          });
      }, [PORT]);



    const filteredMembers = bookinglist.filter(booking => {
      // Check if booking and booking.phonenumber are not null before using includes()
      return booking && booking.phonenumber && booking.phonenumber.includes(searchPhoneNumber);
  });
  

    const handleSearchChange = (event) => {
      setSearchPhoneNumber(event.target.value);
    
      // Find the member from the filtered list based on the search phone number
      const foundMember = filteredMembers.find(member => member.phonenumber === event.target.value);
      if (foundMember) {
        setErrorText('')
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

    const formatDate = (dateString) => {
      if (!dateString) {
          return ''; // Return an empty string if dateString is null or undefined
      }
      const date = new Date(dateString);
      const options = { month: 'short', day: '2-digit', year: 'numeric' };
      return date.toLocaleDateString('en-US', options);
  };

  const cancelBooking = () => {
    const confirmed = window.confirm("ยืนยันการยกเลิกการจอง");
    if (confirmed && deleteid) { // Check if id is present
      Axios.delete(`http://localhost:${PORT}/bookingcontrol/deletebooking/${deleteid}`)
        .then(response => {
          console.log('Invoice deleted successfully:', response.data);
          // Update bookinglist state to remove the deleted invoice
          setBookinglist(bookinglist.filter(booking => booking.id !== deleteid));
          // Reset selected ID
          setId('');
          alert("ยกเลิกการจองสำเร็จแล้ว");
        })
        .catch(error => {
          console.error('Error deleting invoice:', error);
          alert("เกิดข้อผิดพลาดในการยกเลิกการจอง");
        });
    }
  };
  
    return (
        <div className="row">
            <div className="col-6 col-md-2" style={{ backgroundColor: 'black' }}>
                <Manubar/>
            </div>
            <div className="col" style={{ backgroundColor: 'white' }}>
              <br/>
              {deleteid}
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

                    
                    {deleteid}
                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Phone</th>
                          <th>Name</th>
                          <th>Surname</th>
                          <th>Check in</th>
                          <th>Check out</th>
                          <th>Booking Date</th>
                          <th>Room</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredMembers.map((val, key) => (
                          <tr key={key}>
                            <td>{val.id}</td>
                            <td>{val.phonenumber}</td>
                            <td>{val.name}</td>
                            <td>{val.surname}</td>
                            <td>{formatDate(val.checkindate)}</td>
                            <td>{formatDate(val.checkoutdate)}</td>
                            <td>{formatDate(val.bookingdate)}</td>
                            <td>{val.roomname}</td>
                            <button
                                type="button"
                                className="btn btn-danger"
                                style={{ padding: '1px', margin: '1px' }}
                                onClick={() => {
                                  cancelBooking();
                                  setDeleteID(val.id);
                                }}
                              >
                                ยกเลิกการจอง
                              </button>



                          </tr>
                        ))}
                       
                      </tbody>
                    </table>
                    
                  </div>
                    
            </div>
        </div>
    );
} 

export default BookCancel;
