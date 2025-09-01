import '../../styles/global.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Header from '../../components/Header/Header.tsx';
import ThemeProvider from '../theme-provider.tsx';
import QueryProvider from '../query-client-provider.tsx';
import { NextIntlClientProvider } from 'next-intl';

export const metadata: Metadata = {
  title: 'Pets',
  description: 'A learning project featuring a pet catalog with cards and detailed information for each animal',
  icons: {
    icon: '/favicon.svg',
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body>
        <QueryProvider>
          <ThemeProvider>
            <NextIntlClientProvider>
              <div className="app">
                <div className="layout">
                  <Header />
                  <main className="main">{children}</main>
                </div>
              </div>
            </NextIntlClientProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
