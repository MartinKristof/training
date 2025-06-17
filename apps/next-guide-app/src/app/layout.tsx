import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js 15 Complete Guide - Next Guide App',
  description:
    'Comprehensive Next.js 15 demo covering App Router, Server Components, Data Fetching, Middleware, and more',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <h1 className="text-xl font-bold text-gray-900">Next.js 15 Complete Guide</h1>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Link href="/" className="text-gray-500 hover:text-gray-700">
                    Home
                  </Link>
                  <Link href="/api" className="text-gray-500 hover:text-gray-700">
                    API
                  </Link>
                  <Link href="/blog" className="text-gray-500 hover:text-gray-700">
                    Blog
                  </Link>
                  <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
                    Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="bg-white shadow-sm rounded-lg p-6">{children}</div>
            </div>
          </main>

          <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-sm z-10 h-12">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">© {new Date().getFullYear()} Next Guide App - Martin Krištof</p>
                <div className="flex space-x-4">
                  <Link
                    href="https://github.com/MartinKristof/training"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    GitHub Repo
                  </Link>
                  <Link
                    href="https://kristofmartin.eu"
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
      </body>
    </html>
  );
}
