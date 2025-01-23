import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/EventForm.css";
import { FaCalendarAlt, FaMapMarkerAlt, FaFileAlt } from "react-icons/fa";

const EventForm = ({ onSubmit, editMode }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    venue: "",
    startDate: "",
    endDate: "",
    image: null,
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
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
            <h3>Step 4: Upload Image</h3>
            <div className="form-group">
              <label>Upload an Event Image</label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                required
              />
            </div>
          </div>
        )}

        <div className="form-navigation">
          {step > 1 && (
            <button
              type="button"
              className="prev-btn"
              onClick={prevStep}
            >
              Previous
            </button>
          )}
          {step < 4 ? (
            <button
              type="button"
              className="next-btn"
              onClick={nextStep}
            >
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
  );
};

export default EventForm;
