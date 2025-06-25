# Next.js 15 Complete Guide – Pages Router

This is a comprehensive Next.js 15 demonstration application that covers all essential concepts of the **Pages Router** (legacy approach), including file-based routing, SSR, SSG, API routes, and custom error pages.

## Features Demonstrated

- **File-Based Routing (Pages Router):** Classic routing in the `pages/` directory, including dynamic and catch-all routes
- **Rendering Strategies:** SSR (`getServerSideProps`), SSG (`getStaticProps`), CSR (client-side fetching with SWR)
- **Dynamic Routes:** Static generation with dynamic paths (`getStaticPaths`)
- **API Routes:** REST API endpoints in `pages/api/` (including dynamic API routes)
- **Custom App & Document:** Custom `_app.tsx` for global styles/layout, `_document.tsx` for HTML structure
- **Custom Error Pages:** Custom `404.tsx`, `500.tsx`, and `_error.tsx` for error handling
- **Styling:** Tailwind CSS, global styles
- **Public Assets:** Static files in `/public`
- **Shared Components:** Reusable UI in `/src/components`

## Application Structure

- **Home Page:** Overview and navigation to all demos
- **SSG Demo:** Static Site Generation with `getStaticProps`
- **SSR Demo:** Server-Side Rendering with `getServerSideProps`
- **CSR Demo:** Client-Side Rendering with SWR
- **User Detail (Dynamic Route):** Statically generated user detail page with `getStaticPaths`
- **API Routes:** REST API endpoints, including dynamic API route for user detail
- **Custom 404 Page:** Static not-found page
- **Custom 500 Page:** Static server error page
- **Custom \_app.tsx:** Global layout and styles
- **Custom \_document.tsx:** Custom HTML document structure
- **Custom \_error.tsx:** Error boundary for runtime errors

## Environment Variables

This project uses [Next.js environment variables](https://nextjs.org/docs/pages/guides/environment-variables) via `.env` files. To add your own variables, create a `.env` or `.env.local` file in the `apps/next-guide-pages` directory:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.
- All other variables are only available on the server.

**Do not commit secrets to version control!**

## Getting Started

Install dependencies from the monorepo root:

```bash
yarn install
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

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) – learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) – an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) – your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
