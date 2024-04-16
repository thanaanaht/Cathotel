import React, { useState, useEffect } from "react";
import Axios from 'axios'; 
import Manubar from '../components/Manubar';

const PORT = 3300;

const RoomDelete = () => {
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
                    setColumnNames(columnNames.filter(columnName => columnName !== columnNameToDelete));
                })
                .catch(error => {
                    console.error('Error deleting column:', error);
                    alert("ลบไฟร์สำเร็จแล้ว")
                });
        }
    };

    return (
        <div className="row">
        <div className="col-6 col-md-2" style={{ backgroundColor: 'black' }}>
          <Manubar/>
        </div>
        <div className="col" style={{ backgroundColor: 'white' }}>
        <div className="container mt-5">
            <h1>ลบห้อง</h1>
            <ul className="list-group">
                {columnNames.filter(columnName => columnName !== 'id' && columnName !== 'date').map((columnName, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>ห้องขื่อ: {columnName}</span>
                        <button className="btn btn-danger" onClick={() => deleteColumn(columnName)}>ลบห้อง</button>
                    </li>
                ))}
            </ul>
        </div>

        </div>

   
        </div>
    );
}

export default RoomDelete;
