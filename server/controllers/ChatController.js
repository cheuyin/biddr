import query from "../db.js";
import { rawQuery } from "../db.js";
import { QueryAppUserByEmail } from "../services/AppUserTable.js";

// Expects an array with at least one person that will be in this chat
export const PostNewChat = async (req, res) => {
    const { userEmails, chatName } = req.body;

    // Make sure users is an array
    if (!Array.isArray(userEmails) || userEmails.length < 1) {
        return res.status(400).json({
            error: "Each chat requires at least one user.",
        });
    }

    // Make sure chatName exists and is a string
    if (!(typeof chatName === "string") || chatName.length < 1) {
        return res.status(400).json({
            error: "Please give a name for your chat.",
        });
    }

    // Validate to make sure every user in the users array actually exists
    for (let userEmail of userEmails) {
        try {
            const response = await QueryAppUserByEmail(userEmail);
            if (!response || !response[0]) {
                return res.status(400).json({
                    error: "Please send a valid array of user emails.",
                });
            }
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    try {
        const response = await rawQuery(
            "INSERT INTO chat(chatname) VALUES ($1) RETURNING chatid;",
            [chatName]
        );

        const insertedChatID = response.rows[0].chatid;

        // For each user, add that user to this newly created chat

        for (let userEmail of userEmails) {
            await query(
                "INSERT INTO EngagedIn(email, chatid) VALUES ($1, $2);",
                [userEmail, insertedChatID]
            );
        }
    } catch (err) {
        return res.sendStatus(400).json({ err: err.message });
    }

    res.sendStatus(200);
};

// Returns an array of email addresses that are part of a chat
export const GetAllUsersInChat = async (req, res) => {
    const chatID = req.params.chatID;
    try {
        const response = await query(
            "SELECT email FROM EngagedIn WHERE chatID = $1",
            [chatID]
        );

        const data = response.map((entry) => entry.email);
        res.status(200).json({ data: data });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Returns an array of all the messsages belonging to a chat
export const GetAllMessagesInChat = async (req, res) => {
    const chatID = req.params.chatID;
    try {
        const response = await query(
            "SELECT messageid, email, text, timesent FROM privatemessage WHERE chatID = $1",
            [chatID]
        );

        res.status(200).json({ data: response });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
