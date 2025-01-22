import React, { useState, useEffect } from "react";
import "../styles/home.css";
import { motion } from "framer-motion";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import moment from "moment";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    venue: "",
    description: "",
    startDate: "",
    endDate: "",
    image: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  // Fetch Events from Backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/event/getEvents");
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Input Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newFormData = new FormData();
      newFormData.append("name", formData.name);
      newFormData.append("venue", formData.venue);
      newFormData.append("startDate", formData.startDate);
      newFormData.append("endDate", formData.endDate);
      newFormData.append("description", formData.description);

      if (formData.image) {
        newFormData.append("image", formData.image);
      }

      let response;
      if (editIndex === null) {
        response = await fetch("http://localhost:3000/event/createEvent", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
          },
          body: newFormData,
          credentials: "include",
        });
      } else {
        const eventId = events[editIndex].id;
        response = await fetch(`http://localhost:3000/event/updateEvent/${eventId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
          },
          body: newFormData,
          credentials: "include",
        });
      }

      if (response.ok) {
        setMessage("Event submitted successfully!");
        const updatedEvents = [...events];
        if (editIndex !== null) {
          updatedEvents[editIndex] = { ...formData, id: events[editIndex].id };
          setEvents(updatedEvents);
          setEditIndex(null);
        } else {
          setEvents([...events, formData]);
        }
      } else {
        setMessage("Error creating or updating event!");
      }
    } catch (error) {
      setMessage(error.message || "An error occurred creating or updating the event");
    }

    setFormData({ name: "", venue: "", description: "", startDate: "", endDate: "", image: null });
    setFormVisible(false);
  };

  // Delete Event
  const confirmDelete = async () => {
    if (eventToDelete === null) return;

    const eventId = events[eventToDelete].id;
    try {
      const response = await fetch(`http://localhost:3000/event/deleteEvent/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        setEvents(events.filter((_, i) => i !== eventToDelete));
        setMessage("Event deleted successfully");
      } else {
        setMessage("Failed to delete the event");
      }
    } catch (error) {
      setMessage(error.message || "An error occurred while deleting the event");
    } finally {
      setShowConfirmation(false);
    }
  };

  // Utility Functions
  const calculateDuration = (startDate, endDate) => {
    const start = moment(startDate);
    const end = moment(endDate);
    const duration = moment.duration(end.diff(start));
    return duration.asMilliseconds() < 0 ? "Event has ended" : `${duration.hours()} hrs ${duration.minutes()} mins`;
  };

  const getEventStatus = (startDate, endDate) => {
    const now = moment();
    if (now.isBefore(moment(startDate))) return `Starts in ${moment(startDate).fromNow()}`;
    if (now.isBetween(moment(startDate), moment(endDate), null, "[)")) return "Ongoing";
    return "Ended";
  };

  return (
    <div className="dashboard-container">
      <h1>Event Management Dashboard</h1>

      <button className="btn-primary" onClick={() => setFormVisible(true)}>
        Add Event
      </button>

      {formVisible && (
        <form className="event-form" onSubmit={handleSubmit}>
          <button type="button" className="btn-close" onClick={() => setFormVisible(false)}>
            X
          </button>
          <div className="form-group">
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter event name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter event description"
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="datetime-local"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="datetime-local"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={formData.venue}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="imagePath">Event Image</label>
            <input
              type="file"
              id="imagePath"
              name="imagePath"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit" className="btn-primary">
            {editIndex !== null ? "Update Event" : "Create Event"}
          </button>
        </form>
      )}

      {message && <p className="feedback">{message}</p>}

      <h2>Created Events</h2>
      <div className="event-list">
        {events.map((event, index) => (
          <motion.div
            key={index}
            className="event-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {event.image && <img src={URL.createObjectURL(event.image)} alt="Event" className="event-image" />}
            <motion.div
              className="event-details"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3>{event.name}</h3>
              <div className="event-info">
                <p>
                  <strong>Description:</strong> {event.description}
                </p>
                <p>
                  <strong>Venue:</strong> {event.venue}
                </p>
                <p>
                  <strong>Event Duration:</strong> {calculateDuration(event.startDate, event.endDate)}
                </p>
                <p className="countdown">
                  <strong>Status:</strong> {getEventStatus(event.startDate, event.endDate)}
                </p>
              </div>
            </motion.div>
            <div className="event-actions">
              <button className="btn-secondary" onClick={() => console.log("Edit")}>
                <FaEdit /> Edit
              </button>
              <button className="btn-danger" onClick={() => setShowConfirmation(true)}>
                <FaTrashAlt /> Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
