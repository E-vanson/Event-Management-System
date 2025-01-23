// src/components/EventList.jsx
import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "../styles/EventList.css"

const EventList = ({ events, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
  };

  const calculateStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) {
      const timeDiff = start - now; // Difference in milliseconds
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      return `Starts in ${hours} hrs ${minutes} mins`;
    } else if (now > end) {
      return "Ended";
    } else {
      return "Ongoing";
    }
  };

  return (
    <div className="event-list">
      {events.map((event) => (
        <div className="event-card" key={event.id}>
          <h3>{event.name}</h3>
          <p>{event.description}</p>
          <p>
            <strong>Venue:</strong> {event.venue}
          </p>
          <p>
            <strong>Start:</strong> {formatDate(event.startDate)}
          </p>
          <p>
            <strong>End:</strong> {formatDate(event.endDate)}
          </p>
          <p className={`event-status ${calculateStatus(event.startDate, event.endDate).toLowerCase()}`}>
            <strong>Status:</strong> {calculateStatus(event.startDate, event.endDate)}
          </p>
          <div className="event-actions">
            <button className="edit-btn" onClick={() => onEdit(event)}>
              <FaEdit /> Edit
            </button>
            <button className="delete-btn" onClick={() => onDelete(event.id)}>
              <FaTrashAlt /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
