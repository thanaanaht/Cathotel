import React from 'react';
import './booking.css'
import Room01 from '../components/room/room01';
import Room02 from '../components/room/room02';
import Room03 from '../components/room/room03';
import Room04 from '../components/room/room04';

function Booking() {
  return (
    <div className='room-container'>
        <div className='room-column'>
          <Room01 />
        </div>
        <div className='room-column'>
          <Room02 />
        </div>
        <div className='room-column'>
          <Room03 />
        </div>
        <div className='room-column'>
          <Room04 />
        </div>


      
    </div>
  );
}

export default Booking;
