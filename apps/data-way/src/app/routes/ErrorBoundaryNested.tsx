import { Link } from 'react-router';

export const ErrorBoundaryNested = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
    <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Nested Page Not Found</h2>
    <p className="text-gray-600 mb-8 max-w-md">Oops! The page you're looking for doesn't exist or has been moved.</p>
    <Link to="/users" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
      Go Back to Users
    </Link>
  </div>
);
