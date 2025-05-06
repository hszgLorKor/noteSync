import { Router } from 'express';
import download from "../../../utils/fileTransfer/fileDownload/download.js";
import {authenticateJWT, authorizeRoles} from "../../../utils/authentication/tokenChecker/tokenChecker.js";

const router = Router();

// Define your routes
router.get('/:filename', authenticateJWT, authorizeRoles("student", "admin"), (req, res, next) => {
    const filename = req.params.filename;
    download(filename, res);
});

export default router;
