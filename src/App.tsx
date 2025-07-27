import { Header } from './components/Header/Header.tsx';
import { Outlet } from 'react-router-dom';

export function App() {
  return (
    <>
      <Header />
      <main className="main" data-testid="main">
        <Outlet />
      </main>
    </>
  );
}
