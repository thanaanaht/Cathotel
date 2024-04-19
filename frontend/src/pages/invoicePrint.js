import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import Axios from 'axios';
import Manubar from '../components/Manubar';

const InvoicePrint = () => {
  const contentToPrint = useRef(null);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const [checkindate, setCheckindate] = useState('');
  const [checkoutdate, setCheckoutdate] = useState('');
  const [fullprice, setFullprice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [priceVat, setPriceVat] = useState(0);
  const [price, setPrice] = useState(0);
  const [days, setDays] = useState(0);
  const [score, setScore] = useState(0);
  const [prevscore, setPrevScore] = useState(0);
  const [addscore, setAddscore] = useState(0);
  const [remark, setRemark] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [bookinglist, setBookinglist] = useState([]);
  const [roomname, setRoomName] = useState('');
  const [company, setCompany] = useState('');
  const [bookingID, setBookingID] = useState('');
  const [companyaddress, setCompanyAddress] = useState('');


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
 

    if (selectedBooking) {
      setCheckindate(selectedBooking.checkindate);
      setCheckoutdate(selectedBooking.checkoutdate);
      setFullprice(selectedBooking.fullprice);
      setDiscount(selectedBooking.discount);
      setPriceVat(selectedBooking.priceVat);
      setPhoneNumber(selectedBooking.phonenumber);
      setPrice(selectedBooking.price);
      setDays(selectedBooking.days)
      setCompany(selectedBooking.company);
      setCompanyAddress(selectedBooking.companyaddress);
      setRoomName(selectedBooking.roomname);
      setPrevScore(selectedBooking.prevscore);
      setScore(selectedBooking.score);
      setAddscore(selectedBooking.addscore);
      setName(selectedBooking.name)
      setSurname(selectedBooking.surname)
      setRemark(selectedBooking.remark)
      setBookingID(selectedBooking.bookingID)
      console.log("score:",score)
      console.log("prevscore:",prevscore)
 
      
    }
  };

  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });


    return (
      <div className="row">
      <div className="col-6 col-md-2" style={{ backgroundColor: 'black' }}>
        <Manubar/>
      </div>
      <div className="col" style={{ backgroundColor: 'white' }}>
      <div className="container mt-5">
        <h1>พิมพ์ใบเสร็จรับเงิน/ใบกำกับภาษี</h1>
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
          <hr/>
          <h2 className='text-center mb-4'>ใบเสร็จรับเงิน/ใบกำกับภาษี</h2>
          <div className='row mb-3'>
            <div className='col-6'>
              <div>เลขที่ :{id}</div>
              <div>{company}</div>
              <div>{companyaddress}</div>
            </div>
          <div>
            ชื่อ: {name}   นามสกุล: {surname}   เบอร์โทรศัพท์: {phonenumber}
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
            <div >BOOKING ID: {bookingID}</div>
           <div >คะแนนรวม: {score}</div>
           <div >คะแนนก่อนหน้า: {prevscore}</div>
           <div >คะแนนที่ได้รับ: {addscore}</div>
           <div>หมายเหตุ: {remark}</div>
          <hr/>
        </div>
      )}


        <div className='col-6 text-end'>
          <button className='btn btn-primary' onClick={() => handlePrint(null, () => contentToPrint.current)}>Print</button>
        </div>
    </div>
  
      </div>
      </div>
    ); 


}

export default InvoicePrint;
