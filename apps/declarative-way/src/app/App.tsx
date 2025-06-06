import { DeclarativeRoutes } from './DeclarativeRoutes';
import { BrowserRouter } from 'react-router';

export const App = () => (
  <BrowserRouter>
    <DeclarativeRoutes />
  </BrowserRouter>
);
