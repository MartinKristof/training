import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Next.js 15 Complete Guide</h1>
        <p className="mt-2 text-lg text-gray-600">
          This demo covers all essential Next.js concepts including App Router, Server Components, Data Fetching,
          Middleware, and more.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Next.js Concepts Covered</h2>
          <div className="space-y-3">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">1. File-Based Routing (App Router)</h3>
              <p className="text-green-700 text-sm">Using the new App Router with file-system based routing</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">2. Rendering</h3>
              <p className="text-blue-700 text-sm">Server Components, Client Components, SSR, SSG</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800">3. Data Fetching</h3>
              <p className="text-purple-700 text-sm">fetch function, caching, database connections</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-800">4. Middleware</h3>
              <p className="text-yellow-700 text-sm">Request/response modification, authentication</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-red-800">5. Environments</h3>
              <p className="text-red-700 text-sm">Node.js vs Edge Runtime</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-semibold text-indigo-800">6. Configuration</h3>
              <p className="text-indigo-700 text-sm">next.config.js, instrumentation</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Navigation Examples</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Link href="/server-component" className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors">
              <h3 className="font-semibold text-gray-900">Server Component</h3>
              <p className="text-sm text-gray-700">Data fetching with ISR caching</p>
            </Link>
            <Link href="/client-component" className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors">
              <h3 className="font-semibold text-gray-900">Client Component</h3>
              <p className="text-sm text-gray-700">Interactive counter with hooks</p>
            </Link>
            <Link
              href="/client-data-fetching"
              className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <h3 className="font-semibold text-gray-900">Client Data Fetching</h3>
              <p className="text-sm text-gray-700">Fetch data from API on the client</p>
            </Link>
            <Link
              href="/user-form-server-action"
              className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <h3 className="font-semibold text-gray-900">User Form (Server Action)</h3>
              <p className="text-sm text-gray-700">Form with useActionState, server action & Zod</p>
            </Link>
            <Link href="/runtime-demo" className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors">
              <h3 className="font-semibold text-gray-900">Runtime Demo</h3>
              <p className="text-sm text-gray-700">Node.js vs Edge Runtime API example</p>
            </Link>
            <Link href="/blog" className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors">
              <h3 className="font-semibold text-gray-900">Blog (SSG)</h3>
              <p className="text-sm text-gray-700">Static site generation example</p>
            </Link>
            <Link href="/dashboard" className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors">
              <h3 className="font-semibold text-gray-900">Dashboard (SSR)</h3>
              <p className="text-sm text-gray-700">Server-side rendering example</p>
            </Link>
            <Link href="/api/users" className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors">
              <h3 className="font-semibold text-gray-900">API Routes</h3>
              <p className="text-sm text-gray-700">REST API endpoints</p>
            </Link>
            <Link href="/middleware-demo" className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors">
              <h3 className="font-semibold text-gray-900">Middleware</h3>
              <p className="text-sm text-gray-700">Request/response modification</p>
            </Link>
            <Link href="/database-demo" className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors">
              <h3 className="font-semibold text-gray-900">Database Demo</h3>
              <p className="text-sm text-gray-700">Prisma + SQLite server-side data fetching</p>
            </Link>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-3">Getting Started</h3>
          <p className="text-blue-700 text-sm mb-4">
            Explore the different rendering strategies and data fetching patterns in Next.js 15. Each page demonstrates
            specific concepts with practical examples.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Component Types:</h4>
              <ul className="text-blue-700 space-y-1">
                <li>
                  • <strong>Server Components:</strong> Default, run on server
                </li>
                <li>
                  • <strong>Client Components:</strong> Interactive, run in browser
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Rendering Strategies:</h4>
              <ul className="text-blue-700 space-y-1">
                <li>
                  • <strong>SSG:</strong> Static Site Generation
                </li>
                <li>
                  • <strong>SSR:</strong> Server-Side Rendering
                </li>
                <li>
                  • <strong>ISR:</strong> Incremental Static Regeneration
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
