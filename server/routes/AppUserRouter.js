import express from "express";

const router = express.Router();

import { GetAppUserByEmail, PostAppUser } from "../controllers/AppUserController.js";

router.get("/:email", GetAppUserByEmail);
router.post("/", PostAppUser);

export default router;
