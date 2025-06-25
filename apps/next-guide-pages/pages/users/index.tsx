export default function UsersPage() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <p className="text-gray-700">This page lists all users. It is statically generated at build time.</p>
      <p className="mt-4 text-sm text-gray-500">
        This page was statically generated at build time using <code>getStaticProps</code>.
      </p>

      <div className="mt-8 p-4 bg-purple-50 border border-purple-200 rounded-lg text-left max-w-3xl">
        <h3 className="font-bold text-purple-800">Theory: `getStaticProps`</h3>
        <p className="text-sm text-purple-700 mt-2">
          The <code>getStaticProps</code> function is used to fetch data at build time for static generation.
        </p>
        <p className="text-sm text-purple-700 mt-2">
          It allows you to pre-render a page with data fetched from an API or database.
        </p>
        <p className="text-sm text-purple-700 mt-2">
          Learn more in the{' '}
          <a
            href="https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Next.js documentation
          </a>
          .
        </p>
      </div>
    </div>
  );
}
