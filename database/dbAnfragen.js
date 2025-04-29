const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
        return res.json({ success: false });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
    res.json({ success: isPasswordCorrect });
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
    console.log('Server läuft auf Port 3333, nur lokal');
});
