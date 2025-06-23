import React from 'react';

export default async function ConditionalLayout({
  children,
  user,
  admin,
  params,
}: {
  children: React.ReactNode;
  user: React.ReactNode;
  admin: React.ReactNode;
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;

  return (
    <div className="p-8 bg-slate-50 rounded-2xl shadow-lg">
      {children}
      <div className="mt-8 border-t pt-8">
        <h2 className="text-xl font-bold mb-4 text-slate-800">Conditional Dashboard</h2>
        {role === 'admin' ? admin : user}
      </div>
    </div>
  );
}
