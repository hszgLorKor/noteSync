import {loginAttempt} from "../dbConnection.js";
import comparePassword from "../../utils/bcryptjs/compare/comparePassword.js";

export default async function login(req, res, username, password) {
    //gets password from database
    const dbPassword = await loginAttempt(username);
    //compares and responds with success or failed according to the outcome
    if (password && await comparePassword(password, dbPassword)) {
        res.status(200).json({message: "login success"});
    }
    else {
        return res.status(403).send();
    }
}