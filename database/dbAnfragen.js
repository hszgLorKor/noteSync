const express = require('express');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs'); // LOLLE bcrypt -> bycrptjs spelling error
const app = express();

app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/vorlesungsplan', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Models
const Lecture = mongoose.model('Lecture', {
    datum: String,
    uhrzeit: String,
    name: String,
    dozent: String,
    raum: String,
    anmerkung: String
});

const User = mongoose.model('User', {
    username: String,
    passwordHash: String,
    permissionLevel: Number
});

// 1) Next 2 lectures
app.get('/next-lecture', async (req, res) => {
    const today = new Date().toISOString().split('T')[0];

    const lectures = await Lecture.find({ datum: { $gte: today } })
        .sort({ datum: 1, uhrzeit: 1 })
        .limit(2);

    res.json(lectures);
});

// 2) Login attempt
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({ success: false, message: 'Benutzer nicht gefunden' });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.passwordHash);
    if (!isPasswordCorrect) {
        return res.status(401).json({ success: false, message: 'Falsches Passwort' });
    }

    res.status(200).json({ success: true, message: 'Login erfolgreich' });
});
// 3) Permission request
app.get('/permission/:username', async (req, res) => {
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user) {
        return res.json({ permissionLevel: null });
    }

    res.json({ permissionLevel: user.permissionLevel });
});

// Start server
app.listen(3333, 'localhost', () => {
    console.log('server runs on port 3333, only accessible locally'); //LOLLE englishify
});
