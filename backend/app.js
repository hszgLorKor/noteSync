// /backend/app.js
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import setupRoutes from './utils/routesSetup.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';


// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '/.env') });

const PORT = process.env.PORT;
const app = express();
// Middleware: parse JSON bodies
app.use(express.json());
app.use(cookieParser());
setupRoutes(app);

// Use the CORS middleware
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true // If using cookies or HTTP authentication
}));

// Configure storage options
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Rename the file
    }
});

const upload = multer({ storage: storage });

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
// test