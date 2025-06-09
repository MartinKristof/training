export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-sm z-10">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} React Router Demo - Declarative</p>
          <div className="flex space-x-4">
            <a
              href="https://github.com/remix-run/react-router"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              GitHub
            </a>
            <a
              href="https://reactrouter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Documentation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
