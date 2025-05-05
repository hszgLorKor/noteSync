import multer from 'multer';
import path from 'path';
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedMimeTypes = [
    'application/pdf', // PDF files
    'application/msword', // Word (doc)
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // Word (docx)
    'image/png', // PNG images
    'image/jpeg', // JPEG images
    'text/plain' // Text files (txt)
];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../fileStorage')); // define folder to save uploaded files
    },
    filename: function (req, file, cb) {
        req.locals = {
            originalFilename: file.originalname,
            mimetype: file.mimetype,
        // Add any other file details you need to access later
        };

        const timestamp = Date.now();
        const newFilename = `${timestamp}`;
        cb(null, newFilename); // define how files are named
    }
});

// File filter function
const fileFilter = (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Invalid file type. Only PDF, Word, PNG, JPEG, and TXT files are allowed.'), false); // Reject the file
    }
};

export const upload = multer({
    storage: storage,
    limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB limit
    fileFilter: fileFilter // Apply the file filter
});