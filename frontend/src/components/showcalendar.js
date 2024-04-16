import React, { useState, useEffect } from "react";
import Axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import StatusRoom from "./statusRoom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const PORT = 3300;

const ShowCalendar = () => {
    const [calendarData, setCalendarData] = useState([]);
    const [checkinDate, setCheckinDate] = useState(new Date());
    const [checkoutDate, setCheckoutDate] = useState(new Date());
    const [availableRooms, setAvailableRooms] = useState([]);
    const [bookingId, setBookingId] = useState('');
    const [roomname, setRoomname] = useState('');

    useEffect(() => {
        Axios.get(`http://localhost:${PORT}/roomcontrol`)
            .then(response => {
                console.log("Response data:", response.data);
                setCalendarData(response.data);
            })
            .catch(error => {
                console.error('Error fetching calendar data:', error);
            });
    }, []);

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'MMMM do yyyy');
    };

    const searchRoomavailable = () => {
        // Implement your logic here to search for available rooms based on check-in and check-out dates
        // Once you have the available rooms, update the availableRooms state
        const availableRooms = []; // Placeholder, replace with actual logic
        setAvailableRooms(availableRooms);
    };

    const filteredDataInRange = calendarData.filter(entry => {
        const currentDate = new Date(entry.date);
        return currentDate >= checkinDate && currentDate <= checkoutDate;
    });

    return (
        <div className="container mt-5"> {/* Bootstrap container class */}
            <h1 className="text-center mb-4">Calendar</h1> {/* Bootstrap text-center class */}
            <div className="row mb-3">
                <div className="col">
                    <DatePicker selected={checkinDate} onChange={(date) => setCheckinDate(date)} className="form-control" />
                </div>
                <div className="col">
                    <DatePicker 
                        selected={checkoutDate} 
                        onChange={(date) => setCheckoutDate(date)} 
                        minDate={checkinDate}
                        className="form-control"
                    />
                </div>
                <div className="col-auto">
                    <button onClick={searchRoomavailable} className="btn btn-primary">Submit</button> {/* Bootstrap button classes */}
                </div>
            </div>
            <div>Check in date: {formatDate(checkinDate)}</div>
            <div>Check out date: {formatDate(checkoutDate)}</div>
            
            <table className="table"> {/* Bootstrap table class */}
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Room 01</th>
                        <th>Room 02</th>
                        <th>Room 03</th>
                        <th>Room 04</th>
                        <th>Room 05</th>
                        <th>Room 06</th>
                        <th>Room 07</th>
                        <th>Room 08</th>
                        <th>Room 09</th>
                        <th>Room 10</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDataInRange.map((entry, index) => {
                        const formattedDate = formatDate(entry.date);
                        return (
                            <tr key={index}>
                                <td>{formattedDate}</td>
                                <td>{entry.room01}</td>
                                <td>{entry.room02}</td>
                                <td>{entry.room03}</td>
                                <td>{entry.room04}</td>
                                <td>{entry.room05}</td>
                                <td>{entry.room06}</td>
                                <td>{entry.room07}</td>
                                <td>{entry.room08}</td>
                                <td>{entry.room09}</td>
                                <td>{entry.room10}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div>
                <h2>Available Rooms</h2>
                <ul>
                    {availableRooms.map((room, index) => (
                        <li key={index}>Room {room}</li>
                    ))}
                </ul>
            </div>
            <StatusRoom 
                checkindate={checkinDate}
                checkoutdate={checkoutDate}
                bookingId={bookingId}
                roomname={roomname}
            />
        </div>
    );
};

export default ShowCalendar;
