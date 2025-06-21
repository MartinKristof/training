import React from 'react';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-bold text-blue-600">404</h1>
      <p className="mt-4 text-xl text-gray-700">Oops! The page you&apos;re looking for could not be found.</p>
      <Link href="/" className="mt-8 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
        Go back home
      </Link>

      <div className="mt-12 p-4 bg-blue-50 border border-blue-200 rounded-lg text-left max-w-2xl">
        <h3 className="font-bold text-blue-800">Theory: Custom 404 Page</h3>
        <p className="text-sm text-blue-700 mt-2">
          This file (<code>src/pages/404.tsx</code>) creates a static, custom 404 error page. Next.js serves this page
          automatically when a user visits a URL that does not exist.
        </p>
        <p className="text-sm text-blue-700 mt-2">
          Because it&apos;s static, it&apos;s generated at build time, making it very fast. It does not have access to
          server-side data like the request status code.
        </p>
        <p className="text-sm text-blue-700 mt-2">
          <a
            href="https://nextjs.org/docs/pages/building-your-application/routing/custom-error#404-page"
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
