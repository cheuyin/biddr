import express from "express";

const router = express.Router();

import {
  GetAppUserByEmail,
  PostAppUser,
} from "../controllers/AppUserController.js";
import { GetMostRecentPostsByUser } from "../controllers/PostController.js";

router.get("/:email", GetAppUserByEmail);
router.post("/", PostAppUser);
router.get("/:postedEmail/posts", GetMostRecentPostsByUser);

export default router;
