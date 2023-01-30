import { register, login, updateUser } from "../controllers/authController.js";
import authmiddleware from "../middleware/auth.js";
import express from "express";
const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateUser").patch(authmiddleware, updateUser);
export default router;
