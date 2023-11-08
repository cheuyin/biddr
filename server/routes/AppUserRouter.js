import express from "express";

const router = express.Router();

import { GetAppUserByEmail, PostAppUser, PutAppUser, PutAppUserPassword } from "../controllers/AppUserController.js";

router.get("/:email", GetAppUserByEmail);
router.post("/", PostAppUser);
router.put("/:email", PutAppUser);
router.put("/:email/password", PutAppUserPassword)

export default router;
