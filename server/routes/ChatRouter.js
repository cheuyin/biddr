import express from "express";

const router = express.Router();

import {
    GetAllUsersInChat,
    GetAllMessagesInChat,
    PostNewChat,
    DeleteChat,
    SendMessage,
    RemoveUserFromChat,
    InviteUserToChat,
    GetAllChatsForUser,
} from "../controllers/ChatController.js";

/*
List of functionality:
X Create a chat with a name and list of initial users e.g. POST /api/chats
X Delete a chat - DELETE /api/chats/43
X Get all the users in a chat, e.g. GET /api/chats/43/users
X Get all messages in a chat e.g. GET /api/chats/43/messages
X Send a message in a chat, e.g. POST /api/chats/32/messages
X Get all the chats for a user, e.g. GET /api/chats/users/gan@gmail.com
X Add user to a chat e.g. POST /api/chats/43/users
X Remove user from a chat e.g. DELETE /api/chats/43/users/gan@gmail.com
*/

router.post("/", PostNewChat);
router.delete("/:chatID", DeleteChat);
router.get("/:chatID/users", GetAllUsersInChat);
router.get("/users/:email", GetAllChatsForUser);
router.get("/:chatID/messages", GetAllMessagesInChat);
router.post("/:chatID/messages", SendMessage);
router.post("/:chatID/users/:email", InviteUserToChat);
router.delete("/:chatID/users/:email", RemoveUserFromChat);

export default router;
