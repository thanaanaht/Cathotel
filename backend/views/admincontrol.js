const express = require('express');
const AdminControl = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const dbConfig = require('./dbConfig');

const db = mysql.createPool(dbConfig);


// Middleware to handle database connections
AdminControl.use((req, res, next) => {
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
AdminControl.use(bodyParser.json());

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


// // Route for retrieving admin users
// AdminControl.get('/admin', async (req, res) => {
//     req.dbConnection.query("SELECT * FROM admin", (err, result) => {
//         if (err) {
//             return next(err);
//         }
//         res.send(result);
//     });
// });

// Route for creating admin users
AdminControl.post('/admin', async (req, res) => {
    try {
        const saltRounds = process.env.SALT_ROUNDS || 10; // default to 10 rounds if not provided
        // const password = req.body.password ;
        const { username,  password,level } = req.body;
        const hashedpassword = await bcrypt.hash(password, parseInt(saltRounds));


        // SQL Query
        const sql = "INSERT INTO admin (username,  password, level) VALUES (?, ?, ?)";
        
        // Execute the query with parameters
        const result = await dbQueryPromise(sql, [
            username, hashedpassword,level,
        ]);
        console.log("username:",username);
        console.log("password:",password);
        console.log("hashedpassword:",hashedpassword);
        console.log("level:",level);

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


// Release database connection after each request
AdminControl.use((req, res, next) => {
    req.dbConnection.release();
    next();
});

module.exports = AdminControl;
