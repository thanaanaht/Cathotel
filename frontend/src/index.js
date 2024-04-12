// App.js
import { createRoot } from 'react-dom/client'; 
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";

import BookingManagement from './pages/bookingManagement';
import BookingEdit from './pages/bookingEdit';
import BookingCancel from './pages/bookingCancel';

// import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import Manubar from "./components/Manubar";
import Footer from './components/footer';
import Booking from './pages/booking';
import EditDBMember from './EditDBMember';
import Invoice from './pages/invoice';
import CreateRoom from './pages/ManageRoom';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Manubar />
      <Routes>
          <Route path="" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<LoginPage />} />

          <Route path="booking/manament" element = {<BookingManagement/>}/>
          <Route path="booking/edit" element = {<BookingEdit/>}/>
          <Route path="booking/delete" element = {<BookingCancel/>}/>

          <Route path="room/create" element={<Booking />} />
          <Route path="room/edit" element={<Invoice />} />
          <Route path="room/delete" element={<EditDBMember />} />

          <Route path="member/create" element={<Invoice />} />
          <Route path="member/edit" element={<CreateRoom/>}/> 
          <Route path="member/delete" element={<CreateRoom/>}/> 
          
          <Route path="invoice/print" element = {<BookingManagement/>}/>
          <Route path="invoice/editbill" element = {<BookingManagement/>}/>
          <Route path="invoice/editaddress" element = {<BookingManagement/>}/>
 
        <Route  />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);
