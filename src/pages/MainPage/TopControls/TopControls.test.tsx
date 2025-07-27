import { describe, expect, test, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import { TopControls } from './TopControls.tsx';
import userEvent from '@testing-library/user-event';

describe('<TopControls>', () => {
  test('checks search input was rendered', () => {
    // ACT
    render(<TopControls initialSearchTerm="" onSearchTermChange={() => {}} isLoading={false} />);

    // ASSERT
    const searchInput = screen.getByPlaceholderText('Search by name');
    expect(searchInput).toBeInTheDocument();
  });

  test('checks search input renders with initialSearchTerm prop', () => {
    // ACT
    render(<TopControls initialSearchTerm="asd" onSearchTermChange={() => {}} isLoading={false} />);

    // ASSERT
    const input = screen.getByPlaceholderText('Search by name');
    expect(input).toHaveValue('asd');
  });

  test('checks onSearchTermChange is called when button search was clicked', async () => {
    // ARRANGE
    const onSearchTermChange = vi.fn();

    // ACT
    render(<TopControls initialSearchTerm="" onSearchTermChange={onSearchTermChange} isLoading={false} />);
    await userEvent.type(screen.getByPlaceholderText('Search by name'), 'asd');
    await userEvent.click(screen.getByRole('button', { name: 'Search' }));

    // ASSERT
    expect(onSearchTermChange).toHaveBeenCalled();
  });

  describe('"isLoading" prop', () => {
    test('checks search input is not disabled if isLoading is false', () => {
      // ACT
      render(<TopControls initialSearchTerm="" onSearchTermChange={() => {}} isLoading={false} />);

      // ASSERT
      const searchInput = screen.getByPlaceholderText('Search by name');
      expect(searchInput).not.toBeDisabled();
    });

    test('checks search input is not disabled if isLoading is true', () => {
      // ACT
      render(<TopControls initialSearchTerm="" onSearchTermChange={() => {}} isLoading={true} />);

      // ASSERT
      const searchInput = screen.getByPlaceholderText('Search by name');
      expect(searchInput).toBeDisabled();
    });
  });

  test('checks search button was rendered ', () => {
    // ACT
    render(<TopControls initialSearchTerm="" onSearchTermChange={() => {}} isLoading={false} />);

    // ASSERT
    const searchButton = screen.getByRole('button', { name: 'Search' });
    expect(searchButton).toBeInTheDocument();
  });

  test("checks user's input is reflected in the search input", async () => {
    // ACT
    render(<TopControls initialSearchTerm={''} isLoading={false} onSearchTermChange={() => {}} />);
    const input = screen.getByPlaceholderText('Search by name');
    await userEvent.type(input, 'Albatross');

    // ASSERT
    expect(input).toHaveValue('Albatross');
  });
});
