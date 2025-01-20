import React, { useState } from "react";
import "../styles/home.css";

const Dashboard = ({ addEvent }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent(formData); // Pass the new event to the parent
    setFormData({ title: "", description: "", date: "", time: "", image: null });
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
          Create Event
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
