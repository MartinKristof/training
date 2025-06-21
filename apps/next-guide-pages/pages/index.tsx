import React from 'react';

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
    </div>
  );
}
