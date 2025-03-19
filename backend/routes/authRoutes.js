import { Router } from 'express';
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const router = Router();

router.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true // If using cookies or HTTP authentication
}));

const authenticateJWT = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Expect "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded payload to request object
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        return res.status(403).json({ message: "Invalid Token" });
    }
};

// Define your routes
router.get('/', authenticateJWT, (req, res) => {
    res.send('Auth Route');
});

// Default export
export default router;
