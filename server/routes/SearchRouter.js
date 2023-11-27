import express from "express";
import { GetAllTables, GetAllAttributesForTable } from "../controllers/SearchController.js";

const router = express.Router();

router.get("/tables", GetAllTables);
router.get("/tables/:tableName/attributes", GetAllAttributesForTable)

export default router;