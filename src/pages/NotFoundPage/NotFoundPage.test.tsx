import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NotFoundPage } from './NotFoundPage.tsx';
import { MemoryRouter } from 'react-router-dom';

describe('<NotFoundPage>', () => {
  test('check NotFoundPage has header', () => {
    // ACT
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    // ASSERT
    const header = screen.getByRole('heading', { name: '404' });
    expect(header).toBeInTheDocument();
  });

  test('check NotFoundPage has text content', () => {
    // ACT
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    // ASSERT
    const textContent = screen.getByText('page not found');
    expect(textContent).toBeInTheDocument();
  });

  test('check NotFoundPage has button "to main page"', () => {
    // ACT
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    // ASSERT
    const button = screen.getByRole('button', { name: 'to main page' });
    expect(button).toBeInTheDocument();
  });
});
