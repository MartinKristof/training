import { useParams, useNavigate } from 'react-router';
import { useAppState } from '../context/AppContext';

export const UserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { users, removeUser } = useAppState();
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

  const handleDelete = () => {
    removeUser(user.id);
    navigate('/users');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">User Details</h2>
        <div className="space-x-2">
          <button onClick={() => navigate(-1)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
            ← Back
          </button>
          <button onClick={handleDelete} className="px-4 py-2 text-sm text-red-600 hover:text-red-700">
            Delete User
          </button>
        </div>
      </div>
      <div className="p-4 bg-gray-50 rounded">
        <h3 className="text-lg font-semibold">{user.name}</h3>
        <p className="text-gray-600">{user.email}</p>
      </div>
    </div>
  );
};
