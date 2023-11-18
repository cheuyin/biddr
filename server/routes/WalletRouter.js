import express from "express";

const router = express.Router();

import {
  DeleteWallet,
  PostWallet,
  PutWalletBalance,
} from "../controllers/WalletController.js";
import { GetAllWallets, GetWallet } from "../controllers/WalletController.js";
import verifyJWT from "../middleware/verifyJWT.js";
import {
  GetAllBidsForWallet,
  GetAllDonationsForWallet,
} from "../controllers/TransactionController.js";

router.use(verifyJWT);

router.post("/", PostWallet);
router.delete("/", DeleteWallet);
router.get("/:email/:name", GetWallet);
router.get("/:email", GetAllWallets);
router.put("/:email/:name", PutWalletBalance);
router.get("/:email/:name/bids", GetAllBidsForWallet);
router.get("/:email/:name/donations", GetAllDonationsForWallet);

export default router;
