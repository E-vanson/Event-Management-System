// Dashboard.jsx
import React, { useState, useEffect } from "react";
import "../styles/home.css";
import HeroSection from "../components/HeroSection";

// const Dashboard = () => {
//   const [events, setEvents] = useState([]);
//   const [message, setMessage] = useState("");
//   const [formData, setFormData] = useState({
//     name: "",
//     venue: "",
//     description: "",
//     startDate: "",
//     endDate: "",   
//     image: "",
//   });
//   const [editIndex, setEditIndex] = useState(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (editIndex !== null) {
//       const updatedEvents = [...events];
//       updatedEvents[editIndex] = formData;
//       setEvents(updatedEvents);
//       setEditIndex(null);
//     } else {
//       setEvents([...events, formData]);
//     }

//     try {
//       const response = await fetch("http://localhost:3000/event/createEvent", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify(formData), 
//         });

//         if (response.ok) {
//           setMessage("Event Added successfully!");          
//         } else {
//            setMessage(`Login failed!!`);
//         }
//     } catch (error) {
//       setMessage(
//           error.message || "An error occurred creating an event"
//         );  
//     }
//     setFormData({ title: "", description: "", date: "", time: "", image: null });
//   };

//   console.log("The formdata: ", formData)
//   const handleEdit = (index) => {
//     setEditIndex(index);
//     setFormData(events[index]);
//   };

//   const handleDelete = (index) => {
//     const filteredEvents = events.filter((_, i) => i !== index);
//     setEvents(filteredEvents);
//   };

//   return (
    
//   //  <div className="dashboard-container">
//   //     <h1>Event Management Dashboard</h1>

//   //     {/* Event Form */}
//   //     <form className="event-form" onSubmit={handleSubmit}>
//   //       <div className="form-group">
//   //         <label htmlFor="name">Event Name</label>
//   //         <input
//   //           type="text"
//   //           id="name"
//   //           name="name"
//   //           placeholder="Enter event name"
//   //           value={formData.name}
//   //           onChange={handleInputChange}
//   //           required
//   //         />
//   //       </div>
//   //       <div className="form-group">
//   //         <label htmlFor="description">Description</label>
//   //         <textarea
//   //           id="description"
//   //           name="description"
//   //           placeholder="Enter event description"
//   //           value={formData.description}
//   //           onChange={handleInputChange}
//   //           required
//   //         ></textarea>
//   //       </div>
//   //       <div className="form-group">
//   //         <label htmlFor="startDate">Start Date</label>
//   //         <input
//   //           type="date"
//   //           id="startDate"
//   //           name="startDate"
//   //           value={formData.startDate}
//   //           onChange={handleInputChange}
//   //           required
//   //         />
//   //       </div>
//   //       <div className="form-group">
//   //         <label htmlFor="endDate">End Date</label>
//   //         <input
//   //           type="date"
//   //           id="endDate"
//   //           name="endDate"
//   //           value={formData.endDate}
//   //           onChange={handleInputChange}
//   //           required
//   //         />
//   //       </div>
//   //       <div className="form-group">
//   //         <label htmlFor="venue">Venue</label>
//   //         <input
//   //           type="venue"
//   //           id="venue"
//   //           name="venue"
//   //           value={formData.venue}
//   //           onChange={handleInputChange}
//   //           required
//   //         />
//   //       </div>
//   //       <div className="form-group">
//   //         <label htmlFor="image">Event Image</label>
//   //         <input
//   //           type="file"
//   //           id="image"
//   //           name="image"
//   //           accept="image/*"
//   //           onChange={handleImageChange}
//   //         />
//   //       </div>
//   //       <button type="submit" className="btn-primary">
//   //         {editIndex !== null ? "Update Event" : "Create Event"}
//   //       </button>
//   //     </form>
//   //     {message && <p className="feedback">{message}</p>}

//   //     {/* Event List */}
//   //     <div className="event-list">
//   //       <h2>Created Events</h2>
//   //       {events.length > 0 ? (
//   //         events.map((event, index) => (
//   //           <div key={index} className="event-card">
//   //             {event.image && (
//   //               <img
//   //                 src={URL.createObjectURL(event.image)}
//   //                 alt="Event"
//   //                 className="event-image"
//   //               />
//   //             )}
//   //             <div className="event-details">
//   //               <h3>{event.title}</h3>
//   //               <p>{event.description}</p>
//   //               <p>
//   //                 Date: {event.date} | Time: {event.time}
//   //               </p>
//   //             </div>
//   //             <div className="event-actions">
//   //               <button className="btn-secondary" onClick={() => handleEdit(index)}>
//   //                 Edit
//   //               </button>
//   //               <button className="btn-danger" onClick={() => handleDelete(index)}>
//   //                 Delete
//   //               </button>
//   //             </div>
//   //           </div>
//   //         ))
//   //       ) : (
//   //         <p>No events created yet. Start by adding a new event!</p>
//   //       )}
//   //     </div>
//     //   </div>
    
    

