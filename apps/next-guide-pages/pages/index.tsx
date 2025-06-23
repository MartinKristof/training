import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Next.js Data Fetching (Pages Router)</h1>
      <p className="mb-4">
        This application demonstrates the different data fetching strategies available in the Next.js Pages Router using
        a mock REST API.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>SSG (Static Site Generation):</strong> Fetches data at build time. Use <code>getStaticProps</code>.
        </li>
        <li>
          <strong>SSR (Server-Side Rendering):</strong> Fetches data on each request. Use{' '}
          <code>getServerSideProps</code>.
        </li>
        <li>
          <strong>SSG with Dynamic Paths:</strong> Statically generates pages with dynamic routes. Use{' '}
          <code>getStaticPaths</code> and <code>getStaticProps</code>.
        </li>
        <li>
          <strong>CSR (Client-Side Rendering):</strong> Fetches data on the client using SWR.
        </li>
      </ul>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Demo Links</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <Link href="/ssg" className="text-blue-600 hover:underline">
              SSG Demo
            </Link>
          </li>
          <li>
            <Link href="/ssr" className="text-blue-600 hover:underline">
              SSR Demo
            </Link>
          </li>
          <li>
            <Link href="/csr" className="text-blue-600 hover:underline">
              CSR Demo
            </Link>
          </li>
          <li>
            <Link href="/users/1" className="text-blue-600 hover:underline">
              User Detail (Dynamic Route) + getStaticPaths
            </Link>
          </li>
          <li>
            <Link href="/api/users" className="text-blue-600 hover:underline">
              API Route: /api/users
            </Link>
          </li>
          <li>
            <Link href="/404" className="text-blue-600 hover:underline">
              Custom 404 Page
            </Link>
          </li>
          <li>
            <Link href="/500" className="text-blue-600 hover:underline">
              Custom 500 Page
            </Link>
          </li>
          <li>
            <Link href="/api/users/1" className="text-blue-600 hover:underline">
              API route
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
