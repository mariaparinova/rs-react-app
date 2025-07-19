import { describe, expect, test } from 'vitest';
import { screen, render } from '@testing-library/react';
import { TopControls } from './TopControls.tsx';
import userEvent from '@testing-library/user-event';

describe('<TopControls>', () => {
  test('checks that search input was rendered', () => {
    // ACT
    render(<TopControls initialSearchTerm="" onSearchTermChange={() => {}} isLoading={false} />);

    // ASSERT
    const topControls = screen.getByTestId('top-controls');
    const searchInput = screen.getByPlaceholderText('Search by name');
    expect(topControls).toContainElement(searchInput);
  });

  test('checks that search input initially is not disabled', () => {
    // ACT
    render(<TopControls initialSearchTerm="" onSearchTermChange={() => {}} isLoading={false} />);

    // ASSERT
    const searchInput = screen.getByPlaceholderText('Search by name');
    expect(searchInput).not.toBeDisabled();
  });

  test('checks that search button was rendered ', () => {
    // ACT
    render(<TopControls initialSearchTerm="" onSearchTermChange={() => {}} isLoading={false} />);

    // ASSERT
    const topControls = screen.getByTestId('top-controls');
    const searchButton = screen.getByRole('button', { name: 'Search' });
    expect(topControls).toContainElement(searchButton);
  });

  test("checks that a user's input is reflected in the search input", async () => {
    // ACT
    render(<TopControls initialSearchTerm={''} isLoading={false} onSearchTermChange={() => {}} />);
    await userEvent.type(screen.getByPlaceholderText('Search by name'), 'Albatross');

    // ASSERT
    const input = screen.getByPlaceholderText('Search by name');
    expect(input).toHaveValue('Albatross');
  });
});
