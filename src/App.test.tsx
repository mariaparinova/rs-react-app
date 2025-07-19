import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { App } from './App.tsx';

const pets = [
  {
    id: 'ANMA0000032315',
    name: "'Owon",
  },
  {
    id: 'ANMA0000264633',
    name: 'Abalone',
  },
  {
    id: 'ANMA0000262167',
    name: 'Albatross',
  },
  {
    id: 'ANMA0000034899',
    name: 'Aldebaran mud leech',
  },
  {
    id: 'ANMA0000008622',
    name: 'Aldebaran serpent',
  },
  {
    id: 'ANMA0000010045',
    name: 'Aldebaran shellmouth',
  },
  {
    id: 'ANMA0000028270',
    name: 'Algorian mammoth',
  },
  {
    id: 'ANMA0000260398',
    name: 'Alien horse',
  },
  {
    id: 'ANMA0000027729',
    name: 'Alligator',
  },
  {
    id: 'ANMA0000207062',
    name: 'Alopex lagopus',
  },
];

vi.mock('./api-repositories/pets/pets.ts', () => {
  return {
    getPets: vi.fn(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(pets), 500);
        })
    ),
  };
});

describe('<App>', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('checks that App contains Top controls element', () => {
    // ACT
    render(<App />);

    // ASSERT
    const topControls = screen.getByTestId('top-controls');
    expect(topControls).toBeInTheDocument();
  });

  test('checks that after clicking on the search button value from search input is stored in local storage', async () => {
    // ARRANGE
    localStorage.clear();

    // ACT
    render(<App />);
    const input = screen.getByPlaceholderText('Search by name');

    await waitFor(() => {
      expect(input).not.toBeDisabled();
    });

    await userEvent.type(input, 'test value');
    await userEvent.click(screen.getByRole('button', { name: 'Search' }));

    // ASSERT
    expect(localStorage.getItem('searchTerm')).toBe('test value');
  });

  test('checks that App renders Spinner during fetching', async () => {
    // ACT
    render(<App />);
    const input = screen.getByPlaceholderText('Search by name');
    await userEvent.type(input, 'test value');
    await userEvent.click(screen.getByRole('button', { name: 'Search' }));

    // ASSERT
    const spinner = screen.getByRole('heading', { name: 'Loading...' });
    expect(spinner).toBeInTheDocument();
  });

  test('checks that App renders Spinner in initial render', async () => {
    // ACT
    render(<App />);

    // ASSERT
    const spinner = screen.getByRole('heading', { name: 'Loading...' });
    expect(spinner).toBeInTheDocument();
  });

  test('checks that inputs and buttons are disabled during fetching', async () => {
    // ACT
    render(<App />);
    const input = screen.getByPlaceholderText('Search by name');
    await userEvent.type(input, 'test value');
    await userEvent.click(screen.getByRole('button', { name: 'Search' }));

    // ASSERT
    const buttonSearch = screen.getByRole('button', { name: 'Search' });
    const buttonError = screen.getByRole('button', { name: 'Throw error' });

    expect(input).toBeDisabled();
    expect(buttonSearch).toBeDisabled();
    expect(buttonError).toBeDisabled();
  });

  test('checks that Spinner is removed after fetching', async () => {
    // ACT
    render(<App />);
    const spinner = screen.getByRole('heading', { name: 'Loading...' });
    await waitForElementToBeRemoved(spinner);

    // ASSERT
    expect(spinner).not.toBeInTheDocument();
  });

  test('checks that App contains Content container element', async () => {
    // ACT
    render(<App />);
    const spinner = screen.getByRole('heading', { name: 'Loading...' });
    await waitForElementToBeRemoved(spinner);

    // ASSERT
    const contentContainer = screen.getByTestId('content-container');
    expect(contentContainer).toBeInTheDocument();
  });

  test('checks that App contains Table element', async () => {
    // ACT
    render(<App />);
    const spinner = screen.getByRole('heading', { name: 'Loading...' });
    await waitForElementToBeRemoved(spinner);

    // ASSERT
    const table = screen.getByRole('table', { name: 'pets list' });
    expect(table).toBeInTheDocument();
  });

  test('checks that App renders Error button', async () => {
    // ACT
    render(<App />);
    const errButton = screen.getByRole('button', { name: 'Throw error' });

    // ASSERT
    expect(errButton).toBeInTheDocument();
  });
});
