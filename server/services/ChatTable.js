import query, { rawQuery } from "../db.js";

export const CreateChat = async (chatName) => {
    try {
        const response = await rawQuery(
            "INSERT INTO chat(chatname) VALUES ($1) RETURNING chatid;",
            [chatName]
        );
        if (response.rows.length < 1) {
            throw new Error("There was an error creating a new chat.");
        }
        return response.rows;
    } catch (error) {
        throw error;
    }
};

export const DeleteChatByID = async (chatID) => {
    try {
        const response = await rawQuery(
            "DELETE FROM chat WHERE chatid = $1 RETURNING chatid;",
            [chatID]
        );
        // Throw an error if no chat was deleted.
        if (response.rows.length < 1) {
            throw new Error(`Chat #${chatID} doesn't exist to be deleted.`);
        }
        return response.rows;
    } catch (error) {
        throw error;
    }
};

export const CreateNewChatEngagement = async (email, chatID) => {
    try {
        const response = await rawQuery(
            "INSERT INTO EngagedIn(email, chatid) VALUES ($1, $2) RETURNING email, chatid;",
            [email, chatID]
        );
        if (response.rows.length < 1) {
            throw new Error(
                "There was an error creating a new engagedIn relationship."
            );
        }
        return response.rows;
    } catch (error) {
        throw error;
    }
};

export const GetAllEmailsInChat = async (chatID) => {
    try {
        const response = await query(
            "SELECT email FROM EngagedIn WHERE chatid = $1",
            [chatID]
        );
        return response;
    } catch (error) {
        throw error;
    }
};

// Get all the chats a user belongs to, sorted by the most recently sent message
export const GetAllChatsForUserSorted = async (email) => {
    // Order the chats by the most recently sent message.
    try {
        const response = await query(
            `SELECT chatid, chatname
             FROM chat NATURAL LEFT OUTER JOIN privatemessage
             GROUP BY chatid
             HAVING chatid IN (SELECT chatid 
                               FROM chat NATURAL JOIN engagedin 
                               WHERE email = $1) 
             ORDER BY COALESCE(MAX(timesent), '1900-01-01') DESC;`,
            [email]
        );
        console.log(response)
        return response;
    } catch (error) {
        throw error;
    }
};

export const DeleteUserFromChat = async (chatID, email) => {
    try {
        const response = await rawQuery(
            "DELETE FROM engagedin WHERE chatid = $1 AND email = $2 RETURNING chatid;",
            [chatID, email]
        );
        if (response.rows.length < 1) {
            throw new Error(
                `There was an error deleting user ${email} from chat #${chatID}.`
            );
        }
        return response.rows;
    } catch (error) {
        throw error;
    }
};

export const AddUserToChat = async (chatID, email) => {
    try {
        const response = await rawQuery(
            "INSERT INTO engagedin(email, chatid) VALUES ($1, $2) RETURNING chatid;",
            [email, chatID]
        );
        if (response.rows.length < 1) {
            throw new Error(
                `There was an error adding user ${email} to chat #${chatID}.`
            );
        }
        return response.rows;
    } catch (error) {
        throw error;
    }
};

// Returns all messages in a chat, including the sender's full name
export const GetMessages = async (chatID) => {
    try {
        const response = await query(
            `SELECT messageid, fullname, email, text, timesent 
             FROM privatemessage natural join appuser 
             WHERE chatid = $1
             ORDER BY timesent ASC;`,
            [chatID]
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const PostMessage = async (chatID, senderEmail, messageText) => {
    try {
        const response = await rawQuery(
            "INSERT INTO privatemessage(email, chatid, text, timesent) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING messageid;",
            [senderEmail, chatID, messageText]
        );
        if (response.rows.length < 1) {
            throw new Error("There was an error creating a new message.");
        }
        return response.rows;
    } catch (error) {
        throw error;
    }
};
