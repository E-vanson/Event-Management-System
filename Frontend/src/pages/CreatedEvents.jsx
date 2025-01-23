import React from 'react'
import EventList from '../components/EventList'
import useEvents from '../hooks/useEvents'
const CreatedEvents = () => {
  const { events, loading, error, createEvent, updateEvent, deleteEvent } = useEvents(
    "http://localhost:3000/event"
  );
  const handleEdit = (event) => {
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
  };
  return (
    <div>
      <EventList events={events} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  )
}

export default CreatedEvents
