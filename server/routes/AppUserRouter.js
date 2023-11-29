import express from "express";
import {
  GetAppUserByEmail,
  PostAppUser,
  ChangeAppUserInformation,
  ChangeAppUserPassword,
  GetLocationAgeOfMajorityValues,
  GetUserSubscribedCommunities,
} from "../controllers/AppUserController.js";
import {
  GetHomepagePostsForEmail,
  GetFilteredPostsForEmail,
  GetMostRecentPostsByUser,
} from "../controllers/PostController.js";
const router = express.Router();

router.get("/:email", GetAppUserByEmail);
router.get("/:email/subscribed-posts", GetHomepagePostsForEmail);
router.get("/:email/filtered-posts", GetFilteredPostsForEmail);
router.post("/", PostAppUser);
router.get("/:postedEmail/posts", GetMostRecentPostsByUser);
router.put("/:email", ChangeAppUserInformation);
router.put("/:email/password", ChangeAppUserPassword);
router.get("/locations", GetLocationAgeOfMajorityValues);
router.get("/:email/communities", GetUserSubscribedCommunities);

export default router;
