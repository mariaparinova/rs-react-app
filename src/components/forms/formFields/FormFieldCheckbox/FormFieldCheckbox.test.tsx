import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { FormFieldCheckbox } from './FormFieldCheckbox.tsx';

const props = {
  id: 'test-id',
  label: 'Name',
  errors: { name: { message: 'error' } },
  name: 'test-name',
};

describe('<FormField>', () => {
  test('has label', () => {
    // ACT
    render(<FormFieldCheckbox {...props} />);

    // ASSERT
    const label = screen.getByText(/name/i);
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe('LABEL');
  });

  test('has input', () => {
    // ACT
    render(<FormFieldCheckbox {...props} />);

    // ASSERT
    const input = screen.getByRole('checkbox', { name: /name/i });
    expect(input).toBeInTheDocument();
  });
});
