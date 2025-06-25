import { Suspense } from 'react';
import MyButton from '../_components/MyButton';
import { Metadata } from 'next';

// Force dynamic rendering: always render on the server, no cache
export const dynamic = 'force-static';
// Even if you set revalidate, it will be ignored with force-dynamic
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your dashboard overview',
};

// Simulate database connection
async function getDashboardData() {
  // Simulate database query delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // In a real app, this would be a database query
  return {
    stats: {
      totalUsers: 1234,
      activeUsers: 892,
      newUsers: 45,
      revenue: 125000,
    },
    recentActivity: [
      { id: 1, action: 'User registered', user: 'john@example.com', time: '2 minutes ago' },
      { id: 2, action: 'Payment received', user: 'jane@example.com', time: '5 minutes ago' },
      { id: 3, action: 'Profile updated', user: 'bob@example.com', time: '10 minutes ago' },
      { id: 4, action: 'User logged in', user: 'alice@example.com', time: '15 minutes ago' },
    ],
    serverTime: new Date().toISOString(),
  };
}

// Server Component - Dashboard Stats
async function DashboardStats() {
  const data = await getDashboardData();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Dashboard (Server-Side Rendering)</h2>
        <p className="text-gray-600 mb-6">
          This page demonstrates Server-Side Rendering (SSR). Data is fetched on each request and the page is rendered
          on the server with fresh data.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
          <p className="text-3xl font-bold text-gray-900">{data.stats.totalUsers.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Active Users</h3>
          <p className="text-3xl font-bold text-blue-600">{data.stats.activeUsers.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">New Users (Today)</h3>
          <p className="text-3xl font-bold text-green-600">{data.stats.newUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Revenue</h3>
          <p className="text-3xl font-bold text-purple-600">${data.stats.revenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {data.recentActivity.map(activity => (
            <div
              key={activity.id}
              className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
            >
              <div>
                <p className="font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.user}</p>
              </div>
              <span className="text-sm text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Server Information */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Server Information:</h3>
        <p className="text-blue-700 text-sm">
          <strong>Server Time:</strong> {new Date(data.serverTime).toLocaleString()}
        </p>
        <p className="text-blue-700 text-sm">
          <strong>Rendering:</strong> Server-Side Rendering (SSR)
        </p>
        <p className="text-blue-700 text-sm">
          <strong>Data Freshness:</strong> Real-time (fetched on each request)
        </p>
      </div>

      {/* SSR Benefits */}
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">SSR Benefits:</h3>
        <ul className="text-yellow-700 text-sm space-y-1">
          <li>• Fresh data on every request</li>
          <li>• Better SEO for dynamic content</li>
          <li>• Faster initial page load</li>
          <li>• Works without JavaScript</li>
          <li>• Real-time data display</li>
        </ul>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-gray-600 text-xl">Dashboard Home</h1>
      <MyButton />
      <Suspense
        fallback={
          <div className="space-y-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      >
        <DashboardStats />
      </Suspense>
    </div>
  );
}
