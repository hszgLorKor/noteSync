import multer from "multer";
import * as fs from "node:fs";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folder = req.body.folder;

        if (!folder || typeof folder !== 'string') {
            return cb(new Error('Invalid folder name'), null);
        }

        const uploadPath = path.join(__dirname, `uploads/${folder}`);

        // Create folder if it doesn't exist
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },

    filename: function (req, file, cb) {
        // Ensure `req.user` is populated by `authenticateJWT` middleware
        if (!req.user || !req.user.id) {
            return cb(new Error('User ID not found'), null);
        }

        const userId = req.user.id;
        const timestamp = Date.now();
        cb(null, `${userId}-${timestamp}-${file.originalname}`);
    }
});

export const upload = multer({ storage });

// Export a download function
export const downloadFile = (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, `uploads/${filename}`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'File not found' });
    }

    res.download(filePath, (err) => {
        if (err) {
            res.status(500).json({ message: 'Error downloading file' });
        }
    });
};