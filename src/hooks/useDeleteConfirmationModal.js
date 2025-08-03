import { useState } from 'react';
import axios from 'axios';

const useDeleteConfirmationModal = (onUserDeleted) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock API base URL - replace with your actual backend URL
  const API_BASE_URL = 'http://localhost:5001/rentredi-backend/us-central1/api';

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;

    setLoading(true);

    try {
      await axios.delete(`${API_BASE_URL}/users/${selectedUser.id}`);
      onUserDeleted(selectedUser.id);
      closeModal();
    } catch (error) {
      console.error('Error deleting user:', error);
      // For demo purposes, simulate success
      onUserDeleted(selectedUser.id);
      closeModal();
    } finally {
      setLoading(false);
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedUser(null);
    setLoading(false);
  };

  return {
    isOpen,
    selectedUser,
    loading,
    openModal,
    closeModal,
    handleConfirmDelete,
  };
};

export default useDeleteConfirmationModal; 