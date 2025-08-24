import { render, screen, waitFor } from '@testing-library/react';
import { App } from './App.tsx';
import { describe, expect, test } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('<App>', () => {
  test('checks card with user data', () => {
    // ACT
    render(<App />);

    // ASSERT
    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
  });

  describe('Buttons', () => {
    test('checks "Open uncontrolled form" button', () => {
      // ACT
      render(<App />);

      // ASSERT
      const button = screen.getByRole('button', { name: /open uncontrolled form/i });
      expect(button).toBeInTheDocument();
    });

    test('checks "Open controlled form" button', () => {
      // ACT
      render(<App />);

      // ASSERT
      const button = screen.getByRole('button', { name: /open controlled form/i });
      expect(button).toBeInTheDocument();
    });

    test('opening modal window by clicking "Open controlled form" button', async () => {
      // ACT
      render(<App />);
      const button = screen.getByRole('button', { name: /open controlled form/i });
      await userEvent.click(button);

      // ASSERT
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).toBeInTheDocument();
      });
    });

    test('opening modal window by clicking "Open uncontrolled form" button', async () => {
      // ACT
      render(<App />);
      const button = screen.getByRole('button', { name: /open uncontrolled form/i });
      await userEvent.click(button);

      // ASSERT
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).toBeInTheDocument();
      });
    });
  });

  test('modal window is not opened by default', () => {
    // ACT
    render(<App />);

    // ASSERT
    const modal = screen.queryByRole('dialog');
    expect(modal).not.toBeInTheDocument();
  });
});
