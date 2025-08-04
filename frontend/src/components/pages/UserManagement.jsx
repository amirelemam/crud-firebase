import React, { useState, useEffect } from 'react';
import '../features/users/UserManagement.css';
import Header from '../layout/Header';
import UsersTable from '../features/users/UsersTable';
import CreateUserModal from '../features/users/CreateUserModal';
import EditUserModal from '../features/users/EditUserModal';
import DeleteConfirmationModal from '../features/users/DeleteConfirmationModal';
import { usersApi } from '../../api/users';
import {
  useCreateUserModal,
  useEditUserModal,
  useDeleteConfirmationModal,
} from '../../hooks';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  // Custom hooks for modal management
  const createUserModal = useCreateUserModal((newUser) => {
    // Refetch users to ensure consistent data format
    fetchUsers();
  });

  const editUserModal = useEditUserModal((updatedUser) => {
    // Refetch users to ensure consistent data format
    fetchUsers();
  });

  const deleteConfirmationModal = useDeleteConfirmationModal((userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const users = await usersApi.getAll();
      setUsers(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      // Fallback to empty array if API fails
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleCreate = () => {
    createUserModal.openModal();
  };

  const handleEdit = (user) => {
    editUserModal.openModal(user);
  };

  const handleDelete = (user) => {
    deleteConfirmationModal.openModal(user);
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  return (
    <div className="user-management">
      <Header onCreateClick={handleCreate} />

      <UsersTable
        users={users}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CreateUserModal
        isOpen={createUserModal.isOpen}
        formData={createUserModal.formData}
        errors={createUserModal.errors}
        apiError={createUserModal.apiError}
        onClose={createUserModal.closeModal}
        onSubmit={createUserModal.handleSubmit}
        onChange={createUserModal.handleInputChange}
      />

      <EditUserModal
        isOpen={editUserModal.isOpen}
        formData={editUserModal.formData}
        errors={editUserModal.errors}
        apiError={editUserModal.apiError}
        onClose={editUserModal.closeModal}
        onSubmit={editUserModal.handleSubmit}
        onChange={editUserModal.handleInputChange}
      />

      <DeleteConfirmationModal
        isOpen={deleteConfirmationModal.isOpen}
        selectedUser={deleteConfirmationModal.selectedUser}
        apiError={deleteConfirmationModal.apiError}
        onClose={deleteConfirmationModal.closeModal}
        onConfirm={deleteConfirmationModal.handleConfirmDelete}
      />
    </div>
  );
};

export default UserManagement;
