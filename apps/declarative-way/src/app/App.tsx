import { DeclarativeRoutes } from './DeclarativeRoutes';
import { BrowserRouter } from 'react-router';
import { AppProvider } from './context/AppContext';

export const App = () => (
  <BrowserRouter>
    <AppProvider>
      <DeclarativeRoutes />
    </AppProvider>
  </BrowserRouter>
);
