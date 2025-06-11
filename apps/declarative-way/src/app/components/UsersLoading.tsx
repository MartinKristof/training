export const UsersLoading = () => (
  <div className="animate-pulse">
    <div className="flex items-center justify-between mb-6">
      <div className="h-8 w-24 bg-gray-200 rounded"></div>
      <div className="h-10 w-32 bg-gray-200 rounded"></div>
    </div>

    <div className="grid gap-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="p-4 border rounded-lg flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
            <div className="h-3 w-48 bg-gray-200 rounded"></div>
          </div>
          <div className="flex space-x-2">
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
