// App.js
import { createRoot } from 'react-dom/client'; 
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Footer from "./components/footer";
import LoginPage from "./pages/LoginPage";
import Manubar from './components/Manubar';
import Dashboard from './pages/dashboard';



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
    

      <Routes>
          <Route path="" element={<LoginPage />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="dashboard" element={<Dashboard/>} />
   
    
   
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);
