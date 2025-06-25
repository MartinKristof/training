import React from 'react';
import Link from 'next/link';

export default async function ConditionalRoutesPage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  return (
    <div>
      <div className="mb-8 p-6 bg-amber-50 border-l-4 border-amber-400 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-amber-900 mb-2">Conditional Routes Example</h2>
        <p className="text-amber-900 mb-2">
          This page demonstrates <strong>Conditional Routes</strong>, a powerful feature of Parallel Routes. Based on a
          condition (in this case, the URL segment), we can render different UI.
        </p>
        <p className="text-amber-900 mb-4">
          As explained in the{' '}
          <a
            href="https://www.builder.io/blog/nextjs-14-parallel-routes"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-semibold"
          >
            article by Builder.io
          </a>
          , this is ideal for scenarios like showing different dashboards for different user roles.
        </p>
        <div className="flex gap-4">
          <Link
            href="/conditional-routes-demo/user"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            View as User
          </Link>
          <Link
            href="/conditional-routes-demo/admin"
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
          >
            View as Admin
          </Link>
        </div>
        <p className="mt-4 text-sm text-amber-800">
          Current Role: <strong className="uppercase">{role}</strong>
        </p>
      </div>
    </div>
  );
}
