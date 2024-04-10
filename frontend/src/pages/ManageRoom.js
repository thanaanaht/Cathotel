import React, { useEffect, useState } from 'react';
import './ManageRoom.css';
import AddRoom from '../components/addRoom';
import DeleteRoom from '../components/delectRoom';
import ShowCalendar from '../components/showcalendar';

const ManageRoom = () => {

   
      




    // const handleClick = (index) => {
    //     setColumnDelete(index);
    //     console.log('Clicked on column:', columnDelete);
    //     deleteRoom(columnDelete);
    // }
    

    return (
       
            <div>
             
             <AddRoom/>
             <DeleteRoom/>
             <ShowCalendar/>
          


            </div>
    
  
    );
    
};

export default ManageRoom;
