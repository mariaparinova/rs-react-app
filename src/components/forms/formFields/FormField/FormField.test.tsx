import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { FormField } from './FormField.tsx';

const props = {
  id: 'test-id',
  label: 'Name',
  errors: { name: { message: 'error' } },
  name: 'test-name',
};

describe('<FormField>', () => {
  test('has label', () => {
    // ACT
    render(<FormField {...props} />);

    // ASSERT
    const label = screen.getByText(/name/i);
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe('LABEL');
  });

  test('has input', () => {
    // ACT
    render(<FormField {...props} />);

    // ASSERT
    const input = screen.getByRole('textbox', { name: /name/i });
    expect(input).toBeInTheDocument();
  });
});
