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

        return response;
    } catch (error) {
        throw error;
    }
};

export const DeleteChatByID = async (chatID) => {
    try {
        const response = await rawQuery("DELETE FROM chat WHERE chatid = $1 RETURNING chatid;", [
            chatID,
        ]);
        
        // Throw an error if no chat was deleted.
        if (response.rows.length < 1) {
            throw new Error(`Chat #${chatID} doesn't exist to be deleted.`);
        }

        return response;
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

        return response;
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

export const GetMessages = async (chatID) => {
    try {
        const response = await query(
            "SELECT messageid, email, text, timesent FROM privatemessage WHERE chatid = $1;",
            [chatID]
        );
        return response;
    } catch (error) {
        throw error;
    }
};
