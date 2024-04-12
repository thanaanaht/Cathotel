import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import Axios from 'axios';

const InvoiceEdit = () => {
  const contentToPrint = useRef(null);
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [checkindate, setCheckindate] = useState('');
  const [checkoutdate, setCheckoutdate] = useState('');
  const [fullprice, setFullprice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [priceVat, setPriceVat] = useState(0);
  const [days, setDays] = useState(0);
  const [bookinglist, setBookinglist] = useState([]);
  const PORT = 3300;

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

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    setId(selectedId);

    const selectedBooking = bookinglist.find(booking => booking.id === parseInt(selectedId));

    if (selectedBooking) {
      setUsername(selectedBooking.username);
      setCheckindate(selectedBooking.checkindate);
      setCheckoutdate(selectedBooking.checkoutdate);
      setFullprice(selectedBooking.fullprice);
      setDiscount(selectedBooking.discount);
      setDays(selectedBooking.days);
      setPriceVat(selectedBooking.priceVat);
    }
  };

  const handleEdit = () => {
    // Make HTTP request to update data
    Axios.put(`http://localhost:${PORT}/updateInvoice/${id}`, {
      username: username,
      checkindate: checkindate,
      checkoutdate: checkoutdate,
      fullprice: fullprice,
      discount: discount,
      days: days,
      priceVat: priceVat,
      // other updated fields...
    })
    .then(response => {
      // Handle successful response
      console.log('Invoice updated successfully:', response.data);
    })
    .catch(error => {
      // Handle error
      console.error('Error updating invoice:', error);
    });
  };

  return (
    <div className="container mt-5">
      <h1>Edit Invoice</h1>
      <select className="form-select mb-3" onChange={handleSelectChange} value={id}>
        <option value="">Select Booking ID</option>
        {bookinglist.map((val, key) => (
          <option key={key} value={val.id}>
            Booking ID: {val.id}
          </option>
        ))}
      </select>

      {id && (
        <div ref={contentToPrint} className='invoice'>
          <h2 className='text-center mb-4'>Invoice</h2>
          <div className='row mb-3'>
            <div className='col-6'>
              <div>
                Username: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div>
                Check-in Date: <input type="date" value={checkindate} onChange={(e) => setCheckindate(e.target.value)} />
              </div>
              <div>
                Check-out Date: <input type="date" value={checkoutdate} onChange={(e) => setCheckoutdate(e.target.value)} />
              </div>
            </div>
            <div className='col-6 text-end'>
              <button className='btn btn-primary' onClick={handleEdit}>Update</button>
            </div>
          </div>
          {/* Additional input fields and form elements for editing */}
        </div>
      )}
    </div>
  );
}

export default InvoiceEdit;
