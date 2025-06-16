import { useLoaderData } from 'react-router';
import { User } from '../api/users';

export const UserDetails = () => {
  const { user } = useLoaderData<{ user: User }>();

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded">
      <h3 className="text-lg font-semibold">{user.name}</h3>
      <p className="text-gray-600">{user.email}</p>
    </div>
  );
};
