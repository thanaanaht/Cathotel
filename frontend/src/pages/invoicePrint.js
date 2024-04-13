import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import Axios from 'axios';

const InvoicePrint = () => {
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
  const [Bookingdate,setBookingdate] = useState('');
  const [company, setCompany]=useState('')
  const [companyaddress, setCompanyAddress]=useState('')
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
      setCompany(selectedBooking.company);
      setCompanyAddress(selectedBooking.companyaddress);
      console.log("company is:",company);
      console.log("companyaddress is:",companyaddress);

      // {"id":14,"username":null,"checkindate":"2024-03-31T17:00:00.000Z","checkoutdate":"2024-04-01T17:00:00.000Z",
      //"fullprice":800,"discount":null,"price":800,"priceVat":null,"details":null,"bookingdate":"2024-04-13T02:06:00.000Z",
      //"days":1,"company":"Ikki Cat Hotel","companyaddress":"17/243 Pracha Chuen 14 Alley, Lane 14, Thung Song Hong, Lak Si, Bangkok 10210"}]

    }
  };

  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  return (
    <div className="container mt-5">
        <h1>พิมพ์</h1>
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
              <div>เลขที่ CT2567{id}</div>
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
                <td>เข้าพัก</td>
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
          <div className='col-6 text-end'>
              <button className='btn btn-primary' onClick={() => handlePrint(null, () => contentToPrint.current)}>Print</button>
            </div>
        </div>
      )}
    </div>
  );
}

export default InvoicePrint;
