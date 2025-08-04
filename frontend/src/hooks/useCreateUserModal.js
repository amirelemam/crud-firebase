import { useState } from 'react';
import { usersApi } from '../api/users';

const useCreateUserModal = (onUserCreated) => {
  const [isOpen, setIsOpen] = useState(false);
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
      const newUser = await usersApi.create(formData);
      onUserCreated(newUser);
      closeModal();
    } catch (error) {
      console.error('Error creating user:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      
      // Handle different error response formats
      let errorMessage = 'Failed to create user';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error?.message) {
        errorMessage = error.response.data.error.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setApiError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    setFormData({ name: '', zipCode: '' });
    setErrors({});
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setFormData({ name: '', zipCode: '' });
    setErrors({});
    setLoading(false);
    setApiError(null);
  };

  return {
    isOpen,
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

export default useCreateUserModal; 