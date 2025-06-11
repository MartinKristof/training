import { ChangeEvent, memo, useCallback, useMemo, useState, useTransition } from 'react';
import { useAppState, useAppActions } from '../context/AppContext';

// Memoized user card component to prevent unnecessary re-renders
const UserCard = memo(
  ({ user, onDelete }: { user: { id: number; name: string; email: string }; onDelete: (id: number) => void }) => {
    console.log(`Rendering UserCard for ${user.name}`); // To demonstrate memoization
    return (
      <div className="p-4 border rounded-lg flex items-center justify-between">
        <div>
          <h3 className="font-medium">{user.name}</h3>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
        <button onClick={() => onDelete(user.id)} className="px-3 py-1 text-sm text-red-600 hover:text-red-800">
          Delete
        </button>
      </div>
    );
  },
);

UserCard.displayName = 'UserCard';

export const SearchableUserList = () => {
  const { users, isLoading } = useAppState();
  const { removeUser } = useAppActions();
  const [searchTerm, setSearchTerm] = useState('');
  const [isPending, startTransition] = useTransition();

  // Memoized filtered users to prevent recalculation on every render
  const filteredUsers = useMemo(() => {
    console.log('Filtering users...'); // To demonstrate memoization
    return users.filter(
      user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [users, searchTerm]);

  // Memoized delete handler to prevent unnecessary re-renders of UserCard
  const handleDelete = useCallback(
    async (id: number) => {
      if (window.confirm('Are you sure you want to delete this user?')) {
        await removeUser(id);
      }
    },
    [removeUser],
  );

  // Memoized search handler using useTransition for better UX
  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setSearchTerm(e.target.value);
    });
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Searchable Users</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {isPending && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full" />
            </div>
          )}
        </div>
      </div>

      {isLoading && <div className="p-4 bg-blue-50 text-blue-700 rounded-lg">Loading users...</div>}

      <div className="grid gap-4">
        {filteredUsers.map(user => (
          <UserCard key={user.id} user={user} onDelete={handleDelete} />
        ))}
        {filteredUsers.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            {searchTerm ? 'No users found matching your search.' : 'No users available.'}
          </p>
        )}
      </div>
    </div>
  );
};
