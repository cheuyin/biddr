import express from "express";
import { GetAppUserByEmail, PostAppUser, ChangeAppUserInformation, ChangeAppUserPassword, GetLocationAgeOfMajorityValues, GetUserSubscribedCommunities } from "../controllers/AppUserController.js";
const router = express.Router();

router.get("/:email", GetAppUserByEmail);
router.post("/", PostAppUser);
router.put("/:email", ChangeAppUserInformation);
router.put("/:email/password", ChangeAppUserPassword);
router.get("/locations", GetLocationAgeOfMajorityValues);
router.get("/:email/communities", GetUserSubscribedCommunities)

export default router;
