import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import Axios from 'axios';

const Invoice = () => {
  const contentToPrint = useRef(null);
  const [id, setId] = useState(0);
  const [username, setUsername] = useState('no login');
  const [checkindate, setCheckindate] = useState('13/13/13');
  const [checkoutdate, setCheckoutdate] = useState('14/14/14');
  const [fullprice, setFullprice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [price, setPrice] = useState(0);
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
      <h1 className='heading'>Cats Hotel Invoice</h1>
      <div className='content'>
        <p className='text'>ID: {id}</p>
        <p className='text'>Username: {username}</p>
        <p className='text'>Check-in Date: {new Date(checkindate).toLocaleDateString()}</p>
        <p className='text'>Check-out Date: {new Date(checkoutdate).toLocaleDateString()}</p>
        <p className='text'>Full Price: {fullprice}</p>
        <p className='text'>Discount: {discount}</p>
        <p className='text'>Details: {details}</p>
        <p className='text'>Booking Date: {new Date(bookingdate).toLocaleString()}</p>
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
