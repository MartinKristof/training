export default function OptionalCatchAllPage({ params }: { params: { slug?: string[] } }) {
  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Optional Catch-all Route</h1>
      <p className="mb-4 text-blue-900">
        This page matches <code>/optional-catch-all</code> and any subpath.
      </p>
      <div className="bg-blue-50 p-4 rounded border border-blue-100 text-blue-900 mb-6">
        <h2 className="font-semibold mb-2">What is an Optional Catch-all Route Segment?</h2>
        <p className="mb-2">
          An <strong>optional catch-all route segment</strong> in Next.js is defined using <code>[[...param]]</code> in
          the folder name. It matches zero or more path segments and passes them as an array (or undefined) to the page
          via <code>params</code>.
        </p>
        <ul className="list-disc pl-5 mb-2">
          <li>
            Use <code>[[...slug]]</code> to match <code>/optional-catch-all</code>, <code>/optional-catch-all/foo</code>
            , <code>/optional-catch-all/foo/bar</code>, etc.
          </li>
          <li>
            If no segments are provided, <code>params.slug</code> is <code>undefined</code>.
          </li>
          <li>Great for pages that should match both the root and nested paths.</li>
        </ul>
        <p className="mb-2">
          <a
            href="https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#optional-catch-all-segments"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-700"
          >
            Read more in the official Next.js documentation
          </a>
        </p>
      </div>
      <div className="bg-blue-50 p-4 rounded border border-blue-100 text-blue-900">
        <strong>Matched segments:</strong>
        {params.slug && params.slug.length > 0 ? (
          <ul className="list-disc pl-5 mt-2">
            {params.slug.map((segment, i) => (
              <li key={i}>{segment}</li>
            ))}
          </ul>
        ) : (
          <div className="mt-2">No segments provided.</div>
        )}
      </div>
    </div>
  );
}
