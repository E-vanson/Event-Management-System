import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Event from '../models/eventModel.js';

export const createEvent = async (req, res) => {

    try {
        console.log("The create event controller:....")
      const { name, venue, startDate, endDate, description } = req.body;
      console.log("The file....", req?.file);
        const image = req?.file
        console.log("The imageeee....", image);
    //    let token;
    
        //    token = req.cookies.AuthSession;
        
        let token = req.header("Authorization");
        if (token.startsWith("Bearer ")) {
          token = token.slice(7, token.length).trimLeft();
        }
        console.log("The user tokenn:....", token);
         if (!token) {
           return res
             .status(401)
             .json({ message: "Unauthorized: No token provided!!" });
         }
        console.log("The user token:....", token); 
        const decoded = jwt.verify(
          token,
          (process.env.JWT_SECRET)
        );
        console.log("The decoded:....", decoded);
        const user = await User.findByPk(decoded.userId);
        if (!user) {
            return res
             .status(401)
             .json({ message: "Unauthorized: No User Found!!" });
        }

        const newEvent = await Event.create({
            name: name,
            venue: venue,
            startDate: startDate,
            endDate: endDate,
            description: description,
            createdBy: user.id,
            imagePath: req?.file?.path || null
        });
        return res.status(201).json({
          message: "Event created successfully",
          event: newEvent,
        });
    } 
     catch (error) {
        return res.status(500).json({message: "Error creating event:!! ", error: error.message});
    }
    }

export const getEvents = async (req, res) => {
    try {
      const events = await Event.findAll();

      if (events.length > 0) {
        return res.status(200).json({ events: events });
      } else {
        return res
          .status(200)
          .json({ message: "No events Found", events: events });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Error Fetching events!!: ",
        error: err.message,
      });
    }
}

export const updateEvent = async (req, res) => {
  console.log("The update event controller:....");
  const { name,venue, startDate, endDate, description } = req.body;
  const {id} = req.params


  const eventUpdate = {
    name: name,
    venue: venue,
    startDate: startDate,
    endDate: endDate,
    description: description,
    imagePath: req?.file?.path || null
  }

  try {
      console.log("The update event controller:....");
      const event = await Event.findByPk(id);

      if (!event) {
        return res.status(400).json({
          message: `Event to be updated does not exist`,
        });
      }
     
      await event.update(eventUpdate);
      console.log("Event updated successfully");
      return res
        .status(200)
        .json({ message: "Event updated Successfully", event: event });
    } catch (error) {
      return res.status(500).json({
        message: "Error updating event!!: ",
        error: err.message,
      });
    }
}

export const deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
      const event = await Event.findByPk(id);
      if (!event) {
        return res.status(400).json({
          message: `Event to be deleted not found`,
        });
      }

      await event.destroy();
      return res.status(200).json({ message: "Event deleted Successfully" });
    } catch (error) {
      return res.status(500).json({
        message: "Error Deleting Event!!: ",
        error: err.message,
      });
    }
}