import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <div className="error-message">
      <div className="error-content">
        <span className="error-icon">⚠️</span>
        <span className="error-text">
          {error.message || 'An error occurred. Please try again.'}
        </span>
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
