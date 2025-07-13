import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.tsx';
import { ErrorBoundary } from './components/Error/Error.tsx';

const fallbackErrorElement = (
  <div className="error">
    <h3>Error</h3>
    <div>Oops! Something went wrong.</div>
  </div>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={fallbackErrorElement}>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
