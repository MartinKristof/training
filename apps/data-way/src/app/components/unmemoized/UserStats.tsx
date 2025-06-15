import { FC } from 'react';
import { User } from '../types';

interface UserStatsProps {
  users: User[];
  selectedUserId: string | null;
}

// Unmemoized stats component
export const UserStats: FC<UserStatsProps> = ({ users, selectedUserId }) => {
  console.log('UserStats render (unmemoized)');

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    selected: selectedUserId ? users.find(u => u.id === selectedUserId) : null,
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold mb-2">User Statistics (Unmemoized)</h3>
      <div className="space-y-1">
        <div>Total Users: {stats.total}</div>
        <div>Active Users: {stats.active}</div>
        {stats.selected && <div className="mt-2 pt-2 border-t">Selected User: {stats.selected.name}</div>}
      </div>
    </div>
  );
};
