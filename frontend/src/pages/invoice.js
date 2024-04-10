import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import Axios from 'axios';
import './invoice.css';

const Invoice = () => {
  const contentToPrint = useRef(null);
  const [id, setId] = useState();
  const [getid, setGetid] = useState(0);
  const [username, setUsername] = useState('no login');
  const [checkindate, setCheckindate] = useState('');
  const [checkoutdate, setCheckoutdate] = useState('');
  const [fullprice, setFullprice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [priceVat, setPriceVat] = useState(0);
  const [price, setPrice] = useState(0);
  const [days, setDays] = useState(0);
  const [details, setDetails] = useState('');
  const [bookingdate, setBookingdate] = useState('');
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

    // Find the selected booking from the booking list
    const selectedBooking = bookinglist.find(booking => booking.id === parseInt(selectedId));

    // Update state variables with the selected booking's data
    if (selectedBooking) {
      setGetid(selectedBooking.id);
      setUsername(selectedBooking.username);
      setCheckindate(selectedBooking.checkindate);
      setCheckoutdate(selectedBooking.checkoutdate);
      setFullprice(selectedBooking.fullprice);
      setDiscount(selectedBooking.discount);
      setDays(selectedBooking.days);
      setPriceVat(selectedBooking.priceVat);
      setDetails(selectedBooking.details);
      setBookingdate(selectedBooking.bookingdate);
    }
  };

  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  return (
    <div>
      <select onChange={handleSelectChange} value={id}>
        <option value="">Select Booking ID</option>
        {bookinglist.map((val, key) => (
          <option key={key} value={val.id}>
            Booking ID: {val.id}
          </option>
        ))}
      </select>

      {id && (
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
          <div className='container-sum'>
            <div className='right-text'></div> 
            <div className='center-text'>รวมเป็นเงิน  </div> 
            <div className='left-text'> {fullprice} บาท</div>
          </div>
          <div className='container-sum'>
            <div className='right-text'></div> 
            <div className='center-text'>VAT 7%   </div> 
            <div className='left-text'>{priceVat} บาท</div>
          </div>
          <div className='container-sum'>
            <div className='right-text'></div> 
            <div className='center-text'>ส่วนลด   </div> 
            <div className='left-text'>{discount} บาท</div>
          </div>
          <div className='container-sum'>
            <div className='right-text'></div> 
            <div className='center-text'>รวมทั้งหมด   </div> 
            <div className='left-text'>{price} บาท</div>
          </div>

        </div>
      )}
      <button onClick={() => handlePrint(null, () => contentToPrint.current)}>
        PRINT
      </button>
    </div>
  );
}

export default Invoice;
