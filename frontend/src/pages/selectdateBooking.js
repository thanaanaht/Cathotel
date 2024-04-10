import React, { useState, useEffect } from 'react';
import './selectdateBookig.css';
import Axios from 'axios';
import CheckLogin from '../components/checklogin';

function SelectDateBooling() {
    const [checkindate, setCheckindate] = useState('');
    const [checkoutdate, setCheckoutdate] = useState('');
    const [fullprice, setFullprice] = useState(0);
    const [days, setDays] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [priceVat, setPriceVat] = useState(0);
    
    const [BookingList, setBookingList] = useState([]);
    const [username, setUsername] = useState(''); 
    
    
    // Define detail, checkindate, and checkoutdate
    const [detail, setDetail] = useState('');
    
    
    // Define isAuthenticated state
      const PORT = 3300;


      
      const handlePickupDateChange = (e) => {
        const selectedDate = e.target.value;
        setCheckindate(selectedDate);
        if (checkoutdate && selectedDate > checkoutdate) {
          setCheckoutdate(selectedDate);
        }
      };
      
      const handleReturnDateChange = (e) => {
        const selectedDate = e.target.value;
        setCheckoutdate(selectedDate);
      };
      
      const handleBooking = (e) => {
        e.preventDefault();
        const startDate = new Date(checkindate);
        const endDate = new Date(checkoutdate);
        const daysDifference = endDate - startDate;
        
        setDays(daysDifference);
        const totalCost = daysDifference * 800;
        setTotalCost(totalCost);
        setFullprice(totalCost);
        // Here you can call addBooking if you want to add the booking to the list
      };
      
    
      // Add Booking function if you want to add the booking to the list
      const addBooking = () => {
        console.log(checkindate);
        Axios.post(`http://localhost:${PORT}/bookingcontrolroomcreate`, {
          username,
          fullprice,
          discount,
          priceVat,
          detail,
          checkindate,
          checkoutdate,
          days,
        })
        .then(() => {
          setBookingList([
            ...BookingList,
            { username, fullprice, discount, priceVat, detail, checkindate, checkoutdate,days },
          ]);
        })
        .catch(error => {
          console.error('Error adding member:', error);
          // Handle error here
        });
       
    };
    
    
      return (
        <div className="App">
            <CheckLogin/>
        <header>
          <h1>Cats Hotel Booking</h1>
        </header>
        <main>
          <section className="car-booking">
            <h2>Username: {username}</h2>
            <form onSubmit={handleBooking}>
              <label htmlFor="pickup-date">Pickup Date:</label>
              <input type="date" id="pickup-date" name="pickup-date" value={checkindate} onChange={handlePickupDateChange} />
              <label htmlFor="return-date">Return Date:</label>
              <input type="date" id="return-date" name="return-date" value={checkoutdate} onChange={handleReturnDateChange} min={checkindate} />
              <button type="submit" onClick={CheckLogin}>ค้นหาที่พัก</button>
            </form>
            {days > 0 && <label>Number of Days: {days}</label>}
            {totalCost > 0 && (
              <div>
                <h3>Total Cost:</h3>
                <p>{totalCost} Baht</p>
              </div>
            )}
            <button type="submit" onClick={addBooking} >ยืนยันการจอง</button>
          </section>
        </main>
      </div>
      );
    }
    
    export default SelectDateBooling;
    