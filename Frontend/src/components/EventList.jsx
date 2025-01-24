import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useEvents from "../hooks/useEvents";
import LoadingModal from "./LoadingModal";
import useImage from "../hooks/useImage"; // Import the useImage hook
import "../styles/EventList.css";

const EventList = () => {
  const { events, loading, error, createEvent, updateEvent, deleteEvent } = useEvents("http://localhost:3000/event");
  
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    venue: "",
    startDate: "",
    endDate: "",
    image: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null); // null = loading, true = success, false = failure

  // Handle editing an event
  const handleEdit = (event) => {
    setEditId(event.id);
    setFormData({
      name: event.name,
      description: event.description,
      venue: event.venue,
      startDate: event.startDate,
      endDate: event.endDate,
      image: null,
    });
  };

  // Handle deleting an event
  const handleDelete = async (eventId) => {
    setIsLoading(true);
    setMessage("Deleting event...");
    try {
      await deleteEvent(eventId);
      setIsSuccess(true);
      setMessage("Event deleted successfully!");
    } catch (error) {
      setIsSuccess(false);
      setMessage("Failed to delete event.");
    }
    setIsLoading(false);
  };

  // Handle form submission (Create/Update event)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("Submitting...");

    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("description", formData.description);
    formPayload.append("venue", formData.venue);
    formPayload.append("startDate", formData.startDate);
    formPayload.append("endDate", formData.endDate);
    if (formData.image) formPayload.append("image", formData.image);

    try {
      if (editId) {
        await updateEvent(editId, formPayload); // Update existing event
        setIsSuccess(true);
        setMessage("Event Updated Successfully!");
      } else {
        await createEvent(formPayload); // Create new event
        setIsSuccess(true);
        setMessage("Event Created Successfully!");
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage("Failed to submit event.");
    }

    setIsLoading(false);
  };

  // Handle loading or error states
  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error loading events: {error}</p>;

  return (
    <div>
      <LoadingModal
        isLoading={isLoading}
        message={message}
        isSuccess={isSuccess}
        onClose={() => setMessage("")} // Close modal when clicking "Close"
      />

      <div className="event-list">
        {events.map((event) => {
          const { imageUrl, isLoading: imageLoading, error: imageError } = useImage(event.imagePath); // Use the useImage hook

          return (
            <div className="event-card" key={event.id}>
              {imageLoading ? (
                <p>Loading image...</p>
              ) : imageError ? (
                <p>Image failed to load</p>
              ) : (
                <img src={imageUrl} alt={event.name} />
              )}
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              <p>
                <strong>Venue:</strong> {event.venue}
              </p>
              <p>
                <strong>Start:</strong> {new Date(event.startDate).toLocaleString()}
              </p>
              <p>
                <strong>End:</strong> {new Date(event.endDate).toLocaleString()}
              </p>
              <p className={`event-status ${event.status ? event.status.toLowerCase() : "unknown"}`}>
                <strong>Status:</strong> {event.status || "Unknown"}
              </p>
              <div className="event-actions">
                <button className="edit-btn" onClick={() => handleEdit(event)}>
                  <FaEdit /> Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(event.id)}>
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Event Form for Create or Edit */}
      <div className="event-form-container">
        <h3>{editId ? "Edit Event" : "Create New Event"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Event Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Venue</label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Start Date</label>
            <input
              type="datetime-local"
              name="startDate"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>End Date</label>
            <input
              type="datetime-local"
              name="endDate"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Event Image</label>
            <input
              type="file"
              name="image"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
            />
            {formData.image && (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Preview"
                className="image-preview"
              />
            )}
          </div>

          <button type="submit">{editId ? "Update Event" : "Create Event"}</button>
        </form>
      </div>
    </div>
  );
};

export default EventList;
