import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaMapMarkerAlt, FaFileAlt } from "react-icons/fa";
import LoadingModal from "./LoadingModal";
import useEvents from "../hooks/useEvents"; // Import the custom hook
import "../styles/EventForm.css";

const EventForm = ({ editMode }) => {
  const { createEvent, updateEvent, loading, error } = useEvents("http://localhost:3000/event");

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    venue: "",
    startDate: "",
    endDate: "",
    image: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null); // null = loading, true = success, false = failure

  useEffect(() => {
    if (editMode) {
      setFormData({
        name: editMode.name || "",
        description: editMode.description || "",
        venue: editMode.venue || "",
        startDate: editMode.startDate || "",
        endDate: editMode.endDate || "",
        image: editMode.image || null,
      });
    }
  }, [editMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("Submitting...");

    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("description", formData.description);
    formPayload.append("venue", formData.venue);
    formPayload.append("startDate", formData.startDate);
    formPayload.append("endDate", formData.endDate);
    if (formData.image) formPayload.append("image", formData.image);

    try {
      if (editMode) {
        await updateEvent(editMode.id, formPayload); // Update existing event
        setIsSuccess(true);
        setMessage("Event Updated Successfully!");
      } else {
        await createEvent(formPayload); // Create new event
        setIsSuccess(true);
        setMessage("Event Created Successfully!");
      }
    } catch (error) {
      console.error("Event submission failed:", error);
      setIsSuccess(false);
      setMessage("Failed to submit event.");
    }

    setIsLoading(false);
  };

  return (
    <>
      <LoadingModal
        isLoading={isLoading}
        message={message}
        isSuccess={isSuccess}
        onClose={() => setMessage("")} // Close modal when clicking "Close"
      />

      <motion.div
        className="event-form-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <motion.form
          onSubmit={handleSubmit}
          className="event-form"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          {step === 1 && (
            <div className="form-step">
              <h3>Step 1: Event Details</h3>
              <div className="form-group">
                <label>
                  <FaFileAlt className="icon" /> Event Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter event name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  placeholder="Enter event description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <h3>Step 2: Location</h3>
              <div className="form-group">
                <label>
                  <FaMapMarkerAlt className="icon" /> Venue
                </label>
                <input
                  type="text"
                  name="venue"
                  placeholder="Enter venue location"
                  value={formData.venue}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-step">
              <h3>Step 3: Date & Time</h3>
              <div className="form-group">
                <label>
                  <FaCalendarAlt className="icon" /> Start Date
                </label>
                <input
                  type="datetime-local"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <FaCalendarAlt className="icon" /> End Date
                </label>
                <input
                  type="datetime-local"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="form-step">
              <label>Final Step: Upload an Event Image</label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                required
              />
              {formData.image && (
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Image Preview"
                  className="image-preview"
                />
              )}
            </div>
          )}

          <div className="form-navigation">
            {step > 1 && (
              <button type="button" className="prev-btn" onClick={prevStep}>
                Previous
              </button>
            )}
            {step < 4 ? (
              <button type="button" className="next-btn" onClick={nextStep}>
                Next
              </button>
            ) : (
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="submit-btn"
              >
                {editMode ? "Update Event" : "Create Event"}
              </motion.button>
            )}
          </div>
        </motion.form>
      </motion.div>
    </>
  );
};

export default EventForm;
