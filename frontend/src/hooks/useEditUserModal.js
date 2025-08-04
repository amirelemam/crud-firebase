import { useState } from 'react';
import { usersApi } from '../api/users';

const useEditUserModal = (onUserUpdated) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    zipCode: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);



  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Zip code is required';
    } else if (!/^\d{5}$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Zip code must be 5 numeric digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      setApiError(null);
      const updatedUser = await usersApi.update(selectedUser.id, formData);
      onUserUpdated(updatedUser);
      closeModal();
    } catch (error) {
      console.error('Error updating user:', error);
      setApiError(error.response?.data?.message || error.message || 'Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      zipCode: user.zipCode,
    });
    setErrors({});
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedUser(null);
    setFormData({ name: '', zipCode: '' });
    setErrors({});
    setLoading(false);
    setApiError(null);
  };

  return {
    isOpen,
    selectedUser,
    formData,
    errors,
    loading,
    apiError,
    openModal,
    closeModal,
    handleSubmit,
    handleInputChange,
  };
};

export default useEditUserModal; 