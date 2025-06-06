import { useActionState } from 'react';
import { useNavigate } from 'react-router';

type ActionState = {
  success?: boolean | null;
  message?: string;
  errors?: {
    name?: string;
    email?: string;
    message?: string;
  };
};

export const Contact = () => {
  const navigate = useNavigate();
  const [state, submitForm, isPending] = useActionState<ActionState, FormData>(
    async (_, formData: FormData) => {
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const message = formData.get('message') as string;

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

      if (!message) {
        errors.message = 'Message is required';
      } else if (message.length < 10) {
        errors.message = 'Message must be at least 10 characters long';
      }

      if (Object.keys(errors).length > 0) {
        return { errors, success: false };
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      return {
        success: true,
        message: 'Thank you for your message! We will get back to you soon.',
      };
    },
    { success: null, errors: {}, message: '' },
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Contact Us</h2>
        <button onClick={() => navigate(-1)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
          ← Back
        </button>
      </div>

      {state.success && <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg">{state.message}</div>}
      {state.success === false && state?.errors && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
          {state.errors.name && <p className="mb-2">{state.errors.name}</p>}
          {state.errors.email && <p className="mb-2">{state.errors.email}</p>}
          {state.errors.message && <p className="mb-2">{state.errors.message}</p>}
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
          />
          {state?.errors?.email && <p className="mt-1 text-sm text-red-600">{state.errors.email}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          {state?.errors?.message && <p className="mt-1 text-sm text-red-600">{state.errors.message}</p>}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {isPending ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  );
};
