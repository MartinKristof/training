'use client';

import { useState } from 'react';

interface ApiEndpoint {
  method: string;
  path: string;
  description: string;
  example?: string;
}

const apiEndpoints: ApiEndpoint[] = [
  {
    method: 'GET',
    path: '/api/users',
    description: 'Get a list of all users',
    example: 'curl http://localhost:3000/api/users',
  },
  {
    method: 'POST',
    path: '/api/users',
    description: 'Create a new user',
    example:
      'curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d \'{"name":"John Doe","email":"john@example.com"}\'',
  },
  {
    method: 'PUT',
    path: '/api/users',
    description: 'Update an existing user',
    example:
      'curl -X PUT http://localhost:3000/api/users -H "Content-Type: application/json" -d \'{"id":1,"name":"John Updated","email":"john.updated@example.com"}\'',
  },
  {
    method: 'DELETE',
    path: '/api/users?id=1',
    description: 'Delete a user by ID',
    example: 'curl -X DELETE http://localhost:3000/api/users?id=1',
  },
  {
    method: 'GET',
    path: '/api/request-info',
    description: 'Get information about the current request (headers, metadata)',
    example: 'curl http://localhost:3000/api/request-info',
  },
];

export default function ApiPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(null);
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [requestBody, setRequestBody] = useState('');

  const testEndpoint = async (endpoint: ApiEndpoint) => {
    setLoading(true);
    setResponse('');

    try {
      const options: {
        method: string;
        headers: Record<string, string>;
        body?: string;
      } = {
        method: endpoint.method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (endpoint.method === 'POST' || endpoint.method === 'PUT') {
        options.body = requestBody || '{}';
      }

      const res = await fetch(endpoint.path, options);
      const data = await res.json();

      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">API Documentation</h1>
        <p className="mt-2 text-lg text-gray-600">
          This page documents the available API endpoints in the Next.js application. API routes are serverless
          functions that return JSON data.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">API Routes in Next.js:</h3>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• They are serverless functions, not React components</li>
              <li>• Return JSON data, not HTML</li>
              <li>• Located in the `/app/api/` folder</li>
              <li>• Support all HTTP methods (GET, POST, PUT, DELETE)</li>
              <li>• Automatically handle request/response processing</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">Available Endpoints:</h3>
            <div className="space-y-3">
              {apiEndpoints.map((endpoint, index) => (
                <div key={index} className="border border-green-200 rounded p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        endpoint.method === 'GET'
                          ? 'bg-green-100 text-green-800'
                          : endpoint.method === 'POST'
                            ? 'bg-blue-100 text-blue-800'
                            : endpoint.method === 'PUT'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {endpoint.method}
                    </span>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-900">{endpoint.path}</code>
                  </div>
                  <p className="text-sm text-green-700">{endpoint.description}</p>
                  {endpoint.example && (
                    <details className="mt-2">
                      <summary className="text-xs text-green-600 cursor-pointer">Usage Example</summary>
                      <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-x-auto text-gray-900">
                        {endpoint.example}
                      </pre>
                    </details>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">API Tester</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select endpoint:</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
                  onChange={e => {
                    const endpoint = apiEndpoints[parseInt(e.target.value)];
                    setSelectedEndpoint(endpoint);
                    setRequestBody('');
                    setResponse('');
                  }}
                >
                  <option value="">-- Select endpoint --</option>
                  {apiEndpoints.map((endpoint, index) => (
                    <option key={index} value={index}>
                      {endpoint.method} {endpoint.path}
                    </option>
                  ))}
                </select>
              </div>

              {selectedEndpoint && (selectedEndpoint.method === 'POST' || selectedEndpoint.method === 'PUT') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Request Body (JSON):</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md h-32 font-mono text-sm text-gray-700"
                    value={requestBody}
                    onChange={e => setRequestBody(e.target.value)}
                    placeholder='{"name": "John Doe", "email": "john@example.com"}'
                  />
                </div>
              )}

              <button
                onClick={() => selectedEndpoint && testEndpoint(selectedEndpoint)}
                disabled={!selectedEndpoint || loading}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? 'Testing...' : 'Test Endpoint'}
              </button>

              {response && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Response:</label>
                  <pre className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-sm overflow-x-auto max-h-64 text-gray-900">
                    {response}
                  </pre>
                </div>
              )}
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">Why don&apos;t API routes render components?</h3>
            <ul className="text-yellow-700 text-sm space-y-1">
              <li>• API routes are serverless functions, not React components</li>
              <li>• Return data (JSON), not UI</li>
              <li>• Used for backend logic</li>
              <li>• For UI, use regular pages in the `/app/` folder</li>
              <li>• API routes are called from frontend using `fetch()`</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Connection with other parts of the application:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-900">
          <div>
            <h4 className="font-medium text-gray-700">Home Page</h4>
            <p className="text-gray-600">Uses Server Components for data fetching</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700">Dashboard</h4>
            <p className="text-gray-600">SSR with real-time data</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700">Blog</h4>
            <p className="text-gray-600">SSG with pre-generated pages</p>
          </div>
        </div>
      </div>
    </div>
  );
}
