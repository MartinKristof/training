import { useDeferredValue, useMemo, useState } from 'react';
import { useAppState } from '../context/AppContext';

// Simulated expensive computation for data visualization
const computeUserStats = (users: { name: string; email: string }[]) => {
  // Simulate expensive computation
  const start = performance.now();
  while (performance.now() - start < 100) {
    // Block the main thread for 100ms to simulate expensive computation
  }

  return {
    totalUsers: users.length,
    domains: users.reduce(
      (acc, user) => {
        const domain = user.email.split('@')[1];
        acc[domain] = (acc[domain] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    ),
    nameLengths: users.map(user => user.name.length),
  };
};

export const UserStats = () => {
  const { users } = useAppState();
  const [filter, setFilter] = useState('');

  // Use deferred value for expensive computations
  const deferredFilter = useDeferredValue(filter);

  // Memoize filtered users to prevent unnecessary filtering
  const filteredUsers = useMemo(() => {
    return users.filter(
      user =>
        user.name.toLowerCase().includes(deferredFilter.toLowerCase()) ||
        user.email.toLowerCase().includes(deferredFilter.toLowerCase()),
    );
  }, [users, deferredFilter]);

  // Memoize stats computation to prevent unnecessary recalculations
  const stats = useMemo(() => computeUserStats(filteredUsers), [filteredUsers]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">User Statistics</h2>
        <input
          type="text"
          placeholder="Filter users..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Users Card */}
        <div className="p-6 bg-white rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
        </div>

        {/* Average Name Length Card */}
        <div className="p-6 bg-white rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Average Name Length</h3>
          <p className="text-3xl font-bold text-green-600">
            {(stats.nameLengths.reduce((a, b) => a + b, 0) / stats.nameLengths.length).toFixed(1)}
          </p>
        </div>

        {/* Email Domains Card */}
        <div className="p-6 bg-white rounded-lg shadow-sm border md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Email Domains</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(stats.domains).map(([domain, count]) => (
              <div key={domain} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-gray-600">{domain}</span>
                <span className="font-semibold text-blue-600">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visual indicator for deferred updates */}
      {filter !== deferredFilter && (
        <div className="fixed bottom-12 right-4 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg shadow-sm">
          Updating...
        </div>
      )}
    </div>
  );
};
