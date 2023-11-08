import express from "express";

const router = express.Router();

import { GetCommunityByName } from "../controllers/CommunityController.js";
import { GetCommunityPosts } from "../controllers/CommunityController.js";
import { PutCommunity } from "../controllers/CommunityController.js";
import { PostCommunity } from "../controllers/CommunityController.js";
import { DeleteCommunity } from "../controllers/CommunityController.js";

router.use(express.json()); // Add this line to parse JSON data

router.get("/:name", GetCommunityByName);
router.get("/:name/posts", GetCommunityPosts);
router.put("/:name", PutCommunity);
router.post("/", PostCommunity);
router.delete("/:name", DeleteCommunity);

export default router;
