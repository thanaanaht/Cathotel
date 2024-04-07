import React, { useState } from 'react';
import './booking.css';
import MonthSelector from './monthselecter';
import Room01 from '../components/room/room01';
import Room02 from '../components/room/room02';
import Room03 from '../components/room/room03';
import Room04 from '../components/room/room04';
import Room05 from '../components/room/room05';
import Room06 from '../components/room/room06';
import Room07 from '../components/room/room07';
import Room08 from '../components/room/room08';
import Room09 from '../components/room/room09';
import Room10 from '../components/room/room10';


 
function Booking() {
  const [selectedMonth, setSelectedMonth] = useState(1); // Default to January

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  return (
    <div>
      <MonthSelector selectedMonth={selectedMonth} onChange={handleMonthChange} />
      <div className='room-container'>
        <div className='room-column'>
          <Room01 selectedMonth={selectedMonth} />
        </div>
        <div className='room-column'>
          <Room02 selectedMonth={selectedMonth} />
        </div>
        {/* Include other room components with selectedMonth prop */}
      </div>
    </div>
  );
}

export default Booking;
//With this setup, each room component will receive the selected month as a prop and update its display accordingly whenever the month selector changes in the Booking component. Make sure to update the logic in each room component to render availability or content based on the selected month.








