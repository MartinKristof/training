import { createBrowserRouter, RouterProvider } from 'react-router';
import { Home } from './routes/Home';
import { NotFound } from './routes/NotFound';
import { ErrorBoundaryNested } from './routes/ErrorBoundaryNested';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Contact } from './routes/Contact';
import { Submissions } from './routes/Submissions';
import { fetchUserDetails } from './api/users';
import { UserDetails } from './routes/UserDetails';
import { CreateUser, createUserAction } from './routes/CreateUser';
import { StylingDemoRoute } from './routes/Styling';
import { ContactProvider } from './context/ContactContext';
import { Layout } from '@training/ui';

const navigation = [
  { name: 'Home', path: '/' },
  { name: 'Users', path: '/users' },
  { name: 'Contact', path: '/contact' },
  { name: 'Submissions', path: '/submissions' },
  { name: 'Styling', path: '/styling' },
];

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ContactProvider>
        <Layout navigation={navigation} title="React Router Demo - Data" />
      </ContactProvider>
    ),
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
      },
      {
        path: 'submissions',
        element: <Submissions />,
      },
      {
        path: 'styling',
        element: <StylingDemoRoute />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export const Routes = () => <RouterProvider router={router} />;
