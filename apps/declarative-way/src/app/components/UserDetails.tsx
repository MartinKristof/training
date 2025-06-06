import { useParams, useNavigate } from 'react-router';

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
];

export const UserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const user = users.find(u => u.id === Number(userId));

  if (!user) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-red-600">User Not Found</h2>
        <p className="mt-2">The user you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/users')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Users
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">User Details</h2>
        <button onClick={() => navigate(-1)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
          ← Back
        </button>
      </div>
      <div className="p-4 bg-gray-50 rounded">
        <h3 className="text-lg font-semibold">{user.name}</h3>
        <p className="text-gray-600">{user.email}</p>
      </div>
    </div>
  );
};
