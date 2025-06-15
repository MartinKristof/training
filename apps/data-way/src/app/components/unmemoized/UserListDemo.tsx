import { useState } from 'react';
import { UserList } from './UserList';
import { UserStats } from './UserStats';
import { SearchInput } from './SearchInput';
import { MOCK_USERS } from '../constants';
import { User } from '../types';

export const UserListDemo = () => {
  const [users] = useState<User[]>(MOCK_USERS);
  const [search, setSearch] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // Unmemoized filtered users
  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));

  // Unmemoized user selection handler
  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h2 className="text-xl font-bold">User List Demo (Unmemoized)</h2>
      <SearchInput value={search} onChange={setSearch} />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <UserList users={filteredUsers} onUserSelect={handleUserSelect} />
        </div>
        <div>
          <UserStats users={users} selectedUserId={selectedUserId} />
        </div>
      </div>
    </div>
  );
};
