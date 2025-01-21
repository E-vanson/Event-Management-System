import express from "express";
import { createEvent } from "../controllers/eventsController.js";
import { getEvents } from "../controllers/eventsController.js";
import { updateEvent } from "../controllers/eventsController.js";
import { deleteEvent } from "../controllers/eventsController.js";

const router = express.Router();

// router.post("/createEvent", createEvent);
router.get("/getEvents", getEvents);
// router.put("/updateEvent", updateEvent);
router.delete("/deleteEvent/:id", deleteEvent);

export default router;
