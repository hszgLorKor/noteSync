import {MongoClient} from 'mongodb';

const uri = 'mongodb://localhost:27017';
const database = 'test';
const users = "users";
const lectures = "lectures";
let client;
let db;

export async function startConnection() {
    client = new MongoClient(uri);
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log('Connected to MongoDB');
        db = await client.db(database);
        console.log('Connected to database');
    }
    catch (err) {
        console.error(err);
    }
}

export async function closeConnection() {
    await client.close();
}

export async function permissionLevel(username) {
    try {
        const user = await db.collection(users).findOne({username: username});
        if (user) {
            // Return the permissionLevel of the found user
            return user.permissionLevel; // Assuming permissionLevel exists in the document
        } else {
            return null; // or handle accordingly if user not found
        }
    }
    catch (err) {
        return null;
    }
}
export async function loginAttempt(username) {
    try {
        const user = await db.collection(users).findOne({username: username});
        if (user) {
            // Return the password of the found user
            return user.password; // Assuming password exists in the document
        } else {
            return null; // or handle accordingly if user not found
        }
    }
    catch (err) {
        console.log(err)
        return null;
    }
}

export async function nextLectureRequest(limit) {
    try {
        const currentDate = Date.now();
        return await db.collection(lectures) // Ensure you add quotes around the collection name
            .find({date: {$gte: currentDate}}) // Find lectures with date >= currentDate
            .sort({date: 1}) // Sort by date ascending
            .limit(limit) // Limit to the next 2 lectures
            .toArray();
    }
    catch (err) {
        console.error(err);
        return null;
    }

}

export async function editLectureRequest(id, updates) {
    try{
        return await db.collection(lectures).updateOne({id: id}, {$set: updates});
    }
    catch (err) {
        return err;
    }
}

export async function currentLectureData(id) {
    try {
        return await db.collection(lectures).findOne({id: id});
    }
    catch (err) {
        return err;
    }
}
export async function highestLectureId() {
    try {
        const entry = await db.collection(lectures).find().sort({ id: -1 }).limit(1).toArray();
        return entry[0].id;
    }
    catch (err) {
        return -2
    }
}
export async function addLectureRequest(data) {
    try {
        await db.collection(lectures).insertOne(data)
        return true;
    }
    catch (err) {
        return false;
    }
}