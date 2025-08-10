import { test, describe, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { DetailedPetPage } from './DetailedPetPage.tsx';
import { Pet } from '../../types/pet.ts';
import { ROUTES } from '../../router/routes.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getPetById } from '../../api-repositories/pets/pets.ts';

const petItem: Pet = {
  id: '123',
  name: 'owon',
  types: {
    animal: true,
    insect: false,
    bird: false,
    dog: false,
    cat: true,
  },
};

vi.mock('../../api-repositories/pets/pets.ts');

function renderComponent() {
  const routes = [
    {
      path: `/:id`,
      element: <DetailedPetPage />,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: [`/123`],
  });

  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

type petType = 'animal' | 'insect' | 'bird' | 'dog' | 'cat';

function getPet(petType?: petType): Pet {
  const pet: Pet = {
    id: '123',
    name: 'owon',
    types: { animal: false, insect: false, bird: false, dog: false, cat: false },
  };

  if (petType) {
    return {
      ...pet,
      types: {
        ...pet.types,
        [petType]: true,
      },
    };
  }

  return pet;
}

describe('<DetailedPet>', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('When pet found', () => {
    test('checks pet name', async () => {
      // ARRANGE
      vi.mocked(getPetById).mockImplementationOnce(() => Promise.resolve(petItem));

      // ACT
      renderComponent();

      // ASSERT
      await waitFor(() => {
        expect(screen.getByText(/owon/i)).toBeInTheDocument();
      });
    });

    test('checks pet type', async () => {
      // ARRANGE
      vi.mocked(getPetById).mockImplementationOnce(() => Promise.resolve(petItem));

      // ACT
      renderComponent();

      // ASSERT
      await waitFor(() => {
        expect(screen.getByText(/animal cat/i)).toBeInTheDocument();
      });
    });

    test('checks pet id', async () => {
      // ARRANGE
      vi.mocked(getPetById).mockImplementationOnce(() => Promise.resolve(petItem));

      // ACT
      renderComponent();

      // ASSERT

      await waitFor(() => {
        expect(screen.getByText(/123/i)).toBeInTheDocument();
      });
    });

    test('check "Clear cache" button', async () => {
      // ARRANGE
      vi.mocked(getPetById).mockImplementationOnce(() => Promise.resolve(petItem));

      // ACT
      renderComponent();

      //ASSERT
      await waitFor(() => {
        const button = screen.getByRole('button', { name: /remove pet from cash/i });
        expect(button).toBeInTheDocument();
      });
    });

    describe('pet icon', () => {
      test('checks pet icon for animal type', async () => {
        // ARRANGE
        const pet = getPet('animal');
        vi.mocked(getPetById).mockImplementationOnce(() => Promise.resolve(pet));

        // ACT
        renderComponent();

        // ASSERT
        await waitFor(() => {
          expect(screen.getByTestId('icon-animal')).toBeInTheDocument();
        });
      });

      test('checks pet icon for insect type', async () => {
        // ARRANGE
        const pet = getPet('insect');
        vi.mocked(getPetById).mockImplementationOnce(() => Promise.resolve(pet));

        // ACT
        renderComponent();

        // ASSERT
        await waitFor(() => {
          expect(screen.getByTestId('icon-insect')).toBeInTheDocument();
        });
      });

      test('checks pet icon for bird type', async () => {
        // ARRANGE
        const pet = getPet('bird');
        vi.mocked(getPetById).mockImplementationOnce(() => Promise.resolve(pet));

        // ACT
        renderComponent();

        // ASSERT
        await waitFor(() => {
          expect(screen.getByTestId('icon-bird')).toBeInTheDocument();
        });
      });

      test('checks pet icon dog', async () => {
        // ARRANGE
        const pet = getPet('dog');
        vi.mocked(getPetById).mockImplementationOnce(() => Promise.resolve(pet));

        // ACT
        renderComponent();

        // ASSERT
        await waitFor(() => {
          expect(screen.getByTestId('icon-dog')).toBeInTheDocument();
        });
      });

      test('checks pet icon cat', async () => {
        // ARRANGE
        const pet = getPet('cat');
        vi.mocked(getPetById).mockImplementationOnce(() => Promise.resolve(pet));

        // ACT
        renderComponent();

        // ASSERT
        await waitFor(() => {
          expect(screen.getByTestId('icon-cat')).toBeInTheDocument();
        });
      });

      test('checks pet icon for unspecified type', async () => {
        // ARRANGE
        const pet = getPet();
        vi.mocked(getPetById).mockImplementationOnce(() => Promise.resolve(pet));

        // ACT
        renderComponent();

        // ASSERT
        await waitFor(() => {
          expect(screen.getByTestId('icon-unspecified')).toBeInTheDocument();
        });
      });
    });
  });

  test('checks DetailedPet has link to Main page', async () => {
    // ARRANGE
    vi.mocked(getPetById).mockImplementationOnce(() => Promise.resolve(petItem));

    // ACT
    renderComponent();

    // ASSERT
    await waitFor(() => {
      const links = screen.getAllByRole('link');
      expect(links.length).toBe(2);
      expect(links[0]).toHaveAttribute('href', ROUTES.ROOT);
      expect(links[1]).toHaveAttribute('href', ROUTES.ROOT);
    });
  });

  describe('When pet not found', () => {
    test('checks text content', async () => {
      // ARRANGE
      vi.mocked(getPetById).mockImplementationOnce(() => Promise.reject(new Error('test error')));

      // ACT
      renderComponent();

      // ASSERT
      await waitFor(() => {
        expect(screen.getByText(/pet not found/i)).toBeInTheDocument();
      });
    });
  });
});
