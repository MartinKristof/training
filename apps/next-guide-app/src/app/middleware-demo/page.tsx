'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface RequestInfo {
  headers: Record<string, string>;
  url: string;
  method: string;
  timestamp: string;
}

export default function MiddlewareDemoPage() {
  const [requestInfo, setRequestInfo] = useState<RequestInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch current request information
    fetch('/api/request-info')
      .then(res => res.json())
      .then(data => {
        setRequestInfo(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch request info:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Middleware Demo</h1>
        <p className="mt-2 text-lg text-gray-600">
          This page demonstrates Next.js middleware functionality including request/response modification,
          authentication, and custom headers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Middleware Features Demonstrated:</h3>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Request/response modification</li>
              <li>• Authentication checks</li>
              <li>• Rate limiting</li>
              <li>• A/B testing</li>
              <li>• Custom headers</li>
              <li>• Request logging</li>
            </ul>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">Try These Actions:</h3>
            <div className="space-y-2">
              <Link href="/dashboard" className="block text-yellow-700 hover:text-yellow-800 underline">
                Visit Dashboard (requires auth)
              </Link>
              <button
                onClick={() => (document.cookie = 'auth-token=demo-token; path=/; max-age=3600')}
                className="block text-yellow-700 hover:text-yellow-800 underline text-left"
              >
                Set Auth Token (then visit dashboard)
              </button>
              <button
                onClick={() => (document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT')}
                className="block text-yellow-700 hover:text-yellow-800 underline text-left"
              >
                Clear Auth Token
              </button>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">Middleware Benefits:</h3>
            <ul className="text-green-700 text-sm space-y-1">
              <li>• Runs before page rendering</li>
              <li>• Can modify requests/responses</li>
              <li>• Supports authentication</li>
              <li>• Enables rate limiting</li>
              <li>• A/B testing capabilities</li>
              <li>• Request logging and monitoring</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Request Information</h3>

            {loading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ) : requestInfo ? (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Request Details:</h4>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <p>
                      <strong>URL:</strong> {requestInfo.url}
                    </p>
                    <p>
                      <strong>Method:</strong> {requestInfo.method}
                    </p>
                    <p>
                      <strong>Timestamp:</strong> {requestInfo.timestamp}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Custom Headers (set by middleware):</h4>
                  <div className="bg-gray-50 p-3 rounded text-sm space-y-1">
                    {Object.entries(requestInfo.headers)
                      .filter(([key]) => key.startsWith('x-'))
                      .map(([key, value]) => (
                        <p key={key}>
                          <strong>{key}:</strong> {value}
                        </p>
                      ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">All Headers:</h4>
                  <div className="bg-gray-50 p-3 rounded text-sm max-h-40 overflow-y-auto">
                    {Object.entries(requestInfo.headers).map(([key, value]) => (
                      <p key={key} className="text-xs">
                        <strong>{key}:</strong> {value}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-red-600">Failed to load request information</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
