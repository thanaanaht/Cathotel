import React from 'react';
import './booking.css'
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
        <div className='room-column'>
          <Room05 />
        </div>
        <div className='room-column'>
          <Room06 />
        </div>
        <div className='room-column'>
          <Room07 />
        </div>

        <div className='room-column'>
          <Room08 />
        </div>

        <div className='room-column'>
          <Room09 />
        </div>

        <div className='room-column'>
          <Room10 />
        </div>


      
    </div>
  );
}

export default Booking;
