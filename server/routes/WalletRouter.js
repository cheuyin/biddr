import express from "express";

const router = express.Router();

import {
  DeleteWallet,
  PostWallet,
  PutWalletBalance,
} from "../controllers/WalletController.js";
import { GetAllWallets, GetWallet } from "../controllers/WalletController.js";

router.post("/", PostWallet);
router.delete("/", DeleteWallet);
router.get("/:email/:name", GetWallet);
router.get("/:email", GetAllWallets);
router.put("/:email/:name", PutWalletBalance);

export default router;
