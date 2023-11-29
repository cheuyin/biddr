import express from "express";

const router = express.Router();

import {
  GetCommunityByName,
  SearchCommunities,
} from "../controllers/CommunityController.js";
import { PutCommunity } from "../controllers/CommunityController.js";
import { PostCommunity } from "../controllers/CommunityController.js";
import { DeleteCommunity } from "../controllers/CommunityController.js";
import { UserJoinCommunity } from "../controllers/CommunityController.js";
import { UserLeaveCommunity } from "../controllers/CommunityController.js";
import { GetMostRecentPostsInCommunity } from "../controllers/PostController.js";

router.get("/:name", GetCommunityByName);
router.put("/:name", PutCommunity);
router.post("/", PostCommunity);
router.delete("/:name", DeleteCommunity);
router.post("/join", UserJoinCommunity);
router.post("/leave", UserLeaveCommunity);
router.get("/:name/posts", GetMostRecentPostsInCommunity);
router.post("/search", SearchCommunities);

export default router;
