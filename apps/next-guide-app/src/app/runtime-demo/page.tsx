export default async function RuntimeDemoPage() {
  // Use process.env.NEXT_PUBLIC_BASE_URL if available, otherwise fallback to localhost
  // eslint-disable-next-line no-undef
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const [nodeRes, edgeRes] = await Promise.all([
    fetch(`${baseUrl}/api/runtime-node`),
    fetch(`${baseUrl}/api/runtime-edge`),
  ]);
  const nodeData = await nodeRes.json();
  const edgeData = await edgeRes.json();

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Node.js vs Edge Runtime Demo</h1>
      <p className="text-base md:text-lg text-gray-800 mb-4">
        Next.js allows you to run API route handlers either in the classic Node.js environment or in the Edge Runtime
        (V8 isolate, runs closer to the user, limited Node.js API).
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-lg shadow border">
          <h2 className="text-lg font-semibold mb-1 text-gray-900">Node.js Runtime</h2>
          <p className="mb-2 text-gray-700 text-sm">Default environment for most API routes and server components.</p>
          <code className="block bg-gray-200 p-2 rounded text-xs mb-2 text-gray-900">/api/runtime-node</code>
          <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs border overflow-x-auto">
            {JSON.stringify(nodeData, null, 2)}
          </pre>
        </div>
        <div className="bg-white p-5 rounded-lg shadow border">
          <h2 className="text-lg font-semibold mb-1 text-gray-900">Edge Runtime</h2>
          <p className="mb-2 text-gray-700 text-sm">
            Runs in Edge environments (Vercel Edge, Cloudflare Workers, etc.), faster response, limited Node.js API.
          </p>
          <code className="block bg-gray-200 p-2 rounded text-xs mb-2 text-gray-900">/api/runtime-edge</code>
          <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs border overflow-x-auto">
            {JSON.stringify(edgeData, null, 2)}
          </pre>
        </div>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg mt-8">
        <h3 className="font-semibold text-blue-800 mb-2 text-base">Summary of differences:</h3>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>
            • <strong>Node.js runtime:</strong> Full access to Node.js API, runs on the server (Vercel, custom server,
            ...)
          </li>
          <li>
            • <strong>Edge runtime:</strong> Limited API, runs in an isolated V8 environment, lower latency, faster
            response
          </li>
          <li>
            • <strong>Edge runtime:</strong> Cannot use some Node.js packages (e.g. fs, net, child_process...)
          </li>
          <li>
            • <strong>Edge runtime:</strong> Suitable for simple, fast APIs, authentication, A/B testing, geo-routing
          </li>
        </ul>
      </div>
    </div>
  );
}
