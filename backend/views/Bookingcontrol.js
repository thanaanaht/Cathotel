const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mysql = require('mysql');
const Bookingcontrol = express.Router();
Bookingcontrol.use(bodyParser.json());
let loggedInToken = null;
let loggedUser = null;
let loggedArea = null;
let loggedLocal = null;
let loggedLevel = null;

Bookingcontrol.use(cors());


// Load environment variables
dotenv.config();

Bookingcontrol.use(cors());

// Configure your database connection
const dbConfig = require('./dbConfig');

const db = mysql.createPool(dbConfig);


Bookingcontrol.get('/bookingcontrolroom01', (req, res) => {
    req.dbConnection.query("SELECT * FROM room01", (err, result) => {
        if (err) {
            console.error('Error querying room01:', err);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        } else {
            res.send(result);
        }
    });
});

Bookingcontrol.get('/bookingcontrolroom02', (req, res) => {
    req.dbConnection.query("SELECT * FROM room02", (err, result) => {
        if (err) {
            console.error('Error querying room02:', err);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        } else {
            res.send(result);
        }
    });
});



Bookingcontrol.get('/bookingcontrolroom03', (req, res) => {
    req.dbConnection.query("SELECT * FROM room03", (err, result) => {
        if (err) {
            console.error('Error querying room03:', err);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        } else {
            res.send(result);
        }
    });
});



Bookingcontrol.get('/bookingcontrolroom04', (req, res) => {
    req.dbConnection.query("SELECT * FROM room04", (err, result) => {
        if (err) {
            console.error('Error querying room04:', err);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        } else {
            res.send(result);
        }
    });
});

Bookingcontrol.put('/bookingcontrolroom01/update', (req, res) => {
    const id = req.body.id;
    const newStatus = req.body.status;
     // Corrected field name

    db.query("UPDATE room01 SET STATUS = ? WHERE id = ?", [newStatus, id], (err, result) => {
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

Bookingcontrol.put('/bookingcontrolroom02/update', (req, res) => {
    const id = req.body.id;
    const newStatus = req.body.status; // Corrected field name

    db.query("UPDATE room02 SET STATUS = ? WHERE id = ?", [newStatus, id], (err, result) => {
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

Bookingcontrol.put('/bookingcontrolroom03/update', (req, res) => {
    const id = req.body.id;
    const newStatus = req.body.status; // Corrected field name

    db.query("UPDATE room03 SET STATUS = ? WHERE id = ?", [newStatus, id], (err, result) => {
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

Bookingcontrol.put('/bookingcontrolroom04/update', (req, res) => {
    const id = req.body.id;
    const newStatus = req.body.status; // Corrected field name

    db.query("UPDATE room04 SET STATUS = ? WHERE id = ?", [newStatus, id], (err, result) => {
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