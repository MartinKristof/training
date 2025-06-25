import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 py-8 text-center">
        <div className="bg-white p-8 rounded-lg shadow-sm border">
          {/* 404 Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6">
            <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
              />
            </svg>
          </div>

          {/* 404 Message */}
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Blog not Found. Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or
            you entered the wrong URL.
          </p>

          {/* Navigation Options */}
          <div className="space-y-4">
            <Link
              href="/"
              className="block w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Go to Home
            </Link>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/blog"
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/dashboard"
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/api"
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                API Docs
              </Link>
              <Link
                href="/middleware-demo"
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Middleware
              </Link>
            </div>
          </div>

          {/* Search Suggestion */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">Looking for something specific? Try these popular pages:</p>
            <div className="space-y-2 text-sm">
              <Link
                href="/blog/getting-started-with-nextjs"
                className="block text-blue-600 hover:text-blue-800 underline"
              >
                Getting Started with Next.js
              </Link>
              <Link
                href="/blog/server-components-vs-client-components"
                className="block text-blue-600 hover:text-blue-800 underline"
              >
                Server vs Client Components
              </Link>
              <Link href="/blog/data-fetching-in-nextjs" className="block text-blue-600 hover:text-blue-800 underline">
                Data Fetching Guide
              </Link>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-6">
            <p className="text-sm text-gray-500">
              Still can't find what you're looking for?{' '}
              <a href="mailto:support@example.com" className="text-blue-600 hover:text-blue-800 underline">
                Contact us
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
