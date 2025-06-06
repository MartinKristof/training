import { useLoaderData } from 'react-router';

type User = {
  id: number;
  name: string;
  email: string;
};

export const UserDetails = () => {
  const { user } = useLoaderData() as { user: User };

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded">
      <h3 className="text-lg font-semibold">{user.name}</h3>
      <p className="text-gray-600">{user.email}</p>
    </div>
  );
};
