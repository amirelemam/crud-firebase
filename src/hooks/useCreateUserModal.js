import { useState } from 'react';
import axios from 'axios';

const useCreateUserModal = (onUserCreated) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    zipCode: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Mock API base URL - replace with your actual backend URL
  const API_BASE_URL = 'http://localhost:5001/rentredi-backend/us-central1/api';

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
      const response = await axios.post(`${API_BASE_URL}/users`, formData);
      onUserCreated(response.data);
      closeModal();
    } catch (error) {
      console.error('Error creating user:', error);
      // For demo purposes, simulate success
      const newUser = {
        id: Date.now(),
        ...formData,
        latitude: 0,
        longitude: 0,
        timezone: 'UTC',
      };
      onUserCreated(newUser);
      closeModal();
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
  };

  return {
    isOpen,
    formData,
    errors,
    loading,
    openModal,
    closeModal,
    handleSubmit,
    handleInputChange,
  };
};

export default useCreateUserModal; 