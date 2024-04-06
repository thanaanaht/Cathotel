// App.js
import { createRoot } from 'react-dom/client'; 
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
// import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import Manubar from "./components/Manubar";
import Footer from './components/footer';
import Booking from './pages/booking';
import Invoice from './components/invoice';
import EditDBMember from './EditDBMember';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Manubar />
      <Routes>

          <Route path="home" element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="booking" element={<Booking />} />
          <Route path="invoice" element={<Invoice />} />
          <Route path="editmember" element={<EditDBMember />} />
 
        <Route  />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);
