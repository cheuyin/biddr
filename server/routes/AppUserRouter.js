import express from "express";

const router = express.Router();

import { GetAppUserByEmail, PostAppUser, PutAppUser, PutAppUserPassword, GetLocationAgeOfMajorityValues } from "../controllers/AppUserController.js";

router.get("/:email", GetAppUserByEmail);
router.post("/", PostAppUser);
router.put("/:email", PutAppUser);
router.put("/:email/password", PutAppUserPassword);
router.get("/locations", GetLocationAgeOfMajorityValues);

export default router;
