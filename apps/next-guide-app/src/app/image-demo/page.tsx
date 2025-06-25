import Image from 'next/image';
import me from '../../../public/me.jpg'; // Adjust the path as necessary

export default function ImageDemoPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Next.js Image Component Demo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Example 1: Local Image */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Local Image</h2>
          <p className="mb-4 text-gray-600">
            Importing a local image file. `width` and `height` are required. Next.js automatically optimizes the image.
          </p>
          <div className="relative w-full h-96">
            <Image
              src={me}
              alt="A picture of me"
              width={500}
              height={500}
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* Example 2: Remote Image */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Remote Image</h2>
          <p className="mb-4 text-gray-600">
            Using an image from a remote URL. The domain must be configured in `next.config.ts`. This image is also
            marked with `priority` to load it sooner.
          </p>
          <div className="relative w-full h-96">
            <Image
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
              alt="Laptop with code"
              width={500}
              height={500}
              priority
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* Example 3: Fill */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Fill Property</h2>
          <p className="mb-4 text-gray-600">
            The `fill` property makes the image expand to fit its parent container. The parent must have `position:
            relative`. Useful for responsive design.
          </p>
          <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
              alt="Another laptop with code"
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* Example 4: Sizes and Placeholder */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. `sizes` and `placeholder`</h2>
          <p className="mb-4 text-gray-600">
            The `sizes` attribute informs the browser about the image&apos;s size at different breakpoints. The{' '}
            `placeholder=&quot;blur&quot;` shows a blurred version of the image while it loads.
          </p>
          <div className="relative w-full h-96">
            <Image
              src={me}
              alt="A picture of me with placeholder"
              fill
              className="object-cover rounded-lg shadow-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              placeholder="blur"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
