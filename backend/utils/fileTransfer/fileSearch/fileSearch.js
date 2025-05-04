import fs from 'fs';
import path from 'path';
import mime from 'mime-types'; // Import mime-types to get the MIME type from the filename
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, '../../fileStorage'); // Path to the fileStorage folder

export const findFiles = (lectureName, lectureNumber) => {
    return new Promise((resolve, reject) => {
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                return reject('Unable to scan directory: ' + err);
            }

            // Prepare an array to hold the detailed file info
            const fileDetails = [];

            // Filter files based on the provided criteria
            files.forEach(file => {
                const includesLectureName = lectureName ? file.startsWith(lectureName + '-') : true;
                const includesLectureNumber = lectureNumber ? file.includes('-' + lectureNumber + '-') : true;

                if (includesLectureName && includesLectureNumber) {
                    const filePath = path.join(directoryPath, file);

                    // Get file stats for size and type
                    const stats = fs.statSync(filePath);
                    const size = stats.size; // in bytes
                    const type = mime.lookup(file) || 'application/octet-stream'; // Get MIME type

                    // Push file details to the array
                    fileDetails.push({
                        name: file,
                        size: size,
                        type: type
                    });
                }
            });

            resolve(fileDetails);
        });
    });
};