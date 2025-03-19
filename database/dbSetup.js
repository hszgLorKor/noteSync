import MongoClient from 'mongodb';

const uri = "mongodb://localhost:27017/TestLogin";
let client;

async function connect() {
    if (!client) return client;
    try {
        client =  new MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log('Connected to the database');

        return client;
    } catch (e) {
        console.error('Error connecting to the database');
        console.error(e);
    }
}
module.exports = { connect };
