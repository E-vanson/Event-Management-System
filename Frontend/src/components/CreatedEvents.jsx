import React, { useEffect, useState } from 'react';
import "../styles/createdEvents.css"

const CreatedEvents = () => {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch events from backend on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/event/getEvents");
        const data = await response.json();
        console.log("The Events Data....", data);
        setEvents(data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  console.log("Events length....", events);

  const handleView = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  const handleRegister = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:3000/event/register`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,
        },
        body: JSON.stringify({eventId: eventId}),
        credentials: 'include',
      });

      const data = await response.json()

      if (response.ok) {        
        setMessage('Event Registered successfully');
        alert(data.message);
      } else {
        setMessage('Failed to register the event');
        alert(data.message);
      }

      setModalVisible(false);
    } catch (error) {
      setMessage('Failed to register event');
      alert("Error Registering  Event");
    }
  };

  const handleDelete = (index) => {
    // Implement delete logic
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  const handleEdit = (index) => {
    // Implement edit logic
    console.log(`Edit event at index ${index}`);
  };

  return (
    <div className="event-list">
      <h2>Created Events</h2>

      {events.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Venue</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index}>
                <td>{event.name}</td>
                <td>{event.venue}</td>
                <td>{event.startDate}</td>
                <td>{event.endDate}</td>
                <td>
                  <button className="btn-primary" onClick={() => handleView(event)}>
                    View
                  </button>
                  {/* <button className="btn-secondary" onClick={() => handleEdit(index)}>
                    Edit
                  </button>
                  <button className="btn-danger" onClick={() => handleDelete(index)}>
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No events created yet. Start by adding a new event!</p>
      )}

      {/* Modal to show event details */}
      {modalVisible && selectedEvent && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedEvent.name}</h3>
            <p>{selectedEvent.description}</p>
            <p>{selectedEvent.venue}</p>
            <p>Start Date: {selectedEvent.startDate}</p>
            <p>End Date: {selectedEvent.endDate}</p>
            {selectedEvent.image && (
              <img src={URL.createObjectURL(selectedEvent.image)} alt="Event" />
            )}
            <div className="modal-actions">
              <button className="btn-secondary" onClick={handleCloseModal}>
                Close
              </button>
              <button className="btn-primary" onClick={() => handleRegister(selectedEvent.id)}>
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatedEvents;
