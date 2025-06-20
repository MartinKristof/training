import { prisma } from '@/lib/prisma';
import CreateUserForm from './CreateUserForm';

export default async function DatabaseDemoPage() {
  const users = await prisma.user.findMany();

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Users from SQLite Database (Prisma)</h1>
      <CreateUserForm />
      {users.length === 0 ? (
        <div className="text-gray-600">No users found. Try adding some via API or Prisma Studio.</div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {users.map(user => (
            <li key={user.id} className="py-2 flex flex-col md:flex-row md:items-center md:justify-between">
              <span className="font-medium text-blue-900">{user.name}</span>
              <span className="text-blue-700 text-sm">{user.email}</span>
              <span className="text-gray-400 text-xs">{new Date(user.createdAt).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-8 mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100 text-blue-900 text-sm">
        <p className="mb-2">
          <strong>Demo:</strong> This example demonstrates how to use the{' '}
          <a
            href="https://nextjs.org/docs/app/api-reference/components/form"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-700"
          >
            Next.js <code>&lt;Form&gt;</code> component
          </a>{' '}
          (or a classic <code>&lt;form&gt;</code> with <code>useActionState</code>) to submit data to the server using{' '}
          <strong>Server Actions</strong>.
        </p>
        <p className="mb-2">
          After successfully creating a user on the server, <code>revalidatePath('/database-demo')</code> is called,
          which triggers{' '}
          <a
            href="https://nextjs.org/docs/app/getting-started/updating-data#revalidating"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-700"
          >
            data revalidation and shows the updated user list
          </a>{' '}
          automatically, without needing to refresh the page manually.
        </p>
        <ul className="list-disc pl-5">
          <li>
            The form uses <code>useActionState</code> for state management and validation.
          </li>
          <li>
            The server action writes to SQLite via Prisma and calls <code>revalidatePath</code> on success.
          </li>
          <li>The user list is always up-to-date after each submit.</li>
        </ul>
      </div>
    </div>
  );
}
