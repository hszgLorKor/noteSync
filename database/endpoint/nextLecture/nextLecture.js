import {nextLectureRequest} from "../dbConnection.js";

export default async function nextLecture(req, res) {
    const data = await nextLectureRequest();
    return res.send(data);
}