// /backend/app.js
const express = require('express');
const app = express();

const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '/.env') });
const PORT = process.env.PORT;
const jwt = require('jsonwebtoken');

const cors = require('cors');

// Middleware: parse JSON bodies
app.use(express.json());

// Use the CORS middleware
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true // If using cookies or HTTP authentication
}));


// Test route to confirm backend is working
app.get('/ping', (req, res) => {
    res.json({ message: 'pong' });
});

//Test login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
//TODO check in database if username & password correct
    //TODO CHECK for sql injection
    if (2 > 1) {
            res.status(200).json({
            message: 'Login successful',
            token: generateToken(username)
        });

    }
    else {
        res.status(401).send({message : 'Email or password incorrect' });
    }
    //TODO Token with JWT -> expiration 1h -> 4 level? (viewer, poster, moderator, admin) -> use https for token transit
})

// Placeholder for file upload/download routes later
//TODO file upload with multer

function generateToken(username) {
    // Assume the user object has properties: username and role
    //TODO connect to database and retrieve information -> creating a jwt Token using it
    const payload = {
        userid: username,          // userid: the unique identifier of the user
        role: username,       // role of the user (e.g., 'admin', 'viewer', 'editor', 'poster')
        iat: Date.now(), // issued at time
    };

    console.log(payload);
    // Sign the token with a secret and set an expiration time
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}


app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
