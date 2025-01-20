import express from "express";
import { login } from "../controllers/authController.js";
import { register } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
