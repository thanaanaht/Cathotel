const express = require('express');
const Membercontrol = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const dbConfig = require('./dbConfig');
// Create MySQL connection pool
const db = mysql.createPool(dbConfig);

// Middleware to handle database connections
Membercontrol.use((req, res, next) => {
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting database connection:', err);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        } else {
            req.dbConnection = connection;
            next();
        }
    });
});

// Middleware to parse JSON request bodies
Membercontrol.use(bodyParser.json());

// Route to retrieve all members


// Function to execute SQL queries with promises
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

Membercontrol.get('/member', (req, res) => {
    req.dbConnection.query("SELECT * FROM member", (err, result) => {
        if (err) {
            console.error('Error querying member:', err);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        } else {
            res.send(result);
        }
    });
});
// name: name,
// surname: surname,
// phonenumber: phonenumber,
// idnumber: idnumber,
// lineid: lineid,
// address: address,
// catsnumber: catsnumber,
// score: score,
// remark: remark,
// Route to create a new member
Membercontrol.post('/member/create', async (req, res) => {
    try {
        const saltRounds = process.env.SALT_ROUNDS || 10; // default to 10 rounds if not provided
        // const password = req.body.password ;
        const { name,  surname, phonenumber, idnumber, lineid , address , catsnumber, score, remark   } = req.body;



        // SQL Query
        const sql = "INSERT INTO member (name,  surname, phonenumber, idnumber, lineid , address , catsnumber, score, remark ) VALUES (?, ?, ?, ?, ? ,? , ?, ?, ?)";
        
        // Execute the query with parameters
        const result = await dbQueryPromise(sql, [
            name,  surname, phonenumber, idnumber, lineid , address , catsnumber, score, remark ,
        ]);
        console.log("name:",name);
        console.log("surname:",surname);
        console.log("phonenumber:",phonenumber);
        console.log("idnumber:",idnumber);
        console.log("lineid:",lineid);
        console.log("address:",address);
        console.log("catsnumber:",catsnumber);
        console.log("idnumber:",idnumber);
        console.log("score:",score);
        console.log("remark:",remark);
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

// Assuming Membercontrol is an instance of Express Router
Membercontrol.put('/member/update', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const surname = req.body.surname;
    const phonenumber = req.body.phonenumber;
    const idnumber = req.body.idnumber;
    const lineid = req.body.lineid;
    const address = req.body.address;
    const catsnumber = req.body.catsnumber;
    const score = req.body.score;
    const remark = req.body.remark;

    console.log("name", name);
    console.log("surname", surname);
    console.log("phonenumber", phonenumber);
    console.log("idnumber", idnumber);
    
    // Execute the query with the provided parameters
    db.query(`UPDATE member SET name = ?,surname = ?, phonenumber = ?,idnumber = ?,  lineid = ?,address = ?,catsnumber = ?,score  = ?, remark = ? WHERE id = ?`, 
    [name, surname, phonenumber, idnumber, lineid, address, catsnumber, score, remark , id], (err, result) => {
        if (err) {
            console.error("Error updating member:", err);
            res.status(500).json({ error: "An error occurred while updating member" });
        } else if (result.affectedRows === 0) {
            console.error("No member was updated");
            res.status(404).json({ error: "No member found with the provided ID" });
        } else {
            console.log("Member updated successfully");
            res.status(200).json({ message: "Member updated successfully" });
        }
    });
});

Membercontrol.delete('/member/delete', (req, res) => {
    const memberId = req.body.id;
  
    // Check if memberId is provided
    if (!memberId) {
      return res.status(400).json({ error: 'Member ID is required' });
    }
  
    // Delete member from the database
    db.query('DELETE FROM member WHERE id = ?', [memberId], (err, result) => {
      if (err) {
        console.error('Error deleting member:', err);
        return res.status(500).json({ error: 'An error occurred while deleting member' });
      }
  
      // Check if any rows were affected
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Member not found' });
      }
  
      // Member deleted successfully
      res.status(200).json({ message: 'Member deleted successfully' });
    });
  });


// Middleware to release database connection
Membercontrol.use((req, res, next) => {
    req.dbConnection.release();
    next();
});

module.exports = Membercontrol;
