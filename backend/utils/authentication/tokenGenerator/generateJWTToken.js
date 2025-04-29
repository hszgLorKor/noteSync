import jwt from "jsonwebtoken";
import {permissionRequest} from "../../database/SQLConnection/connection.js";

export async function generateToken(username) {
    // Assume the user object has properties: username and role
    //TODO connect to database and retrieve information -> creating a jwt Token using it
    //TODO Token with JWT -> expiration 1h -> 4 level? (viewer, poster, moderator, admin) -> use https for token transit
    const permissionLevel = await permissionRequest(username);
    if (permissionLevel === 1) {
        const payload = {
            userid: username,          // userid: the unique name of the user not the id in the database!!
            role: "viewer",       // role of the user (e.g., 'admin', 'viewer', 'editor', 'poster')
            iat: Date.now(), // issued at time
        };
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    }
    if (permissionLevel === 2) {
        const payload = {
            userid: username,          // userid: the unique name of the user not the id in the database!!
            role: "student",       // role of the user (e.g., 'admin', 'viewer', 'editor', 'poster')
            iat: Date.now(), // issued at time
        };
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    }
    if (permissionLevel === 3) {
        const payload = {
            userid: username,          // userid: the unique name of the user not the id in the database!!
            role: "admin",       // role of the user (e.g., 'admin', 'viewer', 'editor', 'poster')
            iat: Date.now(), // issued at time
        };
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    }
}