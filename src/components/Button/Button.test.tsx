import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button.tsx';
import '@testing-library/jest-dom';
import { ButtonStyle } from './Button.types.ts';

describe('<Button>', () => {
  test('checks that button has text', () => {
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
    test('checks that button is disabled if prop "isDisabled" is true', () => {
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

    test('checks that button is not disabled if prop "isDisabled" is false', () => {
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
