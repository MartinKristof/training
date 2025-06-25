/**
 * --- THEORY ---
 * The custom `_document.tsx` file allows you to augment your application's <html> and <body> tags.
 * This is the right place to add custom `lang` attributes, load external fonts, or integrate CSS-in-JS libraries.
 *
 * What _not_ to do here:
 * - Do not add application logic that belongs in `_app.tsx`.
 * - Do not add CSS here (`<style>`). Use `_app.tsx` for global CSS.
 * - Event handlers like `onClick` will not work here.
 *
 * This component is only rendered on the server, so you can't use client-side hooks or event handlers.
 *
 * Learn more: https://nextjs.org/docs/pages/building-your-application/routing/custom-document
 */

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>{/* You can add custom fonts, meta tags, etc. here */}</Head>
      <body className="bg-gray-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
