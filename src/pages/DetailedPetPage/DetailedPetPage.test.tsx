import { test, describe, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { DetailedPetPage, getIcon } from './DetailedPetPage.tsx';
import { Pet } from '../../types/pet.ts';
import { Suspense } from 'react';
import { ROUTES } from '../../router/routes.ts';
import IconAnimal from '../../icons/animal.svg?react';
import IconInsect from '../../icons/insect.svg?react';
import IconBird from '../../icons/bird.svg?react';
import IconDog from '../../icons/dog.svg?react';
import IconCat from '../../icons/cat.svg?react';
import IconUnknown from '../../icons/question-mark.svg?react';

function renderComponent({ isLoaderSuccess = true } = {}) {
  const pet: Pet = {
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
        return pet;
      },
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
    hydrationData: {
      loaderData: {
        '0': isLoaderSuccess ? pet : null,
      },
    },
  });

  render(
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

describe('<DetailedPet>', () => {
  describe('check DetailedPet when pet found', () => {
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

  describe('check DetailedPet when pet not found', () => {
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

describe('<getIcon>', () => {
  test('checks icon when pet type is animal', () => {
    // ARRANGE
    const pet = {
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

    // ACT
    const icon = getIcon(pet);

    // ASSERT
    expect(icon).toEqual(<IconAnimal />);
  });

  test('checks icon when pet type is insect', () => {
    // ARRANGE
    const pet = {
      id: '123',
      name: 'owon',
      types: {
        animal: false,
        insect: true,
        bird: false,
        dog: false,
        cat: true,
      },
    };

    // ACT
    const icon = getIcon(pet);

    // ASSERT
    expect(icon).toEqual(<IconInsect />);
  });

  test('checks icon when pet type is bird', () => {
    // ARRANGE
    const pet = {
      id: '123',
      name: 'owon',
      types: {
        animal: false,
        insect: false,
        bird: true,
        dog: false,
        cat: true,
      },
    };

    // ACT
    const icon = getIcon(pet);

    // ASSERT
    expect(icon).toEqual(<IconBird />);
  });

  test('checks icon when pet type is dog', () => {
    // ARRANGE
    const pet = {
      id: '123',
      name: 'owon',
      types: {
        animal: false,
        insect: false,
        bird: false,
        dog: true,
        cat: true,
      },
    };

    // ACT
    const icon = getIcon(pet);

    // ASSERT
    expect(icon).toEqual(<IconDog />);
  });

  test('checks icon when pet type is cat', () => {
    // ARRANGE
    const pet = {
      id: '123',
      name: 'owon',
      types: {
        animal: false,
        insect: false,
        bird: false,
        dog: false,
        cat: true,
      },
    };

    // ACT
    const icon = getIcon(pet);

    // ASSERT
    expect(icon).toEqual(<IconCat />);
  });

  test('checks default type', () => {
    // ARRANGE
    const pet = {
      id: '123',
      name: 'owon',
      types: {
        animal: false,
        insect: false,
        bird: false,
        dog: false,
        cat: false,
      },
    };

    // ACT
    const icon = getIcon(pet);

    // ASSERT
    expect(icon).toEqual(<IconUnknown />);
  });
});
