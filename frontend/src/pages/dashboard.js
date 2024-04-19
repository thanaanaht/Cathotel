import React from 'react';
import Manubar from '../components/Manubar';
import ShowCalendar from '../components/showcalendar'; // Import your ShowCalendar component here

const YourComponent = () => {
  return (
    <div className="row">
      <div className="col-6 col-md-2" style={{ backgroundColor: 'black' }}>
        <Manubar />
      </div>
      <div className="col" style={{ backgroundColor: 'white' }}>
        <div style={{ width: '100px' }}> {/* Adjust the width as per your requirement */}
          <ShowCalendar />
        </div>
      </div>
    </div>
  );
}

export default YourComponent;
