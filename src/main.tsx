import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ErrorBoundary } from './components/Error/Error.tsx';
import { router } from './router/router.tsx';
import { RouterProvider } from 'react-router-dom';

const fallbackErrorElement = (
  <div className="error">
    <h3>Error</h3>
    <div>Oops! Something went wrong</div>
  </div>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={fallbackErrorElement}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>
);
