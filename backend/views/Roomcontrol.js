const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const mysql = require('mysql');

const Roomcontrol = express.Router();
Roomcontrol.use(bodyParser.json());
Roomcontrol.use(cors());

// Load environment variables
dotenv.config();

// Configure your database connection
const dbConfig = require('./dbConfig');
const db = mysql.createPool(dbConfig);

// Roomcontrol.get('/bookingcontrolroom/:roomNumber', (req, res) => {
//     const roomNumber = req.params.roomNumber;
//     const tableName = `room${roomNumber}`;

//     const query = `SELECT * FROM ${tableName}`;

//     db.query(query, (err, result) => {
//         if (err) {
//             console.error(`Error querying ${tableName}:`, err);
//             res.status(500).json({
//                 success: false,
//                 message: 'Internal Server Error',
//             });
//         } else {
//             res.send(result);
//         }
//     });
// });

// Roomcontrol.put('/bookingcontrolroom/:roomNumber', (req, res) => {
//     const roomNumber = req.params.roomNumber;
//     const id = req.body.id;
//     const newStatus = req.body.status;
//     const tableName = `room${roomNumber}`;

//     db.query(`UPDATE ${tableName} SET STATUS = ? WHERE id = ?`, [newStatus, id], (err, result) => {
//         if (err) {
//             console.error("Error updating status:", err);
//             res.status(500).json({ error: "An error occurred while updating status" });
//         } else if (result.affectedRows === 0) {
//             console.error("No rows were affected by the update");
//             res.status(404).json({ error: "No booking found with the provided ID" });
//         } else {
//             console.log("Status updated successfully");
//             res.status(200).json({ message: "Status updated successfully" });
//         }
//         console.log(newStatus);
//         console.log(id);
//     });
// });
// // const bookingData = {
// //     username: username,
// //     fullprice: totalCost, // Example values, replace with actual data
// //     discount: 0,
// //     priceVat: 0,
// //     detail: 'Example booking detail',
// //     checkindate: pickupDate,
// //     checkoutdate: returnDate
// //   };
// Roomcontrol.post('/roomcontrol', async (req, res) => {
//     try {
//         const {username, fullprice, discount, priceVat, details, checkindate, checkoutdate ,days} = req.body;
//         console.log("username:",username);


//         // SQL Query with placeholders for values
//         const sql = "INSERT INTO booking (username, fullprice, discount, priceVat, details, checkindate, checkoutdate) VALUES (?, ?, ?, ?, ?, ? ,?)";
//        // INSERT INTO room01 (username, fullprice, discount, priceVat, detail, checkindate, checkoutdate) VALUES (?, ?, ?, ?, ?, ?, ?)

//         // Execute the query with parameters
//         const result = await dbQueryPromise(sql, [
//             username, fullprice, discount, priceVat, details, checkindate, checkoutdate,days
//         ]);

//         console.log("Inserted ID:", result.insertId);
//         // Send success response
//         res.status(201).json({
//             success: true,
//             message: 'Value inserted successfully',
//             insertedid: result.insertId,
//         });
//     } catch (error) {
//         // Handle errors
//         console.error('Error inserting data:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Internal Server Error',
//         });
//     }
// });

Roomcontrol.post('/roomcontrol/create', (req, res) => {
    const roomname = req.body.roomname;


    // Using a prepared statement with a placeholder for the column name
    const query = `
        ALTER TABLE rooms
        ADD COLUMN ?? VARCHAR(50)
    `;
    console.log('Create Roomname:', roomname);

    // Passing an array with the roomname as a parameter to db.query
    db.query(query, [roomname], (err, result) => {
        if (err) {
            console.error(`Error altering table rooms:`, err);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        } else {
            // If the column was successfully added, you might want to do additional actions
            // For example, you could return a success response with relevant data
            res.status(200).json({
                success: true,
                message: 'Column added successfully',
                addedColumnName: roomname // Send the added column name in the response
            });
        }
    });
});


Roomcontrol.post('/roomcontrol/deletecolumn', (req, res) => {
    const columnName = req.body.columnDelete;
    console.log('columnDelete is:', columnName);

    const alterQuery = `ALTER TABLE rooms DROP COLUMN ${columnName}`;
    db.query(alterQuery, (alterErr, alterResult) => {
        if (alterErr) {
            console.error(`Error deleting column ${columnName} from 'rooms' table:`, alterErr);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: alterErr
            });
        } else {
            // Successfully deleted the column from the table
            res.status(200).json({
                success: true,
                message: `Column ${columnName} deleted successfully`
            });
           
        }
    });
});



Roomcontrol.get('/roomcontrol/columnnames', (req, res) => {
    const tableName = 'rooms'; // Assuming the table name is 'rooms', you can replace it with your actual table name if different

    const query = `
        SELECT COLUMN_NAME
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = ?;
    `;

    db.query(query, [tableName], (err, result) => {
        if (err) {
            console.error(`Error querying column names from ${tableName} table:`, err);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: err
            });
        } else {
            const columnNames = result.map(row => row.COLUMN_NAME);
            res.status(200).json({
                success: true,
                message: 'Column names fetched successfully',
                columnNames: columnNames
            });
        }
    });
});

Roomcontrol.get('/roomcontrol', (req, res) => {
    const query = `SELECT * FROM rooms`;
    db.query(query, (err, result) => {
        if (err) {
            console.error(`Error querying bookings:`, err);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        } else {
            res.send(result);
        }
    });
});
Roomcontrol.put('/roomcontrol/update', (req, res) => {
    const datestart = req.body.checkindate;
    const dateend = req.body.checkoutdate;
    const newStatus = req.body.bookingId;
    const columnName = req.body.roomname;

    console.log("datestart", datestart);
    console.log("dateend", dateend);
    console.log("newStatus", newStatus);
    console.log("columnName", columnName);

    // Use string interpolation to dynamically insert the column name
    const query = `UPDATE rooms SET ${columnName} = ? WHERE date BETWEEN ? AND ?`;

    db.query(query, [newStatus, datestart, dateend], (err, result) => {
        if (err) {
            console.error("Error updating status:", err);
            res.status(500).json({ error: "An error occurred while updating status" });
        } else if (result.affectedRows === 0) {
            console.error("No rows were affected by the update");
            res.status(404).json({ error: "No booking found within the provided date range" });
        } else {
            console.log("Status updated successfully");
            res.status(200).json({ message: "Status updated successfully" });
        }

    });
});



// Roomcontrol.get('/availability', async (req, res) => {
//     try {
//       const date = req.query.date; // Get date from query parameters
//       const query = `
//         SELECT roomId
//         FROM bookings
//         WHERE date = $1 AND status = 'available'
//       `;
//       const { rows } = await db.query(query, [date]);
//       const availableRooms = rows.map(row => row.roomId);
//       res.json({ availableRooms });
//     } catch (error) {
//       console.error('Error fetching available rooms:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });

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

module.exports = Roomcontrol;
