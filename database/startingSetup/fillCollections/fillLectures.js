import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const collectionName = 'lectures';

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'resources', 'iib24.txt');

let insertedLectures = 1;

export default async function fillLectures(client, database) {
    try {
        const lecturesToAdd = []; // Array to collect all lectures to insert later

        // Create a readable stream for the file
        const stream = fs.createReadStream(filePath, { encoding: 'utf8' });

        // Set up a listener for the 'data' event
        stream.on('data', (chunk) => {
            const lines = chunk.split('\n'); // Split the chunk into lines

            let currentEvent = []; // Array to hold current event

            for (const line of lines) {
                if (line.includes('BEGIN:VEVENT')) {
                    currentEvent = []; // Reset for a new event
                }

                if (currentEvent !== null) {
                    currentEvent.push(line); // Add current line to the event data
                }

                if (line.includes('END:VEVENT')) {
                    // Process the completed event
                    const start = extractValue(currentEvent[2]); // Grab the start time
                    // Extract year, month, day, hours, minutes, seconds using substring
                    const year = start.substring(0, 4);
                    const month = start.substring(4, 6) - 1; // Adjust month to be zero-based
                    const day = start.substring(6, 8);
                    const hours = start.substring(9, 11);
                    const minutes = start.substring(11, 13);
                    const seconds = start.substring(13, 15);

                    // Create a Date object in UTC
                    const eventDate = new Date(Date.UTC(year, month, day, hours, minutes, seconds));
                    const time = eventDate.getTime(); // Get the Unix timestamp in milliseconds

                    const name = extractValue(currentEvent[4]); // Grab lecture name
                    const description = extractValue(currentEvent[5]); // Grab description
                    const professor = getProfessor(name); // Get the professor's name
                    const place = extractValue(currentEvent[6]); // Grab room location

                    // Store the lecture details to the array
                    lecturesToAdd.push({
                        id: insertedLectures,
                        lecturename: name,
                        description: description,
                        professor: professor,
                        date: time,
                        room: place,
                        start: true,
                        online: false,
                        information: ''
                    });

                    insertedLectures++; // Increment the inserted lecture ID
                    currentEvent = null;
                }
            }
        });

        // Set up a listener for the 'end' event to insert all lectures at once
        stream.on('end', async () => {
            if (lecturesToAdd.length > 0) {
                try {
                    await client.connect();
                    const db = await client.db(database);
                    console.log('Connected to database');
                    await db.collection(collectionName).insertMany(lecturesToAdd);
                    console.log('Inserted lecture-documents:', lecturesToAdd.length);
                } catch (error) {
                    console.error('Error inserting lectures:', error);
                    await client.close();
                }
                finally {
                    await client.close();
                }
            } else {
                console.log('No lectures to insert.');
            }
        });

        // Set up a listener for the 'error' event
        stream.on('error', (error) => {
            console.error('Error reading the file:', error);
        });

    } catch (error) {
        console.error('fillLectures error:', error);
    }
}

function extractValue(line) {
    if (line) {
        return line.split(':')[1].trim(); // Split by ':' and trim whitespace
    }
    else {
        return "unknown";
    }
}

function getProfessor(lecture) {
    // Your existing logic to identify the professor
    if (lecture.includes("Progr")) {
        return "Lelanz";
    }
    if (lecture.includes("Math")) {
        return "Schnell";
    }
    if (lecture.includes("Date")) {
        return "Ulrich";
    }
    if (lecture.includes("Men")) {
        return "Westermann";
    }
    if (lecture.includes("Info")) {
        return "Hartwig";
    }
    if (lecture.includes("Betrie")) {
        return "Ruhland";
    }
    return "unknown";
}