// ---
// Parallel Routes Layout Example
// This layout demonstrates how to use Parallel Routes in Next.js App Router.
// Each slot (feed, notifications) is rendered independently and can be navigated in parallel.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/parallel-routes
//
// Parallel Routes allow you to render multiple pages in the same layout at the same time.
// Each slot is defined by a folder prefixed with @ (e.g. @feed, @notifications) and must be received as a prop in the layout.
// ---

import React from 'react';

export default function Layout({
  children,
  feed,
  notifications,
}: {
  children: React.ReactNode;
  feed: React.ReactNode;
  notifications: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-2 gap-8 items-start p-8 bg-slate-50 rounded-2xl shadow-lg">
      {/* Top row with two slots */}
      <aside className="bg-white rounded-xl p-6 shadow-md border border-slate-200 text-slate-800">
        <h3 className="mt-0 text-slate-900 text-xl font-semibold">Feed (Parallel Route)</h3>
        {feed}
      </aside>
      <aside className="bg-white rounded-xl p-6 shadow-md border border-slate-200 text-slate-800">
        <h3 className="mt-0 text-slate-900 text-xl font-semibold">Notifications (Parallel Route)</h3>
        {notifications}
      </aside>

      {/* Bottom row with main content spanning both columns */}
      <section className="col-span-2 bg-white rounded-xl p-6 shadow-md border border-slate-200 text-slate-800">
        <h2 className="mt-0 text-slate-900 text-2xl font-bold">Main Content</h2>
        {children}
      </section>
    </div>
  );
}
