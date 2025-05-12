import { Router } from 'express';
import dotenv from 'dotenv';
import {authenticateJWT, authorizeRoles} from "../../../utils/authentication/tokenChecker/tokenChecker.js";
import {nextLectureRequest} from "../../../utils/database/SQLConnection/connection.js";
// Load environment variables
dotenv.config();

const router = Router();

// Define your routes
router.get('/', authenticateJWT, authorizeRoles("viewer", "student", "admin"), async (req, res) => {
    const count = parseInt(req.query.count) || 2;
    try {
        const lecturesData = await nextLectureRequest(count); // Assuming this is an async function, you'll need to use 'await'
        return res.json(lecturesData);
    } catch (err) {
        return res.status(500).send({});
    }
});

// Default export
export default router;
