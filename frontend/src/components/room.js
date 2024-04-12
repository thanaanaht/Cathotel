import React, { useState, useEffect } from 'react';
import Axios from 'axios';


function Room() {
    const PORT = 3300;
    const [data, setData] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [roomNumber, setRoomNumber] = useState('01');

    useEffect(() => {
        // Fetch room data when the component mounts
        getRoomData(roomNumber);
    }, [roomNumber]); // Update room data when roomNumber changes

    const getRoomData = (roomNumber) => {
        Axios.get(`http://localhost:${PORT}/bookingcontrolroom/${roomNumber}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching room data:', error);
                // Handle error
            });
    };

    const bookingStatus = (id, newStatus) => {
        Axios.put(`http://localhost:${PORT}/bookingcontrolroom/${roomNumber}`, { id: id, status: 'Booked' })
            .then((response) => {
                // If the status is updated successfully on the server, update the state
                setData(
                    data.map((val) => {
                        return val.id === id ? {
                            ...val,
                            status: 'Booked'
                        } : val;
                    })
                );
            })
            .catch(error => {
                console.error('Error updating booking status', error);
            });
    };

    const cancelStatus = (id, newStatus) => {
        Axios.put(`http://localhost:${PORT}/bookingcontrolroom/${roomNumber}`, { status: 'Available', id: id })
            .then((response) => {
                // If the status is updated successfully on the server, update the state
                setData(
                    data.map((val) => {
                        return val.id === id ? {
                            ...val,
                            status: 'Available'
                        } : val;
                    })
                );
            })
            .catch(error => {
                console.error('Error updating booking status', error);
            });
    };

    const formatDate = (dateString) => {
        // Assuming dateString is in ISO 8601 format
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const handleRoomChange = (value) => {
        setRoomNumber(value);
    };

    // Function to handle changing to the previous month
    const prevMonth = () => {
        setCurrentDate(prevDate => {
            const prevMonthDate = new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
            return prevMonthDate;
        });
    };

    // Function to handle changing to the next month
    const nextMonth = () => {
        setCurrentDate(prevDate => {
            const nextMonthDate = new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
            return nextMonthDate;
        });
    };

    // Filter data to include only bookings from the current month
    const filteredData = data.filter(item => {
        const bookingDate = new Date(item.calendar);
        return bookingDate.getMonth() === currentDate.getMonth() && bookingDate.getFullYear() === currentDate.getFullYear();
    });

    return (
        <div>
            <h2>Room Booking</h2>
            <div>
                <button onClick={prevMonth}>{'<'}</button>
                <span>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                <button onClick={nextMonth}>{'>'}</button>
            </div>
            <div>
                <label htmlFor="roomNumber"></label>
                <select id="roomNumber" onChange={(e) => handleRoomChange(e.target.value)} value={roomNumber}>
                    <option value="">Select Room</option>
                    {/* Populate options dynamically */}
                    <option value="01">Room 01</option>
                    <option value="02">Room 02</option>
                    <option value="03">Room 03</option>
                    <option value="04">Room 04</option>
                    <option value="05">Room 05</option>
                    <option value="06">Room 06</option>
                    <option value="07">Room 07</option>
                    <option value="08">Room 08</option>
                    <option value="09">Room 09</option>
                    <option value="10">Room 10</option>
                    {/* Add more options as needed */}
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                        <th>Sun</th>
                    </tr>
                </thead>
                <tbody>
                {[...Array(6)].map((_, weekIndex) => (
                    <tr key={weekIndex}>
                        {[...Array(7)].map((_, dayIndex) => {
                            const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                            const dayDate = new Date(firstDayOfMonth);
                            dayDate.setDate(dayDate.getDate() + (weekIndex * 7) + dayIndex);
                            const item = filteredData.find(item => {
                                const itemDate = new Date(item.calendar);
                                return itemDate.toDateString() === dayDate.toDateString();
                            });

                            return (
                                <td key={dayIndex} style={{ backgroundColor: item && item.status === 'Booked' ? 'red' : 'green' }}>
                                    {item ? formatDate(item.calendar) : ''}
                                    <div>
                                        {item && item.status === 'available' && (
                                            <button onClick={() => bookingStatus(item.id, 'Booking')}>
                                                จอง
                                            </button>
                                        )}

                                        {item && item.status === 'Booked' && (
                                            <button onClick={() => cancelStatus(item.id, 'available')}>
                                                ยกเลิก
                                            </button>
                                        )}
                    </div>
                </td>
            );
        })}
    </tr>
))}

                    </tbody>
</table>

        </div>
    );
}

export default Room;
