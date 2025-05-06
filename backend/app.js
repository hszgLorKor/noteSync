// /backend/app.js
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import setupRoutes from './handlers/setup/routesSetup.js';
import cookieParser from 'cookie-parser';

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
/*
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
    credentials: true, // Allow cookies to be sent
}));

 */

app.listen(PORT, 'localhost', () => {
    console.log(`Backend running on port ${PORT}`);
});