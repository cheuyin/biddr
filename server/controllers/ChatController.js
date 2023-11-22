import { QueryAppUserByEmail } from "../services/AppUserTable.js";
import {
    CreateChat,
    CreateNewChatEngagement,
    GetAllEmailsInChat,
    GetMessages,
    DeleteChatByID,
    PostMessage,
    DeleteUserFromChat,
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
    return res.sendStatus(200);
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
        return res.status(200).json({ data: data });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

export const RemoveUserFromChat = async (req, res) => {
    const { chatID, email } = req.params;
    try {
        await DeleteUserFromChat(chatID, email);
        return res
            .status(200)
            .json({
                message: `Successfully deleted user ${email} from chat #${chatID}.`,
            });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

export const InviteUserToChat = async (req, res) => {};

// Returns an array of all the messsages belonging to a chat
export const GetAllMessagesInChat = async (req, res) => {
    const chatID = req.params.chatID;
    try {
        const response = await GetMessages(chatID);
        return res.status(200).json({ data: response });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// Sends a message in a chat
export const SendMessage = async (req, res) => {
    const { chatID } = req.params;
    const { email, text } = req.body;
    if (!email || !text) {
        return res.status(400).json({
            error: "Please provide the email of the sender and the message text.",
        });
    }
    try {
        await PostMessage(chatID, email, text);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
    return res.status(200).json({ message: "Message successfully sent." });
};
