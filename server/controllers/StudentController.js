import { QueryStudentByID } from "../services/StudentTable.js";

export const GetStudentByID = async (req, res) => {
    const studentID = req.params.id;
    try {
        const data = await QueryStudentByID(studentID);
        res.status(200).json(data)
    } catch (err) {
        res.send(err.toString())
    }
};
