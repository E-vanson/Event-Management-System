
import React, { useState } from "react";
import useEvents from "../hooks/useEvents";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import "../styles/CreatedEvents.css";
import Carousel from "../components/carousel";

const Dashboard = () => {
  const { events, loading, error, createEvent, updateEvent, deleteEvent } = useEvents(
    "http://localhost:3000/event"
  );
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    venue: "",
    startDate: "",
    endDate: "",
    image: null,
  });
  const [editId, setEditId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("description", formData.description);
    formPayload.append("venue", formData.venue);
    formPayload.append("startDate", formData.startDate);
    formPayload.append("endDate", formData.endDate);
    if (formData.image) formPayload.append("image", formData.image);

    if (editId) {
      await updateEvent(editId, formPayload);
    } else {
      await createEvent(formPayload);
    }

    setFormData({
      name: "",
      description: "",
      venue: "",
      startDate: "",
      endDate: "",
      image: null,
    });
    setEditId(null);
  };
//used when event listing is required
  {/*const handleEdit = (event) => {
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

  const handleDelete = async (eventId) => {
    await deleteEvent(eventId);
  };*/}

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="dashboard">
      <Carousel/>
      
      <EventForm
        formData={formData}
        onInputChange={handleInputChange}
        onImageChange={handleImageChange}
        onSubmit={handleSubmit}
        editMode={!!editId}
      />
      {/* Event List */}
      {/*<EventList events={events} onEdit={handleEdit} onDelete={handleDelete} />*/}
    </div>
  );
};

export default Dashboard;
