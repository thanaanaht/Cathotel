import React, { useState, useEffect } from 'react';
import Manubar from '../components/Manubar';
import { Axios } from 'axios';
import ShowCalendar from '../components/showcalendar';

const PORT = 3300;


 

function Dashboard() {
  const [datalist ,setDatalist] = useState([]);
  


  return (
    <div className="row">
    <div className="col-6 col-md-2" style={{ backgroundColor: 'black' }}>
      <Manubar/>
    </div>
    <div className="col" style={{ backgroundColor: 'white' }}>
     
       <ShowCalendar/>

    </div>
    </div>
  );
}

export default Dashboard;
