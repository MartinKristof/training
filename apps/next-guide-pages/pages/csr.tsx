import React from 'react';
import useSWR from 'swr';
import { User } from '@/lib/data';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function CsrPage() {
  const { data: users, error } = useSWR<User[]>('/api/users', fetcher);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Client-Side Rendering (CSR) with SWR</h1>
      <p className="mb-4">
        This page fetches data on the client using the SWR hook from <code>/api/users</code>.
      </p>

      {error && <div>Failed to load users.</div>}
      {!users && <div>Loading...</div>}

      {users && (
        <ul className="list-disc pl-6">
          {users.map(user => (
            <li key={user.id}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 p-4 bg-teal-50 border border-teal-200 rounded-lg text-left max-w-3xl">
        <h3 className="font-bold text-teal-800">Theory: Client-Side Rendering (CSR)</h3>
        <p className="text-sm text-teal-700 mt-2">
          With Client-Side Rendering, the initial page is pre-rendered without the data. The browser then fetches the
          data and renders it using JavaScript.
        </p>
        <p className="text-sm text-teal-700 mt-2">
          <strong>When to use:</strong> For private, user-specific pages where SEO is not a concern and data is
          frequently updated. For example, a user account dashboard.
        </p>
        <p className="text-sm text-teal-700 mt-2">
          The SWR hook provided by Vercel is a great way to handle client-side data fetching. It provides caching,
          revalidation, focus tracking, and more, out of the box.
        </p>
        <p className="text-sm text-teal-700 mt-2">
          <a
            href="https://nextjs.org/docs/pages/building-your-application/data-fetching/client-side"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Learn more in the docs.
          </a>
        </p>
      </div>
    </div>
  );
}
