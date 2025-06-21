import React from 'react';
import { NextPageContext } from 'next';

function Error({ statusCode }: { statusCode?: number }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl font-bold">{statusCode ? `Error ${statusCode}` : 'Client-Side Error'}</h1>
      <p className="mt-4 text-lg text-gray-700">
        {statusCode ? `An error occurred on the server` : 'An error occurred on the client'}
      </p>

      <div className="mt-12 p-4 bg-gray-100 border border-gray-300 rounded-lg text-left max-w-2xl">
        <h3 className="font-bold text-gray-800">Theory: Custom `_error` Page</h3>
        <p className="text-sm text-gray-700 mt-2">
          This file (<code>src/pages/_error.tsx</code>) handles all other errors (e.g., 500 in development). It&apos;s
          rendered for both server-side and client-side errors.
        </p>
        <p className="text-sm text-gray-700 mt-2">
          The <code>getInitialProps</code> function is used to get the <code>statusCode</code>. This function runs on
          the server for initial page loads, and on the client during navigation. This is a great place to send error
          reports to a logging service like Sentry, as you have access to the error object.
        </p>
        <p className="text-sm text-gray-700 mt-2">
          <a
            href="https://nextjs.org/docs/pages/building-your-application/routing/custom-error"
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

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  // In a real application, you would send the error to a logging service.
  // For example: Sentry.captureException(err);
  console.error(err || `Error with status code ${statusCode} occurred.`);

  return { statusCode };
};

export default Error;
