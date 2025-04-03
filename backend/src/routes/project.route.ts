import express from "express";
import addProject from "../controllers/projects/addProject";
import { authToken } from "../middleware/auth";
import deleteProject from "../controllers/projects/deleteProject";
const router = express.Router();

router.post("/add-project", authToken, addProject);
router.delete("/delete-project:id", authToken, deleteProject);

export default router;
