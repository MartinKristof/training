import { useNavigate } from 'react-router';
import { useActionState } from 'react';
import { useAppActions, useAppState } from '../context/AppContext';
import { Input, Label, ErrorMessage } from '@training/ui';

type ActionState = {
  success?: boolean | null;
  message?: string;
  errors?: {
    name?: string;
    email?: string;
  };
};

export const CreateUser = () => {
  const navigate = useNavigate();
  const { isLoading } = useAppState();
  const { addUser } = useAppActions();
  const [state, submitForm, isPending] = useActionState<ActionState, FormData>(
    async (_, formData: FormData) => {
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;

      // Validate form data
      const errors: ActionState['errors'] = {};

      if (!name) {
        errors.name = 'Name is required';
      } else if (name.length < 3) {
        errors.name = 'Name must be at least 3 characters long';
      }

      if (!email) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Invalid email address';
      }

      if (Object.keys(errors).length > 0) {
        return {
          success: false,
          errors,
        };
      }

      try {
        await addUser({ name, email });
        navigate('/users');

        return {
          success: true,
          message: 'User created successfully!',
        };
      } catch (error) {
        return {
          success: false,
          message: `Failed to create user. ${error instanceof Error ? `: ${error.message}` : ''}`,
          errors: {},
        };
      }
    },
    { success: null, errors: {}, message: '' },
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Create New User</h2>
        <button onClick={() => navigate(-1)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
          ← Back
        </button>
      </div>

      {isLoading && <div className="mb-4 p-4 bg-blue-50 text-blue-700 rounded-lg">Loading...</div>}

      {state.success === false && state?.message && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
          {state.message && <p className="mb-2">{state.message}</p>}
        </div>
      )}

      <form action={submitForm} className="space-y-6">
        <div className="space-y-1">
          <Label htmlFor="name" required>
            Name
          </Label>
          <Input id="name" name="name" type="text" hasError={!!state?.errors?.name} disabled={isLoading || isPending} />
          {state?.errors?.name && <ErrorMessage id="name-error">{state.errors.name}</ErrorMessage>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email" required>
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            hasError={!!state?.errors?.email}
            disabled={isLoading || isPending}
          />
          {state?.errors?.email && <ErrorMessage id="email-error">{state.errors.email}</ErrorMessage>}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/users')}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
            disabled={isLoading || isPending}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            disabled={isLoading || isPending}
          >
            {isPending ? 'Creating...' : 'Create User'}
          </button>
        </div>
      </form>
    </div>
  );
};
