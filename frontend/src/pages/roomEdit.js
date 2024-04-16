import React, { useState, useEffect } from "react";
import Axios from 'axios'; 
import Manubar from "../components/Manubar";

const PORT = 3300;

const RoomEdit = () => {
    const [columnNames, setColumnNames] = useState([]);
    const [newColumnName, setNewColumnName] = useState('');
    const [editMode, setEditMode] = useState(false); // State to track if edit mode is active

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

    const handleEdit = () => {
        setEditMode(true); // Activate edit mode
    };

    const handleSave = (oldColumnName) => {
        const confirmed = window.confirm(`ยืนยันการแก้ไขห้อง ${oldColumnName} เป็น ${newColumnName}`);
        if (confirmed) {
            Axios.put(`http://localhost:${PORT}/roomcontrol/edit`, { oldColumnName, newColumnName })
                .then(response => {
                    console.log('Column edited successfully:', response.data);
                    setColumnNames(columnNames.map(columnName => columnName === oldColumnName ? newColumnName : columnName));
                    setNewColumnName('');
                    setEditMode(false); // Deactivate edit mode after saving changes
                    alert("แก้ไขห้องสำเร็จแล้ว");
                })
                .catch(error => {
                    console.error('Error editing column:', error);
                    alert("เกิดข้อผิดพลาดในการแก้ไขห้อง");
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
            <h1>แก้ไขชื่อห้อง</h1>
            <ul className="list-group">
                {columnNames.filter(columnName => columnName !== 'id' && columnName !== 'date').map((columnName, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>ห้องชื่อ: {columnName}</span>
                        <div className="d-flex align-items-center">
                            {editMode ? ( // Render different buttons based on edit mode
                                <>
                                    <input 
                                        type="text" 
                                        className="form-control me-2" 
                                        placeholder="ชื่อใหม่" 
                                        value={newColumnName} 
                                        onChange={(e) => setNewColumnName(e.target.value)} 
                                    />
                                    <button className="btn btn-primary me-2" onClick={() => handleSave(columnName)}>บันทึก</button>
                                </>
                            ) : (
                                <button className="btn btn-primary me-2" onClick={handleEdit}>แก้ไข</button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    
        </div>
        </div>
        

    );
}

export default RoomEdit;
