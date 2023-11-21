import { QueryAppUserByEmail } from "../services/AppUserTable.js";
import {
    CreateChat,
    CreateNewChatEngagement,
    GetAllEmailsInChat,
    GetMessages,
    DeleteChatByID,
} from "../services/ChatTable.js";

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
        const response = await CreateChat(chatName);

        const insertedChatID = response.rows[0].chatid;

        // For each user, add that user to this newly created chat
        for (let userEmail of userEmails) {
            await CreateNewChatEngagement(userEmail, insertedChatID);
        }
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }

    res.sendStatus(200);
};

// Deletes a chat. Should cascade and delete related EngagedIn and PrivateMessage tuples as well.
export const DeleteChat = async (req, res) => {
    const chatID = req.params.chatID;
    try {
        await DeleteChatByID(chatID);
        return res.status(200).json({ message: "Successfully deleted chat." });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Returns an array of email addresses that are part of a chat
export const GetAllUsersInChat = async (req, res) => {
    const chatID = req.params.chatID;
    try {
        const response = await GetAllEmailsInChat(chatID);
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
        const response = await GetMessages(chatID);
        res.status(200).json({ data: response });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
