import mongoose from 'mongoose';

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/TestLogin", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connection successful");
    })
    .catch(() => {
        console.error("MongoDB connection failed");
    });

// Define the schema with predefined roles and default role
const LogIngSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["viewer", "student", "admin"], default: "viewer" }
});

const StundenplanSchema = new mongoose.Schema({
    name: { type: String, required: true },
    raum: { type: String, required: true },
    vorlesung_seminar: { type: String, required: true },
    anmerkung: { type: String, default: '' },
    findet_statt: { type: Boolean, required: true }, // Hier war der Tippfehler
});


const collection = mongoose.model("Collection1", LogIngSchema);
const Stundenplan = mongoose.model("Stundenplan", StundenplanSchema);

export { collection, Stundenplan };
