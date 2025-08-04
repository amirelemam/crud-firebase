import { useState } from 'react';
import { usersApi } from '../api/users';

const useDeleteConfirmationModal = (onUserDeleted) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);



  const handleConfirmDelete = async () => {
    if (!selectedUser) return;

    setLoading(true);

    try {
      setApiError(null);
      await usersApi.delete(selectedUser.id);
      onUserDeleted(selectedUser.id);
      closeModal();
    } catch (error) {
      console.error('Error deleting user:', error);
      setApiError(error.response?.data?.message || error.message || 'Failed to delete user');
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
    setApiError(null);
  };

  return {
    isOpen,
    selectedUser,
    loading,
    apiError,
    openModal,
    closeModal,
    handleConfirmDelete,
  };
};

export default useDeleteConfirmationModal; 