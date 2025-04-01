import express from "express";
import addUser from "../controllers/users/addUser";
import userLogin from "../controllers/users/userLogin";
import {
  authToken,
  validateLogin,
  validateRegistered,
} from "../middleware/auth";
const router = express.Router();

router.post("/register", validateRegistered, addUser);
router.get("/login", validateLogin, userLogin);

export default router;
