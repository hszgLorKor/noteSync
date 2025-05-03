
const collectionName = 'lectures';

export default async function setupLectures(db) {
    if (!db) {
        console.error('MongoDB connection error');
        return;
    }
    // Check if the collection exists
    const existingCollections = await db.listCollections({name: collectionName}).toArray();
    if (existingCollections.length > 0) {
        console.log(`Collection "${collectionName}" exists. Dropping collection...`);
        await db.collection(collectionName).drop();
        console.log(`Collection "${collectionName}" dropped.`);
    }

    const validationRules = {
        $jsonSchema: {
            bsonType: "object",
            required: ["id", "lecturename", "description", "professor", "date", "room", "start", "online", "information"],  // Specify required fields
            properties: {
                id: {
                    type: "number",
                    minimum: 1,
                    description: "unique ID for each event"
                },
                lecturename: {
                    bsonType: "string",
                    description: "plaintext",
                },
                description: {
                    bsonType: "string",
                    description: "Vorlesung/Seminar",
                },
                professor: {
                    bsonType: "string",
                    description: "name des dozenten"
                },
                date: {
                    bsonType: "number",
                    description: "date of event"
                },
                room: {
                    bsonType: "string",
                    description: "plaintext",
                },
                start: {
                    bsonType: "bool",
                    description: "standard: yes (-> yes it will start)"
                },
                online: {
                    bsonType: "bool",
                    description: "standard: no (-> no will be in uni)"
                },
                information: {
                    bsonType: "string",
                    description: "additional information, standard empty",
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