import { Router } from 'express';
import cors from "cors";
import multer from "multer";
import { upload } from "../../../utils/fileTransfer/fileUpload/upload.js";
import {authenticateJWT, authorizeRoles} from "../../../utils/authentication/tokenChecker/tokenChecker.js";

const router = Router();

router.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend's URL
    methods: ['POST'], // Specify allowed HTTP methods
    credentials: true // If using cookies or HTTP authentication
}));

// Define your routes
router.post('/', authenticateJWT, authorizeRoles("student", "admin"), (req, res, next) => {
    upload.single('file')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // Check for Multer-specific errors, such as size
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(450).send({ message: 'File is too big. Maximum limit is 25MB.' });
            }
            // Handle other Multer errors as needed
            return res.status(400).send({ message: 'A Multer error occurred: ' + err.message });
        } else if (err) {
            // Here, we handle the invalid file type error (user-defined)
            return res.status(460).send({ message: err.message }); // Adjust the message accordingly
        }

        // Checking for successful file upload
        if (!req.file) {
            return res.status(400).send({ message: 'No file uploaded.' });
        }

        // If successful, send success response
        const { lectureName, lectureNumber } = req.body;
        res.status(200);
    });
});

// Default export
export default router;
