import express from "express";

const router = express.Router();

import { GetBid, PostBid } from "../controllers/TransactionController.js";

router.post("/", PostBid);
router.get("/:bidId", GetBid);

export default router;
