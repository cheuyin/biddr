import express from "express";
import LogoutController from "../controllers/LogoutController.js";

const router = express.Router();

router.put("/", LogoutController);

export default router;
