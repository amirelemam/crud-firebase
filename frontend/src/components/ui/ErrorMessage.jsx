import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ error, onClose }) => {
  if (!error) return null;

  // Handle both string and object error formats
  const errorMessage =
    typeof error === 'string'
      ? error
      : error.message || 'An error occurred. Please try again.';

  return (
    <div className="error-message">
      <div className="error-content">
        <span className="error-icon">⚠️</span>
        <span className="error-text">{errorMessage}</span>
        {onClose && (
          <button className="error-close" onClick={onClose}>
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
