import { MongoClient } from 'mongodb';
import setupUsers from "./setupCollections/setupUsers.js";
import setupLectures from "./setupCollections/setupLectures.js";
import fillLectures from "./fillCollections/fillLectures.js";
import fillUsers from "./fillCollections/fillUsers.js";

const uri = 'mongodb://localhost:27017';
const database = 'test';
let client;
let db;

async function startScript() {
    client = new MongoClient(uri);
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('Connected to MongoDB');
        db = await client.db(database);
        console.log('Connected to database');
        await setupUsers(db);
        await setupLectures(db);
    }
    catch (error) {
        console.error(error);
    }
}
async function main() {
    await startScript();
    await client.close();
    await fillLectures(client, database);
    await client.close();
    await fillUsers(client, database);
    await client.close();
}

await main();