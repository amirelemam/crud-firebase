import React from 'react';

const DeleteConfirmationModal = ({
  isOpen,
  selectedUser,
  onClose,
  onConfirm
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Confirm Delete</h2>
        </div>
        <div className="modal-content">
          <p>Are you sure you want to delete this user?</p>
          <p><strong>{selectedUser?.name}</strong></p>
        </div>
        <div className="modal-actions">
          <button onClick={onClose}>
            Cancel
          </button>
          <button className="delete-btn" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal; 