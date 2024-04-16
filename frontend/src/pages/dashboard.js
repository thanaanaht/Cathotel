import React from 'react';
import Manubar from '../components/Manubar';


 

function Dashboard() {
  


  return (
    <div className="row">
    <div className="col-6 col-md-2" style={{ backgroundColor: 'black' }}>
      <Manubar/>
    </div>
    <div className="col" style={{ backgroundColor: 'white' }}>
        Dashboard

    </div>
    </div>
  );
}

export default Dashboard;
