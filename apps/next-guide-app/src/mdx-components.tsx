import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';

export function useMDXComponents(): MDXComponents {
  return {
    img: props => <Image {...props} sizes="100vw" width={300} height={600} />,
    h1: props => <h1 {...props} className="mt-8 mb-4 text-4xl font-bold text-gray-600" />,
    h2: props => <h2 {...props} className="mt-6 mb-3 text-3xl font-semibold text-gray-600" />,
    h3: props => <h3 {...props} className="mt-5 mb-2 text-2xl font-semibold text-gray-600" />,
    ol: props => <ol className="text-gray-800 dark:text-zinc-300 list-decimal pl-5 space-y-2" {...props} />,
    ul: props => <ul className="text-gray-800 dark:text-zinc-300 list-disc pl-5 space-y-1" {...props} />,
    li: props => <li className="pl-1" {...props} />,
    p: props => <p className="text-gray-800 dark:text-zinc-300 my-2" {...props} />,
    a: ({ href, children, ...props }) => {
      const className =
        'text-blue-500 hover:text-blue-700 dark:text-gray-400 hover:dark:text-gray-300 dark:underline dark:underline-offset-2 dark:decoration-gray-800';
      if (href?.startsWith('/')) {
        return (
          <Link href={href} className={className} {...props}>
            {children}
          </Link>
        );
      }
      if (href?.startsWith('#')) {
        return (
          <a href={href} className={className} {...props}>
            {children}
          </a>
        );
      }
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...props}>
          {children}
        </a>
      );
    },
  };
}
