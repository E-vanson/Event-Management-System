import express from 'express';
import { createUser } from '../controllers/userController.js';
import { getUsers } from '../controllers/userController.js';
import { updateUser } from '../controllers/userController.js';
import { deleteUser } from '../controllers/userController.js';
import { login } from '../controllers/authController.js';
import { logout } from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post("/createUser",createUser);
router.get("/getUsers", verifyToken(["admin"]), getUsers);
router.put("/updateUser", verifyToken(["admin"]), updateUser);
router.delete("/deleteUser", verifyToken(["admin"]), deleteUser);
router.post("/login", login);
router.post("/logout", verifyToken(["admin", "organizer", "attendee"]), logout);


export default router;