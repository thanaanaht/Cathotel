import React, { useState, useEffect } from 'react';
import './booking.css';
import MonthSelector from '../components/monthselecter';
import Room from '../components/room';
import Axios from 'axios';

function Booking({ roomid }) {
  const [selectedMonth, setSelectedMonth] = useState(1); // Default to January
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableRoomIds, setAvailableRoomIds] = useState([]);
  const [searchDate, setSearchDate] = useState('');

  useEffect(() => {
    // Fetch availability data for selected date
    fetchAvailableRoomIds(selectedDate);
  }, [selectedDate]);

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  const handleSearchDateChange = (event) => {
    setSearchDate(event.target.value);
  };

  const searchAvailableRooms = () => {
    const formattedDate = new Date(searchDate);
    fetchAvailableRoomIds(formattedDate);
  };

  const fetchAvailableRoomIds = (date) => {
    // Format date to YYYY-MM-DD
    const formattedDate = date.toISOString().split('T')[0];
    Axios.get(`http://localhost:3300/availability?date=${formattedDate}`)
      .then(response => {
        // Extract available room IDs from response
        setAvailableRoomIds(response.data.availableRoomIds);
      })
      .catch(error => {
        console.error('Error fetching availability data:', error);
      });
  };
  const handleRoomIdChange = (roomId) => {
    // Handle changes in the selected room ID
    console.log('Selected Room ID:', roomId);
  };
  

  return (
    <div>
      <div className='search-container'>
        <input type='date' value={searchDate} onChange={handleSearchDateChange} />
        <button onClick={searchAvailableRooms}>Search</button>
      </div>
      <div className='selection-bar'>
        <span>Select available room ID:</span>
        <select onChange={(e) => handleRoomIdChange(e.target.value)}>
          {availableRoomIds.map((roomId, index) => (
            <option key={index} value={roomId}>{roomId}</option>
          ))}
        </select>
      </div>
      <MonthSelector selectedMonth={selectedMonth} onChange={handleMonthChange} />
      <div className='room-container'>
        <div className='room-column'>
          <Room roomid={roomid} selectedMonth={selectedMonth} />
        </div>
      </div>
    </div>
  );
}

export default Booking;
