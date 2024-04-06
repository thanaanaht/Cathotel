import React, { useState } from 'react';
import './Home.css';

function Home() {
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [numDays, setNumDays] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const handlePickupDateChange = (e) => {
    const selectedDate = e.target.value;
    setPickupDate(selectedDate);
    // Ensure that the "Return Date" cannot be selected before the "Pickup Date"
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
    // Calculate the number of days between pickup and return dates
    const startDate = new Date(pickupDate);
    const endDate = new Date(returnDate);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    // Update the number of days and total cost
    setNumDays(daysDifference);
    setTotalCost(daysDifference * 800); // Assuming 800 baht per day

  };

  return (
    <div className="App">
      <header>
        <h1>Cats Hotel Booking</h1>
      </header>
      <main>
        <section className="car-booking">
          <h2>Cats Hotel Booking</h2>
          <form onSubmit={handleBooking}>
            <label htmlFor="pickup-date">Pickup Date:</label>
            <input type="date" id="pickup-date" name="pickup-date" value={pickupDate} onChange={handlePickupDateChange} />
            <label htmlFor="return-date">Return Date:</label>
            <input type="date" id="return-date" name="return-date" value={returnDate} onChange={handleReturnDateChange} min={pickupDate} />
            <button type="submit">Book</button>
            {numDays > 0 && <label>Number of Days: {numDays}</label>}
          </form>
          {totalCost > 0 && (
            <div>
              <h3>Total Cost:</h3>
              <p>{totalCost} Baht</p>
            </div>
          )}
        </section>
      </main>

    </div>
  );
}

export default Home;
