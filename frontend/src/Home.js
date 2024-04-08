import React, { useState, useEffect } from 'react';
import './Home.css';
import Axios from 'axios';


function Home() {
const [pickupDate, setPickupDate] = useState('');
const [returnDate, setReturnDate] = useState('');
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

  useEffect(() => {
    const resLogin = () => {
      Axios.get(`http://localhost:${PORT}/login`)
        .then(response => {
          console.log(response.data);

          const receivedToken = response.data.token;
          const receivedUsername = response.data.username;


          // Assuming these are states you defined elsewhere in your component
          setUsername(receivedUsername);


     
        })
        .catch(error => {
          console.error('Error fetching login data', error);
        });
    };

    resLogin();
  }, []);

  const handlePickupDateChange = (e) => {
    const selectedDate = e.target.value;
    setPickupDate(selectedDate);
    if (returnDate && selectedDate > returnDate) {
      setReturnDate(selectedDate);
    }
  };

  const handleReturnDateChange = (e) => {
    const selectedDate = e.target.value;
    setReturnDate(selectedDate);
  };

  const handleBooking = (e) => {
    e.preventDefault();
    const startDate = new Date(pickupDate);
    const endDate = new Date(returnDate);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    setDays(daysDifference);
    setTotalCost(daysDifference * 800);
    setFullprice(totalCost);
    // Here you can call addBooking if you want to add the booking to the list
  };

  // Add Booking function if you want to add the booking to the list
  const addBooking = () => {
    Axios.post(`http://localhost:${PORT}/bookingcontrolroomcreate`, {
      username,
      fullprice,
      discount,
      priceVat,
      detail,
      pickupDate,
      returnDate,
      days,
    })
    .then(() => {
      setBookingList([
        ...BookingList,
        { username, fullprice, discount, priceVat, detail, pickupDate, returnDate,days },
      ]);
    })
    .catch(error => {
      console.error('Error adding member:', error);
      // Handle error here
    });
   
};


  return (
    <div className="App">
    <header>
      <h1>Cats Hotel Booking</h1>
    </header>
    <main>
      <section className="car-booking">
        <h2>Username: {username}</h2>
        <form onSubmit={handleBooking}>
          <label htmlFor="pickup-date">Pickup Date:</label>
          <input type="date" id="pickup-date" name="pickup-date" value={pickupDate} onChange={handlePickupDateChange} />
          <label htmlFor="return-date">Return Date:</label>
          <input type="date" id="return-date" name="return-date" value={returnDate} onChange={handleReturnDateChange} min={pickupDate} />
          <button type="submit">คำนวน</button>
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

export default Home;
