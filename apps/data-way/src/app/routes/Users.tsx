import { Link, Outlet, useLoaderData } from 'react-router';
import { fetchUsers } from '../api/users';

type User = {
  id: number;
  name: string;
  email: string;
};

export const Users = () => {
  const { users } = useLoaderData() as { users: User[] };

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Users</h2>
        <Link
          to="/users/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create User
        </Link>
      </div>
      <ul className="space-y-2">
        {users.map(user => (
          <li key={user.id} className="flex items-center space-x-4">
            <Link to={`/users/${user.id}`} className="text-blue-600 hover:underline">
              {user.name}
            </Link>
            <span className="text-gray-500">({user.email})</span>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
};

export const loader = async () => {
  const users = await fetchUsers();

  return { users };
};
