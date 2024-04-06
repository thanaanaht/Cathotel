import React, { useState } from 'react';
import './invoice.css';

const Invoice = () => {
    const [bookingid, setBookingId] = useState('001202');
    const [roomnumber, setRoomnumber] = useState('01');
    const [checkindate, setCheckindate] = useState('01/02/2024');
    const [checkoutdate, setCheckoutdate] = useState('02/02/2024');
    const [daysstay, setDaysstay] = useState(1);
    const [fullprice, setFullprice] = useState(800);
    const [discount, setDiscount] = useState(100);
    const [total, setTotal] = useState(700);

    return (
        <div className="Banner">
        <img src="../../public/images/banner-bill.jpg" alt="Invoice Image" />
        
        
        <p>Booking ID : {bookingid}</p>
        <p>Check in : {checkindate}</p>
        <p>Check out : {checkoutdate}</p>
        </div>

    );
}

export default Invoice;
