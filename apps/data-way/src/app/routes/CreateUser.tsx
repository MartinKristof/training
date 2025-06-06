import { Form, useNavigate, redirect } from 'react-router';

export const CreateUser = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto mt-5">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Create New User</h2>
        <button onClick={() => navigate(-1)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
          ← Back
        </button>
      </div>

      <Form method="post" className="space-y-6">
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

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  // In a real app, you would save the user here
  console.log('Creating user:', { name, email });

  // Redirect to the users list
  return redirect('/users');
};
