const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mysql = require('mysql');
const Logincontrol = express.Router();
Logincontrol.use(bodyParser.json());
let loggedInToken = null;
let loggedUser = null;
let loggedArea = null;
let loggedLocal = null;
let loggedLevel = null;

Logincontrol.use(cors());


// Load environment variables
dotenv.config();

Logincontrol.use(cors());

// Configure your database connection
const dbConfig = require('./dbConfig');

const db = mysql.createPool(dbConfig);

function generateToken() {
  loggedInToken = jwt.sign({ foo: 'bar' }, 'shhhhh', { expiresIn: 10 });
}

// login
Logincontrol.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Use the database to get user details
    db.query("SELECT * FROM member WHERE username = ?", [username], (err, result) => {
      if (err) {
        console.error('Error querying member:', err);
        res.status(500).json({
          success: false,
          message: 'Internal Server Error',
        });
      } else {
        const user = result[0];

        if (user) {
          loggedUser = user.username;
          loggedArea = user.area;
          loggedLocal = user.local;
          loggedLevel = user.level;

          bcrypt.compare(password,user.password ,(err, result) => {
            if (result) {
              generateToken();

              res.json({
                success: true,
                message: 'Login successful',
                token: loggedInToken,
  
              });
              console.log(loggedInToken);
            } else {
              console.log("Login Failed");
              loggedInToken = null;
              res.json({
                success: false,
                message: 'Invalid username or password',
              });
            }
          });
        } else {
          console.log("User not found");
          loggedInToken = null;
          res.json({
            success: false,
            message: 'Invalid username or password',
          });
        }
      }
    });
  } catch (error) {
    console.error("Error during login:", error);
    loggedInToken = null;
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});



Logincontrol.get('/login', (req, res) => {
  if (!loggedInToken) {
    console.error('Error: no login');
    res.status(500).json({
      success: false,
    });
  } else {
    res.json({
      success: true,
      token: loggedInToken,
      username: loggedUser,
      area:loggedArea,
      local:loggedLocal,
      level:loggedLevel,
    });
  }
});




// Membercontrol.get('/bblmember', (req, res) => {
//   req.dbConnection.query("SELECT * FROM member", (err, result) => {
//       if (err) {
//           console.error('Error querying member:', err);
//           res.status(500).json({
//               success: false,
//               message: 'Internal Server Error',
//           });
//       } else {
//           res.send(result);
//       }
//   });
// });



module.exports = Logincontrol;