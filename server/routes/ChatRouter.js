import express from "express";

const router = express.Router();

import {
    GetAllUsersInChat,
    GetAllMessagesInChat,
    PostNewChat,
    DeleteChat,
    SendMessage
} from "../controllers/ChatController.js";

/*
List of functionality:
X Create a chat with a name and list of initial users e.g. /api/chats
X Delete a chat - DELETE /api/chats/43
X Get all the users in a chat, e.g. /api/chats/43/users
X Get all messages in a chat e.g. /api/chats/43/messages
- Send a message in a chat, e.g. /api/chats/32/messages
- Add user to a chat e.g. /api/chats/43/users
- Remove user from a chat e.g. /api/chats/43/users/gan@gmail.com
*/

router.post("/", PostNewChat);
router.delete("/:chatID", DeleteChat);
router.get("/:chatID/users", GetAllUsersInChat);
router.get("/:chatID/messages", GetAllMessagesInChat);
router.post("/:chatID/messages", SendMessage);

export default router;
