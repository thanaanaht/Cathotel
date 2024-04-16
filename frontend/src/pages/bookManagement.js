import React, { useState, useEffect } from "react";
import Axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { daysToWeeks, format } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Manubar from "../components/Manubar";

const PORT = 3300;

const BookingManagement = () => {

    const [calendarData, setCalendarData] = useState([]);
    const [checkindatetime, setCheckinDatetime] = useState(new Date());
    const [checkoutdatetime, setCheckoutDatetime] = useState(new Date());
    const [checkindate, setCheckinDate] = useState('');
    const [checkoutdate, setCheckoutDate] = useState('');
    const [columnNames, setColumnNames] = useState([]);
    const [id, setId] = useState('');
    const [bookingID, setBookingID] = useState('');
    const [roomname, setRoomname]= useState('');
    const [memberlist, setMemberlist] = useState([]);
    const [selectedMemberId, setSelectedMemberId] = useState('');
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
    const [addscore, setAddScore] = useState(0);
    const [prevscore,setPrevScore] = useState(0);
    const [details, setDetails] = useState('');
    const [days,setDays] = useState(0);
    const company = 'Ikki Cat Hotel';
    const companyaddress = '17/243 Pracha Chuen 14 Alley, Lane 14, Thung Song Hong, Lak Si, Bangkok 10210';

 
    useEffect(() => {
        Axios.get(`http://localhost:${PORT}/roomcontrol`)
            .then(response => {
                console.log("Response data:", response.data);
                setCalendarData(response.data);
                // Extract column names from the first entry
                if (response.data.length > 0) {
                    const firstEntry = response.data[0];
                    const columns = Object.keys(firstEntry).filter(column => column !== 'id' && column !== 'date');
                    setColumnNames(columns);
                }
            })
            .catch(error => {
                console.error('Error fetching calendar data:', error);
            });
    }, []);

    useEffect(() => {
      Axios.get(`http://localhost:${PORT}/member`)
          .then((response) => {
              setMemberlist(response.data);
              if (response.data.length > 0) {
                  const lastMemberId = response.data[response.data.length - 1].id;
                  setSelectedMemberId(lastMemberId);
              }
          })
          .catch((error) => {
              console.error("Error fetching member data:", error);
          });
  }, [])

  const formatDate = (dateString) => {
    if (!dateString) {
        return ''; // Return an empty string if dateString is null or undefined
    }
    return format(new Date(dateString), 'MMMMddyyyy');
};




    const filteredDataInRange = calendarData.filter(entry => {
        const currentDate = new Date(entry.date);
        return currentDate >= checkindate && currentDate <= checkoutdate;
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

    
  const filteredMembers = memberlist.filter(member => {
    return member.phonenumber.includes(searchPhoneNumber);
  });


  const calculate = (fullprice,discount ,checkindate,checkoutdate,phonenumber) => {
    const vat = (fullprice - discount) * 0.07;
    const price = fullprice - discount + vat
    setPriceVat(vat);
    setPrice(price);
    const diffDays =  (checkoutdate -checkindate)/86400000 ;
    setDays(diffDays);

    const bookingID = phonenumber ;

    // Set the booking ID
    setBookingID(bookingID);
  }
  const handleEdit = () => {
    const confirmed = window.confirm("ยืนยันการจอง");

 

    if (confirmed && bookingID) {
      // Make HTTP request to update data
      Axios.put(`http://localhost:${PORT}/roomcontrol/booking`, {
        checkindate:checkindate,
        checkoutdate:checkoutdate,
        bookingID:bookingID,
        roomname:roomname,
      
      })
        .then((response) => {
          // Handle successful response
          console.log("Booking on calendar successfully:", response.data);
          console.log("checkinDate",checkindate);
          console.log("checkoutDate",checkoutdate);
          console.log("BookingID",bookingID);
    
        })
        .catch((error) => {
          // Handle error
          console.error("Error create booking:", error);
        });
     
    }
    if (confirmed && phonenumber) {
      // Make HTTP request to update data
      Axios.post(`http://localhost:${PORT}/booking/create`, {
        checkindate:checkindate,
        checkoutdate:checkoutdate,
        fullprice:fullprice,
        discount:discount,
        price:price,
        priceVat:priceVat,
        details:details,
        days:days,
        company:company,
        companyaddress:companyaddress,
        roomname:roomname,
        prevscore:prevscore,
        addscore:addscore,
        score:score,
        remark:remark,
        name:name,
        surname:surname,
        phonenumber:phonenumber,
      })
        .then((response) => {
          // Handle successful response
          console.log("Member create successfully:", response.data);
          console.log("checkinDate",checkindate);
          console.log("checkoutDate",checkoutdate);
          console.log("fullprice",fullprice);
          console.log("discount",discount);
          console.log("price ", price);
          console.log("priceVat",priceVat);
          console.log("details",details);
          console.log("days",days);
          console.log("company ", company);
          console.log("companyaddress",companyaddress);
          console.log("roomname",roomname);
          console.log("addscore",addscore);
          console.log("score ", score);
          console.log("remark",remark);
          console.log("name",name);
          console.log("surname",surname); 
          console.log("phonenumber",phonenumber); 
          window.location.href = '/invoice/print';
        })
        .catch((error) => {
          // Handle error
          console.error("Error create booking:", error);
        });
     
    }
  };

  const filterData = () => {
    // Check if check-in and check-out dates are selected
    if (checkindate && checkoutdate) {
      // Filter the data to include only entries where the selected column is null
      const filteredData = filteredDataInRange.filter(entry => {
        // Assuming 'columnName' is the name of the column to check for null values
        return entry[columnNames] === null;
      });
      return filteredData;
    }
    return [];
  };

  const filteredData = filterData();

    return (
      <div className="row">
        <div className="col-6 col-md-2" style={{ backgroundColor: 'black' }}>
          <Manubar/>
        </div>
        
        <div className="col" style={{ backgroundColor: 'white' }}>
          <div className="container mt-5"> 
          <p>ค้นหาสมาชิคด้วยเบอร์โทร</p>
          <input
            type="text"
            className="form-control"
            id="searchphonenumber"
            value={searchPhoneNumber}
            onChange={handleSearchChange}
          />
          {errortext}
           {filteredMembers.map((val, key) => (
          <option key={key} value={val.phonenumber}>

          </option>
          
            ))}
            <p>ชื่อ: {name}  นามสกุล: {surname}</p>
            <p>เบอร์โทรศัพท์: {phonenumber} LINE ID: {idnumber}</p>
            <p>ที่อยู่: {address}</p>
            <p>จำนวนน้องแมว: {catsnumber}</p>
            <p>คะแนนปัจจุบัน: {score}</p>



            <h1 className="text-center mb-4">ทำการจองที่พัก</h1>
            <div className="row mb-3">
            
        

            </div>

            <div className="row mb-3">
              <div className="col">
                CHECK IN: <DatePicker 
                selected={checkindate } 
                onChange={(date) => setCheckinDate(date)} 
                className="form-control" />
              </div>
              <div className="col">
                CHECK OUT: <DatePicker 
                  selected={checkoutdate} 
                  onChange={(date) => setCheckoutDate(date)} 
                  minDate={checkindate}
                  className="form-control"
                />
              </div>

            </div>

            <div>Check in date: {formatDate(checkindate)}</div>
            <div>Check out date: {formatDate(checkoutdate)}</div>

            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  {columnNames.map((columnName, index) => (
                    <th key={index}>{columnName}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredDataInRange.map((entry, index) => {
                  const formattedDate = formatDate(entry.date);
                  return (
                    <tr key={index}>
                      <td>{formattedDate}</td>
                      {columnNames.map((columnName, index) => (
                        <td key={index}>{entry[columnName]}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
        
            <div className="container mt-5">
              <div className='member-details border p-4'>
                <h2 className='text-center mb-4'></h2>
                <div className='row mb-3'>
                  <div className='col-6'>
                    <div className='col'>
                      
                      <select 
                        className="form-select" 
                        id="columnNames" 
                        value={roomname} 
                        onChange={(e) => setRoomname(e.target.value)}
                      >
                        <option value="columnName">Select a room</option>
                        {columnNames.map((columnName, index) => (
                          <option key={index} value={columnName}>{columnName}</option>
                        ))}
                      </select>
                    </div>
                    
    
                    <div className='row mb-3'>
                      <div className='col text-end'><strong>ราคา</strong></div>
                      <div className='col'>
                        <input 
                          type="number" 
                          className="form-control" 
                          id="fullprice" 
                          value={fullprice} 
                          onChange={(e) => {
                            const fullPriceValue = parseFloat(e.target.value);
                            setFullprice(fullPriceValue);
                            calculate(fullprice, discount, checkindate, checkoutdate, phonenumber)
                            setPrevScore(score);
                          }} 
                        />
                      </div>
                    </div>
    
                    <div className='row mb-3'>
                      <div className='col text-end'><strong>ส่วนลด</strong></div>
                      <div className='col'>
                        <input 
                          type="number" 
                          className="form-control" 
                          id="discount" 
                          value={discount} 
                          onChange={(e) => {
                            const discountValue = parseFloat(e.target.value);
                            setDiscount(discountValue);
                            calculate(fullprice, discount, checkindate, checkoutdate, phonenumber)
                            
                          }} 
                        />
                      </div>
                    </div>

    

    
                    <div className='row mb-3'>
                      <div className='col text-end'><strong>เพิ่มเติม</strong></div>
                      <div className='col'>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="remark" 
                          value={remark} 
                          onChange={(e) => {
                            const remarkvalue = e.target.value;
                            setRemark(remarkvalue);
                            calculate(fullprice, discount, checkindate, checkoutdate, phonenumber)
                          }} 
                        />
                      </div>
                    </div>
                    <div className='row mb-3'>
                      <div className='col text-end'><strong>คะแนนที่ได้</strong></div>
                      <div className='col'>
                        <input 
                          type="number" 
                          className="form-control" 
                          id="addscore" 
                          value={addscore} 
                          onChange={(e) => {
                            const addscore = e.target.value;
                            setAddScore(addscore);
                            calculate(fullprice, discount, checkindate, checkoutdate, phonenumber)

                          }} 
                        />
                      </div>
                    </div>
                   
                    {/* {calculate(fullprice, discount, checkindate, checkoutdate)}
                    {setScore(prevscore + addscore)} */}
                  </div>
                </div>

                ROOM NAME: {roomname}<br/>
                Price: {fullprice}<br/>
                Discount: {discount}<br/>
                VAT: {priceVat}<br/>
                Total: {price}<br/>
                Remark: {remark} <br/>
                prevScore: {prevscore} <br/>
                addscore: {addscore} <br/>
                score:{score}
                days: {days}
                            
                <div className='col-6 text-end mt-3'>
                    <button className='btn btn-primary' onClick={() => {handleEdit(); }}>ยืนยันการจอง </button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  export default BookingManagement   
