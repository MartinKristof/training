import { Suspense } from 'react';
import { Routes } from './Routes';

export const App = () => (
  <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
    <Routes />
  </Suspense>
);
