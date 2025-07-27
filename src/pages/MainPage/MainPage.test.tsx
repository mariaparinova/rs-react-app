import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { describe, expect, test, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { MainPage } from './MainPage.tsx';
import { getPets } from '../../api-repositories/pets/pets.ts';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { SEARCH_TERM_KEY } from './useSearchTerm.hook.ts';

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

function renderComponent() {
  const routes = [
    {
      path: '/',
      element: <MainPage />,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
  });

  render(<RouterProvider router={router} />);
}

vi.mock('../../api-repositories/pets/pets.ts', () => {
  return {
    getPets: vi.fn(() => Promise.resolve({ totalPages: 1, pets })),
  };
});

describe('<MainPage>', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Top controls', () => {
    test('checks MainPage renders Top controls element', async () => {
      // ACT
      renderComponent();

      // ASSERT
      await waitFor(() => {
        expect(screen.getByTestId('top-controls')).toBeInTheDocument();
      });
    });

    test('checks that after clicking on the search button value from search input is stored in local storage', async () => {
      // ARRANGE
      localStorage.removeItem(SEARCH_TERM_KEY);

      // ACT
      renderComponent();
      const input = screen.getByPlaceholderText('Search by name');

      await waitFor(() => {
        expect(input).not.toBeDisabled();
      });
      await userEvent.type(input, 'test value');
      await userEvent.click(screen.getByRole('button', { name: 'Search' }));

      // ASSERT
      expect(localStorage.getItem(SEARCH_TERM_KEY)).toBe('test value');
    });

    test('checks input and button are disabled during fetching', async () => {
      // ARRANGE
      vi.mocked(getPets).mockImplementationOnce(() => new Promise(() => {}));

      // ACT
      renderComponent();

      // ASSERT
      const input = screen.getByPlaceholderText('Search by name');
      const button = screen.getByRole('button', { name: 'Search' });

      await waitFor(() => {
        expect(input).toBeDisabled();
        expect(button).toBeDisabled();
      });
    });
  });

  describe('Content container', () => {
    test('checks MainPage contains Content container element', async () => {
      // ACT
      renderComponent();

      // ASSERT
      await waitFor(() => {
        expect(screen.getByTestId('content-container')).toBeInTheDocument();
      });
    });

    test('checks MainPage renders Spinner in initial render', async () => {
      // ACT
      renderComponent();

      // ASSERT
      await waitFor(() => {
        const spinner = screen.getByRole('heading', { name: 'Loading...' });
        expect(spinner).toBeInTheDocument();
      });
    });

    test('checks MainPage renders Spinner during fetching', async () => {
      // ACT
      renderComponent();
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
      renderComponent();
      const spinner = screen.getByRole('heading', { name: 'Loading...' });

      // ASSERT
      expect(spinner).toBeInTheDocument();
      await waitForElementToBeRemoved(spinner);
    });

    test('checks MainPage contains Pet cards element', async () => {
      // ACT
      renderComponent();

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
      vi.resetAllMocks();
      vi.mocked(getPets).mockImplementationOnce(() => Promise.resolve({ totalPages: 0, pets: [] }));

      // ACT
      renderComponent();

      // ASSERT
      await waitFor(() => {
        expect(screen.getByText('No pets found')).toBeInTheDocument();
      });
    });
  });
});
