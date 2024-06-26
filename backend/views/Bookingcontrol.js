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





Bookingcontrol.put('/updateInvoice/:id', (req, res) => {
    const id = req.params.id; 
    const roomname = req.body.roomname;       
    const checkindate = req.body.checkindate;
    const checkoutdate = req.body.checkoutdate;
    const fullprice = req.body.fullprice;
    const discount = req.body.discount;
    const priceVat = req.body.priceVat;
    const price = req.body.price;
    
    // Execute SQL UPDATE query to update booking details
    db.query(`UPDATE booking SET roomname = ?, checkindate = ?, checkoutdate = ?, fullprice = ?, discount = ?, priceVat = ?, price = ? WHERE id = ?`, 
        [roomname, checkindate, checkoutdate, fullprice, discount, priceVat, price, id], 
        (err, result) => {
            if (err) {
                console.error("Error updating booking details:", err);
                res.status(500).json({ error: "An error occurred while updating booking details" });
            } else if (result.affectedRows === 0) {
                console.error("No rows were affected by the update");
                res.status(404).json({ error: "No booking found with the provided ID" });
            } else {
                console.log("Booking details updated successfully");
                res.status(200).json({ message: "Booking details updated successfully" });
            }
            console.log(id);
            console.log(roomname);
            console.log(checkindate);
            console.log(checkoutdate);
            console.log(fullprice);
            console.log(discount);
            console.log(priceVat);
            console.log(price);

        }
    );
});

Bookingcontrol.delete('/bookingcontrol/deletebooking/:id', (req, res) => {
    const id = req.params.id;
    
    req.dbConnection.query("DELETE FROM booking WHERE id = ?", id, (err, result) => {
        console.log("delete", id)
        if (err) {
            console.error('Error deleting tabien entry:', err);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        } else {
            res.json({
                success: true,
                message: 'Tabien entry deleted successfully',
            });
        }
        console.log("delete id:",id)
    });
});

Bookingcontrol.post('/bookingcontrolroomcreate', async (req, res) => {
    try {
        const {username, fullprice, discount, priceVat, details, checkindate, checkoutdate ,days} = req.body;
        console.log("username:",username);


        // SQL Query with placeholders for values
        const sql = "INSERT INTO booking (username, fullprice, discount, priceVat, details, checkindate, checkoutdate) VALUES (?, ?, ?, ?, ?, ? ,?)";
       // INSERT INTO room01 (username, fullprice, discount, priceVat, detail, checkindate, checkoutdate) VALUES (?, ?, ?, ?, ?, ?, ?)

        // Execute the query with parameters
        const result = await dbQueryPromise(sql, [
            username, fullprice, discount, priceVat, details, checkindate, checkoutdate,days
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

Bookingcontrol.post('/booking/create', (req, res) => {
    const {
        checkindate,
        checkoutdate,
        bookingID,
        fullprice,
        discount,
        price,
        priceVat,
        details,
        days,
        company,
        companyaddress,
        roomname,
        prevscore,
        addscore,
        score,
        remark,
        name,
        surname,
        phonenumber,
    } = req.body;

    function formatDate(date) {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = ('0' + (d.getMonth() + 1)).slice(-2);
        const day = ('0' + d.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }

    // Format checkindate and checkoutdate to 'YYYY-MM-DD' format
    const formattedCheckinDate = formatDate(checkindate);
    const formattedCheckoutDate = formatDate(checkoutdate);

    // Construct the SQL query with parameterized values
    const query = `INSERT INTO booking (checkindate, checkoutdate, bookingID ,fullprice, discount, price, 
                   priceVat, details, days, company, companyaddress, roomname, prevscore, 
                   addscore, score ,remark, name, surname, phonenumber) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Prepare the values to be inserted into the database
    const values = [
        formattedCheckinDate,
        formattedCheckoutDate,
        bookingID ,
        fullprice,
        discount,
        price,
        priceVat,
        details,
        days,
        company,
        companyaddress,
        roomname,
        prevscore,
        addscore,
        score,
        remark,
        name,
        surname,
        phonenumber
    ];

    // Execute the query with the provided values
    db.query(query, values, (err, result) => {
        if (err) {
            console.error(`Error inserting booking:`, err);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        } else {
            res.send(result);
            console.log("successfully")
        }
    });

});




Bookingcontrol.get('/bookingcontrol', (req, res) => {
    const query = `SELECT * FROM booking`;
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

Bookingcontrol.delete('/bookingcontrol/deletebooking/:id', (req, res) => {
    const id = req.params.id;
  
    // Query your database to delete the invoice with the specified ID
    const deleteQuery = `DELETE FROM booking WHERE id = ?`; // Adjust the table name as per your database schema
    db.query(deleteQuery, [id], (err, result) => {
      if (err) {
        console.error('Error deleting invoice:', err);
        res.status(500).json({
          success: false,
          message: 'Internal Server Error',
          error: err
        });
      } else {
        console.log('Invoice deleted successfully');
        res.status(200).json({
          success: true,
          message: 'Invoice deleted successfully'
        });
      }
    });
  });




Bookingcontrol.get('/availability', async (req, res) => {
    try {
      const date = req.query.date; // Get date from query parameters
      const query = `
        SELECT roomId
        FROM bookings
        WHERE date = $1 AND status = 'available'
      `;
      const { rows } = await db.query(query, [date]);
      const availableRooms = rows.map(row => row.roomId);
      res.json({ availableRooms });
    } catch (error) {
      console.error('Error fetching available rooms:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
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
