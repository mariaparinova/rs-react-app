import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { App, SEARCH_TERM_KEY } from './App.tsx';
import { ErrorBoundary } from './components/Error/Error.tsx';
import { getPets } from './api-repositories/pets/pets.ts';

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
    getPets: vi.fn(() => Promise.resolve(pets)),
  };
});

describe('<App>', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Top controls', () => {
    test('checks App renders Top controls element', async () => {
      // ACT
      render(<App />);

      // ASSERT
      await waitFor(() => {
        expect(screen.getByTestId('top-controls')).toBeInTheDocument();
      });
    });

    test('checks that after clicking on the search button value from search input is stored in local storage', async () => {
      // ARRANGE
      localStorage.removeItem(SEARCH_TERM_KEY);

      // ACT
      render(<App />);
      const input = screen.getByPlaceholderText('Search by name');

      await waitFor(() => {
        expect(input).not.toBeDisabled();
      });
      await userEvent.type(input, 'test value');
      await userEvent.click(screen.getByRole('button', { name: 'Search' }));

      // ASSERT
      expect(localStorage.getItem(SEARCH_TERM_KEY)).toBe('test value');
    });

    test('checks input and button are disabled during fetching', () => {
      // ARRANGE
      vi.mocked(getPets).mockImplementationOnce(() => new Promise(() => {}));

      // ACT
      render(<App />);

      // ASSERT
      const input = screen.getByPlaceholderText('Search by name');
      const button = screen.getByRole('button', { name: 'Search' });

      expect(input).toBeDisabled();
      expect(button).toBeDisabled();
    });
  });

  describe('Content container', () => {
    test('checks App contains Content container element', async () => {
      // ACT
      render(<App />);

      // ASSERT
      await waitFor(() => {
        expect(screen.getByTestId('content-container')).toBeInTheDocument();
      });
    });

    test('checks App renders Spinner in initial render', async () => {
      // ACT
      render(<App />);

      // ASSERT
      await waitFor(() => {
        const spinner = screen.getByRole('heading', { name: 'Loading...' });
        expect(spinner).toBeInTheDocument();
      });
    });

    test('checks App renders Spinner during fetching', async () => {
      // ACT
      render(<App />);
      const input = screen.getByPlaceholderText('Search by name');
      await waitFor(() => {
        expect(input).not.toBeDisabled();
      });
      await userEvent.type(input, 'test value');

      vi.mocked(getPets).mockImplementationOnce(() => new Promise(() => {}));
      await userEvent.click(screen.getByRole('button', { name: 'Search' }));

      // ASSERT
      const spinner = screen.getByRole('heading', { name: 'Loading...' });
      expect(spinner).toBeInTheDocument();
    });

    test('checks Spinner is removed after fetching', async () => {
      // ACT
      render(<App />);
      const spinner = screen.getByRole('heading', { name: 'Loading...' });

      // ASSERT
      expect(spinner).toBeInTheDocument();
      await waitForElementToBeRemoved(spinner);
    });

    test('checks App contains Pet cards element', async () => {
      // ACT
      render(<App />);

      // ASSERT
      await waitFor(() => {
        expect(screen.getByText(pets[0].name)).toBeInTheDocument();
      });
      await waitFor(() => {
        expect(screen.getByText(pets[3].name)).toBeInTheDocument();
      });
    });

    test('checks that in case any pets was not found "No pets found" message is shown', async () => {
      // ARRANGE
      vi.mocked(getPets).mockImplementationOnce(() => Promise.resolve([]));

      // ACT
      render(<App />);

      // ASSERT
      await waitFor(() => {
        expect(screen.getByText('No pets found')).toBeInTheDocument();
      });
    });
  });

  describe('Error button', () => {
    test('checks App renders Error button', async () => {
      // ACT
      render(<App />);

      // ASSERT
      await waitFor(() => {
        const errButton = screen.getByRole('button', { name: 'Throw error' });
        expect(errButton).toBeInTheDocument();
      });
    });

    test('checks error button is disabled during fetching', async () => {
      // ACT
      render(<App />);

      // ASSERT
      await waitFor(() => {
        const button = screen.getByRole('button', { name: 'Throw error' });
        expect(button).toBeDisabled();
      });
    });

    test('checks App renders Error page after clicking on error button', async () => {
      // ARRANGE
      const fallbackErrorElement = (
        <div className="error">
          <h3>Error</h3>
          <div>Oops! Something went wrong</div>
        </div>
      );

      // ACT
      render(
        <ErrorBoundary fallback={fallbackErrorElement}>
          <App />
        </ErrorBoundary>
      );

      const errorButton = screen.getByRole('button', { name: 'Throw error' });

      await waitFor(() => {
        expect(errorButton).not.toBeDisabled();
      });
      await userEvent.click(errorButton);

      // ASSERT
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: 'Error' })).toBeInTheDocument();
      });
    });
  });
});
