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

export const GetSelectAttributesForTable = async (req, res) => {
    const { tableName } = req.params;
    const attributes = Object.values(req.query);

    try {
        const response = await query(
            "SELECT " + attributes.join(", ") + " FROM " + tableName
        );
        return res.status(200).json({ data: response });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// This function returns a list of users that are engaged in every group chat.
export const GetUsersInAllChats = async (req, res) => {
    try {
        const response = await query(`SELECT email, fullname
                                      FROM appuser 
                                      WHERE NOT EXISTS (SELECT chatid
                                                        FROM chat
                                                        EXCEPT (SELECT chatid
                                                                FROM engagedin
                                                                WHERE engagedin.email = appuser.email))`);
        return res.status(200).json({ data: response });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
