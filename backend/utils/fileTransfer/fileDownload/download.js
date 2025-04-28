import path from "path";
import fs from "fs";

export default function downloadFile(filename, res) {
    const filePath = path.join(__dirname, '../../../fileStorage', filename);

    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('File not found');
        }

        // Set headers and send the file
        res.download(filePath, filename, (err) => {
            if (err) {
                res.status(500).send('Error downloading file');
            }
        });
    });
}