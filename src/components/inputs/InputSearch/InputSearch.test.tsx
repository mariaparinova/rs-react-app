import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InputSearch } from './InputSearch.tsx';
import userEvent from '@testing-library/user-event';
import { InputSearchProps } from './InputSearch.types.ts';

const defaultProps: InputSearchProps = {
  placeholder: 'placeholder for testing',
  id: 'id',
  value: '',
  onChange: () => {},
};

describe('<InputSearch>', () => {
  test('checks input search has placeholder', () => {
    // ACT
    render(<InputSearch {...defaultProps} />);

    // ASSERT
    const input = screen.getByPlaceholderText('placeholder for testing');
    expect(input).toBeInTheDocument();
  });

  describe('disabled', () => {
    test('checks input search is not disabled by default', () => {
      // ACT
      render(<InputSearch {...defaultProps} />);

      // ASSERT
      const input = screen.getByPlaceholderText('placeholder for testing');
      expect(input).not.toBeDisabled();
    });

    test('checks input search is disabled if prop "isDisabled" is true', () => {
      // ACT
      render(<InputSearch {...defaultProps} isDisabled={true} />);

      // ASSERT
      const input = screen.getByPlaceholderText('placeholder for testing');
      expect(input).toBeDisabled();
    });

    test('checks input search is not disabled if prop "isDisabled" is false', () => {
      // ACT
      render(<InputSearch {...defaultProps} />);

      // ASSERT
      const input = screen.getByPlaceholderText('placeholder for testing');
      expect(input).not.toBeDisabled();
    });
  });

  test('checks onChange is called when InputSearch typed', async () => {
    // ARRANGE
    const onChangeHandler = vi.fn();

    // ACT
    render(<InputSearch {...defaultProps} onChange={onChangeHandler} />);
    const input = screen.getByPlaceholderText(`${defaultProps.placeholder}`);
    await userEvent.type(input, 'hello');

    // ASSERT
    expect(onChangeHandler).toHaveBeenCalledTimes('hello'.length);
  });
});
