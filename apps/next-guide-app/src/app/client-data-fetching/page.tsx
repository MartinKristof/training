import { Suspense } from 'react';
import ClientUserList from './ClientUserList';
import { notFound } from 'next/navigation';

interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUsers(): Promise<User[]> {
  if (process.env.NODE_ENV !== 'production') {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/users');
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();

      if (!data.users) {
        return notFound();
      }

      return data.users;
    } catch (err) {
      throw new Error('Error fetching users: ' + (err instanceof Error ? err.message : String(err)));
    }
  }

  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/users');
    if (!res.ok) throw new Error('Failed to fetch users');
    const data = await res.json();

    if (!data) {
      return notFound();
    }

    return data;
  } catch (err) {
    throw new Error('Error fetching users: ' + (err instanceof Error ? err.message : String(err)));
  }
}

export default async function ClientDataFetchingPage() {
  const usersPromise = fetchUsers();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Client Data Fetching Demo</h1>
        <p className="mt-2 text-lg text-gray-600">
          This page demonstrates how to fetch data on the server and pass it as a promise to a Client Component using{' '}
          <code>use()</code> in Next.js.
        </p>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">User List (fetched on server, unwrapped on client)</h2>
        <Suspense fallback={<p className="text-blue-700">Loading users...</p>}>
          <ClientUserList users={usersPromise} />
        </Suspense>
      </div>
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">How it works:</h3>
        <ul className="text-yellow-700 text-sm space-y-1">
          <li>• The page is a Server Component</li>
          <li>• Data is fetched on the server and passed as a promise</li>
          <li>
            • <code>ClientUserList</code> is a Client Component using <code>use(users)</code> to unwrap the promise
          </li>
          <li>
            • Wrapped in <code>Suspense</code> for loading state
          </li>
        </ul>
      </div>
      <div className="bg-purple-50 p-4 rounded-lg">
        <h3 className="font-semibold text-purple-800 mb-2">When to use this pattern:</h3>
        <ul className="text-purple-700 text-sm space-y-1">
          <li>• Data that can be prefetched on the server</li>
          <li>• You want to keep the client component simple and synchronous</li>
          <li>• You want to leverage Suspense for loading and error states</li>
        </ul>
      </div>
    </div>
  );
}
