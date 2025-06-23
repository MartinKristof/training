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

  /* Specific styles for lifecycle diagram */
  img[src*="lifecycle"] {
    max-height: 85vh;
    width: auto;
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

  /* Specific styles for devtools screenshots */
  img[src*="devtools"] {
    max-height: 75vh;
    width: auto;
    margin-left: auto;
    margin-right: auto;
    display: block;
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
- [Users list](apps/next-guide-pages/pages/users/index.tsx) ([/users](http://localhost:3001/users))
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
- [Blog post: Server vs Client Components](apps/next-guide-app/src/app/blog/[slug]/page.tsx?slug=server-components-vs-client-components)

---

![center](assets/images/component-split-example.png)

---

**Demos:**

- [Client component demo](apps/next-guide-app/src/app/client-component/page.tsx) ([/client-component](http://localhost:3000/client-component))
- [Counter component](apps/next-guide-app/src/app/components/Counter.tsx)

---

> For more, see [Server Components vs. Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)

---

## Partial Prerendering

- Mix static, server, and client rendering

**Demo:**

- [Static page with client widget](apps/next-guide-app/src/app/page.tsx)

---

## SSR & SSG

- SSR: Server Side Rendering (on request)
- SSG: Static Site Generation (at build time)
- Use `generateStaticParams` for SSG

**Demos:**

- [Dashboard (SSR)](apps/next-guide-app/src/app/dashboard/page.tsx) ([/dashboard](http://localhost:3000/dashboard))
- [Blog (SSG)](apps/next-guide-app/src/app/blog/page.tsx) ([/blog](http://localhost:3000/blog))

---

## The `fetch` function

- Native fetch in server components
- Automatic caching

**Demos:**

- [Client data fetching](apps/next-guide-app/src/app/client-data-fetching/page.tsx) ([/client-data-fetching](http://localhost:3000/client-data-fetching))
- [Caching demo](apps/next-guide-app/src/app/caching-demo/page.tsx) ([/caching-demo](http://localhost:3000/caching-demo))

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

**Demo:**

- [Caching demo](apps/next-guide-app/src/app/caching-demo/page.tsx)([/caching-demo/](http://localhost:3000/caching-demo/))

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
  - [Marketing group](<apps/next-guide-app/src/app/(marketing)/about/page.tsx>)
- [Official documentation](https://nextjs.org/docs/app/building-your-application/routing/route-groups)

---

# Parallel Routes & Slots

- Parallel routes allow you to render multiple independent parts of the page (slots) at the same time.
- Each slot is a folder starting with `@` (e.g., `@feed`, `@notifications`).
- Slots can also be nested.
- **Examples:**
  - [Main parallel-demo](apps/next-guide-app/src/app/parallel-demo/page.tsx)
  - [Feed slot](apps/next-guide-app/src/app/parallel-demo/@feed/page.tsx)
  - [Notifications slot](apps/next-guide-app/src/app/parallel-demo/@notifications/page.tsx)
  - [Nested slot feed/archive](apps/next-guide-app/src/app/parallel-demo/@feed/archive/page.tsx)
- [Official documentation](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)

---

# Conditional Routes & Slots

- Conditional routes allow you to dynamically change content based on a segment (e.g., user role).
- Slots like `@admin`, `@user` within a dynamic folder `[role]`.
- **Examples:**
  - [Conditional routes demo](apps/next-guide-app/src/app/conditional-routes-demo/[role]/page.tsx)
  - [Admin slot](apps/next-guide-app/src/app/conditional-routes-demo/[role]/@admin/page.tsx)
  - [User slot](apps/next-guide-app/src/app/conditional-routes-demo/[role]/@user/page.tsx)
- [Official documentation](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes#conditional-routes)

---

# Server Actions

- Server Actions allow you to call server logic directly from a component/form without writing an API route.
- Secure, type-safe, runs only on the server.
- **Examples:**
  - [User form server action](apps/next-guide-app/src/app/user-form-server-action/server-actions.ts)
  - [Progressive enhancement form](apps/next-guide-app/src/app/progressive-enhancement-form/server-actions.ts)
  - [Database demo server actions](apps/next-guide-app/src/app/database-demo/server-actions.ts)
- [Official documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)

---

# Progressive Enhancement

- Progressive enhancement means the form works even without JavaScript – validation and processing happen on the server.
- In Next.js, you can combine this with Server Actions.
- Benefits: better accessibility, SEO, fallback for older browsers.
- **Examples:**
  - [Progressive enhancement form](apps/next-guide-app/src/app/progressive-enhancement-form/page.tsx)
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
  - [not-found.tsx](apps/next-guide-app/src/app/not-found.tsx)
- [Official documentation](https://nextjs.org/docs/app/building-your-application/routing/error-handling)

---

# 4. Middleware

- Code that runs before a request is completed
- `src/app/middleware.ts`
- Use for auth, redirects, logging

**Demos:**

- [Middleware file](apps/next-guide-app/src/app/middleware.ts)
- [Middleware demo page](apps/next-guide-app/src/app/middleware-demo/page.tsx) ([/middleware-demo](http://localhost:3000/middleware-demo))

---

# 5. Environments

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

## Passing Data Between Environments

- Use props, API endpoints, cookies

**Demo:**

- [Runtime demo](apps/next-guide-app/src/app/runtime-demo/page.tsx)

---

# 6. Configuration & Instrumentation

---

# Next Config

Next.js allows you to configure various aspects of your application using the `next.config.js` or `next.config.ts` file.

- Mode settings (strict mode, experimental features)
- Image, headers, file types, build options
- **Redirects and Rewrites**

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
- **Forms and Validation:**
  - [Progressive enhancement form](apps/next-guide-app/src/app/progressive-enhancement-form/page.tsx)
  - [User form with server action](apps/next-guide-app/src/app/user-form-server-action/page.tsx)
- **Error Boundaries:**
  - [Error boundary example](apps/next-guide-app/src/app/error.tsx)
- **MDX:**
  - [MDX demo](apps/next-guide-app/src/app/mdx-demo/page.mdx)
  - [MDX layout](apps/next-guide-app/src/app/mdx-demo/layout.tsx)
  - [MDX components](apps/next-guide-app/src/app/mdx-components.tsx) – custom React components for use in MDX content
- **Image Component:**
  - [Image demo](apps/next-guide-app/src/app/image-demo/page.tsx) ([/image-demo](http://localhost:3000/image-demo))
- **Shared Components:**
  - [Counter component](apps/next-guide-app/src/app/components/Counter.tsx)
  - Use a `/components` or `/_components` folder for reusable UI (best practice)
- **Public Assets:**
  - Use the `/public` folder for static assets (images, favicon, etc.) ([public/](apps/next-guide-app/public/))

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