//   );
// };

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    venue: "",
    description: "",
    startDate: "",
    endDate: "",   
    image: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [formVisible, setFormVisible] = useState(false);  // New state for form visibility
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const newFormData = new FormData();
      newFormData.append("name", formData.name);
      newFormData.append("venue", formData.venue);
      newFormData.append("startDate", formData.startDate);
      newFormData.append("endDate", formData.endDate);
      newFormData.append("description", formData.description);

      if (formData.image) {
      newFormData.append("image", formData.image);  // Use 'image' here
    }

      let response;
    if (editIndex === null) {      
      response = await fetch("http://localhost:3000/event/createEvent", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
        },
        body: newFormData,
        credentials: "include",
      });
    } else {    
      console.log("I am here")  
      const eventId = events[editIndex].id; // Assuming each event has a unique '_id'
      console.log("I am here", eventId)  
      response = await fetch(`http://localhost:3000/event/updateEvent/${eventId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
        },
        body: newFormData,
        credentials: "include",
      });
    }
      
       console.log("I am here now", response) 
        if (response.ok) {
          setMessage("Event submitted successfully!");
      if (editIndex !== null) {
        // Update the event in local state
        const updatedEvents = [...events];
        updatedEvents[editIndex] = { ...formData, id: events[editIndex].id }; // Preserve the event ID
        setEvents(updatedEvents);
        setEditIndex(null); // Reset edit index
      }else {
            setEvents([...events, formData]);
        }
        } else {
           setMessage(`Error Creating Event!!`);
        }
    } catch (error) {
      setMessage(
          error.message || "An error occurred creating an event"
        );  
    }
    setFormData({ name: "", venue: "", description: "", startDate: "", endDate: "", image: null });
    setFormVisible(false); // Hide the form after submission
  };

  const openConfirmationDialog = (index) => {
  setEventToDelete(index);
  setShowConfirmation(true);
};

// Close confirmation dialog
const closeConfirmationDialog = () => {
  setEventToDelete(null);
  setShowConfirmation(false);
};

// Confirm delete and call backend
const confirmDelete = async () => {
  if (eventToDelete === null) return;

  const eventId = events[eventToDelete].id; // Assuming each event has a unique ID
  try {
    const response = await fetch(`http://localhost:3000/event/deleteEvent/${eventId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,
      },
      credentials: 'include',
    });

    if (response.ok) {
      setEvents(events.filter((_, i) => i !== eventToDelete));
      setMessage('Event deleted successfully');
    } else {
      setMessage('Failed to delete the event');
    }
  } catch (error) {
    setMessage(error.message || 'An error occurred while deleting the event');
  } finally {
    closeConfirmationDialog(); // Close the modal
  }
};


  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(events[index]);
    setFormVisible(true); // Show the form when editing
  };

  // const handleDelete = (index) => {
  //   const filteredEvents = events.filter((_, i) => i !== index);
  //   setEvents(filteredEvents);
  // };

  // Show form when "Add Event" button is clicked
  const handleAddEventClick = () => {
    setFormVisible(true);
    setEditIndex(null); // Reset editIndex when adding new event
    setFormData({ name: "", venue: "", description: "", startDate: "", endDate: "", image: null }); // Clear form
  };

  const handleCloseForm = () => {
    setFormVisible(false);  // Hide the form when the close button is clicked
  };

  return (
    <div className="dashboard-container">
      <h1>Event Management Dashboard</h1>

      {/* Add Event Button */}
      <button className="btn-primary" onClick={handleAddEventClick}>
        Add Event
      </button>

      {/* Event Form (Visible when formVisible is true) */}
      {formVisible && (
        <form className="event-form" onSubmit={handleSubmit}>
          <button type="button" className="btn-close" onClick={handleCloseForm}>
            X
          </button>
          <div className="form-group">
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter event name"
              value={formData.name}
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
            <label htmlFor="startDate">Start Date</label>
            <input
              type="datetime-local"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="datetime-local"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              min={formData.startDate}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={formData.venue}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="imagePath">Event Image</label>
            <input
              type="file"
              id="imagePath"
              name="imagePath"
              accept="image/*"
              onChange={handleImageChange}
            />
            {formData.image && <p>{formData.image.name}</p>}
          </div>
          <button type="submit" className="btn-primary">
            {editIndex !== null ? "Update Event" : "Create Event"}
          </button>
          {/* <button type="submit" className="btn-primary">
            "Cancel" 
          </button> */}
        </form>
      )}

      {message && <p className="feedback">{message}</p>}

      {/* Event List */}
      <div className="event-list">
        <h2>Created Events</h2>
        {events.length > 0 ? (
          events.map((event, index) => (
            <div key={index} className="event-card">
              {event.image && (
                <img
                  src={URL.createObjectURL(event.image)}
                  alt="Event"
                  className="event-image"
                />
              )}
              <div className="event-details">
                <h3>{event.name}</h3> {/* Changed from title to name */}
                <p>{event.description}</p>
                <p>
                  Date: {event.startDate} | End Date: {event.endDate}
                </p>
              </div>
              <div className="event-actions">
                <button className="btn-secondary" onClick={() => handleEdit(index)}>
                  Edit
                </button>
                <button className="btn-danger" onClick={() => openConfirmationDialog(index)}>
                  Delete
                </button>

                {showConfirmation && (
  <div className="confirmation-modal">
    <div className="modal-content">
      <h3>Are you sure you want to delete this event?</h3>
      <div className="modal-actions">
        <button className="btn-primary" onClick={confirmDelete}>
          Yes, Delete
        </button>
        <button className="btn-secondary" onClick={closeConfirmationDialog}>
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
              </div>
            </div>
          ))
        ) : (
          <p>No events created yet. Start by adding a new event!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;


// export default Dashboard;


