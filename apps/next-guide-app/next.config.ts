import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable experimental features
  experimental: {
    // Enable server actions
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
    // typedRoutes: true, // without turbopack
    // Enable partial prerendering
    // ppr: true,
  },

  // Image optimization
  images: {
    domains: ['jsonplaceholder.typicode.com'],
    formats: ['image/webp', 'image/avif'],
  },

  // Environment variables
  env: {
    CUSTOM_KEY: 'custom-value',
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
    // eslint-disable-next-line no-undef
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Output configuration
  output: 'standalone',

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
  serverExternalPackages: ['mongodb'],
};

export default nextConfig;
