import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function Room04() {
    const PORT =3300;
    const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from server
    Axios.get(`http://localhost:${PORT}/bookingcontrolroom04`)
      .then(response => {
        // Update state with fetched data
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching booking data', error);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Extracts date in "YYYY-MM-DD" format
  };

  const groupByMonth = (data) => {
    const groupedData = {};
    data.forEach(item => {
      const month = formatDate(item.calendar).substr(0, 7); // Extract YYYY-MM
      if (!groupedData[month]) {
        groupedData[month] = [];
      }
      groupedData[month].push(item);
    });
    return groupedData;
  };

  const bookingStatus = (id, newStatus) => {
    Axios.put(`http://localhost:${PORT}/bookingcontrolroom4/update`, { status: 'Booking', id: id })
      .then((response) => {
        // If the status is updated successfully on the server, update the state
        setData(
          data.map((val) => {
            return val.id === id ? {
              ...val,
              status: 'Booking'
            } : val;
          })
        );
      })
      .catch(error => {
        console.error('Error updating booking status', error);
      });
  };

  const cancelStatus = (id, newStatus) => {
    Axios.put(`http://localhost:${PORT}/bookingcontrolroom04/update`, { status: 'Available', id: id })
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

  return (
    <div>
      <h1>ROOM04</h1>
      {Object.entries(groupByMonth(data)).map(([month, bookings]) => (
        <div key={month}>
          <h2>{month}</h2>
          <table>
            <thead>
              <tr>
                <th>Calendar</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((item, index) => (
                <tr key={item.id}>
                  <td>{formatDate(item.calendar)}</td>
                  <td>{item.status}</td>
                  <td>
                    <button onClick={() => bookingStatus(item.id, 'BOOKING')}>
                      Booking
                    </button>
                    <button onClick={() => cancelStatus(item.id, 'available')}>
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default Room04;
