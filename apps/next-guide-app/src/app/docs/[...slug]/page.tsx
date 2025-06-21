export default function DocsCatchAllPage({ params }: { params: { slug: string[] } }) {
  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Docs Catch-all Route</h1>
      <p className="mb-4 text-blue-900">
        This page matches any route under <code>/docs/*</code>.
      </p>
      <div className="bg-blue-50 p-4 rounded border border-blue-100 text-blue-900 mb-6">
        <h2 className="font-semibold mb-2">What is a Catch-all Route Segment?</h2>
        <p className="mb-2">
          A <strong>catch-all route segment</strong> in Next.js is defined using <code>[...param]</code> in the folder
          name. It matches any number of path segments and passes them as an array to the page via <code>params</code>.
        </p>
        <ul className="list-disc pl-5 mb-2">
          <li>
            Use <code>[...slug]</code> to match <code>/docs/a</code>, <code>/docs/a/b</code>, <code>/docs/a/b/c</code>,
            etc.
          </li>
          <li>
            The matched segments are available as <code>params.slug</code> (array of strings).
          </li>
          <li>Great for nested docs, categories, or flexible URL structures.</li>
        </ul>
        <p className="mb-2">
          <a
            href="https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#catch-all-segments"
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
        <ul className="list-disc pl-5 mt-2">
          {params.slug.map((segment, i) => (
            <li key={i}>{segment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
