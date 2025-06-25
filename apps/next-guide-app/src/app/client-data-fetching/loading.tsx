export default function ClientComponentLoading() {
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
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-3 bg-blue-200 rounded w-full"></div>
              ))}
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg animate-pulse">
            <div className="h-5 bg-green-200 rounded w-1/2 mb-2"></div>
            <div className="space-y-1">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-3 bg-green-200 rounded w-full"></div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg animate-pulse">
            <div className="h-5 bg-yellow-200 rounded w-1/2 mb-2"></div>
            <div className="space-y-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-3 bg-yellow-200 rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column skeleton */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>

            {/* Counter skeleton */}
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-16 mx-auto"></div>
              <div className="flex justify-center space-x-4">
                <div className="h-10 bg-gray-200 rounded w-20"></div>
                <div className="h-10 bg-gray-200 rounded w-20"></div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="space-y-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-3 bg-gray-200 rounded w-full"></div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg animate-pulse">
            <div className="h-5 bg-purple-200 rounded w-1/2 mb-2"></div>
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-3 bg-purple-200 rounded w-1/3"></div>
                  <div className="h-3 bg-purple-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
