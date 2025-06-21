import React from 'react';
import { GetStaticProps } from 'next';
import { User } from '@/lib/data';

interface SsgProps {
  users: User[];
}

export default function SsgPage({ users }: SsgProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Static Site Generation (SSG)</h1>
      <p className="mb-4">
        This page was generated at build time by fetching data from <code>/api/users</code>.
      </p>
      <ul className="list-disc pl-6">
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>

      <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg text-left max-w-3xl">
        <h3 className="font-bold text-green-800">Theory: `getStaticProps`</h3>
        <p className="text-sm text-green-700 mt-2">
          The <code>getStaticProps</code> function runs at build time to pre-render the page with the data it returns in
          `props`. This is ideal for pages that can be generated ahead of a user&apos;s request, like blog posts or
          marketing content.
        </p>
        <p className="text-sm text-green-700 mt-2">
          <strong>When to use:</strong> When the data required to render the page is available at build time and is the
          same for all users.
        </p>
        <p className="text-sm text-green-700 mt-2">
          With `revalidate`, you can enable Incremental Static Regeneration (ISR) to update the page periodically
          without a full rebuild.
        </p>
        <p className="text-sm text-green-700 mt-2">
          <a
            href="https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props"
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

export const getStaticProps: GetStaticProps = async () => {
  // In a real app, you'd fetch from an external API.
  // For this demo, we're fetching from our own API route.
  try {
    const res = await fetch('http://localhost:3000/api/users');
    const users: User[] = await res.json();

    return {
      props: {
        users,
      },
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      notFound: true, // Return a 404 page if the data fetch fails
    };
  }
};
