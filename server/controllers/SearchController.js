import query from "../db.js";

export const GetAllTables = async (req, res) => {
    try {
        const response = await query(
            "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"
        );
        return res.status(200).json({ data: response });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export const GetAllAttributesForTable = async (req, res) => {
    const { tableName } = req.params;
    try {
        const response = await query(
            `SELECT column_name 
             FROM information_schema.columns 
             WHERE table_schema = 'public' AND table_name = $1;`,
            [tableName]
        );
        if (response.length === 0) {
            throw new Error("No data was returned.");
        }
        return res.status(200).json({ data: response });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
