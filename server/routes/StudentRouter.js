import express from "express";

const router = express.Router();

import { GetStudentByID } from "../controllers/StudentController.js";

router.get("/:id", GetStudentByID);

export default router;
