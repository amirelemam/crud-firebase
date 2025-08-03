import React from 'react';
import { FiPlus } from 'react-icons/fi';

const Header = ({ onCreateClick }) => {
  return (
    <div className="header">
      <h1>User Management</h1>
      <button className="create-btn" onClick={onCreateClick}>
        <FiPlus /> Create
      </button>
    </div>
  );
};

export default Header; 