import express from "express";

const router = express.Router();

import { GetCommentById, GetCommentsOnPost, PostComment, DeleteComment, PutComment } from "../controllers/CommentController.js";

router.get("/:commentId", GetCommentById);
router.get("/post/:postId", GetCommentsOnPost);
router.post("/", PostComment);
router.put("/:commentId", PutComment)
router.delete("/:commentId", DeleteComment);

export default router;