import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function Room02() {
    const PORT = 3300;
    const [data, setData] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [roomNumber, setRoomNumber] = useState('02');

    useEffect(() => {
        // Fetch room data when the component mounts
        getRoomData(roomNumber);
    }, []);

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
            <h2>Room 02</h2>
            <div>
                <button onClick={prevMonth}>{'<'}</button>
                <span>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                <button onClick={nextMonth}>{'>'}</button>
            </div>
            <table>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={item.id}>
                            <td style={{ backgroundColor: item.status === 'Booked' ? 'red' : 'green' }}>
                                {formatDate(item.calendar)}
                            </td>
                            <td>
                            <button onClick={() => bookingStatus(item.id, 'Booking')}>
                                    จอง
                                </button>
                                <button onClick={() => cancelStatus(item.id, 'Available')}>
                                    ยกเลิก
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Room02;
