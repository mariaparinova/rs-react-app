import { render, screen } from '@testing-library/react';
import { App } from './App.tsx';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

describe('<App>', () => {
  test('checks App has Header', () => {
    // ACT
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // ASSERT
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });

  test('checks App has main element', () => {
    // ACT
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // ASSERT
    const header = screen.getByTestId('main');
    expect(header).toBeInTheDocument();
  });
});
