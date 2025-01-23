import React from "react";
import { FaCalendarAlt, FaTrashAlt } from "react-icons/fa";
import "../styles/PastEvents.css";

const PastEvents = ({ events = [], handleReschedule, handleDelete }) => {
  const today = new Date();

  // Filter events with a past date
  const pastEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate < today;
  });

  return (
    <div className="past-events-container">
      <h1 className="past-events-title">Past Events</h1>
      {pastEvents.length > 0 ? (
        <div className="event-list">
          {pastEvents.map((event, index) => (
            <div key={index} className="event-card">
              {event.image && (
                <img
                  src={URL.createObjectURL(event.image)}
                  alt="Event"
                  className="event-image"
                />
              )}
              <div className="event-details">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>
                <p className="event-meta">
                  <strong>Date:</strong> {event.date} | <strong>Time:</strong> {event.time}
                </p>
              </div>
              <div className="event-actions">
                <button
                  className="icon-button reschedule-button"
                  onClick={() => handleReschedule(index)}
                >
                  <FaCalendarAlt /> Reschedule
                </button>
                <button
                  className="icon-button delete-button"
                  onClick={() => handleDelete(index)}
                >
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-events-message">No past events found!</p>
      )}
    </div>
  );
};

export default PastEvents;

