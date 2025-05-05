
const collectionName = 'users';

export default async function setupUsers(db) {
    if (!db) {
        console.error('MongoDB connection error');
        return;
    }
    // Check if the collection exists
    const existingCollections = await db.listCollections({ name: collectionName }).toArray();
    if (existingCollections.length > 0) {
        console.log(`Collection "${collectionName}" exists. Dropping collection...`);
        await db.collection(collectionName).drop();
        console.log(`Collection "${collectionName}" dropped.`);
    }

    const validationRules = {
        $jsonSchema: {
            bsonType: "object",
            required: ["username", "password", "permissionLevel"],  // Specify required fields
            properties: {
                username: {
                    bsonType: "string",
                    description: "plaintext",
                },
                password: {
                    bsonType: "string",
                    description: "hashed using bcryptjs"
                },
                permissionLevel: {
                    bsonType: "number",
                    description: "permission level: viewer(1), student(2), admin(3)"
                }
            }
        }
    };

    // Create the collection with validation rules
    const collection = await db.createCollection(collectionName, {
        validator: validationRules
    });
    console.log(`Collection "${collectionName}" created with validation rules.`)
}