import { Router } from 'express';
import { authenticateJWT, authorizeRoles } from "../../../utils/authentication/tokenChecker/tokenChecker.js";
import { findFiles } from "../../../utils/fileTransfer/fileSearch/fileSearch.js";

const router = Router();

// Define your routes
router.get('/', authenticateJWT, authorizeRoles("student", "admin"), async (req, res) => {
    const { lectureName, lectureNumber } = req.body; // Extract from the request body
    console.log(lectureName, lectureNumber);

    try {
        // Call the findFiles function and await its response
        const filteredFiles = await findFiles(lectureName, lectureNumber);

        // If no files are found, return a message
        if (filteredFiles.length === 0) {
            return res.status(404).send({ message: 'No files found matching the provided criteria.' });
        }

        // Respond with the matching file names
        res.status(200).send({
            message: 'Files found',
            files: filteredFiles
        });
    } catch (error) {
        // Handle errors from the file service
        res.status(500).send({ message: "Error while fetching files" });
    }
});

// Default export
export default router;