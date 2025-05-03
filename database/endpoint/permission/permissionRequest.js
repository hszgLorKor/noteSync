import {permissionLevel} from "../dbConnection.js";

export default async function permissionRequest(req, res, username) {
    const level = await permissionLevel(username);
    if (level === 3) {
        res.status(203).send();
        return;
    }
    if (level === 2) {
        res.status(202).send();
        return;
    }
    if (level === 1) {
        res.status(201).send();
        return;
    }
    return res.status(404).send();
}