import { Router } from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import {authenticateJWT, authorizeRoles} from "../../../utils/authentication/tokenChecker/tokenChecker.js";
import {nextLectureRequest} from "../../../utils/database/SQLConnection/connection.js";
// Load environment variables
dotenv.config();

const router = Router();

router.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true // If using cookies or HTTP authentication
}));


// Define your routes
router.get('/', authenticateJWT, authorizeRoles("viewer", "student", "admin"), async (req, res) => {
    //return res.status(200).send('lecture route');
    //TODO send back next two lectures as two objects, give necessary information(: date, time, place, prof, is taking place, notes etc)
    // name1 date1 time1 etc + name2 date2 für die zweite Vorlesung
    try {
        const lecturesData = await nextLectureRequest(); // Assuming this is an async function, you'll need to use 'await'
        return res.json(lecturesData);
    } catch (err) {
        return res.status(401).send({});
    }
});

// Default export
export default router;
