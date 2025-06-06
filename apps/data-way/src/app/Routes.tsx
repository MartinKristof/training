import { createBrowserRouter, RouterProvider } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './routes/Home';
import { NotFound } from './routes/NotFound';
import { ErrorBoundaryNested } from './routes/ErrorBoundaryNested';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Contact, contactAction } from './routes/Contact';
import { fetchUserDetails } from './api/users';
import { UserDetails } from './routes/UserDetails';
import { CreateUser, createUserAction } from './routes/CreateUser';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'users',
        lazy: async () => {
          const module = await import('./routes/Users');

          return {
            element: <module.Users />,
            loader: module.loader,
          };
        },
        children: [
          {
            path: 'new',
            element: <CreateUser />,
            action: createUserAction,
          },
          {
            path: ':userId',
            element: <UserDetails />,
            errorElement: <ErrorBoundaryNested />,
            loader: async ({ params }) => {
              const user = await fetchUserDetails(params.userId!);
              return { user };
            },
          },
        ],
      },
      {
        path: 'contact',
        element: <Contact />,
        action: contactAction,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
