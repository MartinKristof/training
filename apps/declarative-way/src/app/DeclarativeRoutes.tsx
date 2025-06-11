import { Routes, Route } from 'react-router';
import { Home } from './components/Home';
import { Users } from './components/Users';
import { UserDetails } from './components/UserDetails';
import { Contact } from './components/Contact';
import { NotFound } from './components/NotFound';
import { ErrorBoundary } from './components/ErrorBoundary';
import { CreateUser } from './components/CreateUser';
import { Layout } from '@training/ui';
import { SearchableUserList } from './components/SearchableUserList';
import { UserStats } from './components/UserStats';

const navigation = [
  { name: 'Home', path: '/' },
  { name: 'Users', path: '/users' },
  { name: 'Searchable Users', path: '/searchable-users' },
  { name: 'User Stats', path: '/user-stats' },
  { name: 'Contact', path: '/contact' },
];

export const DeclarativeRoutes = () => (
  <Routes>
    <Route
      element={<Layout navigation={navigation} title="React Router Demo - Declarative" />}
      errorElement={<ErrorBoundary />}
    >
      <Route index element={<Home />} />
      <Route path="users">
        <Route index element={<Users />} />
        <Route path="new" element={<CreateUser />} />
        <Route path=":userId" element={<UserDetails />} />
      </Route>
      <Route path="searchable-users" element={<SearchableUserList />} />
      <Route path="user-stats" element={<UserStats />} />
      <Route path="contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);
