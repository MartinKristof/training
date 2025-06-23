---
marp: true
theme: default
class: invert
size: 16:9
paginate: true
autoScale: true
math: mathjax
style: |
  img {
    background: #fff;
    object-fit: contain;
    max-height: 80vh;
    max-width: 100%;
  }

  img[alt~="center"] {
    display: block;
    width: auto;
    height: auto;
    margin-left: auto;
    margin-right: auto;
  }

  img[alt~="right"] {
    float: right;
    width: 40%;
    margin-left: 1em;
    max-height: 70vh;
  }

  img[src*="me"] {
    background: #000;
  }

  /* Table styles */
  table {
    font-size: 0.9em;
    width: auto;
    margin: 0 auto;
  }

  th, td {
    padding: 0.4em 0.6em;
    line-height: 1.2;
  }
---

<!-- _class: title-slide -->

# Next.js Training

## Modern React Web Development

**Martin Krištof**

---

# About Me

![right](assets/images/me.jpg)

- **Productboard** (since March 2025)
  - Product Staff Engineer
  - Tech Lead Nucleus Guild, member of FE guild
- **React Experience**
  - React Lover (10+ years)
  - Consultant
  - Courses & Workshops (React, Next.js, QA)
  - Video courses for Skillmea

---

# Agenda

1. Pages Router
   1.1. File-Based Routing
   1.2. Rendering
   1.3. Data fetching
2. App Router
   2.1. File-Based Routing
   2.2. Rendering
   2.3 Data fetching
3. Middleware

---

4. Environments
5. Configuration & Instrumentation
6. Extra: Styling, Forms, Error Boundaries, MDX, Images, Testing

---

# Pages Router

---

## Pages Router (Legacy)

- Demonstrated in the separate project: **next-guide-pages** (`apps/next-guide-pages`)
- File-based routing in the `pages/` directory
- Each file in `pages/` is a route (e.g., `index.tsx`, `users/[id].tsx`)
- Dynamic routes: `[id].tsx`, catch-all: `[...slug].tsx`
- API routes: `pages/api/`

---

- Special files for advanced customization:
  - **\_app.tsx**: Custom root component for all pages ([see file](apps/next-guide-pages/pages/_app.tsx)). Use for global styles, context providers, etc.
  - **\_document.tsx**: Customizes the HTML document structure ([see file](apps/next-guide-pages/pages/_document.tsx)). Use for meta tags, lang, etc.
  - **\_error.tsx**: Custom error page for runtime errors ([see file](apps/next-guide-pages/pages/_error.tsx)).
  - **404.tsx**: Custom 404 Not Found page ([see file](apps/next-guide-pages/pages/404.tsx)).
  - **500.tsx**: Custom 500 Internal Server Error page ([see file](apps/next-guide-pages/pages/500.tsx)).

---

**Demos:**

