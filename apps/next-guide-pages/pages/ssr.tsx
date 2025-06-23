import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { User } from '@/lib/data';

export default function SsrPage({ users }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Server-Side Rendering (SSR)</h1>
      <p className="mb-4">
        This page is rendered on the server for each request by fetching data from <code>/api/users</code>.
      </p>
      <ul className="list-disc pl-6">
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>

      <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-lg text-left max-w-3xl">
        <h3 className="font-bold text-orange-800">Theory: `getServerSideProps`</h3>
        <p className="text-sm text-orange-700 mt-2">
          The <code>getServerSideProps</code> function runs on the server for every request. This guarantees that the
          page will always have fresh data.
        </p>
        <p className="text-sm text-orange-700 mt-2">
          <strong>When to use:</strong> When you need to pre-render a page whose data must be fetched at request time.
          For example, a user dashboard or other data that is private and frequently updated.
        </p>
        <p className="text-sm text-orange-700 mt-2">
          This method is generally slower than <code>getStaticProps</code> because the page cannot be cached by a CDN
          without extra configuration.
        </p>
        <p className="text-sm text-orange-700 mt-2">
          <a
            href="https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props"
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

export const getServerSideProps = (async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  const users: User[] = await res.json();

  console.log(users);
  if (!users) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      users,
    },
  };
}) satisfies GetServerSideProps<{ users: User[] }>;
