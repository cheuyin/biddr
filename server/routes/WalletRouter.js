import express from "express";

const router = express.Router();

import { DeleteWallet, PostWallet } from "../controllers/WalletController.js";

router.post("/", PostWallet);
router.delete("/", DeleteWallet);

export default router;
