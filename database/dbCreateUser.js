const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// MongoDB verbinden
mongoose.connect('mongodb://localhost:27017/vorlesungsplan', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// User Model
const User = mongoose.model('User', {
    username: String,
    passwordHash: String,
    permissionLevel: Number
});

async function seedUsers() {
    const users = [
        { username: 'admin', password: 'adminpass', permissionLevel: 403 },
        { username: 'student1', password: 'studentpass1', permissionLevel: 402 },
        { username: 'student2', password: 'studentpass2', permissionLevel: 402 },
        { username: 'student3', password: 'studentpass3', permissionLevel: 402 },
        { username: 'viewer1', password: 'viewerpass1', permissionLevel: 401 }, // Viewer 1
        { username: 'viewer2', password: 'viewerpass2', permissionLevel: 401 }  // Viewer 2
    ];

    for (let userData of users) {
        const passwordHash = await bcrypt.hash(userData.password, 10);
        const user = new User({
            username: userData.username,
            passwordHash,
            permissionLevel: userData.permissionLevel
        });
        await user.save();
        console.log(`Benutzer ${user.username} erstellt`);
    }

    mongoose.disconnect();
}

seedUsers();
