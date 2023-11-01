import { express } from "express";
const router = express.Router();
import { GetStudent } from "../controllers/StudentController";

router.get("/", GetStudent);

module.exports = router;
