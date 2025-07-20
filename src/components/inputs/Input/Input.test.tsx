import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from './Input.tsx';
import userEvent from '@testing-library/user-event';

describe('<Input>', () => {
  test('checks input has placeholder', () => {
    // ACT
    render(<Input placeholder="placeholder for testing" id="id" value="" onChange={() => {}} />);

    // ASSERT
    const input = screen.getByPlaceholderText('placeholder for testing');
    expect(input).toBeInTheDocument();
  });

  describe('disabled', () => {
    test('checks input is not disabled by default', () => {
      // ACT
      render(<Input placeholder="placeholder for testing" id="id" value="" onChange={() => {}} />);

      // ASSERT
      const input = screen.getByPlaceholderText('placeholder for testing');
      expect(input).not.toBeDisabled();
    });

    test('checks input is disabled if prop "isDisabled" is true', () => {
      // ACT
      render(<Input isDisabled={true} placeholder="placeholder for testing" id="id" value="" onChange={() => {}} />);

      // ASSERT
      const input = screen.getByPlaceholderText('placeholder for testing');
      expect(input).toBeDisabled();
    });

    test('checks input is not disabled if prop "isDisabled" is false', () => {
      // ACT
      render(<Input isDisabled={false} placeholder="placeholder for testing" id="id" value="" onChange={() => {}} />);

      // ASSERT
      const input = screen.getByPlaceholderText('placeholder for testing');
      expect(input).not.toBeDisabled();
    });
  });

  test('checks onChange is called when Input typed', async () => {
    // ARRANGE
    const onChangeHandler = vi.fn();

    // ACT
    render(<Input value="" id="id" onChange={onChangeHandler} placeholder="placeholder" />);
    const input = screen.getByPlaceholderText('placeholder');
    await userEvent.type(input, 'hello');

    // ARRANGE
    expect(onChangeHandler).toHaveBeenCalledTimes('hello'.length);
  });
});
