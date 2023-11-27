import express from "express";
import {
    GetAllTables,
    GetAllAttributesForTable,
    GetSelectAttributesForTable
} from "../controllers/SearchController.js";

const router = express.Router();

router.get("/tables", GetAllTables);
router.get("/tables/:tableName/attributes", GetAllAttributesForTable);
router.get("/tables/:tableName", GetSelectAttributesForTable);

export default router;
