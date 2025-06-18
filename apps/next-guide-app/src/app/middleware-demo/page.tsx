'use client';

import { useTransition } from 'react';
import useSWR, { mutate } from 'swr';
import Link from 'next/link';
import { setAuthToken, clearAuthToken } from './actions';

interface RequestInfo {
  headers: Record<string, string>;
  url: string;
  method: string;
  timestamp: string;
}

const API_REQUEST_INFO_URL = '/api/request-info';

const fetcher = async (url: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch request info');
    return await res.json();
  } catch (err) {
    throw new Error('Error fetching request info: ' + (err instanceof Error ? err.message : String(err)));
  }
};

export default function MiddlewareDemoPage() {
  const { data: requestInfo, error, isLoading } = useSWR<RequestInfo>(API_REQUEST_INFO_URL, fetcher);
  const [isPending, startTransition] = useTransition();

  async function handleSetAuthToken() {
    startTransition(async () => {
      await setAuthToken();
      mutate(API_REQUEST_INFO_URL);
    });
  }

  async function handleClearAuthToken() {
    startTransition(async () => {
      await clearAuthToken();
      mutate(API_REQUEST_INFO_URL);
    });
  }

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
              {requestInfo && !requestInfo.headers['cookie']?.includes('auth-token=') && (
                <div className="text-sm text-red-700 bg-red-100 rounded p-2 mb-2">
                  <strong>Warning:</strong> Auth token cookie is not set. You will be redirected to login if you try to
                  access the dashboard.
                </div>
              )}

              <Link href="/dashboard" className="block text-yellow-700 hover:text-yellow-800 underline">
                Visit Dashboard (requires auth)
              </Link>
              <form action={handleSetAuthToken}>
                <button
                  type="submit"
                  className="block text-yellow-700 hover:text-yellow-800 underline text-left"
                  disabled={isPending}
                >
                  Set Auth Token (then visit dashboard)
                </button>
              </form>
              <form action={handleClearAuthToken}>
                <button
                  type="submit"
                  className="block text-yellow-700 hover:text-yellow-800 underline text-left"
                  disabled={isPending}
                >
                  Clear Auth Token
                </button>
              </form>
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

            {isLoading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ) : error ? (
              <p className="text-red-600">Failed to load request information: {error.message}</p>
            ) : requestInfo ? (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Request Details:</h4>
                  <div className="bg-gray-50 p-3 rounded text-sm text-gray-900">
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
                  <div className="bg-gray-50 p-3 rounded text-sm space-y-1 text-gray-900">
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
                  <div className="bg-gray-50 p-3 rounded text-sm max-h-40 overflow-y-auto text-gray-900">
                    {Object.entries(requestInfo.headers).map(([key, value]) => (
                      <p key={key} className="text-xs">
                        <strong>{key}:</strong> {value}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
