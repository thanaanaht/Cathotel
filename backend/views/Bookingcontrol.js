const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
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
// const bookingData = {
//     username: username,
//     fullprice: totalCost, // Example values, replace with actual data
//     discount: 0,
//     priceVat: 0,
//     detail: 'Example booking detail',
//     checkindate: pickupDate,
//     checkoutdate: returnDate
//   };
Bookingcontrol.post('/bookingcontrolroomcreate', async (req, res) => {
    try {
        const {username, fullprice, discount, priceVat, details, checkindate, checkoutdate } = req.body;
        console.log("username:",username);


        // SQL Query with placeholders for values
        const sql = "INSERT INTO booking (username, fullprice, discount, priceVat, details, checkindate, checkoutdate) VALUES (?, ?, ?, ?, ?, ? ,?)";
       // INSERT INTO room01 (username, fullprice, discount, priceVat, detail, checkindate, checkoutdate) VALUES (?, ?, ?, ?, ?, ?, ?)

        // Execute the query with parameters
        const result = await dbQueryPromise(sql, [
            username, fullprice, discount, priceVat, details, checkindate, checkoutdate
        ]);

        console.log("Inserted ID:", result.insertId);
        // Send success response
        res.status(201).json({
            success: true,
            message: 'Value inserted successfully',
            insertedid: result.insertId,
        });
    } catch (error) {
        // Handle errors
        console.error('Error inserting data:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
});

Bookingcontrol.get('/bookingcontrolroomcreate', (req, res) => {

    const query = `SELECT * FROM booking`;

    db.query(query, (err, result) => {
        if (err) {
            console.error(`Error querying booking:`, err);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        } else {
            res.send(result);
        }
    });
});

function dbQueryPromise(sql, values) {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = Bookingcontrol;
