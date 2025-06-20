'use client';

import { z } from 'zod';
import { useActionState } from 'react';
import { createUser } from './server-actions';
import { ErrorMessage, Input, Label } from '@training/ui';

const userSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
});

type FormActionState = {
  fieldErrors?: Record<string, string>;
  error?: string;
  success?: string;
  name?: string;
  email?: string;
};

async function clientAction(_: FormActionState, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const parsed = userSchema.safeParse({ name, email });
  if (!parsed.success) {
    // Map Zod errors to field-specific errors
    const fieldErrors: Record<string, string> = {};
    parsed.error.errors.forEach(e => {
      if (e.path[0]) fieldErrors[e.path[0]] = e.message;
    });
    return { fieldErrors, error: 'Please fix the errors below.', name, email };
  }
  return createUser({
    name,
    email,
  });
}

export default function UserFormServerActionPage() {
  const [state, formAction, isPending] = useActionState<FormActionState, FormData>(clientAction, {});

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md py-10">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Create User (Server Action + useActionState + Zod)</h1>
        <form action={formAction} className="space-y-6 bg-white p-8 rounded-xl shadow-lg border">
          <div>
            <Label htmlFor="input-name" required>
              Name
            </Label>
            <Input
              name="name"
              type="text"
              hasError={!!state.fieldErrors?.name}
              className="text-gray-800"
              disabled={isPending}
              defaultValue={state.name}
            />
            {state.fieldErrors?.name && <ErrorMessage>{state.fieldErrors.name}</ErrorMessage>}
          </div>
          <div>
            <Label htmlFor="input-email" required>
              Email
            </Label>
            <Input
              name="email"
              type="email"
              hasError={!!state.fieldErrors?.email}
              className="text-gray-800"
              disabled={isPending}
              defaultValue={state.email}
            />
            {state.fieldErrors?.email && <ErrorMessage>{state.fieldErrors.email}</ErrorMessage>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:bg-gray-300 disabled:text-gray-500"
            disabled={isPending}
          >
            {isPending ? 'Creating...' : 'Create User'}
          </button>
          {state.error && <ErrorMessage>{String(state.error)}</ErrorMessage>}
          {state.success && <div className="text-green-600 mt-2 text-sm">{String(state.success)}</div>}
        </form>
      </div>
    </div>
  );
}
