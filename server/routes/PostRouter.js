import express from "express";
import {
  DeletePost,
  GetPost,
  PostPost,
} from "../controllers/PostController.js";
import { CancelPost } from "../services/PostTable.js";
import {
  GetAllBidsForAuction,
  GetAllDonationsForFundraiser,
  GetHighestBidValueForAuction,
} from "../controllers/TransactionController.js";

const router = express.Router();

// router.get("/:email/:name", GetWallet);
router.get("/:postId", GetPost);
router.post("/", PostPost);
router.delete("/:postId", DeletePost);
router.get("/:postId/bids", GetAllBidsForAuction);
router.get("/:postId/bids/highest", GetHighestBidValueForAuction);
router.get("/:postId/donations", GetAllDonationsForFundraiser);

export default router;
