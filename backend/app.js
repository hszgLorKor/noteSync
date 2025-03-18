// /backend/app.js
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { isSafe } from './utils/dbInjectionChecker.js';
import { generateToken} from "./utils/generateJWTToken";

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '/.env') });

const PORT = process.env.PORT;
const app = express();
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
    if (isSafe(username) && isSafe(password)) {
        if (2 > 1) {
            res.status(200).json({
                message: 'Login successful',
                token: generateToken(username)
            });

        }
        else {
            res.status(401).send({message : 'Email or password incorrect' });
        }
    }
    else {
        res.status(401).send({message : 'Email or password incorrect' });
    }
    //TODO Token with JWT -> expiration 1h -> 4 level? (viewer, poster, moderator, admin) -> use https for token transit
})

// Placeholder for file upload/download routes later
//TODO file upload with multer

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
