// src/hooks/useEvents.js
import { useState, useEffect } from "react";

const useEvents = (apiUrl) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/getEvents`);
      const data = await response.json();
      console.log("Fetched Events:", data.events); // Log the data here
      setEvents(data.events || []);
      setError(null);
    } catch (err) {
      setError("Error fetching events");
    } finally {
      setLoading(false);
    }
  };
  

  const createEvent = async (formData) => {
    try {
      const response = await fetch(`${apiUrl}/createEvent`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        const newEvent = await response.json();
        setEvents((prev) => [...prev, newEvent]);
        setError(null);
      } else {
        const errorDetails = await response.json();
        throw new Error(errorDetails.message || "Failed to create event");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  

  const updateEvent = async (eventId, formData) => {
    try {
      const response = await fetch(`${apiUrl}/updateEvent/${eventId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: formData,
      });
  
      if (response.ok) {
        const updatedEvent = await response.json();
        setEvents((prev) =>
          prev.map((event) =>
            event.id === eventId ? { ...event, ...updatedEvent } : event
          )
        );
        setError(null);
      } else {
        throw new Error("Failed to update event");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  

  const deleteEvent = async (eventId) => {
    try {
      const response = await fetch(`${apiUrl}/deleteEvent/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
        },
      });

      if (response.ok) {
        setEvents((prev) => prev.filter((event) => event.id !== eventId));
        setError(null);
      } else {
        throw new Error("Failed to delete event");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return { events, loading, error, fetchEvents, createEvent, updateEvent, deleteEvent };
};

export default useEvents;
