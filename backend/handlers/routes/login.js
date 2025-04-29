import { Router } from 'express';
import { isSafe } from '../../utils/database/SQLInjectionChecker/injectionChecker.js';
import {generateToken} from "../../utils/authentication/tokenGenerator/generateJWTToken.js";
import {loginRequest} from '../../utils/database/SQLConnection/connection.js'
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
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 10,  //Limit each IP to 10 requests per 15 minutes
    message: "Too many login attempts. Please try again later."
});
// define login
router.post('/', loginLimiter, async (req, res) => {  // Directly applying loginLimiter here
    const { username, password } = req.body;

    if (isSafe(username) && isSafe(password)) {
        const loginCredentials = await loginRequest(username, password);
        if (loginCredentials) {
            const token = await generateToken(username);
            //TODO FIX IN LIVE VERSION
            res.cookie('authToken', token, {
                httpOnly: true, // Prevent access by JavaScript
                secure: false,   // Ensures the cookie is only sent over HTTPS //TODO FIX IN LIVE VERSION
                sameSite: 'lax', // Protects against CSRF (set to 'Lax' or 'Strict' as needed) //TODO FIX IN LIVE VERSION
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
