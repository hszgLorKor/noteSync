import { Router } from 'express';
import { isSafe } from '../../../../../notesync_test/backend/utils/database/SQLInjectionChecker/injectionChecker.js';
import {generateToken} from "../../../../../notesync_test/backend/utils/authentication/tokenGenerator/generateJWTToken.js";
import {loginRequest} from '../../../../../notesync_test/backend/utils/database/SQLConnection/connection.js'
import rateLimit from 'express-rate-limit';
import cors from "cors";

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
// define login
router.post('/', loginLimiter, (req, res) => {  // Directly applying loginLimiter here
    const { username, password } = req.body;

    console.log(username, password);
    if (isSafe(username) && isSafe(password)) {
        if (Boolean(loginRequest(username, password))) {
            const token = generateToken(username);
            res.cookie('authToken', token, {
                httpOnly: true, // Prevent access by JavaScript
                secure: false,   // Ensures the cookie is only sent over HTTPS
                sameSite: 'lax', // Protects against CSRF (set to 'Lax' or 'Strict' as needed)
                maxAge: 3600000    // Optional: Set cookie expiration (in milliseconds)
            });
            res.status(200).json({
                message: 'Login successful',
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
