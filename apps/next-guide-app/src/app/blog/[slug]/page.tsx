import { notFound } from 'next/navigation';
import Link from 'next/link';

// Mock blog posts data
const posts = [
  {
    id: 1,
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js 15',
    content: `
      Next.js 15 is the latest version of the React framework that brings many exciting features.
      
      ## Key Features
      
      - **App Router**: The new file-system based router
      - **Server Components**: React components that run on the server
      - **Partial Prerendering**: Hybrid rendering approach
      - **Improved Performance**: Better caching and optimization
      
      ## Getting Started
      
      To create a new Next.js 15 project, run:
      
      \`\`\`bash
      npx create-next-app@latest my-app
      \`\`\`
      
      This will set up a new project with all the latest features enabled.
    `,
    date: '2024-01-15',
    author: 'Martin Krištof',
  },
  {
    id: 2,
    slug: 'server-components-vs-client-components',
    title: 'Server Components vs Client Components',
    content: `
      Understanding the difference between Server and Client Components is crucial for building efficient Next.js applications.
      
      ## Server Components
      
      - Run on the server
      - No JavaScript sent to the client
      - Can access databases and file systems
      - Better performance and SEO
      
      ## Client Components
      
      - Run in the browser
      - Can use React hooks and event handlers
      - Interactive and dynamic
      - Use 'use client' directive
      
      ## When to Use Each
      
      Use Server Components for:
      - Data fetching
      - Static content
      - SEO-critical pages
      
      Use Client Components for:
      - Interactivity
      - Event handlers
      - Browser APIs
    `,
    date: '2024-01-20',
    author: 'Martin Krištof',
  },
  {
    id: 3,
    slug: 'data-fetching-in-nextjs',
    title: 'Data Fetching in Next.js',
    content: `
      Next.js provides multiple ways to fetch data, each optimized for different use cases.
      
      ## Fetch Function
      
      The built-in fetch function is enhanced with caching and revalidation:
      
      \`\`\`typescript
      async function getData() {
        const res = await fetch('https://api.example.com/data', {
          next: { revalidate: 3600 } // Cache for 1 hour
        });
        return res.json();
      }
      \`\`\`
      
      ## Caching Strategies
      
      - **Static**: Data is cached at build time
      - **Dynamic**: Data is fetched on each request
      - **Revalidated**: Data is cached but revalidated periodically
      
      ## Database Connections
      
      Next.js supports various databases:
      - PostgreSQL with Prisma
      - MongoDB with Mongoose
      - SQLite with Drizzle
      - And many more...
    `,
    date: '2024-01-25',
    author: 'Martin Krištof',
  },
];

// Generate static params for all blog posts
export async function generateStaticParams() {
  return posts.map(post => ({
    slug: post.slug,
  }));
}

// Generate metadata for each post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - Next.js Blog`,
    description: post.content.substring(0, 160),
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <Link href="/blog" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Back to Blog
        </Link>

        <article>
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <time dateTime={post.date}>{post.date}</time>
              <span>•</span>
              <span>{post.author}</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="font-semibold text-green-800 mb-2">Dynamic Route Features:</h3>
        <ul className="text-green-700 text-sm space-y-1">
          <li>• Dynamic segments with [slug]</li>
          <li>• Static generation with generateStaticParams</li>
          <li>• Dynamic metadata generation</li>
          <li>• 404 handling with notFound()</li>
          <li>• Type-safe params with TypeScript</li>
        </ul>
      </div>
    </div>
  );
}
