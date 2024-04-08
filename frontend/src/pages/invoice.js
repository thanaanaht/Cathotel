import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import Axios from 'axios';
import './invoice.css'

const Invoice = () => {
  const contentToPrint = useRef(null);
  const [id, setId] = useState(0);
  const [username, setUsername] = useState('no login');
  const [checkindate, setCheckindate] = useState('13/13/13');
  const [checkoutdate, setCheckoutdate] = useState('14/14/14');
  const [fullprice, setFullprice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [price, setPrice] = useState(0);
  const [days, setDays] = useState(0);
  const [details, setDetails] = useState('NaN');
  const [bookingdate, setBookingdate] = useState('14/14/14');
  const [bookings, setBookings] = useState([]);
  const [handleSelect, setHandleSelect] = useState([]);
  const PORT = 3300;

  useEffect(() => {
    const getLastBooking = async () => {
      try {
        const response = await Axios.get(`http://localhost:${PORT}/bookingcontrolroomcreate`);
        const lastBooking = response.data[response.data.length - 1]; // Get the last booking
        setId(lastBooking.id);
        setUsername(lastBooking.username);
        setCheckindate(lastBooking.checkindate);
        setCheckoutdate(lastBooking.checkoutdate);
        setFullprice(lastBooking.fullprice);
        setDiscount(lastBooking.discount);
        setDetails(lastBooking.details);
        setBookingdate(lastBooking.bookingdate);
      } catch (error) {
        console.error('Error fetching last booking data', error);
      }
    };
  
    getLastBooking();
  }, []);
  

  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  return (
    <>
    <select onChange={handleSelect}>
      {bookings.map(booking => (
        <option key={booking.id} value={booking.id}>
          Booking ID: {booking.id}
        </option>
      ))}
    </select>
    <div ref={contentToPrint} className='invoice'>
    <div className='title-right'>ใบเสร็จรับเงิน/ใบกำกับภาษี</div>
    <div className='title-right'>เลขที่ CT256700{id}</div>
    <div className='title-left'>99/99 ถ.ทองหล่อ เขตพระนคร</div>
    <div className='title-left'>แขวงพระนคร กรุงเทพ 10230</div>
    <br/>
  <table>
    <tr>
      <th>ID</th>
      <th>รายการ</th>
      <th>วันเช็คอิน</th>
      <th>วันเช็คเอาท์</th>
      <th>จำนวนวัน</th>
      <th>ราคา</th>
    </tr>
    <tr>
      <td>{id}</td>
      <td>เข้าพัก</td>
      <td>{new Date(checkindate).toLocaleDateString()}</td>
      <td>{new Date(checkoutdate).toLocaleDateString()}</td>
      <td>{days}</td>
      <td>{fullprice}</td>
    </tr>
  
  </table>


  <div class='container-sum'>
    <div className='right-text'></div> 
    <div className='center-text'>รวมเป็นเงิน  </div> 
    <div className='left-text'> {fullprice} บาท</div>
  </div>
  <div class='container-sum'>
    <div className='right-text'></div> 
    <div className='center-text'>VAT 7%   </div> 
    <div className='left-text'>{fullprice} บาท</div>
  </div>
  <div class='container-sum'>
    <div className='right-text'></div> 
    <div className='center-text'>ส่วนลด   </div> 
    <div className='left-text'>{fullprice} บาท</div>
  </div>
  <div class='container-sum'>
    <div className='right-text'></div> 
    <div className='center-text'>รวมทั้งหมด   </div> 
    <div className='left-text'>{fullprice} บาท</div>
  </div>
    

    </div>
    <button onClick={() => {
      handlePrint(null, () => contentToPrint.current);
    }}>
      PRINT
    </button>
  </>
  );
}

export default Invoice;
