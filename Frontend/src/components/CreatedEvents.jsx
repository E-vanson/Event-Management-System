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
        setEvents(data.events);
      } catch (error) {
        alert("Error Fetching Event");
      }
    };
    fetchEvents();
  }, []);

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
        <table className='table'>
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
                {console.log("The event", event)}
                <td>{event.name}</td>
                <td>{event.venue}</td>
                <td>{new Date(event.startDate).toLocaleString()}</td>
                <td>{new Date(event.endDate).toLocaleString()}</td>
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
            <h3>Event: {selectedEvent.name}</h3>
            <br></br>
            {console.log("The image path: ", selectedEvent.imagePath)}
            
            <img alt="Event Photo" src={`http://localhost:3000/assets/image-af105ca1-528d-43f6-b365-ead488d1f135-1737543534414.jpeg`} />
            <p><span className='bold'>Description:</span> {selectedEvent.description}</p>
            <p><span className='bold'>Venue:</span>{selectedEvent.venue}</p>
            <p><span className='bold'>Start Date And Time:</span>{new Date(selectedEvent.startDate).toLocaleString()}</p>
            <p><span className='bold'>End Date And Time:</span>{new Date(selectedEvent.endDate).toLocaleString()}</p>
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
