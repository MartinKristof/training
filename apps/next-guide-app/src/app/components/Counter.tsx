'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Client Component</h2>
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-lg text-black">Count: {count}</p>
        <button
          onClick={() => setCount(count + 1)}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Increment
        </button>
      </div>
    </div>
  );
}
