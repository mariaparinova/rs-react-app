import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InputSearch } from './InputSearch.tsx';

describe('<InputSearch>', () => {
  test('checks that input has placeholder', () => {
    // ACT
    render(
      <InputSearch
        placeholder={'placeholder for testing input type search'}
        id="id-test"
        value=""
        onChange={() => {}}
      />
    );

    // ASSERT
    const input = screen.getByPlaceholderText('placeholder for testing input type search');
    expect(input).toBeInTheDocument();
  });

  test('checks that input is disabled', () => {
    // ACT
    render(
      <InputSearch
        isDisabled={true}
        placeholder={'placeholder for testing input type search'}
        id="id-test"
        value=""
        onChange={() => {}}
      />
    );

    // ASSERT
    const input = screen.getByPlaceholderText('placeholder for testing input type search');
    expect(input).toBeDisabled();
  });
});
