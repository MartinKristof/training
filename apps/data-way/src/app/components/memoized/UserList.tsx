import { memo } from 'react';
import { User } from '../types';

interface UserListProps {
  users: User[];
  onUserSelect: (userId: string) => void;
}

// Memoized list component
export const UserList = memo<UserListProps>(({ users, onUserSelect }) => {
  console.log('UserList render (memoized)');

  return (
    <ul className="space-y-2">
      {users.map((user: User) => (
        <UserItem key={user.id} user={user} onSelect={onUserSelect} />
      ))}
    </ul>
  );
});

UserList.displayName = 'MemoizedUserList';

interface UserItemProps {
  user: User;
  onSelect: (id: string) => void;
}

// Memoized list item component
const UserItem = memo<UserItemProps>(({ user, onSelect }) => {
  console.log(`UserItem ${user.id} render (memoized)`);

  return (
    <li onClick={() => onSelect(user.id)} className="p-2 border rounded cursor-pointer hover:bg-gray-100">
      {user.name} ({user.email})
      <span
        className={`ml-2 px-2 py-1 text-xs rounded ${
          user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}
      >
        {user.status}
      </span>
    </li>
  );
});

UserItem.displayName = 'MemoizedUserItem';
