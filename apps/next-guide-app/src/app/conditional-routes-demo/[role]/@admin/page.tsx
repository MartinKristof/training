import React from 'react';

export default function AdminPage() {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
      <h3 className="font-bold">Admin Dashboard</h3>
      <p>This is the dashboard for users with the 'admin' role. It shows sensitive data and administrative tools.</p>
    </div>
  );
}
