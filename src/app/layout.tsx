import '../styles/global.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Header from '../components/Header/Header.tsx';
import ThemeProvider from './theme-provider.tsx';
import QueryProvider from './query-client-provider.tsx';

export const metadata: Metadata = {
  title: 'Pets',
  description: 'A learning project featuring a pet catalog with cards and detailed information for each animal',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <ThemeProvider>
            <div className="app">
              <div className="layout">
                <Header />
                <main className="main">{children}</main>
              </div>
            </div>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
