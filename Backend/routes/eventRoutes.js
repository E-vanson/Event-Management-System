import express from "express";
import { createEvent, getEventById } from "../controllers/eventsController.js";
import { getEvents } from "../controllers/eventsController.js";
import { updateEvent } from "../controllers/eventsController.js";
import { deleteEvent } from "../controllers/eventsController.js";
import { verifyToken } from "../middleware/auth.js";
import { eventRegistration } from "../controllers/eventsController.js";


const router = express.Router();

router.post("/createEvent", createEvent);
router.get("/getEvents", getEvents);
router.put("/updateEvent", updateEvent);
router.delete("/deleteEvent/:id", verifyToken(["admin"]), deleteEvent);
router.post("/register", verifyToken(["admin", "user"]), eventRegistration);
router.get("/getEventById/:id", getEventById);

export default router; 
