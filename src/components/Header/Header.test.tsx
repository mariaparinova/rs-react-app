import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header.tsx';
import '@testing-library/jest-dom';
import { ROUTES } from '../../router/routes.ts';
import { MemoryRouter } from 'react-router-dom';

describe('<Header>', () => {
  test('checks link to Main page', () => {
    // ACT
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // ASSERT
    const linkToMainPage = screen.getByRole('link', { name: /pets/i });
    expect(linkToMainPage).toBeInTheDocument();
    expect(linkToMainPage).toHaveAttribute('href', ROUTES.ROOT);
  });

  test('checks link to About page', () => {
    // ACT
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // ASSERT
    const linkToMainPage = screen.getByRole('link', { name: /about/i });
    expect(linkToMainPage).toBeInTheDocument();
    expect(linkToMainPage).toHaveAttribute('href', ROUTES.ABOUT);
  });
});
