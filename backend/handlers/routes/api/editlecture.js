import { Router } from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import { authenticateJWT, authorizeRoles} from "../../../utils/authentication/tokenChecker/tokenChecker.js";
import {editLectureRequest} from "../../../utils/database/SQLConnection/connection.js";
// Load environment variables
dotenv.config();

const router = Router();

router.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true // If using cookies or HTTP authentication
}));


// Define your routes
router.get('/', authenticateJWT, authorizeRoles("admin"), async (req, res) => {
    await editLectureRequest(req, res);
});

// Default export
export default router;
