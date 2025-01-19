import express from 'express';
import { createUser } from '../controllers/userController.js';
import { getUsers } from '../controllers/userController.js';
import { updateUser } from '../controllers/userController.js';
import { deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.post("/createUser", createUser);
router.get("/getUsers", getUsers);
router.put("/updateUser", updateUser);
router.delete("/deleteUser", deleteUser)

export default router;