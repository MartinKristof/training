import { FC } from 'react';
import { User } from '../types';

interface UserListProps {
  users: User[];
  onUserSelect: (userId: string) => void;
}

// Unmemoized list component
export const UserList: FC<UserListProps> = ({ users, onUserSelect }) => {
  console.log('UserList render (unmemoized)');

  return (
    <ul className="space-y-2">
      {users.map(user => (
        <UserItem key={user.id} user={user} onSelect={() => onUserSelect(user.id)} />
      ))}
    </ul>
  );
};

interface UserItemProps {
  user: User;
  onSelect: () => void;
}

// Unmemoized list item component
const UserItem: FC<UserItemProps> = ({ user, onSelect }) => {
  console.log(`UserItem ${user.id} render (unmemoized)`);

  return (
    <li onClick={onSelect} className="p-2 border rounded cursor-pointer hover:bg-gray-100">
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
};
