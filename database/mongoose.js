import { mongoose } from 'mongoose'; // Using ES6 syntax
import { Router } from 'express'; // Import Router only if required

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
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["viewer", "student", "admin"], // Predefined roles
        default: "viewer" // Default role
    }
});

// Create the model from the schema
const collection = mongoose.model("Collection1", LogIngSchema);

// Export the collection for use in other files
export { collection };
