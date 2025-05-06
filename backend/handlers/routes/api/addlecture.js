import { Router } from 'express';
import dotenv from 'dotenv';
import { authenticateJWT, authorizeRoles} from "../../../utils/authentication/tokenChecker/tokenChecker.js";
import {addLectureRequest} from "../../../utils/database/SQLConnection/connection.js";
// Load environment variables
dotenv.config();

const router = Router();

// Define your routes
router.get('/', authenticateJWT, authorizeRoles("admin"), async (req, res) => {
    await addLectureRequest(req, res);
});

// Default export
export default router;
