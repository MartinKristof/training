export default function BlogPostLoading() {
  return (
    <div className="space-y-8">
      {/* Back link skeleton */}
      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>

      <article>
        {/* Header skeleton */}
        <header className="mb-8">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
          <div className="flex items-center space-x-2">
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>
        </header>

        {/* Content skeleton */}
        <div className="prose prose-lg max-w-none">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="mb-4">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            </div>
          ))}
        </div>
      </article>

      {/* Features section skeleton */}
      <div className="bg-green-50 p-4 rounded-lg animate-pulse">
        <div className="h-5 bg-green-200 rounded w-1/2 mb-2"></div>
        <div className="space-y-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-3 bg-green-200 rounded w-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
