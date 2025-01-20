import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaHeart, FaRegHeart } from "react-icons/fa";
import "../styles/UpcomingEvents.css";

const CreatedEvents = ({ events = [], handleEdit, handleDelete, toggleFavorite }) => {
  return (
    <div className="created-events-container">
      <h1 className="created-events-title">Created Events</h1>
      {events.length > 0 ? (
        <div className="event-list">
          {events.map((event, index) => (
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
                  className="icon-button edit-button"
                  onClick={() => handleEdit(index)}
                >
                  <FaEdit />
                </button>
                <button
                  className="icon-button delete-button"
                  onClick={() => handleDelete(index)}
                >
                  <FaTrashAlt />
                </button>
                <button
                  className="icon-button favorite-button"
                  onClick={() => toggleFavorite(index)}
                >
                  {event.isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-events-message">No events created yet. Start by adding a new event!</p>
      )}
    </div>
  );
};

export default CreatedEvents;
