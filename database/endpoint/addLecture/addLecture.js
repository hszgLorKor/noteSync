import {addLectureRequest, highestLectureId} from "../dbConnection.js";


export default async function addLecture(req, res) {
    let id;
    try {
        const highestId = parseInt(await highestLectureId());
        if (highestId === -2) {
            res.status(500).send({message : "Error retrieving data"});
            return;
        }
        id = highestId + 1;

    } catch (error) {
        res.status(500).send({message : "Error retrieving data"});
        return; // Or throw error;
    }
    const lecturename = req.body.lecturename || "unknown name";
    const description = req.body.description || "unknown professor";
    const professor = req.body.professor || "unknown";
    const date = parseInt(req.body.date) || Date.now();
    const room = req.body.room || "unknown room";
    const start = req.body.start === 'start';
    const online = req.body.online === 'true';
    const information = req.body.information || "";

    const data = {
        id: id,
        lecturename: lecturename,
        description: description,
        professor: professor,
        date: date,
        room: room,
        start: start,
        online: online,
        information: information
    };

    try {
        const success = await addLectureRequest(data);
        if (success) {
            res.status(200).send({message : "Successfully added"});
            return;
        }
        else {
            res.status(500).send({message : "Something went wrong"});
            return;
        }
    }
    catch (error) {
        res.status(500).send({message : "Something went wrong"});
        return;
    }

}