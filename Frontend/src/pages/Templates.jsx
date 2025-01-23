
import React from "react";
import { FaTrashAlt, FaHeart } from "react-icons/fa";
import "../styles/FavoriteEvents.css";

const FavoriteEvents = ({ favoriteEvents = [], toggleFavorite, handleDelete }) => {
  return (
    <div className="favorite-events-container">
      <h1 className="favorite-events-title">Favorite Events</h1>
      {favoriteEvents.length > 0 ? (
        <div className="event-list">
          {favoriteEvents.map((event, index) => (
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
                  className="icon-button favorite-button"
                  onClick={() => toggleFavorite(index)}
                >
                  <FaHeart color="red" />
                </button>
                <button
                  className="icon-button delete-button"
                  onClick={() => handleDelete(index)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-events-message">No favorite events yet. Start by adding some favorites!</p>
      )}
    </div>
  );
};

export default FavoriteEvents;
