import express from "express";
import {
  DeletePost,
  GetPost,
  PostPost,
} from "../controllers/PostController.js";
import { CancelPost } from "../services/PostTable.js";

const router = express.Router();

// router.get("/:email/:name", GetWallet);
router.get("/:postId", GetPost);
router.post("/", PostPost);
router.delete("/:postId", DeletePost);

export default router;
