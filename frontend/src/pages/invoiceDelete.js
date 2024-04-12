import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import Axios from 'axios';

const InvoiceDelete = () => {
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
    setId(event.target.value);
  };

  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  const deleteInvoice = (idToDelete) => { // Pass id as a parameter
    const confirmed = window.confirm("ยืนยันการลบใบเสร็จรับเงิน/ใบกำกับภาษี");
    if (confirmed && idToDelete) { // Check idToDelete instead of id
      Axios.delete(`http://localhost:${PORT}/bookingcontrol/deletebooking/${idToDelete}`) // Use idToDelete in the URL
        .then(response => {
          console.log('Invoice deleted successfully:', response.data);
          // Update bookinglist state to remove the deleted invoice
          setBookinglist(bookinglist.filter(booking => booking.id !== idToDelete));
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
          <h2 className='text-center mb-4'>ใบเสร็จรับเงิน/ใบกำกับภาษี</h2>
          <div className='row mb-3'>
            <div className='col-6'>
              <div>เลขที่ CT256700{id}</div>
              <div>99/99 ถ.ทองหล่อ เขตพระนคร</div>
              <div>แขวงพระนคร กรุงเทพ 10230</div>
            </div>
            <div className='col-6 text-end'>
              <button className='btn btn-primary' onClick={() => handlePrint(null, () => deleteInvoice(id))}>Delete</button>
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
        </div>
      )}
    </div>
  );
}

export default InvoiceDelete;
