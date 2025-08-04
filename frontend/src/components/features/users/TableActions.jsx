import React from 'react';
import { FiEdit, FiX } from 'react-icons/fi';

const TableActions = ({ user, onEdit, onDelete }) => {
  return (
    <div className="actions">
      <button
        className="edit-btn"
        onClick={() => onEdit(user)}
        title="Edit"
      >
        <FiEdit />
      </button>
      <button
        className="delete-btn"
        onClick={() => onDelete(user)}
        title="Delete"
      >
        <FiX />
      </button>
    </div>
  );
};

export default TableActions; 