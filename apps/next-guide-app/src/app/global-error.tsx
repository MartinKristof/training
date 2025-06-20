'use client';

import { useEffect } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.error('Global application error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-md mx-auto px-4 py-8 text-center">
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              {/* Critical Error Icon */}
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
                <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>

              {/* Critical Error Message */}
              <h1 className="text-3xl font-bold text-gray-900 mb-3">Critical Error</h1>
              <p className="text-gray-600 mb-6">
                A critical error has occurred that prevents the application from loading properly. This is a root-level
                error that affects the entire application.
              </p>

              {/* Error Details (only in development) */}
              {process.env.NODE_ENV === 'development' && (
                <details className="mb-6 text-left">
                  <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                    Global Error Details
                  </summary>
                  <div className="mt-2 p-3 bg-gray-50 rounded text-xs text-gray-700 font-mono">
                    <p>
                      <strong>Message:</strong> {error.message}
                    </p>
                    {error.digest && (
                      <p>
                        <strong>Digest:</strong> {error.digest}
                      </p>
                    )}
                    <p>
                      <strong>Stack:</strong>
                    </p>
                    <pre className="whitespace-pre-wrap overflow-x-auto">{error.stack}</pre>
                  </div>
                </details>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={reset}
                  className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                >
                  Reload Application
                </button>
                <button
                  onClick={() => (window.location.href = '/')}
                  className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  Go to Home
                </button>
              </div>

              {/* Additional Help */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-2">If the problem persists, try:</p>
                <ul className="text-sm text-gray-500 text-left space-y-1">
                  <li>• Refreshing the page</li>
                  <li>• Clearing your browser cache</li>
                  <li>• Contacting support if the issue continues</li>
                </ul>
              </div>

              {/* Support Contact */}
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  Need help?{' '}
                  <a href="mailto:support@example.com" className="text-blue-600 hover:text-blue-800 underline">
                    Contact support
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
