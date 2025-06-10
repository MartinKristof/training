import { useActionState } from 'react';
import { useNavigate } from 'react-router';
import { Input, Label, ErrorMessage } from '@training/ui';

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
        const result = {
          errors,
          success: false,
        };
        return result;
      }

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
          success: true,
          message: 'Thank you for your message! We will get back to you soon.',
        };
      } catch (error) {
        return {
          success: false,
          message: `Failed to send message. Please try again later. ${error instanceof Error ? `: ${error.message}` : ''}`,
          errors: {},
        };
      }
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
          <Input id="name" name="name" type="text" hasError={!!state?.errors?.name} />
          {state?.errors?.name && <ErrorMessage id="name-error">{state.errors.name}</ErrorMessage>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email" required>
            Email
          </Label>
          <Input id="email" name="email" type="email" hasError={!!state?.errors?.email} />
          {state?.errors?.email && <ErrorMessage id="email-error">{state.errors.email}</ErrorMessage>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="message">Message</Label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              state?.errors?.message ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {state?.errors?.message && <ErrorMessage id="message-error">{state.errors.message}</ErrorMessage>}
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
