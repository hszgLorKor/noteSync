import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import hashPassword from "../../utils/bcryptjs/hash/hashPassword.js";

const collectionName = 'users';

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'resources', 'logins.txt');

export default async function fillUsers(client, database) {
    try {
        const UsersToAdd = []; // Array to collect all lectures to insert later

        // Create a readable stream for the file
        const stream = fs.createReadStream(filePath, { encoding: 'utf8' });

        // Set up a listener for the 'data' event
        stream.on('data', (chunk) => {
            const lines = chunk.split('\n'); // Split the chunk into lines

            let currentUser = []; // Array to hold current event

            for (const line of lines) {
                if (line.includes('user')) {
                    currentUser = []; // Reset for a new event
                }

                if (currentUser !== null) {
                    currentUser.push(line); // Add current line to the event data
                }

                if (line.includes('permission')) {
                    // Process the completed event
                    const username = extractValue(currentUser[0]); // Grab start time
                    const unhashedPassword = extractValue(currentUser[1]);
                    const permissionLevel = parseInt(extractValue(currentUser[2]));
                    // Store the lecture details to the array
                    UsersToAdd.push({ username: username, password: unhashedPassword, permissionLevel: permissionLevel });
                    currentUser = null;
                }
            }
        });

        // Set up a listener for the 'end' event to insert all lectures at once
        stream.on('end', async () => {
            if (UsersToAdd.length > 0) {
                try {
                    for (const user of UsersToAdd) {
                        user.password = await hashPassword(user.password);
                    }
                    await client.connect();
                    const db = await client.db(database);
                    console.log('Connected to database');
                    await db.collection(collectionName).insertMany(UsersToAdd);
                    console.log('Inserted user-documents:', UsersToAdd.length);
                } catch (error) {
                    console.error('Error inserting users:', error);
                    await client.close();
                }
                finally {
                    await client.close();
                }
            } else {
                console.log('No users to insert.');
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
        return line.split('=')[1].trim(); // Split by ':' and trim whitespace
    }
    else {
        return "unknown";
    }
}