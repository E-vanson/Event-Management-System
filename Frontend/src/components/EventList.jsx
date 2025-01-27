import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash, FiEye } from "react-icons/fi";
import { MdStar, MdStarOutline } from "react-icons/md"; // Material Design icons
import useEvents from "../hooks/useEvents";
import { format, formatDistance, parseISO } from "date-fns";
import "../styles/eventList.css";

const EventsList = () => {
  const navigate = useNavigate();
  const apiUrl = "http://localhost:3000/event"; // Backend API URL
  const { events = [], loading, error, deleteEvent, updateEvent } = useEvents(apiUrl);
  const [favorites, setFavorites] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const cardRefs = useRef([]);

  const handleEdit = (id) => {
    navigate(`/edit-event/${id}`);
  };

  const handleDelete = async () => {
    if (selectedEventId) {
      await deleteEvent(selectedEventId); // Assuming deleteEvent is a function from the hook
      setShowModal(false); // Close the modal after deletion
    }
  };

  const handleView = (id) => navigate(`/view-event/${id}`);

  const toggleFavorite = (id) =>
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));

  const getEventStatus = (startDate, endDate) => {
    const now = new Date();
    const start = parseISO(startDate);
    const end = parseISO(endDate);

    if (now < start) {
      const duration = formatDistance(now, start, { addSuffix: true });
      return { status: `Upcoming in ${duration}`, className: "status-upcoming" };
    }
    if (now >= start && now <= end) {
      const startedAt = format(start, "hh:mm a");
      return { status: `Started at ${startedAt}`, className: "status-started" };
    }
    const durationAgo = formatDistance(end, now, { addSuffix: true });
    return { status: `Ended: ${durationAgo}`, className: "status-ended" };
  };

  const openModal = (id) => {
    setSelectedEventId(id);
    setShowModal(true); // Show the confirmation modal
  };

  const closeModal = () => setShowModal(false);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="events-list">
      {events.length === 0 ? (
        <div className="no-events">No events available</div>
      ) : (
        events.map((event, index) => {
          let fixedImagePath = event.imagePath.replace(/\\/g, "/");
          fixedImagePath = fixedImagePath.replace(/^public\//, "");
          const imageUrl = `http://localhost:3000/${fixedImagePath}`;
          const { status, className } = getEventStatus(event.startDate, event.endDate);

          return (
            <div key={event.id} className="event-card" ref={(el) => (cardRefs.current[index] = el)}>
              <img src={imageUrl} alt={event.name} className="event-image" />
              <div className="event-info">
                <h3 className="event-name">{event.name}</h3>
                <p className="event-description">{event.description}</p>
                <div className={`event-status ${className}`}>{status}</div>
              </div>
              <div className="event-actions">
                <div className="favorite-icon" onClick={() => toggleFavorite(event.id)}>
                  {favorites[event.id] ? <MdStar /> : <MdStarOutline />}
                </div>
                <div className="action-buttons">
                  <button className="action-button edit-button" onClick={() => handleEdit(event.id)}>
                    <FiEdit /> Edit
                  </button>
                  <button className="action-button delete-button" onClick={() => openModal(event.id)}>
                    <FiTrash /> Delete
                  </button>
                  <button className="action-button view-button" onClick={() => handleView(event.id)}>
                    <FiEye /> View
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}

      {/* Modal for Confirming Deletion */}
      {showModal && (
        <div className="modal active">
          <div className="modal-content">
            <h3>Are you sure you want to delete this event?</h3>
            <div className="modal-buttons">
              <button className="modal-button confirm" onClick={handleDelete}>
                Confirm
              </button>
              <button className="modal-button cancel" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsList;
