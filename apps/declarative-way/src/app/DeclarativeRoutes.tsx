import { Routes, Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Users } from './components/Users';
import { UserDetails } from './components/UserDetails';
import { Contact } from './components/Contact';
import { NotFound } from './components/NotFound';
import { ErrorBoundary } from './components/ErrorBoundary';
import { CreateUser } from './components/CreateUser';

export const DeclarativeRoutes = () => (
  <Routes>
    <Route element={<Layout />} errorElement={<ErrorBoundary />}>
      <Route index element={<Home />} />
      <Route path="users">
        <Route index element={<Users />} />
        <Route path="new" element={<CreateUser />} />
        <Route path=":userId" element={<UserDetails />} />
      </Route>
      <Route path="contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);
