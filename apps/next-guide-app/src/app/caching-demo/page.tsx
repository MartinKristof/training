export default async function CachingDemoPage() {
  // Fetch weather for Prague
  const res = await fetch(
    'https://api.open-meteo.com/v1/forecast?latitude=50.08&longitude=14.44&current_weather=true',
    {
      cache: 'force-cache',
      next: { revalidate: 10 },
    },
  );
  const data = await res.json();

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Caching Demo (fetch + ISR)</h1>
      <p className="mb-4 text-blue-900">This page fetches the current weather in Prague with caching (ISR, 10s).</p>
      <div className="bg-blue-50 p-4 rounded border border-blue-100 text-blue-900">
        <strong>Temperature:</strong> {data.current_weather?.temperature}°C
        <br />
        <strong>Wind speed:</strong> {data.current_weather?.windspeed} km/h
        <br />
        <strong>Time:</strong> {data.current_weather?.time}
      </div>
      <div className="mt-6 text-sm text-blue-900 bg-blue-50 p-4 rounded border border-blue-100">
        <p className="mb-2">
          <strong>Next.js Caching</strong> allows you to control how data is cached and revalidated. You can use{' '}
          <code>cache</code> and <code>revalidate</code> options with <code>fetch</code> for SSR, ISR, or SSG.
        </p>
        <ul className="list-disc pl-5">
          <li>
            <code>cache: 'force-cache'</code> = SSG/ISR (static, revalidation according to settings)
          </li>
          <li>
            <code>cache: 'no-store'</code> = SSR (always fresh data)
          </li>
          <li>
            <code>revalidate</code> = ISR (Incremental Static Regeneration)
          </li>
        </ul>
      </div>
      <div className="mt-8 mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-yellow-900 text-sm">
        <h2 className="font-semibold mb-2">What is ISR (Incremental Static Regeneration)?</h2>
        <p className="mb-2">
          <strong>ISR</strong> allows you to update static content after you've built your site. With ISR, you can
          retain the benefits of static generation and use server-side rendering for specific pages, on-demand or at a
          set interval.
        </p>
        <ul className="list-disc pl-5 mb-2">
          <li>Pages are generated at build time and cached.</li>
          <li>
            After the <code>revalidate</code> period, the next request will trigger regeneration in the background.
          </li>
          <li>Users always see either the cached (stale) or the newly generated page, never a broken state.</li>
          <li>
            You can use <code>revalidatePath</code> or <code>revalidateTag</code> for on-demand cache invalidation.
          </li>
        </ul>
        <p className="mb-2">
          <a
            href="https://nextjs.org/docs/app/guides/incremental-static-regeneration#route-segment-config"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-yellow-700"
          >
            Read more in the official Next.js ISR documentation
          </a>
        </p>
      </div>
    </div>
  );
}
