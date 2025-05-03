import ping from '../routes/ping.js';
import files from '../routes/api/files.js';
import dashboard from '../routes/dashboard.js';
import login from '../routes/login.js';
import nextlectures from '../routes/api/nextlectures.js';
import editlecture from '../routes/api/editlecture.js';
import addlecture from '../routes/api/addlecture.js';
import upload from '../routes/api/upload.js';
import download from '../routes/api/download.js';
import admin from "../routes/admin.js";

export default function setupRoutes(app) {
    app.use('/ping', ping); // test ping
    app.use('/dashboard', dashboard); //token protected
    app.use('/admin', admin); //token protected needs admin authenticated token
    app.use('/login', login); //send login routes through login/verification process
    app.use('/api/files', files); //only for information requests
    app.use('/api/next-lectures', nextlectures); //api request to display next 2 lectures+their info
    app.use('/api/edit-lecture', editlecture); //api request to display next 2 lectures+their info
    app.use('/api/add-lecture', addlecture); //api request to display next 2 lectures+their info
    app.use('/api/upload', upload);
    app.use('/api/download', download);
}
