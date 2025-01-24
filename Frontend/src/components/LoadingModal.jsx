import React from "react";
import "../styles/LoadingModal.css";

const LoadingModal = ({ isLoading, message, isSuccess, onClose }) => {
  if (!isLoading && message === "") return null;

  return (
    <div className="loading-modal-overlay">
      <div className="loading-modal-content">
        {isLoading ? (
          <div className="loading-spinner"></div>
        ) : isSuccess === null ? (
          <p>{message}</p>
        ) : isSuccess ? (
          <p className="success-message">{message}</p>
        ) : (
          <p className="error-message">{message}</p>
        )}
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LoadingModal;
