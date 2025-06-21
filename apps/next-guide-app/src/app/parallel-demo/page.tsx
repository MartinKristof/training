// ---
// Theory Box: Parallel Routes in Next.js
// ---

import React from 'react';
import { ReactNode } from 'react';
import Link from 'next/link';

export default function ParallelDemoPage({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="mb-8 p-6 bg-blue-50 border-l-4 border-blue-400 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-blue-900 mb-2">Parallel Routes in Next.js</h2>
        <p className="text-blue-900 mb-2">
          <strong>Parallel Routes</strong> allow you to render multiple pages in the same layout at the same time. Each
          slot is defined by a folder prefixed with <code className="bg-blue-100 px-1 rounded">@</code> (e.g.
          <code className="bg-blue-100 px-1 rounded">@feed</code>,
          <code className="bg-blue-100 px-1 rounded">@notifications</code>) and must be received as a prop in the
          layout.
        </p>
        <ul className="list-disc pl-6 text-blue-900 mb-2">
          <li>
            Each slot can be navigated independently, enabling advanced UI patterns like tab groups, modals, or
            dashboards.
          </li>
          <li>Slots are rendered in parallel, so their loading and error states are handled separately.</li>
          <li>
            Parallel Routes are useful for building complex layouts where different sections of the page update
            independently.
          </li>
        </ul>
        <p className="text-blue-900">
          Learn more in the{' '}
          <a
            href="https://nextjs.org/docs/app/api-reference/file-conventions/parallel-routes"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-semibold"
          >
            official Next.js documentation
          </a>
          .
        </p>
      </div>
      <div className="max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Parallel Routes Demo</h1>
        <p className="mb-4 text-blue-900">
          This page demonstrates <strong>Parallel Routes</strong> in Next.js. Both the feed and notifications are
          rendered in parallel slots.
        </p>
        <Link
          href="/parallel-demo/archive"
          className="inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Go to Archive Page
        </Link>
        <div className="space-y-4 mt-6">{children}</div>
      </div>
    </>
  );
}
