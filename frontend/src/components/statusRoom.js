import React, { useState } from "react";
import axios from "axios"; // Corrected import statement

const PORT = 3300;

const StatusRoom = ({ checkindate: propCheckinDate, checkoutdate: propCheckoutDate, bookingid: propBookingId, roomname: propRoomName }) => {
    const [checkinDate, setCheckinDate] = useState(new Date(propCheckinDate));
    const [checkoutDate, setCheckoutDate] = useState(new Date(propCheckoutDate));
    const [bookingId, setBookingId] = useState(propBookingId);
    const [roomName, setRoomName] = useState(propRoomName);


    const updateBookingStatus = () => {
        const formattedCheckinDate = checkinDate.toISOString().split('T')[0];
        const formattedCheckoutDate = checkoutDate.toISOString().split('T')[0];
        const payload = {
            checkindate: formattedCheckinDate,
            checkoutdate: formattedCheckoutDate,
            bookingId: bookingId,
            roomname: roomName
        };

        // Send the PUT request to update the booking status
        axios.put(`http://localhost:${PORT}/roomcontrol/update`, payload)
            .then(response => {
                console.log('Booking status updated successfully:', response.data);
                // Handle success response as needed
            })
            .catch(error => {
                console.error('Error updating booking status:', error);
                // Handle error
            });
    };

    return (
        <div>
            <div>
                <label htmlFor="checkindate">Check-in Date:</label>
                <input type="date" id="checkindate" value={checkinDate.toISOString().split('T')[0]} onChange={(e) => setCheckinDate(new Date(e.target.value)) } />
            </div>
            <div>
                <label htmlFor="checkoutdate">Check-out Date:</label>
                <input type="date" id="checkoutdate" value={checkoutDate.toISOString().split('T')[0]} onChange={(e) => setCheckoutDate(new Date(e.target.value))} />
            </div>
            <div>
                <label htmlFor="roomname">Booking ID:</label>
                <select id="roomname" value={bookingId} onChange={(e) => setBookingId(e.target.value)}>
                    <option value="">Select</option>
                    <option value="Booking01">Booking 01</option>
                    <option value="Booking02">Booking 02</option>
                    <option value="Booking03">Booking 03</option>
                    <option value="Booking04">Booking 04</option>
                    <option value="Booking05">Booking 05</option>
                    <option value="Booking06">Booking 06</option>
                    <option value="Booking07">Booking 07</option>
                    <option value="Booking08">Booking 08</option>
                    <option value="Booking09">Booking 09</option>
                    <option value="Booking10">Booking 10</option>
                </select>
            </div>
            <div>
                <label htmlFor="roomname">Room Name:</label>
                <select id="roomname" value={roomName} onChange={(e) => setRoomName(e.target.value)}>
                <option value="">Select</option>
                    <option value="room01">Room 01</option>
                    <option value="room02">Room 02</option>
                    <option value="room03">Room 03</option>
                    <option value="room04">Room 04</option>
                    <option value="room05">Room 05</option>
                    <option value="room06">Room 06</option>
                    <option value="room07">Room 07</option>
                    <option value="room08">Room 08</option>
                    <option value="room09">Room 09</option>
                    <option value="room10">Room 10</option>
                </select>
            </div>
            <button onClick={updateBookingStatus}>Update Booking Status</button>
        </div>
    );
};

export default StatusRoom;
