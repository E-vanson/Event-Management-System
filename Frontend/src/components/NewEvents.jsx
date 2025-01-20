// Dashboard.jsx
import React, { useState } from "react";
import "../styles/home.css";
import HeroSection from "../components/HeroSection";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    image: null,
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedEvents = [...events];
      updatedEvents[editIndex] = formData;
      setEvents(updatedEvents);
      setEditIndex(null);
    } else {
      setEvents([...events, formData]);
    }
    setFormData({ title: "", description: "", date: "", time: "", image: null });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(events[index]);
  };

  const handleDelete = (index) => {
    const filteredEvents = events.filter((_, i) => i !== index);
    setEvents(filteredEvents);
  };

  return (
    
   <div className="dashboard-container">
      <h1>Event Management Dashboard</h1>

      {/* Event Form */}
      <form className="event-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Event Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter event title"
            value={formData.title}
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
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Event Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="btn-primary">
          {editIndex !== null ? "Update Event" : "Create Event"}
        </button>
      </form>

      {/* Event List */}
      <div className="event-list">
        <h2>Created Events</h2>
        {events.length > 0 ? (
          events.map((event, index) => (
            <div key={index} className="event-card">
              {event.image && (
                <img
                  src={URL.createObjectURL(event.image)}
                  alt="Event"
                  className="event-image"
                />
              )}
              <div className="event-details">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p>
                  Date: {event.date} | Time: {event.time}
                </p>
              </div>
              <div className="event-actions">
                <button className="btn-secondary" onClick={() => handleEdit(index)}>
                  Edit
                </button>
                <button className="btn-danger" onClick={() => handleDelete(index)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No events created yet. Start by adding a new event!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;


