import express from "express";

const router = express.Router();

import { GetCommunityByName } from "../controllers/CommunityController.js";
import { GetCommunityPosts } from "../controllers/CommunityController.js";

router.get("/:name", GetCommunityByName);
router.get("/:name/posts", GetCommunityPosts);

export default router;
