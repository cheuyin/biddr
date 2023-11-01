export const GetStudentByID = (req, res) => {
    const studentID = req.params.id;
    return res.send("Hello. You asked for Student #: " + studentID)
}