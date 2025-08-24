import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button, ButtonStyle } from './Button.tsx';
import '@testing-library/jest-dom';

describe('<Button>', () => {
  test('checks button has text', () => {
    // ACT
    render(
      <Button style={ButtonStyle.Primary} isDisabled={false}>
        Sign in
      </Button>
    );

    // ASSERT
    const button = screen.getByRole('button', { name: 'Sign in' });
    expect(button).toBeInTheDocument();
  });

  describe('disabled', () => {
    test('checks button is disabled if prop "isDisabled" is true', () => {
      // ACT
      render(
        <Button style={ButtonStyle.Primary} isDisabled={true}>
          Test button
        </Button>
      );

      // ASSERT
      const button = screen.getByRole('button', { name: 'Test button' });
      expect(button).toBeDisabled();
    });

    test('checks button is not disabled if prop "isDisabled" is false', () => {
      // ACT
      render(
        <Button style={ButtonStyle.Primary} isDisabled={false}>
          Test button
        </Button>
      );

      // ASSERT
      const button = screen.getByRole('button', { name: 'Test button' });
      expect(button).not.toBeDisabled();
    });
  });
});
