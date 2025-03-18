import jwt from "jsonwebtoken";

export function generateToken(username) {
    // Assume the user object has properties: username and role
    //TODO connect to database and retrieve information -> creating a jwt Token using it
    const payload = {
        userid: username,          // userid: the unique identifier of the user
        role: username,       // role of the user (e.g., 'admin', 'viewer', 'editor', 'poster')
        iat: Date.now(), // issued at time
    };

    console.log(payload);
    // Sign the token with a secret and set an expiration time
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}