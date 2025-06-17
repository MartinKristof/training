import { Suspense } from 'react';
import Link from 'next/link';
import { Counter } from './components/Counter';

interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
  website: string;
}

// Server Component - Data Fetching with caching
async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json() as Promise<User[]>;
}

// Server Component - User List
async function UserList() {
  const users = await getData();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Users (Server Component)</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.slice(0, 3).map(user => (
          <div key={user.id} className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{user.email}</p>
            </div>
            <div className="px-4 py-4 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Company</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.company.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Website</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.website}</dd>
                </div>
              </dl>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Next.js 15 Complete Guide</h1>
        <p className="mt-2 text-lg text-gray-600">
          This demo covers all essential Next.js concepts including App Router, Server Components, Data Fetching,
          Middleware, and more.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Next.js Concepts Covered</h2>
            <div className="space-y-3">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800">1. File-Based Routing (App Router)</h3>
                <p className="text-green-700 text-sm">Using the new App Router with file-system based routing</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800">2. Rendering</h3>
                <p className="text-blue-700 text-sm">Server Components, Client Components, SSR, SSG</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800">3. Data Fetching</h3>
                <p className="text-purple-700 text-sm">fetch function, caching, database connections</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800">4. Middleware</h3>
                <p className="text-yellow-700 text-sm">Request/response modification, authentication</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800">5. Environments</h3>
                <p className="text-red-700 text-sm">Node.js vs Edge Runtime</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="font-semibold text-indigo-800">6. Configuration</h3>
                <p className="text-indigo-700 text-sm">next.config.js, instrumentation</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Navigation Examples</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/blog" className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors">
                <h3 className="font-semibold">Blog (SSG)</h3>
                <p className="text-sm text-gray-600">Static site generation example</p>
              </Link>
              <Link href="/dashboard" className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors">
                <h3 className="font-semibold">Dashboard (SSR)</h3>
                <p className="text-sm text-gray-600">Server-side rendering example</p>
              </Link>
              <Link href="/api/users" className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors">
                <h3 className="font-semibold">API Routes</h3>
                <p className="text-sm text-gray-600">REST API endpoints</p>
              </Link>
              <Link href="/middleware-demo" className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors">
                <h3 className="font-semibold">Middleware</h3>
                <p className="text-sm text-gray-600">Request/response modification</p>
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Suspense fallback={<div>Loading users...</div>}>
            <UserList />
          </Suspense>

          <Counter />
        </div>
      </div>
    </div>
  );
}
