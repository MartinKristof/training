import React, { ReactNode } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/', name: 'Home' },
  { href: '/ssg', name: 'SSG (getStaticProps)' },
  { href: '/ssr', name: 'SSR (getServerSideProps)' },
  { href: '/users/1', name: 'SSG Paths (getStaticPaths)' },
  { href: '/csr', name: 'CSR (Client-Side)' },
  { href: '/404', name: 'Custom 404' },
  { href: '/500', name: 'Custom 500' },
  { href: '/api/users/1', name: 'API Route' },
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex gap-4">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="text-blue-600 hover:underline">
              {link.name}
            </Link>
          ))}
        </nav>
      </header>
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
}
