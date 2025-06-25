import { Counter } from '../components/Counter';

export default function ClientComponentPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Client Component Demo</h1>
        <p className="mt-2 text-lg text-gray-600">
          This page demonstrates Client Components in Next.js. Client Components run in the browser and can use React
          hooks, event handlers, and browser APIs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Client Component Features:</h3>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Run in the browser (client-side)</li>
              <li>• Can use React hooks (useState, useEffect, etc.)</li>
              <li>• Interactive and dynamic</li>
              <li>• Can handle user events</li>
              <li>• Access to browser APIs</li>
              <li>• Use 'use client' directive</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">When to Use Client Components:</h3>
            <ul className="text-green-700 text-sm space-y-1">
              <li>• Interactive UI elements</li>
              <li>• Event handlers (onClick, onSubmit)</li>
              <li>• Browser-only APIs (localStorage, window)</li>
              <li>• Custom hooks</li>
              <li>• Third-party libraries that need browser APIs</li>
              <li>• State management</li>
            </ul>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">Performance Considerations:</h3>
            <ul className="text-yellow-700 text-sm space-y-1">
              <li>• JavaScript is sent to the client</li>
              <li>• Larger bundle size</li>
              <li>• Slower initial page load</li>
              <li>• Use sparingly for better performance</li>
              <li>• Prefer Server Components when possible</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Interactive Counter (Client Component)</h2>
            <p className="text-gray-600 mb-6">
              This counter demonstrates client-side interactivity with React hooks and event handlers.
            </p>

            <Counter />

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">How it works:</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Uses useState hook for state management</li>
                <li>• onClick handlers for user interactions</li>
                <li>• Runs entirely in the browser</li>
                <li>• No server round-trip for state changes</li>
              </ul>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-2">Client vs Server Components:</h3>
            <div className="text-sm text-purple-700 space-y-2">
              <div className="flex justify-between">
                <span>Client Component:</span>
                <span className="font-medium">Interactive, JavaScript-heavy</span>
              </div>
              <div className="flex justify-between">
                <span>Server Component:</span>
                <span className="font-medium">Static, SEO-friendly</span>
              </div>
              <div className="flex justify-between">
                <span>Bundle Size:</span>
                <span className="font-medium">Larger vs Smaller</span>
              </div>
              <div className="flex justify-between">
                <span>Performance:</span>
                <span className="font-medium">Slower vs Faster</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
