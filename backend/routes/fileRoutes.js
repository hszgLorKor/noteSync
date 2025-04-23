import express from 'express';
import { authenticateJWT, authorizeRoles } from '../middleware/authMiddleware.js';
import { upload, downloadFile } from '../middleware/fileHandler.js';

const router = express.Router();

// Upload route
router.post('/upload',
    //authenticateJWT, authorizeRoles("student", "admin"),
    upload.single('file'), (req, res) => {
    res.status(200).json({ message: 'File uploaded successfully!' });
});

// Download route
router.get('/download/:filename',
    //authenticateJWT, authorizeRoles("student", "admin"),
    downloadFile);

export default router;