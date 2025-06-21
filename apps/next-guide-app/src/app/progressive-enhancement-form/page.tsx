import Form from 'next/form';
import { createUserAction } from './server-actions';
import { prisma } from '../../lib/prisma';

export default async function ProgressiveEnhancementFormPage({ searchParams }) {
  const params = await searchParams;
  const error = params?.error ? JSON.parse(params.error) : undefined;
  const name = params?.name || '';
  const email = params?.email || '';
  const success = params?.success || '';

  const users = await prisma.user.findMany({ orderBy: { id: 'desc' } });

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Progressive Enhancement Form (Server Actions)</h1>
      <Form action={createUserAction} className="space-y-4 bg-white p-4 rounded-xl shadow border mb-8">
        <div>
          <label htmlFor="input-name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            id="input-name"
            name="name"
            type="text"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${error?.name ? 'border-red-500' : 'border-gray-300'} text-gray-800`}
            defaultValue={name}
            aria-invalid={!!error?.name}
          />
          {error?.name && (
            <p role="alert" className="mt-1 text-sm text-red-600">
              {error.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="input-email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            id="input-email"
            name="email"
            type="email"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${error?.email ? 'border-red-500' : 'border-gray-300'} text-gray-800`}
            defaultValue={email}
            aria-invalid={!!error?.email}
          />
          {error?.email && (
            <p role="alert" className="mt-1 text-sm text-red-600">
              {error.email}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
        >
          Create User
        </button>
        {error && typeof error === 'string' && (
          <p role="alert" className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
        {success && <div className="text-green-600 mt-2 text-sm">{success}</div>}
      </Form>
      <div className="bg-white p-4 rounded-xl shadow border">
        <h2 className="text-lg font-semibold mb-4">Users</h2>
        <ul className="divide-y divide-blue-100">
          {users.map(user => (
            <li key={user.id} className="py-2 flex flex-col md:flex-row md:items-center md:justify-between">
              <span className="font-medium text-blue-900">{user.name}</span>
              <span className="text-blue-700 text-sm">{user.email}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100 text-blue-900 text-sm">
        <p className="mb-2">
          <strong>Demo:</strong> This example demonstrates a <strong>progressively enhanced</strong> form using the{' '}
          <a
            href="https://nextjs.org/docs/app/api-reference/components/form"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-700"
          >
            Next.js <code>&lt;Form&gt;</code> component
          </a>{' '}
          and <strong>Server Actions</strong>.
        </p>
        <p className="mb-2">
          The form works <strong>even if JavaScript is disabled</strong> in the browser. All validation and data
          processing happens on the server. After submit, the user is redirected back to the form with errors or a
          success message.
        </p>
        <ul className="list-disc pl-5">
          <li>
            No <code>useActionState</code> or client-side hooks are used – everything is handled server-side.
          </li>
          <li>
            Validation errors and form values are passed via query parameters (see{' '}
            <a
              href="https://nextjs.org/docs/app/getting-started/updating-data#server-components"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-700"
            >
              progressive enhancement docs
            </a>
            ).
          </li>
          <li>The user list below is always up-to-date after each submit (SSR fetch from database).</li>
          <li>This pattern is ideal for maximum compatibility and accessibility.</li>
        </ul>
      </div>
    </div>
  );
}
