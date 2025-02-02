import express from 'express';
import {
  GetAllTables,
  GetAllAttributesForTable,
  GetSelectAttributesForTable,
  GetUsersInAllChats,
} from '../controllers/SearchController.js';

const router = express.Router();

router.get('/tables', GetAllTables);
router.get('/tables/:tableName/attributes', GetAllAttributesForTable);
router.get('/tables/:tableName', GetSelectAttributesForTable);
router.get('/tables/:tableName', GetSelectAttributesForTable);
router.get('/division', GetUsersInAllChats);

export default router;
