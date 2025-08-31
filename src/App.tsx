import { Suspense } from 'react';
import { Spinner } from './components/Spinner/Spinner.tsx';
import { EmissionsExplorer } from './components/EmissionsExplorer/EmissionsExplorer.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <QueryClientProvider client={queryClient}>
        <EmissionsExplorer />
      </QueryClientProvider>
    </Suspense>
  );
}
