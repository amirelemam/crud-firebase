import React from 'react';
import { FiX } from 'react-icons/fi';
import ErrorMessage from '../../ui/ErrorMessage';

const CreateUserModal = ({
  isOpen,
  formData,
  errors,
  apiError,
  onClose,
  onSubmit,
  onChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Create User</h2>
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <ErrorMessage error={apiError} onClose={() => onClose()} />
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={onChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="zipCode">Zip Code *</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={onChange}
              maxLength="5"
              className={errors.zipCode ? 'error' : ''}
            />
            {errors.zipCode && (
              <span className="error-message">{errors.zipCode}</span>
            )}
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
