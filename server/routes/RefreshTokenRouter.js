import express from "express";
import RefreshController from "../controllers/RefreshController.js";

const router = express.Router();

router.get("/", RefreshController);

export default router;
