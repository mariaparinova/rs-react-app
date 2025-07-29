import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NotFoundPage } from './NotFoundPage.tsx';
import { MemoryRouter } from 'react-router-dom';

function renderComponent() {
  return render(
    <MemoryRouter>
      <NotFoundPage />
    </MemoryRouter>
  );
}

describe('<NotFoundPage>', () => {
  test('check NotFoundPage has header', () => {
    // ACT
    renderComponent();

    // ASSERT
    const header = screen.getByRole('heading', { name: '404' });
    expect(header).toBeInTheDocument();
  });

  test('check NotFoundPage has text content', () => {
    // ACT
    renderComponent();

    // ASSERT
    const textContent = screen.getByText('page not found');
    expect(textContent).toBeInTheDocument();
  });

  test('check NotFoundPage has button "to main page"', () => {
    // ACT
    renderComponent();

    // ASSERT
    const button = screen.getByRole('button', { name: 'to main page' });
    expect(button).toBeInTheDocument();
  });
});
