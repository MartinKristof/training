import { useNavigate } from 'react-router';
import { useActionState } from 'react';
import { useAppState } from '../context/AppContext';

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
  const { addUser, isLoading } = useAppState();
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
          message: 'Please fix the errors in the form.',
          errors,
        };
      }

      await addUser({ name, email });
      navigate('/users');

      return {
        success: true,
        message: 'User created successfully!',
      };
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

      {state.success === false && state?.errors && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
          {state.message && <p className="mb-2">{state.message}</p>}
          {state.errors.name && <p className="mb-2">{state.errors.name}</p>}
          {state.errors.email && <p className="mb-2">{state.errors.email}</p>}
        </div>
      )}

      <form action={submitForm} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={isLoading || isPending}
          />
          {state?.errors?.name && <p className="mt-1 text-sm text-red-600">{state.errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={isLoading || isPending}
          />
          {state?.errors?.email && <p className="mt-1 text-sm text-red-600">{state.errors.email}</p>}
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
