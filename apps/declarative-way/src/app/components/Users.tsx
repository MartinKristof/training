import { Link, Outlet } from 'react-router';

const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Bob Johnson' },
];

export const Users = () => (
  <div className="mt-4">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold">Users</h2>
      <Link to="/users/new" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Create User
      </Link>
    </div>
    <ul className="space-y-2">
      {users.map(user => (
        <li key={user.id}>
          <Link to={`/users/${user.id}`} className="text-blue-600 hover:underline">
            {user.name}
          </Link>
        </li>
      ))}
    </ul>
    <Outlet />
  </div>
);
