import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Checkbox } from './Checkbox.tsx';

const checkboxProps = {
  id: 'abc',
  isChecked: true,
  onChange: () => {},
  label: 'some text label',
};

describe('<Checkbox>', () => {
  test('checks Checkbox has label', () => {
    // ACT
    render(<Checkbox {...checkboxProps} />);

    // ASSERT
    expect(screen.getByText('some text label')).toBeInTheDocument();
  });

  test('checks Checkbox is checked', () => {
    // ACT
    render(<Checkbox {...checkboxProps} />);

    // ASSERT
    const checkbox = screen.getByTestId('checkbox').querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkbox).toBeChecked();
  });

  test('checks Checkbox is not checked', () => {
    // ACT
    render(<Checkbox {...checkboxProps} isChecked={false} />);

    // ASSERT
    const checkbox = screen.getByTestId('checkbox').querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkbox).not.toBeChecked();
  });
});
