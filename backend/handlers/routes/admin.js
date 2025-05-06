import { Router } from 'express';
import dotenv from 'dotenv';
import { authenticateJWT, authorizeRoles} from "../../utils/authentication/tokenChecker/tokenChecker.js";
// Load environment variables
dotenv.config();

const router = Router();

// Define your routes
router.get('/', authenticateJWT, authorizeRoles("admin"), (req, res) => {
    return res.status(200).send({message: "authentication success"});
});

// Default export
export default router;
