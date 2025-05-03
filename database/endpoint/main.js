import express from 'express';
import cors from 'cors';
import {closeConnection, startConnection} from "./dbConnection.js";
import permissionRequest from "./permission/permissionRequest.js";
import login from "./login/login.js";
import nextLecture from "./nextLecture/nextLecture.js";
import editLecture from "./editLecture/editLecture.js";

const PORT = 3333;
const app = express();

//start database connection
startConnection().then(r => console.log(' ')).catch((err) => console.error(err));

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your backend's URL
    methods: ['GET', 'POST'], // Specify allowed HTTP methods
}));
app.use(express.json());

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    login(req, res, username, password);
})
app.get('/next-lecture', async (req, res) => {
    nextLecture(req, res);
})
app.get('/permission/:username', async (req, res) => {
    const { username } = req.params;
    permissionRequest(req, res, username);
})
app.post('/edit-lecture', async (req, res) => {
    const { id } = req.body;
    editLecture(req, res, id);
})
// TODO add-lecture

app.listen(PORT, 'localhost', () => {
    console.log(`Database listening on ${PORT}`);
})

//close database connection on script ending
process.on('exit', async () => {
    closeConnection().then(r => process.exit(0));
})
process.on('SIGINT', async () => {
    closeConnection().then(r => process.exit(0));
})
process.on('SIGTERM', async () => {
    closeConnection().then(r => process.exit(0));
})