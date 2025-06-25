export default function FeedSlot() {
  return (
    <div className="bg-white p-4 rounded-xl shadow border">
      <h2 className="text-lg font-semibold mb-2">Feed</h2>
      <ul className="list-disc pl-5">
        <li>Post 1: Welcome to the feed!</li>
        <li>Post 2: Next.js Parallel Routes are powerful.</li>
        <li>Post 3: You can render multiple slots in parallel.</li>
      </ul>
    </div>
  );
}
