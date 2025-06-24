import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

// Environment variables are now managed via .env files. See: https://nextjs.org/docs/pages/guides/environment-variables

const nextConfig: NextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // Enable experimental features
  experimental: {
    // Enable server actions
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
    // typedRoutes: true, // without turbopack
    // Enable partial prerendering
    // ppr: true,
    reactCompiler: true,
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'jsonplaceholder.typicode.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },

  // Headers configuration
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/old-blog',
        destination: '/blog',
        permanent: true,
      },
    ];
  },

  // Rewrites
  async rewrites() {
    return [
      {
        source: '/api/legacy/:path*',
        destination: '/api/:path*',
      },
    ];
  },

  // Webpack configuration
  // webpack: config => {
  //   // Custom webpack configuration
  //   config.resolve.fallback = {
  //     ...config.resolve.fallback,
  //     fs: false,
  //   };

  //   return config;
  // },

  // Compiler configuration
  compiler: {
    // Remove console.logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Output configuration
  // output: 'standalone',

  // Trailing slash configuration
  trailingSlash: false,

  // Base path (useful for deployment)
  // basePath: '/nextjs-demo',

  // Asset prefix (useful for CDN)
  // assetPrefix: 'https://cdn.example.com',

  // Enable source maps in development
  productionBrowserSourceMaps: false,

  // Configure TypeScript
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: false,
  },

  // Configure ESLint
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },

  // Configure logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // Configure server components
  serverExternalPackages: ['@prisma/client'],

  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
};

const withMDX = createMDX();

export default withMDX(nextConfig);
