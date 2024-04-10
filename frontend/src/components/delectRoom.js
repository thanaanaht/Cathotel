import React, { useState, useEffect } from "react";
import Axios from 'axios'; // Correct import statement

const PORT = 3300;

const DeleteRoom = () => {
    const [columnNames, setColumnNames] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:${PORT}/roomcontrol/columnnames`)
            .then(response => {
                console.log("Response data:", response.data);
                if (response.data.success) {
                    setColumnNames(response.data.columnNames);
                } else {
                    console.error('Error: Unable to fetch column names. Message:', response.data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching column names:', error);
            });
    }, []);

    const deleteColumn = (columnNameToDelete) => {
        const confirmed = window.confirm("ยืนยันการลบไฟร์");
        if (confirmed) {
            Axios.post(`http://localhost:${PORT}/roomcontrol/deletecolumn`, { columnDelete: columnNameToDelete })
                .then(response => {
                    console.log('Column deleted successfully:', response.data);
                    // Update UI to reflect deletion (if needed)
                    setColumnNames(columnNames.filter(columnName => columnName !== columnNameToDelete));
                })
                .catch(error => {
                    console.error('Error deleting column:', error);
                    alert("ลบไฟร์สำเร็จแล้ว")
                });
        }
    };

    return (
        <div>
            <h1>ลบห้อง</h1>
            <ul>
            {columnNames.filter(columnName => columnName !== 'id' && columnName !== 'date').map((columnName, index) => (
                <div key={index}>
                    <p>Column Name: {columnName}</p>
                    <button onClick={() => deleteColumn(columnName)}>ลบห้อง</button>
                </div>
                ))}

            </ul>
        </div>
    );
}

export default DeleteRoom;
