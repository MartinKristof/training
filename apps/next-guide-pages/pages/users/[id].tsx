import React from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { User } from '@/lib/data';
import Link from 'next/link';

export default function UserPage({ user }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Website: {user.website}</p>
      <p className="mt-4 text-sm text-gray-500">
        This page was statically generated at build time using getStaticPaths.
      </p>

      <div className="mt-8 p-4 bg-purple-50 border border-purple-200 rounded-lg text-left max-w-3xl">
        <h3 className="font-bold text-purple-800">Theory: `getStaticPaths`</h3>
        <p className="text-sm text-purple-700 mt-2">
          The <code>getStaticPaths</code> function is required for dynamic routes that use <code>getStaticProps</code>.
          It tells Next.js which paths to pre-render at build time.
        </p>
        <div className="text-sm text-purple-700 mt-2">
          The <code>fallback</code> option is crucial:
          <ul className="list-disc pl-5 mt-1">
            <li>
              <code>&apos;false&apos;</code>: Any paths not returned by getStaticPaths will result in a 404 page.
            </li>
            <li>
              <code>&apos;true&apos;</code>: Paths not generated at build time will serve a &quot;fallback&quot; version
              of the page on the first request. In the background, Next.js will statically generate the requested path.
              Subsequent requests to the same path will serve the generated page, just like other pages built at build
              time.
            </li>
            <li>
              <code>&apos;blocking&apos;</code>: Similar to `true`, but the user will wait for the page to be generated
              on the first request (server-side rendered), and then it will be cached for future requests.
            </li>
          </ul>
        </div>
        <p className="text-sm text-purple-700 mt-2">
          <Link
            href="https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Learn more in the docs.
          </Link>
        </p>
      </div>
    </div>
  );
}

export const getStaticPaths = (async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  const users: User[] = await res.json();

  const paths = users.map(user => ({
    params: { id: String(user.id) },
  }));

  return {
    paths,
    // fallback: false, // All paths are known at build time
    // Set to 'true' or 'blocking' if you want to allow new paths to be generated at runtime
    fallback: true, // Uncomment this line to enable fallback mode
    // fallback: 'blocking', // Uncomment this line to enable blocking fallback mode
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params }) => {
  const id = params?.id as string;
  if (!id) {
    return {
      notFound: true,
    };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`);
  const user: User = await res.json();

  if (!user || !user.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user,
    },
  };
}) satisfies GetStaticProps<{ user: User }>;
