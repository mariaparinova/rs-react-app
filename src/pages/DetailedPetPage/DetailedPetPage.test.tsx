import { test, describe, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { DetailedPetPage } from './DetailedPetPage.tsx';
import { Pet } from '../../types/pet.ts';
import { Suspense } from 'react';
import { ROUTES } from '../../router/routes.ts';

function renderComponent({ isLoaderSuccess = true, pet }: { isLoaderSuccess: boolean; pet?: Pet }) {
  const petItem: Pet = pet || {
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

  const routes = [
    {
      path: '/',
      element: <DetailedPetPage />,
      loader: async (): Promise<Pet | null> => {
        if (!isLoaderSuccess) {
          return null;
        }
        return petItem;
      },
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
    hydrationData: {
      loaderData: {
        '0': isLoaderSuccess ? petItem : null,
      },
    },
  });

  render(
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
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
  describe('DetailedPet when pet found', () => {
    test('checks pet name', async () => {
      // ACT
      renderComponent({ isLoaderSuccess: true });

      // ASSERT
      await waitFor(() => {
        expect(screen.getByText(/owon/i)).toBeInTheDocument();
      });
    });

    test('checks pet type', async () => {
      // ACT
      renderComponent({ isLoaderSuccess: true });

      // ASSERT
      await waitFor(() => {
        expect(screen.getByText(/animal cat/i)).toBeInTheDocument();
      });
    });

    test('checks pet id', async () => {
      // ACT
      renderComponent({ isLoaderSuccess: true });

      // ASSERT

      await waitFor(() => {
        expect(screen.getByText(/123/i)).toBeInTheDocument();
      });
    });

    describe('pet icon', () => {
      test('checks pet icon for animal type', async () => {
        // ARRANGE
        const pet = getPet('animal');

        // ACT
        renderComponent({ isLoaderSuccess: true, pet });

        // ASSERT
        await waitFor(() => {
          expect(screen.getByTestId('icon-animal')).toBeInTheDocument();
        });
      });

      test('checks pet icon for insect type', async () => {
        // ARRANGE
        const pet = getPet('insect');

        // ACT
        renderComponent({ isLoaderSuccess: true, pet });

        // ASSERT
        await waitFor(() => {
          expect(screen.getByTestId('icon-insect')).toBeInTheDocument();
        });
      });

      test('checks pet icon for bird type', async () => {
        // ARRANGE
        const pet = getPet('bird');

        // ACT
        renderComponent({ isLoaderSuccess: true, pet });

        // ASSERT
        await waitFor(() => {
          expect(screen.getByTestId('icon-bird')).toBeInTheDocument();
        });
      });

      test('checks pet icon dog', async () => {
        // ARRANGE
        const pet = getPet('dog');

        // ACT
        renderComponent({ isLoaderSuccess: true, pet });

        // ASSERT
        await waitFor(() => {
          expect(screen.getByTestId('icon-dog')).toBeInTheDocument();
        });
      });

      test('checks pet icon cat', async () => {
        // ARRANGE
        const pet = getPet('cat');

        // ACT
        renderComponent({ isLoaderSuccess: true, pet });

        // ASSERT
        await waitFor(() => {
          expect(screen.getByTestId('icon-cat')).toBeInTheDocument();
        });
      });

      test('checks pet icon for unspecified type', async () => {
        // ARRANGE
        const pet = getPet();

        // ACT
        renderComponent({ isLoaderSuccess: true, pet });

        // ASSERT
        await waitFor(() => {
          expect(screen.getByTestId('icon-unspecified')).toBeInTheDocument();
        });
      });
    });
  });

  test('checks DetailedPet has link to Main page', async () => {
    // ACT
    renderComponent({ isLoaderSuccess: true });

    // ASSERT
    await waitFor(() => {
      const links = screen.getAllByRole('link');
      expect(links.length).toBe(2);
      expect(links[0]).toHaveAttribute('href', ROUTES.ROOT);
      expect(links[1]).toHaveAttribute('href', ROUTES.ROOT);
    });
  });

  describe('DetailedPet when pet not found', () => {
    test('checks text content', async () => {
      // ACT
      renderComponent({ isLoaderSuccess: false });

      // ASSERT
      await waitFor(() => {
        const header = screen.getByText('Pet not found');
        expect(header).toBeInTheDocument();
      });
    });
  });
});
