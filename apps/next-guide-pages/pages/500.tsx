import React from 'react';
import Link from 'next/link';

export default function Custom500() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-bold text-red-600">500</h1>
      <p className="mt-4 text-xl text-gray-700">Internal Server Error</p>
      <p className="mt-2 text-gray-500">Something went wrong on our end. Please try again later.</p>
      <Link href="/" className="mt-8 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
        Go back home
      </Link>

      <div className="mt-12 p-4 bg-red-50 border border-red-200 rounded-lg text-left max-w-2xl">
        <h3 className="font-bold text-red-800">Theory: Custom 500 Page</h3>
        <p className="text-sm text-red-700 mt-2">
          This file (<code>src/pages/500.tsx</code>) creates a static, custom 500 error page. Next.js serves this page
          automatically in production when a server-side error occurs.
        </p>
        <p className="text-sm text-red-700 mt-2">
          Like the 404 page, it&apos;s static and generated at build time. This ensures that your application can always
          render a proper error page, even if the server is having trouble. It does not receive the error details to
          avoid leaking sensitive information.
        </p>
        <p className="text-sm text-red-700 mt-2">
          <a
            href="https://nextjs.org/docs/pages/building-your-application/routing/custom-error#500-page"
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
