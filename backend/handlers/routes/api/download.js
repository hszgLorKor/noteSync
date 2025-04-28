import { Router } from 'express';
import cors from "cors";
import download from "../../../../../../notesync_test/backend/utils/fileTransfer/fileDownload/download.js";
import {authenticateJWT, authorizeRoles} from "../../../../../../notesync_test/backend/utils/authentication/tokenChecker/tokenChecker.js";

const router = Router();

router.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend's URL
    methods: ['GET'], // Specify allowed HTTP methods
    credentials: true // If using cookies or HTTP authentication
}));

// Define your routes
router.get('/:filename', authenticateJWT, authorizeRoles("student", "admin"), (req, res, next) => {
    const filename = req.params.filename;
    download(filename, res);
});

export default router;
