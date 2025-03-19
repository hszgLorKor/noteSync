import { Router } from 'express';
import { isSafe } from '../utils/dbInjectionChecker.js';
import {generateToken} from "../utils/generateJWTToken.js";
import rateLimit from "express-rate-limit";
import cors from "cors";
import {comparePassword} from "../middleware/passwordHash.js";

const router = Router();

router.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true // If using cookies or HTTP authentication
}));

//limiting login tries, to avoid brute forcing
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per 15 minutes
    message: "Too many login attempts. Please try again later."
});

router.use('/', loginLimiter); // Apply to your login route

// define login
router.post('/', (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
//TODO check in database if username & password correct
    //TODO compare using bcryptjs compare function from password hash
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
})

// Default export
export default router;
