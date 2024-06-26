// App.js
import { createRoot } from 'react-dom/client'; 
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage"
import Footer from "./components/footer"


import BookingEdit from './pages/bookEdit';
import BookingCancel from './pages/bookCancel';
import BookingManagement from './pages/bookManagement';

import RoomCreate from './pages/roomCreate';
import RoomEdit from './pages/roomEdit';
import RoomDelete from './pages/roomDelete';

import MemberCreate from './pages/memberCreate';
import MemberEdit from './pages/memberEdit';
import MemberDelete from './pages/memberDelete';

import InvoiceDelete from './pages/invoiceDelete';
import InvoiceEdit from './pages/invoiceEdit';
import InvoicePrint from './pages/invoicePrint';
import InvoiceEditAddress from './pages/invoiceEditaddress';


import IkkiHomePage from './pages/Ikkihomepage';
import Dashboard from './pages/dashboard';

import AdminCreate from './pages/adminCreacte';
import BookingGet from './pages/bookingGet';


function App() {


  return (
    <BrowserRouter>
      
      <Routes>
          <Route path="" element={<IkkiHomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="dashboard" element={<Dashboard />} />

  
          <Route path="booking/get" element = {<BookingGet/>}/>
          <Route path="booking/manament" element = {<BookingManagement/>}/>
          <Route path="booking/edit" element = {<BookingEdit/>}/>
          <Route path="booking/delete" element = {<BookingCancel/>}/>

          <Route path="room/create" element={<RoomCreate />} />
          <Route path="room/edit" element={<RoomEdit />} />
          <Route path="room/delete" element={<RoomDelete />} />

          <Route path="member/create" element={<MemberCreate />} />
          <Route path="member/edit" element={<MemberEdit/>}/> 
          <Route path="member/delete" element={<MemberDelete/>}/> 
          
          <Route path="invoice/print" element = {<InvoicePrint/>}/>
          <Route path="invoice/editbill" element = {<InvoiceEdit/>}/>
          <Route path="invoice/editaddress" element = {<InvoiceEditAddress/>}/>
          <Route path="invoice/delete" element = {<InvoiceDelete/>}/>

          <Route path="admin" element = {<AdminCreate/>}/>


 
        <Route  />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);
