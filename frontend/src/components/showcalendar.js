import React, { useState, useEffect } from "react";
import Axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';

const PORT = 3300;

const ShowCalendar = () => {
    const [calendarData, setCalendarData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [columnNames, setColumnNames] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:${PORT}/roomcontrol`)
            .then(response => {
                console.log("Response data:", response.data);
                setCalendarData(response.data);
                // Extract column names from the first entry
                if (response.data.length > 0) {
                    const firstEntry = response.data[0];
                    const columns = Object.keys(firstEntry).filter(column => column !== 'id' && column !== 'date');
                    setColumnNames(columns);
                }
            })
            .catch(error => {
                console.error('Error fetching calendar data:', error);
            });
    }, []);

    // Function to format dates
    const formatDate = dateString => {
        const date = new Date(dateString);
        return format(date, 'MMMM d, yyyy');
    };

    // Function to filter calendar data by selected month
    const filteredDataInRange = calendarData.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate.getMonth() === selectedMonth.getMonth() && entryDate.getFullYear() === selectedMonth.getFullYear();
    });




    return (
        <div>
            <div>
                <h3>Select Month</h3>
                <DatePicker
                    selected={selectedMonth}
                    onChange={date => setSelectedMonth(date)}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                />
            </div>
            
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  {columnNames.map((columnName, index) => (
                    <th key={index}>{columnName}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredDataInRange.map((entry, index) => {
                  const formattedDate = formatDate(entry.date);
                  return (
                    <tr key={index}>
                      <td>{formattedDate}</td>
                      {columnNames.map((columnName, index) => (
                        <td key={index}>{entry[columnName]}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
        </div>
    );
};

export default ShowCalendar;
