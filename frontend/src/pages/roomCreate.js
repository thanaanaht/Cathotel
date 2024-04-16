import React, { useState } from "react";
import axios from "axios"; 
import Manubar from "../components/Manubar";

const PORT = 3300;

const RoomCreate = () => {
    const [roomname , setRoomname] = useState('');
    const [roomtype , setRoomtype] = useState('');
    const [datalist , setDatalist] = useState([]);

    const add = () => {
        axios.post(`http://localhost:${PORT}/roomcontrol/create`, {
            roomname,
        })
        .then(response => {
            console.log('Response:', response.data);
            setDatalist([...datalist, response.data]);
            setRoomname('');
            alert(`เพิ่มห้อง "${response.data.addedColumnName}" เรียบร้อย`);
        })
        .catch(error => {
            console.error('Error adding room:', error);
            alert(`Error เพิ่มห้องไม่ได้`);
        });
    };

    return (
        <div className="row">
        <div className="col-6 col-md-2" style={{ backgroundColor: 'black' }}>
          <Manubar/>
        </div>
        <div className="col" style={{ backgroundColor: 'white' }}>
        <div className="container mt-5">
            <h1 className="mb-4">สร้างห้อง</h1>
            
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
    
        </div>
        </div>

    );
}

export default RoomCreate;
