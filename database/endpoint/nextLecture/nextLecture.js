import {nextLectureRequest} from "../dbConnection.js";

export default async function nextLecture(req, res, count) {
    let numberOfLectures = 0;
    if (count < 1 || count > 10) {
        numberOfLectures = 2;
    }
    else {
        numberOfLectures = count;
    }
    const data = await nextLectureRequest(numberOfLectures);
    return res.send(data);
}