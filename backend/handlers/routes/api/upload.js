import { Router } from 'express';
import multer from "multer";
import { upload } from "../../../utils/fileTransfer/fileUpload/upload.js";
import {authenticateJWT, authorizeRoles} from "../../../utils/authentication/tokenChecker/tokenChecker.js";
import fs from "fs";
import path from "path";

const router = Router();

// Define your routes
router.post('/', authenticateJWT, authorizeRoles("student", "admin"), (req, res, next) => {
    upload.single('file')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // Check for Multer-specific errors, such as size
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(450).send({ message: 'File is too big. Maximum limit is 25MB.' });
            }
            // Handle other Multer errors as needed
            console.log(err);
            return res.status(400).send({ message: 'A Multer error occurred'});
        } else if (err) {
            // Here, we handle the invalid file type error (user-defined)
            console.log(err);
            return res.status(460).send({ message: "Error while uploading file"}); // Adjust the message accordingly
        }

        // Checking for successful file upload
        if (!req.file) {
            return res.status(400).send({ message: 'No file uploaded.' });
        }
        const lectureName = req.body.lectureName || '';
        const lectureNumber = req.body.lectureNumber || '';
        const timestamp = Date.now()
        const filename = req.file.originalname;
        const oldPath = req.file.path;
        const ext = path.extname(req.file.originalname); // Get the original file extension
        let newFilename = `${lectureName}-${lectureNumber}-${timestamp}-${filename}`; // Create new file name
        newFilename = sanitizeFilename(newFilename);
        const newPath = path.join(path.dirname(req.file.path), newFilename);

        fs.promises.rename(oldPath, newPath)
            .then(() => {
                res.status(200).send({ message: "File uploaded and data processed successfully" }); // Send a meaningful success message
            })
            .catch(err => {
                console.error("Error renaming file:", err);
                return res.status(500).send({ message: "Error renaming file: "});
            });
    });
});

// Default export
export default router;

function sanitizeFilename(filename) {
    return filename.replace(/[^a-zA-Z0-9.-]/g, ''); // Remove non-alphanumeric characters except hyphens
}
