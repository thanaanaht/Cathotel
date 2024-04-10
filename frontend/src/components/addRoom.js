import React, { useState } from "react";
import axios from "axios"; // Corrected import statement

const PORT = 3300;

const AddRoom = () => {
    const [roomname , setRoomname] = useState('');
    const [datalist , setDatalist] = useState([]);

    const add = () => {
        axios.post(`http://localhost:${PORT}/roomcontrol/create`, { // Corrected backend endpoint
            roomname,
        })
        .then(response => {
            console.log('Response:', response.data);
            // Assuming response.data is an object with the new room details
            setDatalist([...datalist, response.data]);
            setRoomname(''); // Clear input field after adding room
            alert(`เพิ่มห้อง "${response.data.addedColumnName}" เรียบร้อย`);
        })
        .catch(error => {
            console.error('Error adding room:', error);
            alert(`Error เพิ่มห้องไม่ได้`);
            // Handle error here
        });
    };

    return (
        <div className="App container">
            <h1>สร้างห้อง</h1>
            
            <div className="information">
                <form>
                    <div className="mb-3">
                        <label htmlFor="roomname" className="form-label">
                            ห้องชื่อ:
                        </label>
                        <input 
                            type="text"
                            className="form-control"
                            id="roomname"
                            placeholder="Enter room name"
                            value={roomname}
                            onChange={(event) => setRoomname(event.target.value)}
                        />
                    </div>
                    <button type="button" className="btn btn-success" onClick={add}>เพิ่มห้อง</button>
                </form>
            </div>
            <hr />
        </div>
    );
}

export default AddRoom;
