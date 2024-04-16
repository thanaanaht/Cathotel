import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Stack } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Manubar from '../components/Manubar';


function BookingEdit() {
 
  

  return (
    <div className="row">
    <div className="col-6 col-md-2" style={{ backgroundColor: 'black' }}>
      <Manubar/>
    </div>
    <div className="col" style={{ backgroundColor: 'white' }}>
        BookingEdit

    </div>
    </div>
  );
}

export default BookingEdit;
