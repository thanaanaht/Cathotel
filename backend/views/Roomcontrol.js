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
                message: `${columnName} deleted successfully`
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

Roomcontrol.put('/roomcontrol/edit', (req, res) => {
    const { oldColumnName, newColumnName } = req.body;

    // Perform the database update
    const query = `ALTER TABLE rooms CHANGE COLUMN ${oldColumnName} ${newColumnName} VARCHAR(255)`;
    db.query(query, (error, results, fields) => {
        if (error) {
            console.error('Error updating column name:', error);
            res.status(500).json({ success: false, message: 'Failed to update column name' });
        } else {
            console.log('Column name updated successfully');
            res.status(200).json({ success: true, message: 'Column name updated successfully' });
        }
    });
});

function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}
Roomcontrol.put('/roomcontrol/booking', (req, res) => {
    const { checkindate, checkoutdate, bookingID, roomname } = req.body;


    

    const formattedCheckinDate = formatDate(checkindate);
    const formattedCheckoutDate = formatDate(checkoutdate);

    console.log(formattedCheckinDate);
    console.log(formattedCheckinDate);
    console.log(bookingID);
    console.log(roomname);
    // Assuming you want to update the room identified by the provided room ID
    const query = `UPDATE rooms 
                   SET ${roomname} = ${bookingID} 
                   WHERE \`date\` BETWEEN '${formattedCheckinDate}' AND '${formattedCheckoutDate}'`;

    db.query(query, (error, results, fields) => {
        if (error) {
            console.error('Error updating rooms:', error);
            res.status(500).json({ success: false, message: 'Failed to update rooms' });
        } else {
            console.log('Rooms updated successfully');
            res.status(200).json({ success: true, message: 'Rooms updated successfully', data: results });
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
