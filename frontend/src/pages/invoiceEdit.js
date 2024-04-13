import React, { useRef, useState, useEffect } from 'react';
import Axios from 'axios';

const InvoiceEdit = () => {
  const contentToPrint = useRef(null);
  const [id, setId] = useState('');
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

  useEffect(() => {
    Axios.get(`http://localhost:${PORT}/roomcontrol/columnnames`)
      .then(response => {
        console.log("Response data:", response.data);
        if (response.data.success) {
          setColumnNames(response.data.columnNames);
        } else {
          console.error('Error: Unable to fetch column names. Message:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching column names:', error);
      });
  }, []);

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    setId(selectedId);

    const selectedBooking = bookinglist.find(booking => booking.id === parseInt(selectedId));

    if (selectedBooking) {
      setRoomName(selectedBooking.roomname);
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

  const handleEdit = () => {
    // Make HTTP request to update data
    Axios.put(`http://localhost:${PORT}/updateInvoice/${id}`, {
      roomname: roomname,
      username: username,
      checkindate: checkindate,
      checkoutdate: checkoutdate,
      fullprice: fullprice,
      discount: discount,
      days: days,
      priceVat: priceVat,
      price: price,
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
        </div>
      )}

      {id && (
        <div className='invoice'>
          <h2 className='text-center mb-4'>รายการแก้ไข</h2>
          <div className='row mb-3'>
            <div className='col-6'>
              <div className="mb-3">
                <div className='col text-end'><strong>ห้อง</strong></div>
                <div className='col'>
                  <select 
                    className="form-select" 
                    id="roomname" 
                    value={roomname} 
                    onChange={(e) => {
                      const roomnameValue = e.target.value;
                      setRoomName(roomnameValue);
                    }} 
                  >
                    <option value="">Select Room Name</option>
                    {columnNames
                      .filter(columnName => columnName !== 'id' && columnName !== 'date')
                      .map((columnName, index) => (
                        <option key={index} value={columnName}>{columnName}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="checkindate" className="form-label">Check-in Date:</label>
                <input type="date" className="form-control" id="checkindate" value={checkindate} onChange={(e) => setCheckindate(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="checkoutdate" className="form-label">Check-out Date:</label>
                <input type="date" className="form-control" id="checkoutdate" value={checkoutdate} onChange={(e) => setCheckoutdate(e.target.value)} />
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
                    }} 
                  />
                </div>
              </div>

              <div className='row mb-3'>
                <div className='col text-end'><strong>VAT 7%</strong></div>
                <div className='col'>
                  <input 
                    type="number" 
                    className="form-control" 
                    id="priceVat" 
                    value={priceVat} 
                    onChange={(e) => {
                      const priceVatValue = parseFloat(e.target.value);
                      setPriceVat(priceVatValue);
                    }} 
                  />
                </div>
              </div>

              <div className='row mb-3'>
                <div className='col text-end'><strong>ราคารวม</strong></div>
                <div className='col'>
                  <input 
                    type="
                    
                    " 
                    className="form-control" 
                    id="price" 
                    value={price} 
                    onChange={(e) => {
                      const totalPrice = parseFloat(e.target.value);
                      setPrice(totalPrice);
                    }} 
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button className='btn btn-primary' onClick={handleEdit}>Update</button>
          </div>
          {/* Additional input fields and form elements for editing */}
        </div>
      )}
    </div>
  );
}

export default InvoiceEdit;
