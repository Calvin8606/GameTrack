import express from "express";
import addProject from "../controllers/projects/addProject";
import { authToken } from "../middleware/auth";
import deleteProject from "../controllers/projects/deleteProject";
import getAllProjects from "../controllers/projects/getAllProjects";
import getProjectById from "../controllers/projects/getProjectById";
const router = express.Router();

router.post("/add-project", authToken, addProject);
router.delete("/delete-project:id", authToken, deleteProject);
router.get("/getAllProjects", authToken, getAllProjects);
router.get("/:id", authToken, getProjectById);

export default router;
