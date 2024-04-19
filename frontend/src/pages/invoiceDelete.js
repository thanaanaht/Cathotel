import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import Axios from 'axios';
import Manubar from '../components/Manubar'

const InvoiceDelete = () => {
  const contentToPrint = useRef(null);
  const [id, setId] = useState('');
  const [bookingID, setBookingID] = useState('');
  const [username, setUsername] = useState('no login');
  const [checkindate, setCheckindate] = useState('');
  const [checkoutdate, setCheckoutdate] = useState('');
  const [fullprice, setFullprice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [priceVat, setPriceVat] = useState(0);
  const [price, setPrice] = useState(0);
  const [days, setDays] = useState(0);
  const [details, setDetails] = useState('');
  const [bookinglist, setBookinglist] = useState([]);
  const [roomname, setRoomName] = useState('');
  const [company, setCompany] = useState('');
  const [companyaddress, setCompanyAddress] = useState('');
  const [columnNames, setColumnNames] = useState([]);
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
      setRoomName(selectedBooking.roomname);
      setBookingID(selectedBooking.bookingID)
      setUsername(selectedBooking.username);
      setCheckindate(selectedBooking.checkindate);
      setCheckoutdate(selectedBooking.checkoutdate);
      setFullprice(selectedBooking.fullprice);
      setDiscount(selectedBooking.discount);
      setDays(selectedBooking.days);
      setPriceVat(selectedBooking.priceVat);
      setDetails(selectedBooking.details);
      setCompany(selectedBooking.company);
      setCompanyAddress(selectedBooking.companyaddress);
      setPrice(selectedBooking.price);
    }
  };


  const deleteInvoice = () => {
    const confirmed = window.confirm("ยืนยันการลบใบเสร็จรับเงิน/ใบกำกับภาษี");
    if (confirmed && id) { // Check if id is present
      Axios.delete(`http://localhost:${PORT}/bookingcontrol/deletebooking/${id}`)
        .then(response => {
          console.log('Invoice deleted successfully:', response.data);
          // Update bookinglist state to remove the deleted invoice
          setBookinglist(bookinglist.filter(booking => booking.id !== id));
          // Reset selected ID
          setId('');
          alert("ลบใบเสร็จรับเงิน/ใบกำกับภาษีสำเร็จแล้ว");
        })
        .catch(error => {
          console.error('Error deleting invoice:', error);
          alert("เกิดข้อผิดพลาดในการลบใบเสร็จรับเงิน/ใบกำกับภาษี");
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
      <h1>ลบใบเสร็จรับเงิน/ใบกำกับภาษี</h1>
      <select className="form-select mb-3" onChange={handleSelectChange} value={id}>
        <option value="">เลือก Booking ID</option>
        {bookinglist.map((val) => (
          <option key={val.id} value={val.id}>
            Booking ID: {val.id}
          </option>
        ))}
      </select>
      {id && (
        <div ref={contentToPrint} className='invoice'>
          <hr/>
          <h2 className='text-center mb-4'>ใบเสร็จรับเงิน/ใบกำกับภาษี</h2>
          <div className='row mb-3'>
            <div className='col-6'>
              <div>เลขที่ : {bookingID}</div>
              <div>{company}</div>
              <div>{companyaddress}</div>
            </div>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">รายการ</th>
                <th scope="col">วันเช็คอิน</th>
                <th scope="col">วันเช็คเอาท์</th>
                <th scope="col">จำนวนวัน</th>
                <th scope="col">ราคา</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{id}</td>
                <td>เข้าพัก {roomname}</td>
                <td>{new Date(checkindate).toLocaleDateString()}</td>
                <td>{new Date(checkoutdate).toLocaleDateString()}</td>
                <td>{days}</td>
                <td>{fullprice}</td>
              </tr>
            </tbody>
          </table>
          <div className='container-sum'>
            <div className='row'>
              <div className='col text-end'><strong>รวมเป็นเงิน</strong></div>
              <div className='col text-start'>{fullprice} บาท</div>
            </div>
          </div>
          <div className='container-sum'>
            <div className='row'>
              <div className='col text-end'><strong>VAT 7%</strong></div>
              <div className='col text-start'>{priceVat} บาท</div>
            </div>
          </div>
          <div className='container-sum'>
            <div className='row'>
              <div className='col text-end'><strong>ส่วนลด</strong></div>
              <div className='col text-start'>{discount} บาท</div>
            </div>
          </div>
          <div className='container-sum'>
            <div className='row'>
              <div className='col text-end'><strong>รวมทั้งหมด</strong></div>
              <div className='col text-start'>{price} บาท</div>
            </div>
          </div>
          <hr/>
          <div className="text-center">
            <button className='btn btn-primary' onClick={deleteInvoice}>Delete</button>
          </div>
        </div>
      )}
    </div>
  
    </div>
    </div>
    );


}

export default InvoiceDelete;
