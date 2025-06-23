# Next.js 15 Complete Guide - App Router

This is a comprehensive Next.js 15 demonstration application that covers all essential concepts including App Router, Server Components, Data Fetching, Middleware, and more.

## Features Demonstrated

- **File-Based Routing (App Router)**: Modern routing with nested layouts, dynamic routes, catch-all and optional catch-all routes
- **Rendering**: Server Components, Client Components, SSR (Server-Side Rendering), SSG (Static Site Generation), ISR (Incremental Static Regeneration), Partial Prerendering
- **Data Fetching**: Native fetch with caching, ISR, client-side fetching, database access (Prisma), API routes (route handlers)
- **Server Actions**: Mutations and forms with server actions, progressive enhancement
- **Caching & Revalidation**: On-demand cache invalidation with `revalidateTag` and `revalidatePath`
- **Middleware**: Request/response modification, authentication, custom headers
- **Environments**: Node.js vs Edge Runtime, runtime switching
- **Parallel & Conditional Routes**: Parallel routes, slots, conditional rendering by segment
- **Error Handling**: Error boundaries, global error handling, not-found pages
- **MDX Support**: Markdown + JSX pages and custom components
- **Image Optimization**: Usage of the Next.js `<Image />` component
- **Instrumentation**: Custom instrumentation hooks and OpenTelemetry integration
- **Styling**: Tailwind CSS, global styles
- **Public Assets**: Static files in `/public`
- **Shared Components**: Reusable UI in `/components` and `/_components`

## Getting Started

Install dependencies from the monorepo root:

```bash
yarn install
```

Before starting the development server, generate the Prisma client:

```bash
yarn prisma:generate
```

Then run the development server for this app:

```bash
yarn dev
# or
npm run dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Application Structure

- **Home Page**: Overview of all Next.js concepts with navigation
- **Server Component Demo**: Pure server component rendering and data fetching
- **Client Component Demo**: Pure client component with interactivity
- **Client Data Fetching**: Fetching data on the client side
- **User Form (Server Action)**: Form with server action, validation, and cache revalidation
- **Progressive Enhancement Form**: Form that works with and without JavaScript
- **Blog (SSG/ISR)**: Static site generation with dynamic routes and incremental regeneration
- **Dashboard (SSR)**: Server-side rendering with real-time data
- **Database Demo**: Prisma + SQLite, server actions, and cache revalidation
- **API Routes**: REST API with CRUD operations (route handlers)
- **Middleware Demo**: Interactive demonstration of middleware features
- **Runtime Demo**: Node.js vs Edge runtime switching
- **Caching Demo**: Examples of fetch caching, ISR, and revalidation
- **Instrumentation Demo**: Custom instrumentation and OpenTelemetry
- **Image Demo**: Usage of the Next.js <Image /> component
- **MDX Demo**: Markdown + JSX pages and custom components
- **Parallel Routes Demo**: Parallel routes and slots
- **Conditional Routes Demo**: Conditional rendering by route segment (e.g. user/admin)
- **Catch-all & Optional Catch-all Routes**: Dynamic and optional catch-all routing
- **Error Handling**: Error boundaries, global error, not-found pages
- **Shared Components**: Reusable UI in /components and /\_components
- **Public Assets**: Static files in /public

## Environment Variables

This project uses [Next.js environment variables](https://nextjs.org/docs/pages/guides/environment-variables) via `.env` files. To add your own variables, create a `.env` or `.env.local` file in the `apps/next-guide-app` directory:

```
MY_SECRET_KEY=your-secret-value
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_API_URL=http://localhost:3000/api
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
