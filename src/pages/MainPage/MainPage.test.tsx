import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { describe, expect, test, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { MainPage } from './MainPage.tsx';
import { getPets } from '../../api-repositories/pets/pets.ts';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { SEARCH_TERM_KEY } from '../../hooks/useSearchTerm.hook.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
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

  describe('<TopControls>', () => {
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

  describe('content container', () => {
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

  describe('<SelectedItemsManager>', () => {
    describe('visibility', () => {
      test('checks SelectedItemsManager is not visible initially', async () => {
        // ACT
        renderComponent();
        await waitFor(() => {
          expect(screen.getByText(pets[0].name)).toBeInTheDocument();
        });

        // ASSERT
        expect(screen.getByTestId('selected-items-manager')).toHaveClass('hidden');
      });

      test('checks SelectedItemsManager is not visible when all selected pets got unselected', async () => {
        // ACT
        renderComponent();
        await waitFor(() => {
          const cards = screen.getAllByTestId('pet-card').slice(0, 3);
          const checkboxSelector = 'input[type="checkbox"]';

          cards.forEach((card) => {
            userEvent.click(card.querySelector(checkboxSelector)!);
          });

          cards.forEach((card) => {
            userEvent.click(card.querySelector(checkboxSelector)!);
          });
        });

        //ASSERT
        await waitFor(() => {
          const selectedItemsManager = screen.getByTestId('selected-items-manager');
          expect(selectedItemsManager).toHaveClass('hidden');
        });
      });

      test('checks SelectedItemsManager is visible when at least one pet is selected', async () => {
        // ACT
        renderComponent();
        await waitFor(() => {
          const pet = screen.getAllByTestId('pet-card')[0];
          const checkBox = pet.querySelector('input[type="checkbox"]')!;

          userEvent.click(checkBox);
        });

        //ASSERT
        await waitFor(() => {
          const selectedItemsManager = screen.getByTestId('selected-items-manager');
          expect(selectedItemsManager).not.toHaveClass('hidden');
        });
      });
    });

    describe('text content', () => {
      test('checks SelectedItemsManager has correct text content when one pet is selected', async () => {
        // ACT
        renderComponent();
        await waitFor(() => {
          const pet = screen.getAllByTestId('pet-card')[0];
          const checkBox = pet.querySelector('input[type="checkbox"]')!;

          userEvent.click(checkBox);
        });

        //ASSERT
        await waitFor(() => {
          const selectedItemsManager = screen.getByTestId('selected-items-manager');
          expect(selectedItemsManager).toHaveTextContent('selected items: 1');
        });
      });

      test('checks SelectedItemsManager has correct text content when three pets are selected', async () => {
        // ACT
        renderComponent();
        await waitFor(() => {
          const pet_1 = screen.getAllByTestId('pet-card')[0];
          const pet_2 = screen.getAllByTestId('pet-card')[1];
          const pet_3 = screen.getAllByTestId('pet-card')[2];

          userEvent.click(pet_1.querySelector('input[type="checkbox"]')!);
          userEvent.click(pet_2.querySelector('input[type="checkbox"]')!);
          userEvent.click(pet_3.querySelector('input[type="checkbox"]')!);
        });

        //ASSERT
        await waitFor(() => {
          const selectedItemsManager = screen.getByTestId('selected-items-manager');
          expect(selectedItemsManager).toHaveTextContent('selected items: 3');
        });
      });
    });
  });
});
