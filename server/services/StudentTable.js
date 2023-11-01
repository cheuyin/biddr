import query from "../db.js";

export const QueryStudentByID = async (id) => {
    try {
        const result = await query("SELECT * FROM student WHERE sid = $1", [
            id,
        ]);
        return result;
    } catch (error) {
        console.error("Error executing query:", error);
        throw error;
    }
};
