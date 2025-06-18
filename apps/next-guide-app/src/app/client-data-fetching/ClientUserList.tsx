'use client';

import { use } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface ClientUserListProps {
  users: Promise<User[]>;
}

export default function ClientUserList({ users }: ClientUserListProps) {
  const userList = use(users);

  return (
    <ul className="divide-y divide-blue-100">
      {userList.map(user => (
        <li key={user.id} className="py-2 flex flex-col md:flex-row md:items-center md:justify-between">
          <span className="font-medium text-blue-900">{user.name}</span>
          <span className="text-blue-700 text-sm">{user.email}</span>
        </li>
      ))}
    </ul>
  );
}
