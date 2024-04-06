const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mysql = require('mysql');

const Bookingcontrol = express.Router();
Bookingcontrol.use(bodyParser.json());
Bookingcontrol.use(cors());

// Load environment variables
dotenv.config();

// Configure your database connection
const dbConfig = require('./dbConfig');
const db = mysql.createPool(dbConfig);

Bookingcontrol.get('/bookingcontrolroom/:roomNumber', (req, res) => {
    const roomNumber = req.params.roomNumber;
    const tableName = `room${roomNumber}`;

    const query = `SELECT * FROM ${tableName}`;

    db.query(query, (err, result) => {
        if (err) {
            console.error(`Error querying ${tableName}:`, err);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        } else {
            res.send(result);
        }
    });
});

Bookingcontrol.put('/bookingcontrolroom/:roomNumber', (req, res) => {
    const roomNumber = req.params.roomNumber;
    const id = req.body.id;
    const newStatus = req.body.status;
    const tableName = `room${roomNumber}`;

    db.query(`UPDATE ${tableName} SET STATUS = ? WHERE id = ?`, [newStatus, id], (err, result) => {
        if (err) {
            console.error("Error updating status:", err);
            res.status(500).json({ error: "An error occurred while updating status" });
        } else if (result.affectedRows === 0) {
            console.error("No rows were affected by the update");
            res.status(404).json({ error: "No booking found with the provided ID" });
        } else {
            console.log("Status updated successfully");
            res.status(200).json({ message: "Status updated successfully" });
        }
        console.log(newStatus);
        console.log(id);
    });
});

module.exports = Bookingcontrol;
