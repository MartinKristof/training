export default function ApiLoading() {
  return (
    <div className="space-y-8">
      {/* Header skeleton */}
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column skeleton */}
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg animate-pulse">
            <div className="h-5 bg-blue-200 rounded w-1/2 mb-2"></div>
            <div className="space-y-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-3 bg-blue-200 rounded w-full"></div>
              ))}
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg animate-pulse">
            <div className="h-5 bg-green-200 rounded w-1/2 mb-2"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="border border-green-200 rounded p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-5 bg-green-200 rounded w-12"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                  <div className="h-3 bg-green-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column skeleton */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="space-y-4">
              <div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>

              <div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-32 bg-gray-200 rounded w-full"></div>
              </div>

              <div className="h-10 bg-gray-200 rounded w-full"></div>

              <div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-64 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg animate-pulse">
            <div className="h-5 bg-yellow-200 rounded w-3/4 mb-2"></div>
            <div className="space-y-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-3 bg-yellow-200 rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section skeleton */}
      <div className="bg-gray-50 p-4 rounded-lg animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i}>
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
