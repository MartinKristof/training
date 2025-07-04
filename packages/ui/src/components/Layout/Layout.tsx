import type { FC } from 'react';
import { Link, NavLink, Outlet } from 'react-router';

export interface NavigationItem {
  path: string;
  name: string;
}

export interface LayoutProps {
  /**
   * The title of the application
   */
  title: string;
  /**
   * Array of navigation items to display in the header
   */
  navigation: NavigationItem[];
}

export const Layout: FC<LayoutProps> = ({ title, navigation }) => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    {/* Navigation */}
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">{title}</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`
                  }
                  end={item.path === '/'}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          {navigation.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`
              }
              end={item.path === '/'}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>

    {/* Main Content */}
    <main className="flex-1 max-w-7xl w-full mx-auto py-6 sm:px-6 lg:px-8 mb-16">
      <div className="px-4 py-6 sm:px-0">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <Outlet />
        </div>
      </div>
    </main>

    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-sm z-10 h-12">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Training - Martin Krištof</p>
          <div className="flex space-x-4">
            <Link
              to="https://github.com/MartinKristof/training"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              GitHub Repo
            </Link>
            <Link
              to="https://kristofmartin.eu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              My Website
            </Link>
          </div>
        </div>
      </div>
    </footer>
  </div>
);
