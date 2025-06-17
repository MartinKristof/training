import Link from 'next/link';

// Mock blog posts data
const posts = [
  {
    id: 1,
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js 15',
    excerpt: 'Learn the basics of Next.js 15 and how to build modern web applications.',
    date: '2024-01-15',
    author: 'Martin Krištof',
  },
  {
    id: 2,
    slug: 'server-components-vs-client-components',
    title: 'Server Components vs Client Components',
    excerpt: 'Understanding the difference between Server and Client Components in React.',
    date: '2024-01-20',
    author: 'Martin Krištof',
  },
  {
    id: 3,
    slug: 'data-fetching-in-nextjs',
    title: 'Data Fetching in Next.js',
    excerpt: 'Learn about different data fetching strategies in Next.js applications.',
    date: '2024-01-25',
    author: 'Martin Krištof',
  },
];

// This function generates static params for dynamic routes
export async function generateStaticParams() {
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export default function BlogPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Blog (Static Site Generation)</h1>
        <p className="mt-2 text-lg text-gray-600">
          This page demonstrates Static Site Generation (SSG) in Next.js. All blog posts are pre-rendered at build time
          for optimal performance.
        </p>
      </div>

      <div className="grid gap-6">
        {posts.map(post => (
          <article key={post.id} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
              <time dateTime={post.date}>{post.date}</time>
              <span>•</span>
              <span>{post.author}</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-800 font-medium">
              Read more →
            </Link>
          </article>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Static Site Generation Benefits:</h3>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Pages are pre-rendered at build time</li>
          <li>• Fastest possible page loads</li>
          <li>• Better SEO performance</li>
          <li>• Reduced server load</li>
          <li>• Automatic caching by CDNs</li>
        </ul>
      </div>
    </div>
  );
}
