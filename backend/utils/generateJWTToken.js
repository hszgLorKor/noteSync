import jwt from "jsonwebtoken";

export function generateToken(username) {
    // Assume the user object has properties: username and role
    //TODO connect to database and retrieve information -> creating a jwt Token using it
    //TODO Token with JWT -> expiration 1h -> 4 level? (viewer, poster, moderator, admin) -> use https for token transit
    const payload = {
        userid: username,          // userid: the unique name of the user not the id in the database!!
        role: "viewer",       // role of the user (e.g., 'admin', 'viewer', 'editor', 'poster')
        iat: Date.now(), // issued at time
    };

    // Sign the token with a secret and set an expiration time
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}