- [Homepage](apps/next-guide-pages/pages/index.tsx) ([/](http://localhost:3001/))
- [User detail (dynamic route)](apps/next-guide-pages/pages/users/[id].tsx) ([/users/1](http://localhost:3001/users/1))
- [API users route](apps/next-guide-pages/pages/api/users.ts) ([/api/users](http://localhost:3001/api/users))
- [Catch-all route](apps/next-guide-pages/pages/ssg.tsx) ([/ssg](http://localhost:3001/ssg))

---

### API Routes

- Serverless functions as API endpoints in `pages/api/`
- Each file in `api/` is an endpoint (GET, POST, etc.)
- Use the built-in types: `NextApiRequest` and `NextApiResponse` from `next`
- Response helpers: `res.status`, `res.json`, `res.send`, `res.redirect`, `res.revalidate`
- Supports dynamic routes (`pages/api/post/[pid].ts`) and catch-all routes (`pages/api/post/[...slug].ts`)
- TypeScript support for type-safe APIs
- [Official documentation](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)

---

**Example: Basic API Route**

```ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: 'Hello from Next.js!' });
}
```

---

**Example: Dynamic API Route**

```ts
// pages/api/post/[pid].ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pid } = req.query;
  res.end(`Post: ${pid}`);
}
```

---

**Example: Catch-all API Route**

```ts
// pages/api/post/[...slug].ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;
  res.end(`Post: ${Array.isArray(slug) ? slug.join(', ') : slug}`);
}
```

---

# Linking and Navigating

- Next.js provides a built-in `<Link>` component for client-side navigation between routes.
- Using `<Link>` enables fast, seamless transitions without full page reloads, preserving state and improving UX.
- `<Link>` automatically prefetches linked pages in the background for faster navigation (when visible in the viewport).
- Prefer `<Link>` over a plain `<a>` tag for internal navigation. Use `<a>` only for external links.
- You can disable prefetching with the `prefetch={false}` prop.
- `<Link>` works with dynamic routes, catch-all routes, and route groups.

---

**Example:**

```tsx
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <Link href="/about">About</Link>
      <Link href="/blog" prefetch={false}>
        Blog (no prefetch)
      </Link>
      <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
        Next.js Docs
      </a>
    </nav>
  );
}
```

---

- For advanced use cases, you can use the `useRouter`, `usePathname`, and `useSearchParams` hooks from `next/navigation`.
- [Official documentation: Linking and Navigating](https://nextjs.org/docs/app/getting-started/linking-and-navigating)

---

## Rendering & Data Fetching

---

- The Pages Router supports multiple rendering and data fetching strategies:
  - **SSR (Server-Side Rendering):** Use `getServerSideProps` to fetch data on every request.
    - [SSR example](apps/next-guide-pages/pages/ssr.tsx) ([/ssr](http://localhost:3001/ssr))
  - **SSG (Static Site Generation):** Use `getStaticProps` (and optionally `getStaticPaths`) to pre-render pages at build time.
    - [SSG example](apps/next-guide-pages/pages/ssg.tsx) ([/ssg](http://localhost:3001/ssg))

---

**getStaticPaths fallback options:**

- `fallback: false` – Only the paths returned by getStaticPaths are generated at build time. Any other route will show a 404 page.
- `fallback: true` – New paths not returned by getStaticPaths will be rendered on-demand on the first request, then cached for future requests. The page will show a loading state until the content is generated.
- `fallback: 'blocking'` – New paths are rendered on-demand like `true`, but the user will not see a loading state; the server waits until the page is generated and then serves the full page.

Use `false` for small/finite sets of pages, `true` or `'blocking'` for large or dynamic sets where not all paths are known at build time.

- [getStaticPaths details](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props#when-does-getstaticprops-run)

---

- **Client-side Fetching:** Use React hooks like `useEffect` to fetch data on the client after the page loads.
  - [CSR example](apps/next-guide-pages/pages/csr.tsx) ([/csr](http://localhost:3001/csr))
- You can combine these strategies as needed for your use case.
- See also: [Next.js Data Fetching Docs](https://nextjs.org/docs/pages/building-your-application/data-fetching/overview)

---

# App Router

---

## App Router (Modern)

- File-based routing in `src/app/`
- Each folder with `page.tsx` = a route
- Supports layouts, nested routes, dynamic routes, catch-all routes
- **Layout:**
  - [Root layout.tsx](/apps/next-guide-app/src/app/layout.tsx) – defines the main structure, shared UI, and providers for the whole app.
- **Loading UI:**
  - You can add `loading.tsx` to any route folder for custom loading skeletons.
  - [API loading](apps/next-guide-app/src/app/api/loading.tsx)
  - [Dashboard loading](apps/next-guide-app/src/app/dashboard/loading.tsx)
  - [Blog post loading](apps/next-guide-app/src/app/blog/[slug]/loading.tsx)
- [Official Project Structure documentation](https://nextjs.org/docs/app/getting-started/project-structure)

**Demos:**

- [Homepage route](apps/next-guide-app/src/app/page.tsx) ([/](http://localhost:3000/))
- [Dynamic blog route](apps/next-guide-app/src/app/blog/[slug]/page.tsx) ([/blog/:slug](http://localhost:3000/blog/server-components-vs-client-components))
- [Parallel routes demo](apps/next-guide-app/src/app/parallel-demo/page.tsx) ([/parallel-demo](http://localhost:3000/parallel-demo))
- [Conditional routes demo](apps/next-guide-app/src/app/conditional-routes-demo/[role]/page.tsx) ([/conditional-routes-demo/user](http://localhost:3000/conditional-routes-demo/user))
- [Catch-all route](apps/next-guide-app/src/app/docs/[...slug]/page.tsx) ([/docs/a/b/c](http://localhost:3000/docs/a/b/c))
- [Optional catch-all](apps/next-guide-app/src/app/optional-catch-all/[[...slug]]/page.tsx) ([/optional-catch-all](http://localhost:3000/optional-catch-all))

---

## Rendering & Data Fetching

---

## Server vs Client Components

Server Components are rendered on the server and sent as HTML to the client, while Client Components are rendered in the browser. In Next.js App Router, **Server Components are the default**—you only need to use Client Components when you need interactivity, browser APIs, or React hooks like `useState`, `useEffect`, etc.

- Server Components improve performance by reducing the amount of JavaScript sent to the client.
- Client Components are needed for interactivity (event handlers, state, browser APIs).
- You can mix Server and Client Components on the same page.
- Mark a component as client by adding `"use client"` at the top of the file.

---

![center](assets/images/server-client-hierarchy.png)

---

**Demos:**

- [Server component example](apps/next-guide-app/src/app/server-component/page.tsx) ([/server-component](http://localhost:3000/server-component))
- [Blog post: Server vs Client Components](apps/next-guide-app/src/app/blog/[slug]/page.tsx?slug=server-components-vs-client-components)([/blog/server-components-vs-client-components](http://localhost:3000/blog/server-components-vs-client-components))

---

![center](assets/images/component-split-example.png)

---

**Demos:**

- [Client component demo](apps/next-guide-app/src/app/client-component/page.tsx) ([/client-component](http://localhost:3000/client-component))
- with [Counter component](apps/next-guide-app/src/app/components/Counter.tsx)

---

> For more, see [Server Components vs. Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
> Nice explanation [Ariel Shulman - WebExpo](https://slideslive.com/39043219/conquering-react-concurrency?ref=search-presentations) - from 29:38

---

## SSR & SSG

- SSR: Server Side Rendering (on request)
- SSG: Static Site Generation (at build time)
- Use `generateStaticParams` for SSG

**Demos:**

- [Dashboard (SSR)](apps/next-guide-app/src/app/dashboard/page.tsx) ([/dashboard](http://localhost:3000/dashboard)) - must be logged
- [Blog (SSG)](apps/next-guide-app/src/app/blog/page.tsx) ([/blog](http://localhost:3000/blog))

---

## The `fetch` function

- Native fetch in server components
- Automatic caching

**Demos:**

- [Client data fetching](apps/next-guide-app/src/app/client-data-fetching/page.tsx) ([/client-data-fetching](http://localhost:3000/client-data-fetching))

---

## Caching

- By default, fetch requests are **not** cached in Next.js 15+ ([docs](https://nextjs.org/docs/app/getting-started/caching-and-revalidating))
- Enable caching explicitly with `cache: 'force-cache'` or `next.revalidate` for ISR:

  ```js
  // Static caching
  fetch(url, { cache: 'force-cache' });

  // ISR (Incremental Static Regeneration)
  fetch(url, { next: { revalidate: 3600 } });
  ```

- Use `cache: 'no-store'` to always fetch fresh data (SSR)

---

**Controlling static/dynamic rendering with `dynamic` export:**

- In App Router, you can control how a route is rendered and cached using the `dynamic` export at the top of your file:

  ```js
  // page.tsx, layout.tsx, or route.ts
  export const dynamic = 'auto'; // (default) Next.js decides based on usage
  // or
  export const dynamic = 'force-static'; // always statically render and cache
  // or
  export const dynamic = 'force-dynamic'; // always render on the server, no cache
  ```

- **'auto'** (default): Next.js chooses static or dynamic based on your code (e.g. use of fetch, cookies, headers).
- **'force-static'**: Forces static rendering and caching, even if you use dynamic code (errors if truly dynamic).
- **'force-dynamic'**: Forces server-side rendering on every request, disables all caching.

---

Use these options to fine-tune performance and cache behavior for each route.

[Dashboard page example](apps/next-guide-app/src/app/dashboard/page.tsx) ([/dashboard](http://localhost:3000/dashboard)) - see build report
[Docs: Static and Dynamic Rendering](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering)

**Demos:**

- [Caching demo](apps/next-guide-app/src/app/caching-demo/page.tsx)([/caching-demo/](http://localhost:3000/caching-demo/))

---

**Note on combining `dynamic` and `revalidate`:**

- `revalidate` only has an effect when the route is statically rendered (default or `force-static`).
- If you set `dynamic = 'force-dynamic'`, any `revalidate` value is ignored—every request is always rendered on the server, no cache.
- Example:
  ```js
  export const dynamic = 'force-dynamic';
  export const revalidate = 60; // This will be ignored
  ```
- Use `revalidate` for Incremental Static Regeneration (ISR) with static routes, not with `force-dynamic`.

---

## Server Actions

- **Server Actions** let you run server-side code directly from your React components—no need to create a separate API route.
- Useful for mutations (create, update, delete), form submissions, and cache invalidation.
- Secure: code runs only on the server, never sent to the client.
- Can be called from forms or programmatically.
- Great for progressive enhancement (forms work even without JS).

---

**Minimal example:**

```tsx
// In a server component
'use server';

export async function createUser(formData) {
  // Save to DB, revalidate cache, etc.
}

// In your page/component
<form action={createUser}>
  <input name="name" />
  <button type="submit">Create</button>
</form>;
```

---

- **Examples:**

  - [User form server action](apps/next-guide-app/src/app/user-form-server-action/server-actions.ts) - can be combined with [useActionState](apps/next-guide-app/src/app/user-form-server-action/page.tsx)
  - [Database demo server actions](apps/next-guide-app/src/app/database-demo/server-actions.ts)

- You can also call `revalidateTag` or `revalidatePath` inside a server action after a mutation.
- [Docs: Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)

---

### On-demand Revalidation: `revalidateTag` and `revalidatePath`

- **`revalidateTag(tag)`** lets you purge the cache for a specific tag on demand. Use it after a mutation (e.g., creating or updating a record) to ensure that data with this tag is refetched on the next request.
- Add tags when fetching data:
  ```js
  fetch(url, { next: { tags: ['users'] } });
  ```
- After a mutation, call on the server:

  ```js
  import { revalidateTag } from 'next/cache';
  revalidateTag('users');
  ```

  ***

- **`revalidatePath(path)`** purges the cache for a specific path (page or API endpoint). Use it when you want to revalidate a particular page after a data change.
  ```js
  import { revalidatePath } from 'next/cache';
  revalidatePath('/database-demo');
  ```
- Both functions can be used in server actions or route handlers.

---

- See examples in the project:
  - [User Form Server Action (revalidateTag)](apps/next-guide-app/src/app/user-form-server-action/server-actions.ts) ([/user-form-server-action](http://localhost:3000/user-form-server-action))
  - [Database Demo (revalidatePath)](apps/next-guide-app/src/app/database-demo/server-actions.ts) ([/database-demo](http://localhost:3000/database-demo))
- More in the docs: [revalidateTag](https://nextjs.org/docs/app/api-reference/functions/revalidateTag), [revalidatePath](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)

---

## Connecting to Database and Filesystem

- Use Prisma for DB, Node APIs for filesystem

**Demos:**

- [Database demo](apps/next-guide-app/src/app/database-demo/page.tsx) ([/database-demo](http://localhost:3000/database-demo))
- [Prisma schema](apps/next-guide-app/prisma/schema.prisma)

**Tip:** To explore and edit your database visually, you can use Prisma Studio:

```bash
yarn prisma studio
```

---

# API Routes

- In the App Router, API routes are implemented as **Route Handlers** using `route.ts` (or `route.js`) files inside the `app` directory.
- Each route handler can export HTTP methods as functions: `GET`, `POST`, `PUT`, `DELETE`, etc.
- You can use either the default Node.js runtime or opt-in to the Edge runtime by exporting `export const runtime = 'edge'`.
- Use the `NextRequest` object to access request data (body, query, headers, cookies).
- Use the `NextResponse` object to send responses.

---

- Route handlers are colocated with your routes, and support dynamic segments, catch-all, and route groups.
- **Difference from Pages Router:** No need for `api/` prefix in the URL, and you have full control over HTTP methods and runtime.
- [Official documentation: Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

**Example: Basic GET and POST handler**

```ts
// app/api/hello/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Hello from App Router!' });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  // process data...
  return NextResponse.json({ received: data });
}
```

- For dynamic API routes, use `[param]` or `[...slug]` in the folder name, just like for pages.
- You can also use middleware and Edge runtime for advanced use cases.

---

# Route Groups & Segmented Sections

- In the App Router, you can separate sections using parentheses folders, e.g., `(marketing)`.
- Allows you to separate, for example, public and internal parts of the site, or marketing pages.
- **Example:**
  - [Marketing group](<apps/next-guide-app/src/app/(marketing)/about/page.tsx>) ([/about](http://localhost:3000/about))
- [Official documentation](https://nextjs.org/docs/app/building-your-application/routing/route-groups)

---

# Parallel Routes & Slots

- Parallel routes allow you to render multiple independent parts of the page (slots) at the same time.
- Each slot is a folder starting with `@` (e.g., `@feed`, `@notifications`).
- Slots can also be nested.
- **Examples:**
  - [Main parallel-demo](apps/next-guide-app/src/app/parallel-demo/page.tsx) ([/parallel-demo](http://localhost:3000/parallel-demo))
  - [Feed slot](apps/next-guide-app/src/app/parallel-demo/@feed/page.tsx) ([/parallel-demo](http://localhost:3000/parallel-demo))
  - [Notifications slot](apps/next-guide-app/src/app/parallel-demo/@notifications/page.tsx) ([/parallel-demo](http://localhost:3000/parallel-demo))
  - [Nested slot feed/archive](apps/next-guide-app/src/app/parallel-demo/@feed/archive/page.tsx) ([/parallel-demo/archive](http://localhost:3000/parallel-demo/archive))
- [Official documentation](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)

---

# Conditional Routes & Slots

- Conditional routes allow you to dynamically change content based on a segment (e.g., user role).
- Slots like `@admin`, `@user` within a dynamic folder `[role]`.
- **Examples:**
  - [Conditional routes demo](apps/next-guide-app/src/app/conditional-routes-demo/[role]/page.tsx) ([/conditional-routes-demo/user](http://localhost:3000/conditional-routes-demo/user))
  - [Admin slot](apps/next-guide-app/src/app/conditional-routes-demo/[role]/@admin/page.tsx) ([/conditional-routes-demo/admin](http://localhost:3000/conditional-routes-demo/admin))
  - [User slot](apps/next-guide-app/src/app/conditional-routes-demo/[role]/@user/page.tsx) ([/conditional-routes-demo/user](http://localhost:3000/conditional-routes-demo/user))
- [Official documentation](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes#conditional-routes)

---

# Progressive Enhancement

- Progressive enhancement means the form works even without JavaScript – validation and processing happen on the server.
- In Next.js, you can combine this with Server Actions.
- Benefits: better accessibility, SEO, fallback for older browsers.
- **Examples:**
  - [Progressive enhancement form](apps/next-guide-app/src/app/progressive-enhancement-form/page.tsx) ([/progressive-enhancement-form](http://localhost:3000/progressive-enhancement-form))
  - [Server action](apps/next-guide-app/src/app/progressive-enhancement-form/server-actions.ts)
- [Official documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations)

---

# Error Boundaries & Error Handling

- Next.js App Router has special files for error boundaries:
  - `error.tsx` – error boundary for a specific route
  - `global-error.tsx` – global error boundary for the whole app ([global-error.tsx](apps/next-guide-app/src/app/global-error.tsx))
  - `not-found.tsx` – page for 404 errors ([not-found.tsx](apps/next-guide-app/src/app/not-found.tsx))
- **Examples:**
  - [error.tsx](apps/next-guide-app/src/app/error.tsx)
  - [global-error.tsx](apps/next-guide-app/src/app/global-error.tsx)
  - [not-found.tsx](apps/next-guide-app/src/app/not-found.tsx)[/not-found](http://localhost:3000/not-found))
- [Official documentation](https://nextjs.org/docs/app/building-your-application/routing/error-handling)

---

# 4. Middleware

- Code that runs before a request is completed
- `src/app/middleware.ts`
- Use for auth, redirects, logging

**Demos:**

- [Middleware file](apps/next-guide-app/src/middleware.ts)
- [Middleware demo page](apps/next-guide-app/src/app/middleware-demo/page.tsx) ([/middleware-demo](http://localhost:3000/middleware-demo))

---

# 5. Environments

## Environment Variables

- Next.js supports environment variables via `.env` files in the project root.
- Supported files (loaded in this order):
  1. `.env.$(NODE_ENV).local`
  2. `.env.local` (not loaded in test)
  3. `.env.$(NODE_ENV)`
  4. `.env`

---

- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser (client-side). Others are only available on the server.
- Example `.env`:
  ```env
  DATABASE_URL=postgres://user:pass@localhost:5432/db
  NEXT_PUBLIC_API_URL=https://api.example.com
  ```

---

- Usage in code:
  ```js
  // Server only
  const dbUrl = process.env.DATABASE_URL;
  // Client or server
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  ```
- Variables are inlined at build time for the client. For runtime values, use server-side code or API endpoints.
- You can reference other variables in `.env` using `$VAR_NAME`.
- For advanced use (e.g. loading env in scripts), use `@next/env`:
  ```js
  import { loadEnvConfig } from '@next/env';
  loadEnvConfig(process.cwd());
  ```

[Official docs: Environment Variables](https://nextjs.org/docs/app/guides/environment-variables#environment-variable-load-order)

---

## Passing Data Between Environments

When deploying Next.js in Docker or other environments, you often need to pass environment variables securely and correctly.

- **.env files**: Place `.env`, `.env.production`, etc. in the project root. These are loaded automatically at build/start time.
- **Server-side variables** (e.g. `DATABASE_URL`) are read at runtime and can be passed when starting the container:
  ```bash
  docker run -e DATABASE_URL=postgres://user:pass@host/db my-next-app
  # or
  docker run --env-file .env my-next-app
  ```

---

- **Client-side variables** (must start with `NEXT_PUBLIC_`) are inlined at build time. They must be set before running `next build`:
  ```Dockerfile
  # Example Dockerfile snippet
  ENV NEXT_PUBLIC_API_URL=https://api.example.com
  RUN yarn build
  ```

---

- **Build-time vs. Run-time:**
  - Server envs can be changed at container start.
  - Client envs are "baked in" at build time—changing them later requires a rebuild.
- **Best practice:**
  - Use server envs for secrets and runtime config.
  - Use client envs only for values that can be public and are known at build time.

---

### Example: Dockerfile for Next.js

```Dockerfile
# Install dependencies only when needed
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Build the app
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
# Set build-time envs (client-side)
ENV NEXT_PUBLIC_API_URL=https://api.example.com
RUN yarn build

# Production image
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Set runtime envs (server-side)
ENV DATABASE_URL=postgres://user:pass@host/db

EXPOSE 3000
CMD ["yarn", "start"]
```

---

- Set `NEXT_PUBLIC_` variables before `yarn build` (build-time, client-side)
- Set server-side variables (like `DATABASE_URL`) at runtime with `docker run -e ...`

**Official docs:**

- [Environment Variables](https://nextjs.org/docs/app/guides/environment-variables#environment-variable-load-order)
- [Docker deployment](https://nextjs.org/docs/app/deployment#docker)

---

## Node.js vs. Edge

- Next.js can run on Node.js or Edge runtime
- Use `export const runtime = 'edge'` in a route/middleware

**Demo:**

- [Runtime demo](apps/next-guide-app/src/app/runtime-demo/page.tsx) ([/runtime-demo](http://localhost:3000/runtime-demo))

---

# Different Types of API Routes (Edge/Node, request info)

- Next.js allows you to write API routes for different runtimes:
  - **Edge runtime:** faster, limited API (e.g., no fs)
  - **Node runtime:** full access to Node.js API
- You can also get request info (headers, cookies, etc.)
- **Examples:**
  - [API route Edge](apps/next-guide-app/src/app/api/runtime-edge/route.ts)
  - [API route Node](apps/next-guide-app/src/app/api/runtime-node/route.ts)
  - [API request info](apps/next-guide-app/src/app/api/request-info/route.ts)
- [Official documentation](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

# 6. Configuration & Instrumentation

---

# Next Config

Next.js allows you to configure various aspects of your application using the `next.config.js` or `next.config.ts` file.

- Mode settings (strict mode, experimental features)
- Image, headers, file types, build options
- **assetPrefix**: Set a custom prefix for serving static assets (e.g. from a CDN).
- **basePath**: Serve your app from a subpath (e.g. `/docs` or `/app`).
- **Redirects and Rewrites**

---

**Example:**

```js
// next.config.ts
const nextConfig: NextConfig = {
  assetPrefix: 'https://cdn.example.com', // serve static assets from CDN
  basePath: '/docs', // app will be served from https://yourdomain.com/docs
};
```

Use `assetPrefix` when deploying static assets to a CDN. Use `basePath` when your app is not at the root of the domain.

---

## Redirects and Rewrites

- **Redirects** let you send users from one URL to another (e.g., when migrating content or changing site structure).
- **Rewrites** let you map an incoming request path to a different destination path on the server, without changing the URL in the browser (e.g., for API proxying or pretty URLs).

---

Example from the project:

```js
// apps/next-guide-app/next.config.ts
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
```

## **Try it live:** [http://localhost:3000/old-blog](http://localhost:3000/old-blog) (should redirect to `/blog`)

See more in the file: [next.config.ts – source code](apps/next-guide-app/next.config.ts)

- [Official docs: Redirects](https://nextjs.org/docs/app/api-reference/next-config-js/redirects)
- [Official docs: Rewrites](https://nextjs.org/docs/app/api-reference/next-config-js/rewrites)
- [Official docs: Next config ](https://nextjs.org/docs/app/api-reference/next-config-js)

---

# Instrumentation

- Instrumentation allows you to monitor performance, log, or connect OpenTelemetry.
- In Next.js, add an `instrumentation.js` or `instrumentation.ts` file to `app/`.
- Runs only on the server at process startup.
- **Examples:**
  - [instrumentation.js](apps/next-guide-app/src/app/instrumentation.js)
  - [Instrumentation demo page](apps/next-guide-app/src/app/instrumentation-demo/page.tsx)
- [Official documentation](https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation)
  **Demos:**
- [Instrumentation demo](apps/next-guide-app/src/app/instrumentation-demo/page.tsx) ([/instrumentation-demo](http://localhost:3000/instrumentation-demo))
- [instrumentation.js example](apps/next-guide-app/src/app/instrumentation.js)

---

# 7. Extra

- **Styling:** See [globals.css](apps/next-guide-app/src/app/globals.css)
- **MDX:**
  - [MDX demo](apps/next-guide-app/src/app/mdx-demo/page.mdx)
  - [MDX layout](apps/next-guide-app/src/app/mdx-demo/layout.tsx) ([/mdx-demo](http://localhost:3000/mdx-demo))
  - [MDX components](apps/next-guide-app/src/app/mdx-components.tsx) ([/mdx-demo](http://localhost:3000/mdx-demo))

---

- **Image Component:**

  - [Image demo](apps/next-guide-app/src/app/image-demo/page.tsx) ([/image-demo](http://localhost:3000/image-demo))

  > **Note:** If you want to load images from external domains, you must add those domains to `remotePatterns` in your `next.config.ts`:
  >
  > ```js
  > // next.config.ts
  > images: {
  >   remotePatterns: [
  >     {
  >       protocol: 'https',
  >       hostname: 'images.unsplash.com',
  >     },
  >   ],
  > },
  > ```
  >
  > Otherwise, images from those domains will not load and Next.js will show an error.

---

- **Shared Components:**
  - [Counter component](apps/next-guide-app/src/app/components/Counter.tsx)
  - Use a `/components` or `/_components` (private - non-routable) folder for reusable UI (best practice)
- **Public Assets:**
  - Use the `/public` folder for static assets (images, favicon, etc.) ([public/](apps/next-guide-app/public/))

---

# What was not covered

Some advanced or less common Next.js topics are not covered in detail in this presentation:

- **Internationalization (i18n)** – [Docs](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- **Route Interception & Modals** – [Docs](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes)
- **Partial Prerendering** – [Docs](https://nextjs.org/docs/app/api-reference/config/next-config-js/ppr#using-partial-prerendering)
- **Advanced Metadata & SEO** (OpenGraph, dynamic metadata) – [Docs](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- **Testing (unit, e2e, integration)** – [Docs](https://nextjs.org/docs/pages/building-your-application/testing)
- **Analytics & Monitoring** – [Docs](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)

---

- **Deployment to Vercel/Netlify/Cloud** – [Docs](https://nextjs.org/docs/app/getting-started/deploying)
- **Security, CORS, API rate limiting** – [Docs](https://nextjs.org/docs/app/guides/content-security-policy), [CORS Docs](https://nextjs.org/docs/app/api-reference/file-conventions/middleware#cors)
- **Custom Webpack/Babel config** – [Docs](https://nextjs.org/docs/app/api-reference/config/next-config-js/webpack)
- **Static Export (`next export`)** – [Docs](https://nextjs.org/docs/app/getting-started/deploying#static-export)
- **Multi-zones** – [Docs](https://nextjs.org/docs/app/guides/multi-zones)

For a full overview, see the [Next.js Documentation](https://nextjs.org/docs).

---

# Q&A / Discussion

- What challenges have you faced with Next.js?
- Which feature are you most excited to try?
- Any questions about the examples or exercises?

---

# Thank You!

**Martin Krištof**  
[GitHub Repo](https://github.com/MartinKristof/training)  
[My Website](https://kristofmartin.eu)
