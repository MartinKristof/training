# Next.js 15 Complete Guide

This is a comprehensive Next.js 15 demonstration application that covers all essential concepts including App Router, Server Components, Data Fetching, Middleware, and more.

## Features Demonstrated

- **File-Based Routing (App Router)**: Using the new App Router with file-system based routing
- **Rendering**: Server Components, Client Components, SSR, SSG
- **Data Fetching**: fetch function, caching, database connections
- **Middleware**: Request/response modification, authentication
- **Environments**: Node.js vs Edge Runtime
- **Configuration**: next.config.js, instrumentation

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Application Structure

- **Home Page**: Overview of all Next.js concepts with navigation
- **Blog (SSG)**: Static site generation with dynamic routes
- **Dashboard (SSR)**: Server-side rendering with real-time data
- **API Routes**: Complete REST API with CRUD operations
- **Middleware Demo**: Interactive demonstration of middleware features

## Environment Variables

This project uses [Next.js environment variables](https://nextjs.org/docs/pages/guides/environment-variables) via `.env` files. To add your own variables, create a `.env` or `.env.local` file in the `apps/next-guide-app` directory:

```
MY_SECRET_KEY=your-secret-value
NEXT_PUBLIC_API_URL=https://api.example.com
```

- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.
- All other variables are only available on the server.

**Do not commit secrets to version control!**

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
