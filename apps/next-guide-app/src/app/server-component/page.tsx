import { Suspense } from 'react';

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
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Company</dt>
                  <dd className="mt-1 text-sm text-gray-900 break-words">{user.company.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Website</dt>
                  <dd className="mt-1 text-sm text-gray-900 break-words">{user.website}</dd>
                </div>
              </dl>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Loading component for UserList
function UserListLoading() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Users (Server Component)</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 animate-pulse">
            <div className="px-4 py-5 sm:px-6">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="px-4 py-4 sm:px-6">
              <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                <div>
                  <div className="h-3 bg-gray-200 rounded w-1/3 mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
                <div>
                  <div className="h-3 bg-gray-200 rounded w-1/3 mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ServerComponentPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Server Component Demo</h1>
        <p className="mt-2 text-lg text-gray-600">
          This page demonstrates Server Components in Next.js. Server Components run on the server and can access
          databases, file systems, and other server-side resources.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">Server Component Features:</h3>
            <ul className="text-green-700 text-sm space-y-1">
              <li>• Run on the server (server-side)</li>
              <li>• No JavaScript sent to the client</li>
              <li>• Can access databases and file systems</li>
              <li>• Better performance and SEO</li>
              <li>• Can use server-side APIs</li>
              <li>• Default in App Router</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">When to Use Server Components:</h3>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Data fetching</li>
              <li>• Static content</li>
              <li>• SEO-critical pages</li>
              <li>• Server-side APIs</li>
              <li>• Database queries</li>
              <li>• File system access</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-2">Data Fetching Strategy:</h3>
            <ul className="text-purple-700 text-sm space-y-1">
              <li>• Incremental Static Regeneration (ISR)</li>
              <li>• Cache for 1 hour with revalidation</li>
              <li>• Fresh data after cache expires</li>
              <li>• Optimized for performance</li>
              <li>• Automatic caching by Next.js</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User List (Server Component)</h2>
            <p className="text-gray-600 mb-6">
              This user list demonstrates server-side data fetching with caching and revalidation.
            </p>

            <Suspense fallback={<UserListLoading />}>
              <UserList />
            </Suspense>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">How it works:</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Data fetched on the server</li>
                <li>• Cached for 1 hour (ISR)</li>
                <li>• No JavaScript sent to client</li>
                <li>• Better SEO and performance</li>
                <li>• Automatic revalidation</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">Performance Benefits:</h3>
            <div className="text-sm text-yellow-700 space-y-2">
              <div className="flex justify-between">
                <span>Bundle Size:</span>
                <span className="font-medium">Smaller (no JS)</span>
              </div>
              <div className="flex justify-between">
                <span>Initial Load:</span>
                <span className="font-medium">Faster</span>
              </div>
              <div className="flex justify-between">
                <span>SEO:</span>
                <span className="font-medium">Better</span>
              </div>
              <div className="flex justify-between">
                <span>Interactivity:</span>
                <span className="font-medium">Limited</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
