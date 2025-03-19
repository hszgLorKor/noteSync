import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import req from "express/lib/request.js";

dotenv.config();

export const authenticateJWT = (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded payload to request object
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        return res.status(403).json({ message: "Invalid Token" });
    }
};

export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden: You don't have permission" });
        }
        next();
    };
};