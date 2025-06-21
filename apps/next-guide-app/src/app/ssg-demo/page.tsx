export const revalidate = false; // disables ISR, pure SSG

export default function SSGDemoPage() {
  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">SSG Demo (Static Site Generation)</h1>
      <p className="mb-4 text-blue-900">This page was statically generated at build time.</p>
      <div className="bg-blue-50 p-4 rounded border border-blue-100 text-blue-900">
        <strong>Build time:</strong> {new Date().toISOString()}
      </div>
      <div className="mt-6 text-sm text-blue-900 bg-blue-50 p-4 rounded border border-blue-100">
        <p className="mb-2">
          <strong>SSG</strong> (Static Site Generation) in Next.js is achieved by exporting{' '}
          <code>revalidate = false</code> or using <code>generateStaticParams</code> for dynamic routes. The page is
          generated at build time and served as a static file.
        </p>
        <ul className="list-disc pl-5">
          <li>No server code runs on each request.</li>
          <li>Super fast, great for marketing, docs, blogs, etc.</li>
          <li>To update, you must rebuild the app.</li>
        </ul>
      </div>
    </div>
  );
}
