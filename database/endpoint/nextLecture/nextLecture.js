import {nextLectureRequest} from "../dbConnection.js";

export default async function nextLecture(req, res) {
    const number = req.body.numberOfLectures || 2;
    const data = await nextLectureRequest(number);
    return res.send(data);
}