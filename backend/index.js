const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path'); // Require the path module
const Logincontrol = require('./views/Logincontrol');
const Membercontrol = require('./views/Membercontrol');
const Bookingcontrol = require('./views/Bookingcontrol');
const Roomcontrol = require('./views/Roomcontrol');
const AdminControl = require('./views/admincontrol');

const PORT = process.env.PORT || 3300; // Use environment variable for port

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public"))); // Correct static file serving path

app.use(Logincontrol);
app.use(Membercontrol);
app.use(Bookingcontrol);
app.use(Roomcontrol);
app.use(AdminControl);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
});
