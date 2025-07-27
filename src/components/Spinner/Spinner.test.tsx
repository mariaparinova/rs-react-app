import { Spinner } from './Spinner.tsx';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('<Spinner>', () => {
  test('checks that spinner has text content', () => {
    // ACT
    render(<Spinner />);

    // ASSERT
    const spinner = screen.getByRole('heading', { name: 'Loading...' });
    expect(spinner).toBeInTheDocument();
  });
});
