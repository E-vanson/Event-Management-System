import React from "react";
import useEvents from "../hooks/useEvents";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "../styles/EventList.css"; // Make sure to import the styles if necessary

const UpcomingEvents = () => {
  const apiUrl = "http://localhost:3000/event"; // Set the correct API URL
  const { events, loading, error } = useEvents(apiUrl); // Using the hook to fetch events

  if (loading) return <p>Loading...</p>; // Display loading text
  if (error) return <p>{error}</p>; // Display any error

  // Filter upcoming events (those with start date in the future)
  const upcomingEvents = events.filter((event) => {
    const now = new Date();
    const startDate = new Date(event.startDate);
    return startDate > now; // Only upcoming events
  });

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
    <div className="upcoming-events-container">
      <h2>Upcoming Events</h2>
      {upcomingEvents.length === 0 ? (
        <p>No upcoming events found.</p>
      ) : (
        <div className="event-list">
          {upcomingEvents.map((event) => (
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
                <button className="edit-btn">
                  <FaEdit /> Edit
                </button>
                <button className="delete-btn">
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;
