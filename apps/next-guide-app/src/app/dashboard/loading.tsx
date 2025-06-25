export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
      </div>

      {/* Stats Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-sm border animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>

      {/* Recent Activity skeleton */}
      <div className="bg-white p-6 rounded-lg shadow-sm border animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div className="space-y-1">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Info sections skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg animate-pulse">
          <div className="h-5 bg-blue-200 rounded w-1/2 mb-2"></div>
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-3 bg-blue-200 rounded w-full"></div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg animate-pulse">
          <div className="h-5 bg-yellow-200 rounded w-1/3 mb-2"></div>
          <div className="space-y-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-3 bg-yellow-200 rounded w-full"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
