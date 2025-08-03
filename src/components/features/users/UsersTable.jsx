import React from 'react';
import TableActions from './TableActions';

const UsersTable = ({
  users,
  sortField,
  sortDirection,
  onSort,
  onEdit,
  onDelete,
}) => {
  const sortedUsers = [...users].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === 'string') {
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
  });

  return (
    <div className="table-container">
      <table className="users-table">
        <thead>
          <tr>
            <th onClick={() => onSort('name')}>
              Name{' '}
              {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => onSort('zipCode')}>
              Zip Code{' '}
              {sortField === 'zipCode' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => onSort('latitude')}>
              Latitude{' '}
              {sortField === 'latitude' &&
                (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => onSort('longitude')}>
              Longitude{' '}
              {sortField === 'longitude' &&
                (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => onSort('timezone')}>
              Timezone{' '}
              {sortField === 'timezone' &&
                (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.zipCode}</td>
              <td>{user.latitude}</td>
              <td>{user.longitude}</td>
              <td>{user.timezone}</td>
              <td>
                <TableActions user={user} onEdit={onEdit} onDelete={onDelete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
