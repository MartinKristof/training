export default function BlogLoading() {
  return (
    <div className="space-y-8">
      {/* Header skeleton */}
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
      </div>

      {/* Blog posts skeleton */}
      <div className="grid gap-6">
        {[...Array(3)].map((_, i) => (
          <article key={i} className="bg-white p-6 rounded-lg shadow-sm border animate-pulse">
            <div className="flex items-center space-x-2 mb-2">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-4"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </article>
        ))}
      </div>

      {/* Benefits section skeleton */}
      <div className="bg-blue-50 p-4 rounded-lg animate-pulse">
        <div className="h-5 bg-blue-200 rounded w-1/2 mb-2"></div>
        <div className="space-y-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-3 bg-blue-200 rounded w-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
