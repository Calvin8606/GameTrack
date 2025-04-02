import express from "express";
import addProject from "../controllers/projects/addProject";
import { authToken } from "../middleware/auth";
const router = express.Router();

router.post("/add-project:id", authToken, addProject);

export default router;
