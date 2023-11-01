import { QueryStudentByID } from "../services/StudentTable.js";

export const GetStudentByID = async (req, res) => {
    const studentID = req.params.id;

    try {
        const data = await QueryStudentByID(studentID);
        res.status(200).json(data)
    } catch (e) {
        console.log("Error: Could not retrieve student.");
    }
};
