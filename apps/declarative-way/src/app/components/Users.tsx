import { useNavigate } from 'react-router';
import { useAppState, useAppActions } from '../context/AppContext';

export const Users = () => {
  const navigate = useNavigate();
  const { users, isLoading } = useAppState();
  const { removeUser } = useAppActions();

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await removeUser(id);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Users</h2>
        <button
          onClick={() => navigate('/users/new')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create User
        </button>
      </div>

      {isLoading && <div className="mb-4 p-4 bg-blue-50 text-blue-700 rounded-lg">Loading...</div>}

      <div className="grid gap-4">
        {users.map(user => (
          <div key={user.id} className="p-4 border rounded-lg flex items-center justify-between">
            <div>
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => navigate(`/users/${user.id}`)}
                className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
              >
                View
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
                disabled={isLoading}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
