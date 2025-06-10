import { Form, useNavigate, redirect, useActionData } from 'react-router';
import { ErrorMessage, Input, Label } from '@training/ui';

export const CreateUser = () => {
  const navigate = useNavigate();
  const actionData = useActionData<{ nameError: string; emailError: string }>();

  return (
    <div className="max-w-2xl mx-auto mt-5">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Create New User</h2>
        <button onClick={() => navigate(-1)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
          ← Back
        </button>
      </div>

      <Form method="post" className="space-y-6">
        <div className="space-y-1">
          <Label htmlFor="name" required>
            Name
          </Label>
          <Input id="name" name="name" type="text" hasError={!!actionData?.nameError} />
          {actionData?.nameError && <ErrorMessage>{actionData.nameError}</ErrorMessage>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email" required>
            Email
          </Label>
          <Input id="email" name="email" type="email" hasError={!!actionData?.emailError} />
          {actionData?.emailError && <ErrorMessage>{actionData.emailError}</ErrorMessage>}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/users')}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create User
          </button>
        </div>
      </Form>
    </div>
  );
};

export const createUserAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;

  // Basic validation
  if (!name) {
    return { nameError: 'Name is required.' };
  }
  if (!email) {
    return { emailError: 'Email is required.' };
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return { emailError: 'Invalid email format.' };
  }
  // Additional validation can be added here
  if (name.length < 3) {
    return { nameError: 'Name must be at least 3 characters long.' };
  }
  if (email.length < 5) {
    return { emailError: 'Email must be at least 5 characters long.' };
  }

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  // In a real app, you would save the user here
  console.log('Creating user:', { name, email });

  // Redirect to the users list
  return redirect('/users');
};
